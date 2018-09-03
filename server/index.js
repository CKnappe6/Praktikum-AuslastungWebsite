const Sequelize = require('sequelize');
const rp = require('request-promise-native');

/**
 * Sequelize globals
 */
const dbInfo = 'mysql://test:test@localhost/albertina_auslastung';
const sequelize = new Sequelize(dbInfo);
// Area model
const Area = sequelize.define('area', {
  name: { type: Sequelize.STRING },
  userAmount: { type: Sequelize.SMALLINT },
});

/**
 * Request globals
 */
const auslastung = {
  uri: 'https://netview.rz.uni-leipzig.de/ub_clients.txt',
  rejectUnauthorized: false,
  headers: { 'User-Agent': 'Request-Promise' },
};

/**
 * Prints all values in the table 'area'
 */
function showResults(promises) {
  Promise.all(promises).then(() => {
    Area.findAll().then((areas) => {
      console.log('\n\nInserted data:\n');
      areas.forEach((area) => {
        console.log(`Bereich:\t${area.dataValues.name}\nNutzer :\t${area.dataValues.userAmount}\nDatum  :\t${area.dataValues.createdAt}\n`);
      });
    });
  });
}

/**
 * Query API and store response in database.
 */
function queryAPI(printValuesBool) {
  const promises = [];

  rp(auslastung).then((response) => {
    let sum = 0;

    response.split(/\n/).forEach((element) => {
      if (!element) return;
      const area = element.split(/\|/);
      sum += parseInt(area[1], 10);
      promises.push(Area.create({
        name: area[0],
        userAmount: area[1],
      }));
    });

    promises.push(Area.create({
      name: response.substring(0, response.indexOf('-')),
      userAmount: sum,
    }));

    if (printValuesBool) showResults(promises);
  });
}


/**
 * Create table/model Area.
 * Drop it, if it already exists. COULD BE DANGEROUS!
 */
Area.sync({ force: true })
  .then(() => {
    queryAPI(false); // don't show any data

    // Intervallduration = 10 minutes (1000ms per min for 10mins)
    setInterval(() => queryAPI(null), 1000 * 60 * 10);
  })
  .catch(err => console.log(err));
