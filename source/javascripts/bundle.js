(function () {
  'use strict';

  $(document).ready(function () {
    var videoPanelClient = videoPanel();
    // const boxPanelClient = boxPanel();
    var helpPanelClient = helpPanel();
    var heyPanelClient = heyPanel();

    $('.ga-click-event').on('click', function () {
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

    window.addEventListener("resize", _.debounce(resizeHandler, 200));
  });

  function helpPanel() {
    var helpPanelScroller = scrollama();
    var tl = new TimelineMax({ useFrames: true, paused: true, smoothChildTiming: true });

    tl.from($('.last'), 2000, { ease: Power3.easeIn, opacity: 0, x: 100, scale: 1.5 });
    tl.from($('.first'), 2000, { ease: Power3.easeIn, opacity: 0, x: -100, scale: 1.5 }, '-=2000');

    helpPanelScroller.setup({
      step: [$('.help-animation-container')[0]],
      offset: 0.95,
      debug: true,
      progress: true,
      threshold: 1
    }).onStepProgress(function (event) {
      tl.pause();
      tl.progress(event.progress);
    });
    return {
      scroller: helpPanelScroller,
      timeline: tl
    };
  }

  function heyPanel() {

    var heyScroller = scrollama();
    var outerCircle = new TimelineMax({ yoyo: true, repeat: 7 });
    outerCircle.to('.outer-circle', 0.3, { ease: Bounce.easeIn, strokeWidth: 35 });
    var innerCircle = new TimelineMax({ yoyo: true, repeat: 2 });
    innerCircle.set('.inner-circle', { strokeWidth: 10 });
    innerCircle.fromTo('.inner-circle', 0.3, { ease: Bounce.easeOut, strokeWidth: 10 }, { ease: Bounce.easeOut, strokeWidth: 24 });
    innerCircle.to('.inner-circle', 0.3, { ease: Bounce.easeOut, strokeWidth: 10 }, "-=0.2");
    var mainAnimation = new TimelineMax({ paused: true });
    mainAnimation.add(outerCircle);
    mainAnimation.add(innerCircle, "-=1.6");

    heyScroller.setup({
      step: [$('.omega-hey-container')[0]],
      debug: true,
      offset: 0.2
    }).onStepEnter(function (event) {
      mainAnimation.restart();
    }).onStepExit(function (event) {

      mainAnimation.seek(0);
      mainAnimation.pause();
    });

    return {
      scroller: heyScroller,
      timeline: mainAnimation
    };
  }

  function update() {
    var video = document.getElementsByTagName("video")[0];
    if (video.currentTime === video.duration) return;
    var newCanvas = document.createElement('canvas');
    var element = $('.video-sprite-sheet');
    var newCtx = newCanvas.getContext('2d');
    console.log(video.videoWidth);
    newCanvas.width = video.videoWidth;
    newCanvas.height = video.videoHeight;
    newCtx.imageSmoothingEnabled = true;
    newCtx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

    element.append(newCanvas);

    requestAnimationFrame(update); // wait for t
  }

  function videoPanel() {

    var scroller = scrollama();
    var M2 = new TimelineMax({ useFrames: true, paused: true });
    var videoElement = document.getElementsByTagName("video")[0];

    $(videoElement).one('play', function () {
      update(); //Start rendering
    });

    $(videoElement).one('ended', function () {

      var container = $('.video-sprite-sheet');
      var canvases = container.find('canvas');
      var height = container[0].scrollHeight;

      var lastCanvas = canvases.last();
      var canvasCount = canvases.length;
      var duration = 10;
      console.log(lastCanvas, canvasCount);
      var hidden = { position: 'absolute', visibility: 'hidden' };
      var visible = { position: 'static', visibility: 'visible' };
      M2.set(lastCanvas, hidden).staggerTo(canvases, 0, visible, duration, 0)
      // hide all the elements except lastimage - it will be hidden on repeat if needed at the same time as first is shown
      .staggerTo(canvases.not(lastCanvas), 0, $.extend(hidden, { immediateRender: false }), duration, duration)
      // add an 'empty' set after lastimage is made visible - this adds padding at the end of the timeline so lastimage is displayed for the correct duration before the repeat
      .set({}, {}, "+=" + duration);

      scroller.setup({
        step: '.video-sprite-sheet',
        progress: true,
        threshold: 10,
        offset: 0.3,
        debug: true
      }).onStepEnter(function (event) {
        // M2.play();
      }).onStepProgress(function (event) {
        M2.progress(event.progress);
      });
      $(this).hide();
    });

    return {
      scroller: scroller,
      timeline: M2
    };
  }

}());
//# sourceMappingURL=bundle.js.map
