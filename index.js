const rp = require('request-promise-native');
const $ = require('jquery');

const albertinaAuslastung = {
  uri: 'https://netview.rz.uni-leipzig.de/ub_clients.txt',
  rejectUnauthorized: false,
  headers: {
    'User-Agent': 'Request-Promise',
  },
};

$(() => {
  $('.ampel').click((event) => {
    // change from green to yellow
    if ($(event.target).attr('src') === 'images/ampeln/ampel_gruen.jpg') {
      $(event.target).attr('src', 'images/ampeln/ampel_gelb.jpg');
      event.stopPropagation();
      return;
    }
    // change from yellow to red
    if ($(event.target).attr('src') === 'images/ampeln/ampel_gelb.jpg') {
      $(event.target).attr('src', 'images/ampeln/ampel_rot.jpg');
      event.stopPropagation();
      return;
    }
    // change from red to green
    if ($(event.target).attr('src') === 'images/ampeln/ampel_rot.jpg') {
      $(event.target).attr('src', 'images/ampeln/ampel_gruen.jpg');
      event.stopPropagation();
    }
  });

  function setColor(id, value, weigth) {
    const weigthedValue = Math.round(value / weigth);
    if (weigthedValue >= 0 && weigthedValue <= 40) {
      $(`#${id}`).attr('src', 'images/ampeln/ampel_gruen.jpg');
      return;
    }
    if (weigthedValue >= 41 && weigthedValue <= 80) {
      $(`#${id}`).attr('src', 'images/ampeln/ampel_gelb.jpg');
      return;
    }
    $(`#${id}`).attr('src', 'images/ampeln/ampel_rot.jpg');
  }

  rp(albertinaAuslastung)
    .then((response) => {
      let sum = 0;
      response.split(/\n/).forEach((element) => {
        if (!element) return;
        const area = element.split(/\|/);
        sum += parseInt(area[1], 10);
        switch (area[0]) {
          case 'Albertina-LesesaalMitteErstesOG':
            setColor(area[0], area[1], 1.2);
            break;
          case 'Albertina-LesesaalMitte':
            setColor(area[0], area[1], 2);
            break;
          case 'Albertina-LesesaalWest':
            setColor(area[0], area[1], 4);
            break;
          case 'Albertina-LesesaalOst':
            setColor(area[0], area[1], 2);
            break;
          case 'Albertina-Cafeteria':
            setColor(area[0], area[1], 1);
            break;
          case 'Albertina-OffenesMagazin':
            setColor(area[0], area[1], 0.5);
            break;
          case 'Albertina-Haupthalle':
            setColor(area[0], area[1], 1);
            break;
          default:
            setColor(area[0], area[1], 1);
        }
      });
      setColor(response.substring(0, response.indexOf('-')), sum, 8);
    })
    .catch(() => {
      // console.log(err);
    });
});
