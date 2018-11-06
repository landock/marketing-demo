import scrollama from 'scrollama';
import * as PIXI from 'pixi.js';

export default function ButtonColorAnimation() {

  const pixiConfig = {
    transparent:true,
    antialias:true,
    autoResize: true,
    resolution: devicePixelRatio
  };

  const image1 = new PIXI.Application(pixiConfig);
  this.pixiApp = image1;
  const image1Sprite = new PIXI.Sprite.fromImage("/images/index/button-single.png");
  const image2Sprite = new PIXI.Sprite.fromImage("/images/index/button-single.png");
  const image3Sprite = new PIXI.Sprite.fromImage("/images/index/button-single.png");

  image1.renderer.plugins.interaction.autoPreventDefault = false;
  image1.view.style['touch-action'] = 'auto';

  image1Sprite.interactive = image1Sprite.buttonMode = true;
  image2Sprite.interactive = image2Sprite.buttonMode = true;
  image3Sprite.interactive = image3Sprite.buttonMode = true;

  image1Sprite.width = image2Sprite.width = image3Sprite.width = 321;
  image1Sprite.height = image2Sprite.height = image3Sprite.height = 476;

  image1Sprite.y = image2Sprite.y = image3Sprite.y = -1 ;

  image1Sprite.x = -1;
  image2Sprite.x = 319;
  image3Sprite.x = 639;

  image1.stage.addChild(image1Sprite);
  image1.stage.addChild(image2Sprite);
  image1.stage.addChild(image3Sprite);

  const filterConfig = {pixi: {saturation: 0, contrast:1}};

  this.timeline = new TimelineMax({paused: true});
  this.timeline.set(image1Sprite, filterConfig );
  this.timeline.set(image2Sprite, filterConfig);
  this.timeline.set(image3Sprite, filterConfig);

  this.timeline.to(image1Sprite, 0.15, { pixi: {hue: -60}}, "+=0.5")
    .to(image1Sprite, 0.15,  { pixi: {hue: -30}});

  this.timeline.to(image2Sprite, 0.15,  { pixi: {hue: -120}})
    .to(image3Sprite, 0.15, { pixi: {hue: 140}});

  this.timeline.to(image3Sprite, 0.15,  { pixi: {hue: 170}})
    .to(image3Sprite, 0.15, { pixi: {hue: 60}});



  $('.buttons-animation-container').append(image1.view);

  image1.renderer.resize(image1.view.parentNode.clientWidth, image1.view.parentNode.clientHeight);

  const scaleFactor = Math.min($(image1.view).width() /image1.stage.width, $(image1.view).height() / image1.stage.height);

  image1.stage.scale.x = scaleFactor;
  image1.stage.scale.y = scaleFactor;

  this.scroller = scrollama();

  this.scroller.setup({
    step: '.buttons-container',
  })
  .onStepEnter(event => {
    console.log(event);
    $('.buttons-animation-container').css('filter', 'saturate(90%)');
    this.timeline.play(0);
  })
  .onStepExit(event => {
    console.log(event);
    $('.buttons-animation-container').css('filter', 'saturate(0)');
    this.timeline.pause();
  });

}
