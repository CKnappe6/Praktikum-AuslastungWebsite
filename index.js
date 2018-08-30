/* global $ */

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
});
