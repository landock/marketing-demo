export default class BoxAnimation {
  constructor(){
    this.scroller= scrollama();
    this.scroller.setup({
      step: '.omega-box-wrapper .text',
      offset: 0.2
    })
      .onStepEnter(event => {
        this.tl.restart();
      })
      .onStepExit(event => {
        this.tl.pause();
      });

    this.tl = new TimelineMax({onStart: this.emptyText, paused: true});
    this.tl.fromTo('.omega',0.2, {display:'none'}, {display:'inline-block'})
    this.tl.fromTo('.whats-the' ,0.2, {display:'none'}, {display: 'inline-block'});
    this.tl.call(this.changeText, [], this, "+=0.2");
    this.tl.call(function(){$('.text-fill').text('weather?')}, [], this, "+=0.2");
    this.tl.to('.last-item', 0.1, {x: -5, display: 'inline-block'}, "+=0.1");
    
  }
  
   changeText() {
	  $('.text-fill').text(faker.random.word());
  }

   emptyText() {
	  $('.text-fill').text('');
  }
}
