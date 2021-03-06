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
import AppSongsAnimation from './AppSongsAnimation';
import Things2SayAnimation from './Things2SayAnimation';

$(function(){
  const videoPanelClient = new VideoAnimation();
  const boxPanelClient = new BoxAnimation();
  const helpPanelClient = new HelpAnimation();
  const heyPanelClient = new HeyAnimation();
  const BubbleAnimations = new BubbleAnimation();
  const ButtonColorAnimations = new ButtonColorAnimation();
  const AppSongsAnimations = new AppSongsAnimation();
  const Things2SayAnimations = new Things2SayAnimation();
  
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
    BubbleAnimations.scroller.resize();
    ButtonColorAnimations.scroller.resize();
    AppSongsAnimations.scroller.resize();
    Things2SayAnimations.scroller.resize();
  }

  function resizeButtonAnimations(){
    const { view, stage, renderer } = ButtonColorAnimations.pixiApp;
    // console.log($(view.parentNode).width(), $(view.parentNode).height(), view.width, view.scale);

    // let scaleFactor = Math.min( ($(view.parentNode).width() / stage.width), ( stage.width) / $(view.parentNode).width());

    // renderer.resize(view.parentNode.clientWidth, view.parentNode.clientHeight);

    // console.log($(view.parentNode).width(), $(view.parentNode).height(), view.width, view.height);
    // if(scaleFactor < 1) {
    //   stage.scale.x = stage.scale.y = scaleFactor ;
    // }


    const imageRatio = 789/532; //original image dimensions
    const [image1Sprite, image2Sprite, image3Sprite] = stage.children;
    image1Sprite.width = image2Sprite.width = image3Sprite.width = view.parentNode.clientWidth / 3;
    image1Sprite.height = image2Sprite.height = image3Sprite.height = image1Sprite.width * imageRatio;
    image1Sprite.x = 0;
    image2Sprite.x = image1Sprite.width;
    image3Sprite.x = image2Sprite.x * 2;
  }

  window.addEventListener("resize", debounce(resizeHandler, 100));

});
