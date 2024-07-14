import Phaser from "phaser";
import Matter from "matter-js";


let score = 0;
class GameScene extends Phaser.Scene{
constructor(){
super({key: 'GameScene'})
}
preload() { // THE ASSETS
this.load.image("background", "Game Objects/background-day.png");
this.load.image("ground", "Game Objects/base.png");
this.load.image("pipe", "Game Objects/pipe-green.png");
this.load.image("flappyupflap", "Game Objects/yellowbird-upflap.png");
this.load.image("flappymidflap", "Game Objects/yellowbird-midflap.png");
this.load.image("flappydownflap", "Game Objects/yellowbird-downflap.png");
this.load.image("ui", 'message.png');
this.load.image('0', 'Numbers/0.png')
this.load.image('1', 'Numbers/1.png')
this.load.image('2', 'Numbers/2.png')
this.load.image('3', 'Numbers/3.png')
this.load.image('4', 'Numbers/4.png')
this.load.image('5', 'Numbers/5.png')
this.load.image('6', 'Numbers/6.png')
this.load.image('7', 'Numbers/7.png')
this.load.image('8', 'Numbers/8.png')
this.load.image('9', 'Numbers/9.png')
this.load.image('gameover', 'gameover.png')
this.load.image('line', 'line.png')
// AUDIO FILES BELOW ----
this.load.audio('hit', 'hit.ogg')
this.load.audio('die', 'die.ogg')
this.load.audio('point', 'point.ogg')
this.load.audio('wing', 'wing.ogg')

}

create() {
this.add.image(300, 300, "background").setScale(2.1); // THE BACKGROUND IMAGE
this.anims.create({ // THE ANIMATION OF THE BIRD FLAPPIPNG
  key: "flap",
  frames: [
    { key: "flappyupflap" },
    { key: "flappymidflap" },
    { key: "flappydownflap" },
  ],
  frameRate: 10,
  repeat: -1,
});
let ui = this.add.image(300, 300, "ui").setScale(2).setVisible(true); // THE SCREEN WHEN YOU START THE GAME

let flappu = this.matter.add.sprite(300, 400, "flappyupflap").setScale(1.6); // THE BIRD
flappu.anims.play("flap", true); // ADDING THE ANIMATION TO THE BIRD

let falpupdown = this.tweens.add({ // THE UP AND DOWN OF THE BIRD WHEN ON THE FIRST SCREEN
  targets: flappu,
  y: 295,
  duration: 1000,
  ease: "Quad.easeInOut",
  yoyo: true,
  repeat: -1,
  onCompleteScope: this,
});

let pipe1 = this.matter.add.image(-20, 700, "pipe").setScale(1.5).setStatic(true); // THE BELOW PIPE
let pipe2 = this.matter.add.image(-20, 50, "pipe").setScale(1.5).setStatic(true); // THE UPPER PIPE
const graphics = this.add.graphics();
graphics.fillStyle(0xff0000, 1.0);
graphics.fillRect(0, 0, 0, 1000);
graphics.generateTexture('redRectangle', 10, 1000);
graphics.destroy();
let rectangle = this.matter.add.image(450, 300, 'redRectangle', null, { isSensor: true ,isStatic: true});
pipe2.angle = 180; // THE UPPER IS ROTATED 180 DEG

var randomNum; // THE RANDOM NUM
function getRandomInt() { // FUNCTION TO GET THIS RANDOM NUMBER
let randomNum = Math.floor(Math.random() * (9 - 5) + 5) + "00";
return randomNum;
}

pipe1.x = 800; // THE X-AXIS OF THE PIPE1
rectangle.x = 850; // THE X-AXIS OF THE PIPE1
pipe2.x = 800; // THE X-AXIS OF THE PIPE2
  let pipx1 = -40;    // X-AXIS OF THE PIPE
  let durationBatch1 = 4000;     // DURATION OF THE ANIMATION

  let tween1 = this.tweens.add({     // THE ANIMATION FOR THE PIPE1 COMING CLOSER TO THE BIRD
    targets: pipe1,
    x: pipx1,
    duration: durationBatch1,
    ease: "Linear",
    repeat: -1,
    ab: function () {
      randomNum = getRandomInt();
      pipe1.y = randomNum
    }
    ,
    onCompleteScope: this,
  });

  let tween2 = this.tweens.add({         // THE ANIMATION OF THE PIPE2 COMING CLOSER TO THE BIRD
    targets: pipe2,
    x: pipx1,
    duration: durationBatch1,
    ease: "Linear",
    repeat: -1,
    ab: function () {
      pipe2.y = pipe1.y - 650;
    },
    onCompleteScope: this,
  });

  let tween3 = this.tweens.add({         // THE ANIMATION OF THE PIPE2 COMING CLOSER TO THE BIRD
    targets: rectangle,
    x: pipx1,
    duration: durationBatch1,
    ease: "Linear",
    repeat: -1,
    onCompleteScope: this,
  });



  let digit, digit1, digit2;

  this.input.on("pointerdown", function () {   // CLICK EVENT LISTENER TO START THE GAME
    let audio = this.sound.add('wing');   // THE FLAP SOUND
    audio.play();
    let scorestr = score.toString();

    if (digit1) digit1.destroy();
    if (digit2) digit2.destroy();
    if (digit) digit.destroy();

    if (scorestr.length > 1) {
      digit1 = this.add.image(300, 100, scorestr[0]);
      digit2 = this.add.image(320, 100, scorestr[1]);
    } else {
      digit = this.add.image(300, 100, scorestr[0]);
    }

    falpupdown.pause()    // TO STOP THE BIRD FROM GOING UP AND DOWN AND TO START THE GAME
    ui.setVisible(false)  // MAKE THE UI INVISIBLE
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

tween1.pause()      // PAUSED THE ANIMATION OF THE PIPE1
tween2.pause()      // PAUSED THE ANIMATION OF THE PIPE2
tween3.pause()      // PAUSED THE ANIMATION OF THE PIPE2
this.input.on("pointerdown", function(){
  tween1.resume()   // RESUMING THE PIPE ANIMATION AFTER THE USER CLICKS TO PLAY THE GAME
  tween2.resume() // RESUMING THE PIPE ANIMATION AFTER THE USER CLICKS TO PLAY THE GAME
  tween3.resume() // RESUMING THE PIPE ANIMATION AFTER THE USER CLICKS TO PLAY THE GAME


})

// Create the first ground tile
let ground = this.matter.add.image(0, 750, "ground").setScale(2.1).setStatic(true);

// Create the second ground tile
let ground2 = this.matter.add.image(600, 750, "ground").setScale(2.1).setStatic(true);

// Create the third ground tile (at the end of the sequence)
let ground3 = this.matter.add.image(1200, 750, "ground").setScale(2.1).setStatic(true);

// Define the duration for the ground animation
let durationBatch2 = 5000; // Duration for the animation

// Animate the first ground tile
let tween4 = this.tweens.add({
  targets: ground,
  x: -600,
  duration: durationBatch2,
  ease: "Linear",
  repeat: -1,
  onRepeat: function () {
    ground.x = 5; // Reset position when animation repeats
  },
  onCompleteScope: this,
});

// Animate the second ground tile
let tween5 = this.tweens.add({
  targets: ground2,
  x: 5,
  duration: durationBatch2,
  ease: "Linear",
  repeat: -1,
  onRepeat: function () {
    ground2.x = 605; // Reset position when animation repeats
  },
  onCompleteScope: this,
});

// Animate the third ground tile
let tween6 = this.tweens.add({
  targets: ground3,
  x: 600,
  duration: durationBatch2,
  ease: "Linear",
  repeat: -1,
  onRepeat: function () {
    ground3.x = 1200; // Reset position when animation repeats
  },
  onCompleteScope: this,
});



this.matter.world.on('collisionstart', (event) => { // COLLISION DETECTION
const pairs = event.pairs;
pairs.forEach(pair => {
const bodyA = pair.bodyA;
const bodyB = pair.bodyB;

if ((bodyA.gameObject === flappu && (bodyB.gameObject === pipe1 || bodyB.gameObject === pipe2)) ||
((bodyA.gameObject === pipe1 || bodyA.gameObject === pipe2) && bodyB.gameObject === flappu)) {
  let audio = this.sound.add('hit');
  audio.play();
  this.add.image(300, 200, 'gameover').setScale(2)   // THE GAMEOVER MESSAGE
  this.scene.start('GameOver')
}
else if ((bodyA.gameObject === flappu && (bodyB.gameObject === ground || bodyB.gameObject === ground2 || bodyB.gameObject === ground3)) ||
(bodyA.gameObject === ground && (bodyB.gameObject === ground || bodyB.gameObject === ground2 || bodyB.gameObject === ground3))) {
  let audio = this.sound.add('die');
  audio.play
  this.add.image(300, 200, 'gameover').setScale(2)   // THE GAMEOVER MESSAGE
  audio.play();
  this.scene.start('GameOver')
}

else{
  score++
}
});
});

}
update() {

}
}

class GameOver extends Phaser.Scene {
  constructor(){
    super('GameOver')
  }
  create(){
    this.world.pause()
  }
}
const config = {
  type: Phaser.AUTO,
width: 600,
height: 700,
scene: [GameScene, GameOver],
physics: {
default: "matter",
matter: {
gravity: { y: 0.3 },
debug: false,
},
},
};
const game = new Phaser.Game(config);