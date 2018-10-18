import faker from 'faker';
import scrollama from 'scrollama';

function BoxAnimation() {

  this.timeline = new TimelineMax({paused: true, onStart: emptyText});
  this.timeline.fromTo('.omega',0.2, {display:'none'}, {display:'inline-block'});
  this.timeline.fromTo('.whats-the' ,0.2, {display:'none'}, {display: 'inline-block'});
  this.timeline.call(changeText, [], BoxAnimation.timeline, "+=0.2");
  this.timeline.call(() => {$('.text-fill').text('weather?')}, [], this, "+=0.2");
  this.timeline.to('.last-item', 0.1, {x: -5, display: 'inline-block'}, "+=0.1");

  this.scroller = scrollama();
  this.scroller
    .setup({
      step: '.omega-box-wrapper .text',
      debug:true,
      offset: 0.1
    })
    .onStepEnter(event => {
      this.timeline.play(0);
    })
    .onStepExit(event => {
      this.timeline.pause();
    });
}

function changeText() {
  const fakeWord = faker.random.word();
  console.log('changeText: ', fakeWord);
  jQuery('.text-fill').text(fakeWord);
}

function emptyText() {
  console.log('emptyText');
  $('.text-fill').text('');
}


export default BoxAnimation;
