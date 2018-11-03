import jQuery from 'jquery';
import debounce from 'lodash-es/debounce';
import { TimelineMax, CSSPlugin, AttrPlugin } from "gsap/all";
import 'intersection-observer';

const plugins = [ CSSPlugin, AttrPlugin ]; //without this, CSSPlugin & AttrPlugin may get dropped by your bundler

window.$ = jQuery;
window.jQuery = jQuery;
window.isMobile = false;


import VideoAnimation from './VideoAnimation';
import BoxAnimation from './BoxAnimation';
import HelpAnimation from './HelpAnimation';
import HeyAnimation from './HeyAnimation';
import BubbleAnimation from './BubbleAnimation';
import ButtonColorAnimation from './ButtonColorAnimation';


$(function(){
  const videoPanelClient = new VideoAnimation();
  const boxPanelClient = new BoxAnimation();
  const helpPanelClient = new HelpAnimation();
  const heyPanelClient = new HeyAnimation();
  const BubbleAnimations = new BubbleAnimation();
  const ButtonColorAnimations = new ButtonColorAnimation();
  
  window.isMobile = window.matchMedia("(max-width: 767.98px)").matches;

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
    resizeButtonAnimations();
    videoPanelClient.scroller.resize();
    boxPanelClient.scroller.resize();
    helpPanelClient.scroller.resize();
    heyPanelClient.scroller.resize();
  }

  function resizeButtonAnimations(){
    console.log($(ButtonColorAnimations.pixiApp.view.parentNode).width(), $(ButtonColorAnimations.pixiApp.view.parentNode).height());

    let scaleFactor = Math.min( ($(ButtonColorAnimations.pixiApp.view.parentNode).width() / ButtonColorAnimations.pixiApp.stage.width), ($(ButtonColorAnimations.pixiApp.view.parentNode).height() / ButtonColorAnimations.pixiApp.stage.height));

    ButtonColorAnimations.pixiApp.renderer.resize(ButtonColorAnimations.pixiApp.view.parentNode.clientWidth, ButtonColorAnimations.pixiApp.view.parentNode.clientHeight)

    if(scaleFactor < 1) {
      ButtonColorAnimations.pixiApp.stage.scale.x = ButtonColorAnimations.pixiApp.stage.scale.y = scaleFactor ;
    }
  }

  window.addEventListener("resize", debounce(resizeHandler, 100));

});
