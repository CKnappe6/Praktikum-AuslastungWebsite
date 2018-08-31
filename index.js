const rp = require('request-promise-native');
const $ = require('jquery');

const albertinaAuslastung = {
  uri: 'http://localhost:3000/posts/albertina_auslastung',
  headers: {
    'User-Agent': 'Request-Promise',
  },
  json: true,
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
      let i = 0;
      let sum = 0;
      Object.keys(response.orte).forEach((key) => {
        i += 1;
        sum += response.orte[key];
        setColor(key, response.orte[key]);
      });
      setColor(response.name, Math.round(sum / i));
    })
    .catch((err) => {
      console.log(err);
    });
});
