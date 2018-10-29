import scrollama from 'scrollama';

function handleStepEnter(response) {
  console.log('enter', response);
  // animated fadeInUp
  $(response.element).find('.omega-bubble').addClass('fadeInUp animated');
}

function handleStepExit(response) {
  console.log('exit', response);
  $(response.element).find('.omega-bubble').addClass('fadeOutDown');

  setTimeout(function() {
    $(response.element).find('.omega-bubble').removeClass('fadeOutDown fadeInUp animated');
  }, 500);
}

function UspsAnimation() {
  this.scroller = scrollama();

 this.scroller
    .setup({
      step:'.omega-usps-wrapper'
    })
    .onStepEnter(handleStepEnter)
    .onStepExit(handleStepExit);
}

export default UspsAnimation;
