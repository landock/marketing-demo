import faker from 'faker';
import scrollama from 'scrollama';

function BoxAnimation() {
  this.timeline = new TimelineMax({paused: true, onStart: emptyText});
  const phraseArray = [
    'What\'s the best Sushi in LA?',
    'Play Beastie Boys',
    'What movies are playing near me?',
    'Where\'s the best vegan flatbread?',
    'Where\'s the best Gastropub?',
   ' Where\'s the closet sandwich place',
  ];
  // this.timeline.staggerFromTo('.text-animation h1 span',0.2, {display:'none'}, {display:'inline-block'}, 0.3);
  // this.timeline.fromTo('.whats-the-text',0.1, {visibility: 'hidden'}, {visibility: 'visible'});
  this.timeline.call(changeText, [], BoxAnimation.timeline, "+=0.2");
  this.timeline.call(() => {
    $('.text-fill').text( faker.random.arrayElement(phraseArray) )
  }, [], this, "+=0.2");

  this.scroller = scrollama();
  this.scroller
    .setup({
      step: '.omega-hey-container',
    })
    .onStepEnter(event => {
      this.timeline.play(0);
    })
    .onStepExit(event => {
      this.timeline.seek(0);
    });
}

function changeText() {

  const fiveWs = [
    'Why is',
    'Why are',
    'Why does',
    'Who\'s' ,
    'Who is',
    'Who are',
    'What is',
    'What does',
    'What\'s a',
    'What\'s that',
    'When is',
    'When are',
    'Where is',
    'Where does',
  ]
  const fakeWord = faker.random.arrayElement(fiveWs);
  $('.text-fill').text(fakeWord);
}

function emptyText() {
  $('.text-fill').html("&nbsp;");
  // hideText();
}

function hideText(){
  $('.whats-the-text').css('visibility')
}


export default BoxAnimation;
