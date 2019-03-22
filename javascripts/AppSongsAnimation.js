import scrollama from 'scrollama';

export default function AppSongsAnimation() {
this.scroller = scrollama();

  const videoElement = $('.app-songs-animation-container .video-container video')[0];
this.scroller.setup({
  step: '.app-songs-animation-container',
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
