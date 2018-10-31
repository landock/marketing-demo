import scrollama from 'scrollama';
import * as PIXI from 'pixi.js';

export default function ButtonColorAnimation() {

  const image1 = new PIXI.Application({width: 321, height: 531});
  const image2 = new PIXI.Application({width: 321, height: 531});
  const image1Sprite = new PIXI.Sprite.fromImage("/images/index/buttons-crop.png");
  const image2Sprite = new PIXI.Sprite.fromImage("/images/index/buttons-crop.png");
  image1Sprite.scale.x = image2Sprite.scale.x = 0.55;
  image1Sprite.scale.y = image2Sprite.scale.y = 0.55;

  image1.stage.addChild(image1Sprite);
  image2.stage.addChild(image2Sprite);
  this.timeline = new TimelineMax({paused: true});
  this.timeline.to(image1Sprite, 1, {pixi: {hue: -60}, ease: Power2.easeInOut});
  this.timeline.to(image2Sprite, 1, {pixi: {hue: 250}, ease: Power2.easeInOut});


  $('.buttons-animation-container').prepend(`<div class="sprite1">`).find('.sprite1').append(image1.view);
  $('.buttons-animation-container').prepend(`<div class="sprite2">`).find('.sprite2').append(image2.view);
  
  this.timeline.play(0);

}
