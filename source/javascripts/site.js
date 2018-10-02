$(document).ready(function(){
  $('.ga-click-event').on('click', function() {
    var label = $(this).attr('ga-label');
    var category = $(this).attr('ga-category');

    gtag('event', 'click', {
      'event_category': category,
      'event_label': label,
      'value': 1
    });
  });
});
