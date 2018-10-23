import scrollama from 'scrollama';

function VideoAnimation() {
  const videoElement = document.getElementById("box-rotate");
  this.timeline = new TimelineMax({paused:true, useFrames: true,});
  this.scroller = scrollama();

  $('#base-ring-glow').one('canplay', () => {
    videoElement.play();
    update(); 
  });

  $(videoElement).one('ended', (event) => {
    console.log(event);
    const container = $('.video-sprite-sheet');
	  const height = container[0].scrollHeight;
	  const canvases = container.find('canvas');
	  const lastCanvas = canvases.last();
	  const canvasCount = canvases.length;
    const loadingVideoElement = $('#base-ring-glow');
    const mainVideoElement = $('#box-rotate');
    const duration = 10;
    const hidden = { position: 'absolute', visibility: 'hidden' };
    const visible = { position: 'static', visibility: 'visible' };

    this.timeline
      .set(lastCanvas, hidden)
      .staggerTo(canvases, 0, visible, duration, 0)
    // hide all the elements except lastimage - it will be hidden on repeat if needed at the same time as first is shown
      .staggerTo(canvases.not(lastCanvas), 0, $.extend(hidden, { immediateRender: false }), duration, duration)
    // add an 'empty' set after lastimage is made visible - this adds padding at the end of the timeline so lastimage is displayed for the correct duration before the repeat
      .set({}, {}, "+="+duration);
	  
	  this.scroller
      .setup({
        step: '.omega-box-container + .box-copy',
        progress: true,
        threshold:1,
        offset: 0.6,
      })
	    .onStepEnter(event => {
        console.log('stepEnter', event);
        loadingVideoElement[0].pause();
        loadingVideoElement.hide();
        $('.omega-box-container').css('position','sticky').css('top', '0px');
        container.show();
      })
	    .onStepExit(event => {
        console.log('stepExit', event);

        $('.omega-box-container').removeAttr('style');
        if(event.direction === 'up') {
          loadingVideoElement[0].play();
          loadingVideoElement.show();
          container.hide();
        }
      })
	    .onStepProgress(event => {
        console.log(event.progress)
		    this.timeline.progress(event.progress);
      });

    mainVideoElement.hide();
  });
}

function update() {
  const video = document.getElementById("box-rotate");

  if(video.currentTime === video.duration) return;

  const newCanvas = document.createElement('canvas');
  const element = $('.video-sprite-sheet');
  const newCtx = newCanvas.getContext('2d');
  newCanvas.width = video.videoWidth;
  newCanvas.height= video.videoHeight;
  newCtx.imageSmoothingEnabled = true;
  newCtx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);   

  element.append(newCanvas);

  requestAnimationFrame(update); 
}

export default VideoAnimation;
