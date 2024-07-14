console.log("hii");
import * as Matter from "matter-js";
import Phaser from "phaser";

const config = {
  type: Phaser.AUTO,
  width: 600,
  height: 700,
  physics: {
    default: "matter",
    matter: {
      gravity: { y: 0.3 },
      debug: false, // Set to true for debugging physics
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

const game = new Phaser.Game(config);
function preload() {
  // Preload assets here
  this.load.image("background", "Game Objects/background-day.png");
  this.load.image("ground", "Game Objects/base.png");
  this.load.image("pipe", "Game Objects/pipe-green.png");
  this.load.image("flappyupflap", "Game Objects/yellowbird-upflap.png");
  this.load.image("flappymidflap", "Game Objects/yellowbird-midflap.png");
  this.load.image("flappydownflap", "Game Objects/yellowbird-downflap.png");
  // this.load.image('menu', 'Flappy_Bird_assets by kosresetr55/UI/message.png')
  this.add.image(300, 300, "menu");
}

function create() {
  this.cameras.main.setBackgroundColor("#ffffff"); // Sets background color to white

  this.add.image(300, 300, "background").setScale(2.1);
  let pipes = [];
  let pipe1 = this.matter.add
    .image(-20, 700, "pipe")
    .setScale(1.5)
    .setStatic(true);
  let pipe2 = this.matter.add
    .image(-20, 50, "pipe")
    .setScale(1.5)
    .setStatic(true);
  let pipe3 = this.matter.add
    .image(1200, 500, "pipe")
    .setScale(1.5)
    .setStatic(true);
  let pipe4 = this.matter.add
    .image(1200, -150, "pipe")
    .setScale(1.5)
    .setStatic(true);
  pipe2.angle = 180;
  pipe4.angle = 180;
  this.matter.add.image(300, 740, "ground").setScale(1.8).setStatic(true);
  this.anims.create({
    key: "flap",
    frames: [
      { key: "flappyupflap" },
      { key: "flappymidflap" },
      { key: "flappydownflap" },
    ],
    frameRate: 10,
    repeat: -1,
  });
  var flappu = this.matter.add.sprite(300, 400, "flappyupflap").setScale(1.1);
  flappu.anims.play("flap", true);
  // flappu.setOnCollide(function() {
  //     destroy()
  //     flappu.setAngularVelocity(0);
  // });

  this.input.on(
    "pointerdown",
    function () {
      let birdY = flappu.y;
      let tween = this.tweens.add({
        targets: flappu,
        y: birdY - 70,
        duration: 500,
        ease: "Quad.easeOut",
        onUpdate: function (tween) {
          if (tween.progress > 0.1) {
            flappu.angle = -20;
          }
        },
        onComplete: function () {
          console.log("Transition to y -100 completed!");
          flappu.angle = 0;
        },
        onCompleteScope: this,
      });
    },
    this
  );
  if (flappu.coll) Matter.Collision.create(flappu, pipe2);
  let sprite1 = flappu;
  let sprite2 = pipe1;
  this.matter.world.on("collisionstart", function (event) {
    if (
      (event.pairs[0].bodyA === sprite1.body &&
        event.pairs[0].bodyB === sprite2.body) ||
      (event.pairs[0].bodyA === sprite2.body &&
        event.pairs[0].bodyB === sprite1.body)
    ) {
      console.log("Collision detected between sprite1 and sprite2");
    }
  });
  let i = 1;
  function getRandomInt() {
    let a = Math.floor(Math.random() * (9 - 5) + 5) + "00";
    return a;
  }

  pipe1.x = 800;
  pipe2.x = 800;
  let pipx1 = -40;
  let durationBatch1 = 8000;

  let tween1 = this.tweens.add({
    targets: pipe1,
    x: pipx1,
    duration: durationBatch1,
    ease: "Linear",
    repeat: -1,
    ab: function () {
      // console.log("hhii");
      pipe1.y = getRandomInt();
    }
    ,
    onCompleteScope: this,
  });

  let tween2 = this.tweens.add({
    targets: pipe2,
    x: pipx1,
    duration: durationBatch1,
    ease: "Linear",
    repeat: -1,
    ab: function () {
      // console.log("hhii");
      pipe2.y = pipe1.y - 650;
    },
    onCompleteScope: this,
  });

  pipe3.x = 1800;
  pipe4.x = 1800;
  let pipx2 =-2000;
  let durationBatch2 = 30000;
  let tween3 = this.tweens.add({
    targets: pipe3,
    x: pipx2,
    duration: durationBatch2,
    ease: "Linear",
    repeat: -1,
    ab: function () {
      // console.log("hhii");
      pipe3.y = getRandomInt();
    },
    onCompleteScope: this,
  });

  let tween4 = this.tweens.add({
    targets: pipe4,
    x: pipx2,
    duration: durationBatch2,
    ease: "Linear",
    repeat: -1,
    ab: function () {
      // console.log("hhii");
      pipe4.y = pipe3.y - 650;
    },
    onCompleteScope: this,
  });
}

function update() {
  // flappu.setVelocity(
}
