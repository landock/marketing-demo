import scrollama from 'scrollama';

function handleStepEnter(response) {
  $('.omega-help-title').addClass('animated fadeInUp');

  setTimeout(function(){
    $('.omega-help-subtitle').addClass('animated fadeInUp');
  }, 750);
}

function HelpAnimation() {
  this.timeline = new TimelineMax({paused: true})
    .from('.last', 2000, {ease: Power3.easeIn,opacity: 0, x: 100, scale:1.5})
    .from('.first', 2000, {ease: Power3.easeIn,opacity: 0, x: -100, scale:1.5}, '-=2000');

  this.scroller = scrollama();
  this.scroller.setup({
    step: '.help-animation-container',
    offset: 0.95,
    progress: true,
    threshold: 1
  })
  .onStepProgress(event => {
    this.timeline.pause();
    this.timeline.progress(event.progress);
  });

  this.scroller.setup({
     step: '.omega-help--title-subtitle',
     offset: 1,
   })
   .onStepEnter(handleStepEnter);
}

export default  HelpAnimation;
