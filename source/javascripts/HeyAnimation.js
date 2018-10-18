import scrollama from 'scrollama';

function HeyAnimation() {
  this.scroller = scrollama();
  this.timeline = new TimelineMax({paused: true});

  const outerCircle = new TimelineMax({yoyo:true, repeat: 7});
  outerCircle.to('.outer-circle', 0.3, {ease:Bounce.easeIn, strokeWidth: 35});

  const innerCircle = new TimelineMax({yoyo:true, repeat: 2});
  innerCircle.set('.inner-circle', {strokeWidth: 10});
  innerCircle.fromTo('.inner-circle', 0.3, {ease:Bounce.easeOut,strokeWidth: 10}, {ease:Bounce.easeOut,strokeWidth: 24});
  innerCircle.to('.inner-circle', 0.3, {ease:Bounce.easeOut,strokeWidth: 10}, "-=0.2");

  this.timeline.add(outerCircle);
  this.timeline.add(innerCircle, "-=1.6");

 this.scroller 
    .setup({
      step:[$('.omega-hey-container')[0]],
      debug:true,
      offset: 0.3
    })
    .onStepEnter(event=>{
      this.timeline.restart();
    })
    .onStepExit(event => {

      this.timeline.seek(0);
      this.timeline.pause();
    });
}

export default HeyAnimation;
