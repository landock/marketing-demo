import scrollama from 'scrollama';

function handleStepEnter(response) {
  const bubbles = $(response.element).find('.omega-bubble');

  if (bubbles.length && bubbles.length === 1) {
    bubbles.addClass('fadeInUp animated');
  } else {
    setTimeout(function(){
      $(bubbles[0]).addClass('fadeInUp animated');
    }, 500);
    setTimeout(function(){
      $(bubbles[1]).addClass('fadeInUp animated');
    }, 1000);
    setTimeout(function(){
      $(bubbles[2]).addClass('fadeInUp animated');
    }, 1500);
  }
}

function handleStepExit(response) {
  $(response.element).find('.omega-bubble').addClass('fadeOutDown');

  setTimeout(function() {
    $(response.element).find('.omega-bubble').removeClass('fadeOutDown fadeInUp animated');
  }, 500);
}

function BubbleAnimation() {
  this.scroller = scrollama();

 this.scroller
    .setup({
      step:'.omega-bubble-wrapper'
    })
    .onStepEnter(handleStepEnter)
    .onStepExit(handleStepExit);
}

export default BubbleAnimation;
