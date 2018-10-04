$(document).ready(function(){
  const videoPanelClient = videoPanel();
  const boxPanelClient = boxPanel();
  const helpPanelClient = helpPanel();

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
    videoPanelClient.scroller.resize();
    boxPanelClient.scroller.resize();
    helpPanelClient.scroller.resize();
  }

  window.addEventListener("resize", _.debounce(resizeHandler, 200));

});


function boxPanel(){
  
  const boxPanelScroller = scrollama();
  const tl = new TimelineMax({useFrames:false, paused:true, smoothChildTiming:true });

	
  tl.fromTo('.omega',0.2, {display:'none'}, {display:'inline-block'})
  tl.fromTo('.whats-the' ,0.2, {display:'none'}, {display: 'inline-block'});
  //tl.call(addMarkup, [tl]);
  tl.to($('.text-fill'), 0.2, { textContent:faker.random.word()})
  tl.to($('.text-fill'), 0.2, {textContent: ''});
  tl.to('.last-item', 0.1, {display: 'inline-block'});

  boxPanelScroller.setup({
    step: '.omega-box-wrapper .text',
    offset: 0.2,
    debug:true
  })
    .onStepEnter(event => {
      tl.restart();
      })
    .onStepExit(event => {
      tl.restart().reverse();
    })
  ;
  return {
    scroller: boxPanelScroller,
    timeline: tl
  };
}
function helpPanel(){
  const helpPanelScroller = scrollama();
  const tl = new TimelineMax({useFrames:true, paused:true, smoothChildTiming:true });

  tl.from($('.last'), 2000, {ease: Power3.easeIn,opacity: 0, x: 100, scale:1.5});
  tl.from($('.first'), 2000, {ease: Power3.easeIn,opacity: 0, x: -100, scale:1.5}, '-=2000');

  helpPanelScroller
    .setup({
      step: [$('.help-animation-container')[0]],
      offset: 0.7,
      debug: true,
      progress: true,
      threshold: 1
    })
    .onStepProgress(event => {
      tl.pause();
      tl.progress(event.progress);
    });
  return {
    scroller: helpPanelScroller,
    timeline: tl
  }
}

function videoPanel(){

  var videoElement = document.getElementsByTagName("video")[0];
  const videoScroller = scrollama();
  let playPromise = null;
  videoScroller
    .setup({
      step:[$('.video-wrapper video')[0]],
      debug: true,
      offset: 0.2
    })
    .onStepEnter(event => {
      try{
        playPromise = videoElement.play();    
      } catch(error) {
        console.log(error);
      }
    })
    .onStepExit(event => {
      try{
        playPromise.then(video => {
          videoElement.pause();
          videoElement.currentTime = 0;    
        })
      } catch(error) {
        console.log(error);
      }
    });
  return {
    scroller: videoScroller,
    timeline:  new TimelineMax({useFrames:true, paused:true, smoothChildTiming:true })
  }
}
