const rp = require('request-promise-native');
const $ = require('jquery');

const Auslastung = {
  uri: 'https://netview.rz.uni-leipzig.de/ub_clients.txt',
  rejectUnauthorized: false,
  headers: {
    Origin: 'http://localhost:1543',
    'User-Agent': 'Request-Promise',
  },
};

const weights = {
  'Albertina-LesesaalMitteErstesOG': 1.2,
  'Albertina-LesesaalMitte': 2,
  'Albertina-LesesaalWest': 4,
  'Albertina-LesesaalOst': 2,
  'Albertina-OffenesMagazin': 0.5,
  'Albertina-Cafeteria': 1,
  'Albertina-Haupthalle': 2,
};

$(() => {
  /**
   * This method changes the color of when a certain threshold is reached.
   * Currently a weight parameter can influence this decision.
   * @param {String} id Id of the area. Should be the same name as
   *                    its respective field in the html-page
   * @param {Int} value The amount of connected users in an area
   * @param {Int} weigth How is the area weighted?
   *                     Can fit more people => higher weigth
   */
  function setColor(id, value, weigth) {
    const weigthedValue = Math.round(value / weigth);
    let color = 'gruen';

    if (weigthedValue >= 41 && weigthedValue <= 80) {
      color = 'gelb';
    } else if (weigthedValue >= 80) {
      color = 'rot';
    }
    $(`#${id}`).attr('src', `images/ampeln/ampel_${color}.jpg`);
  }

  rp(Auslastung).then((response) => {
    let sum = 0;

    response.split(/\n/).forEach((element) => {
      if (!element) return;
      const area = element.split(/\|/);
      sum += parseInt(area[1], 10);
      setColor(area[0], area[1], weights[area[0]]);
    });
    setColor(response.substring(0, response.indexOf('-')), sum, 8);
  });
});
