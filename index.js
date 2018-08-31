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

  function setColor(id, value) {
    if (value >= 0 && value <= 40) {
      $(`#${id}`).attr('src', 'images/ampeln/ampel_gruen.jpg');
      return;
    }
    if (value >= 41 && value <= 80) {
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
        setColor(area[0], area[1]);
      });
      setColor(response.substring(0, response.indexOf(/-/)), sum);
    })
    .catch((err) => {
      console.log(err);
    });
});
