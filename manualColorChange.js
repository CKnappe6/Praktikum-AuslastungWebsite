const $ = require('jquery');

$(() => {
  $('.ampel').click((event) => {
    let color = 'gruen';

    if ($(event.target).attr('src') === 'images/ampeln/ampel_gruen.jpg') {
      color = 'gelb';
    } else if ($(event.target).attr('src') === 'images/ampeln/ampel_gelb.jpg') {
      color = 'rot';
    }

    $(event.target).attr('src', `images/ampeln/ampel_${color}.jpg`);
    event.stopPropagation();
  });
});
