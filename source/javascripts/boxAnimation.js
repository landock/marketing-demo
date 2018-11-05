import faker from 'faker';
import scrollama from 'scrollama';

function BoxAnimation() {
  this.timeline = new TimelineMax({paused: true, onStart: emptyText});
  // this.timeline.staggerFromTo('.text-animation h1 span',0.2, {display:'none'}, {display:'inline-block'}, 0.3);
  this.timeline.fromTo('.whats-the-text',0.1, {visibility: 'hidden'}, {visibility: 'visible'});
  this.timeline.call(changeText, [], BoxAnimation.timeline, "+=0.2");
  this.timeline.call(() => {$('.text-fill').text('Where\'s the closet sandwich place')}, [], this, "+=0.2");
  this.timeline.call(() => {$('.text-fill').text('What\'s the best Sushi in LA?')}, [], this, "+=0.2");
  this.timeline.call(() => {$('.text-fill').text('Where\'s the best vegan flatbread?')}, [], this, "+=0.2");
  this.timeline.call(() => {$('.text-fill').text('Play Beastie Boys')}, [], this, "+=0.2");
  this.timeline.call(() => {$('.text-fill').text('What\'s the best Gastropub?')}, [], this, "+=0.2");
  this.timeline.call(() => {$('.text-fill').text('What movies are playing in Culver City?')}, [], this, "+=0.2");

  this.scroller = scrollama();
  this.scroller
    .setup({
      step: '.omega-hey-container',
    })
    .onStepEnter(event => {
      TweenMax.set('.text-animation', {visibility: 'visible'});
      this.timeline.play(0);
    })
    .onStepExit(event => {
      TweenMax.set('.whats-the-text', {visibility: 'visible'});
      TweenMax.set('.text-animation', {visibility: 'visible'});
      this.timeline.seek(0);
    });
}

function changeText() {
  const fakeWord = faker.random.word();
  $('.text-fill').text(fakeWord);
}

function emptyText() {
  console.log('emptyText');
  $('.text-fill').text('');
  hideText();
}

function hideText(){
  $('.whats-the-text').css('visibility')
}


export default BoxAnimation;
