import jQuery from 'jquery';
import debounce from 'lodash-es/debounce';
import { TimelineMax, CSSPlugin, AttrPlugin } from "gsap/all";
import 'intersection-observer';

const plugins = [ CSSPlugin, AttrPlugin ]; //without this, CSSPlugin & AttrPlugin may get dropped by your bundler

window.$ = jQuery;
window.jQuery = jQuery;


import VideoAnimation from './VideoAnimation';
import BoxAnimation from './BoxAnimation';
import HelpAnimation from './HelpAnimation';
import HeyAnimation from './HeyAnimation';
import UspsAnimation from './UspsAnimation';


$(function(){
  const videoPanelClient = new VideoAnimation();
  // const boxPanelClient = new BoxAnimation();
  const helpPanelClient = new HelpAnimation();
  const heyPanelClient = new HeyAnimation();
  const UspsPanelClient = new UspsAnimation();

  $('.ga-click-event').on('click', function() {
    var label = $(this).attr('ga-label');
    var category = $(this).attr('ga-category');

    gtag('event', 'click', {
      'event_category': category,
      'event_label': label,
      'value': 1
    });
  });

  function resizeHandler() {
    videoPanelClient.scroller.resize();
    // boxPanelClient.scroller.resize();
    helpPanelClient.scroller.resize();
    heyPanelClient.scroller.resize();
  }

  window.addEventListener("resize", debounce(resizeHandler, 200));

});
