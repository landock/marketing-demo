import scrollama from 'scrollama';

export default function Things2SayAnimation() {
this.scroller = scrollama();

  const videoElement = $('.weather-video video')[0];
this.scroller.setup({
  step: '.buttons-things2say-wrapper',
  offset: 0.6,
})
  .onStepEnter(event => {
    console.log(event);
    videoElement.play()
  })
  .onStepExit(event => {
    console.log(event);
    videoElement.pause()
    videoElement.currentTime = 0;
  });
}
