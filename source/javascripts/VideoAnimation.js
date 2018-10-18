import scrollama from 'scrollama';

function VideoAnimation() {
  const videoElement = document.getElementsByTagName("video")[0];
  this.timeline = new TimelineMax({paused:true});
  this.scroller = scrollama();

  $(videoElement).one('play', () => {
    update(); //Start rendering
  });

  $(videoElement).on('ended', () => {
    const container = $('.video-sprite-sheet');
	  const canvases = container.find('canvas');
	  const height = container[0].scrollHeight;

	  const lastCanvas = canvases.last();
	  const canvasCount = canvases.length;
    let duration = 10;
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
        step: document.querySelectorAll('.video-sprite-sheet'),
        progress: true,
        threshold:1,
        offset: 0.2,
      })
	    .onStepEnter(event => {
        console.log(event);
        })
	    .onStepProgress(event => {
		    this.timeline.progress(event.progress);
      });

   $('video').hide();
  });
}

function update() {
  const video = document.getElementsByTagName("video")[0];
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
