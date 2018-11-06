import scrollama from 'scrollama';

function handleStepEnter(response) {
  const bubbles = $('.omega-hey--text');

  setTimeout(function(){
    $(bubbles[0]).addClass('fadeInUp animated').removeClass('opacity-0');
  }, 250);
  setTimeout(function(){
    $(bubbles[2]).addClass('fadeInUp animated').removeClass('opacity-0');
  }, 500);
  setTimeout(function(){
    $(bubbles[1]).addClass('fadeInUp animated').removeClass('opacity-0');
  }, 1000);
  setTimeout(function(){
    $(bubbles[3]).addClass('fadeInUp animated').removeClass('opacity-0');
  }, 1500);
}

function HeyAnimation() {
  this.scroller = scrollama();
  this.timeline = new TimelineMax({paused: true});

  const outerCircle = new TimelineMax({yoyo:true, repeat: 7});
  outerCircle.to('.outer-circle', 0.3, {ease:Bounce.easeIn, strokeWidth: 35});

  const innerCircle = new TimelineMax({yoyo:true, repeat: 2});
  innerCircle.set('.inner-circle', {strokeWidth: 10});
  innerCircle.fromTo('.inner-circle', 0.3, {ease:Bounce.easeOut,strokeWidth: 10}, {ease:Bounce.easeOut,strokeWidth: 24});
  innerCircle.to('.inner-circle', 0.3, {ease:Bounce.easeOut,strokeWidth: 10}, "-=0.2");

  this.timeline.add(outerCircle).add(innerCircle, "-=1.6");

 this.scroller
  .setup({
    step:'.omega-hey-container',
    offset: 0.3
  })
  .onStepEnter(event=>{
    this.timeline.play(0);
    handleStepEnter();
  })
  .onStepExit(event => {

    this.timeline.pause();
  });

}

export default HeyAnimation;
