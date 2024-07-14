// console.log('hii')     
// import * as Matter from "matter-js";
// import Phaser from "phaser";

// const config = {
//     type: Phaser.AUTO,
//     width: 600,
//     height: 700,
//     physics: {
//         default: 'matter',
//         matter: {
//             gravity: { y: 0.3 },
//             debug: false // Set to true for debugging physics
//         }
//     },
//     scene: {
//         preload: preload,
//         create: create,
//         update: update
//         }
//         };
        
// const game = new Phaser.Game(config);
// function preload() {

//             // Preload assets here    
//         this.load.image('background', 'assets/Flappy_Bird_assets by kosresetr55/Game Objects/background-day.png')
//         this.load.image('ground', 'assets/Flappy_Bird_assets by kosresetr55/Game Objects/base.png')
//         this.load.image('pipe', 'assets/Flappy_Bird_assets by kosresetr55/Game Objects/pipe-green.png')
//         this.load.image('flappyupflap', 'assets/Flappy_Bird_assets by kosresetr55/Game Objects/yellowbird-upflap.png')
//         this.load.image('flappymidflap', 'assets/Flappy_Bird_assets by kosresetr55/Game Objects/yellowbird-midflap.png')
//         this.load.image('flappydownflap', 'assets/Flappy_Bird_assets by kosresetr55/Game Objects/yellowbird-downflap.png')
//         this.load.image('menu', 'assets/Flappy_Bird_assets by kosresetr55/UI/message.png')
//         this.add.image(300, 300, 'menu')
        
//         }
        
// function create() {
//     this.cameras.main.setBackgroundColor('#ffffff'); // Sets background color to white

//     this.add.image(300, 300,'background').setScale(2.1)
//     let pipes = []
//     let pipe1 = this.matter.add.image(-20, 700, 'pipe').setScale(1.5).setStatic(true)
//     let pipe2 = this.matter.add.image(-20, 50, 'pipe').setScale(1.5).setStatic(true)
//     let pipe3 = this.matter.add.image(1200, 500, 'pipe').setScale(1.5).setStatic(true)
//     let pipe4 = this.matter.add.image(1200, -150, 'pipe').setScale(1.5).setStatic(true)
//     pipe2.angle = 180
//     pipe4.angle = 180
//         this.matter.add.image(300,740, 'ground').setScale(1.8).setStatic(true)
//         this.anims.create({
//         key: 'flap',
//         frames: [
//             {key: 'flappyupflap'},
//             {key: 'flappymidflap'},
//             {key: 'flappydownflap'}
//         ],
//         frameRate: 10,
//         repeat: -1
//     })
//     var flappu = this.matter.add.sprite(300, 400,'flappyupflap').setScale(1.1)
//     flappu.anims.play('flap', true)
//     flappu.setOnCollide(function() {
//         destroy()
//         flappu.setAngularVelocity(0); 
//     });
    
//     this.input.on('pointerdown', function () {
//         let birdY = flappu.y
//         let tween = this.tweens.add({
//             targets: flappu,
//             y: birdY-70, 
//             duration: 500, 
//             ease: 'Quad.easeOut',
//             onUpdate: function (tween, target) {
//                 if (tween.progress > 0.1) {
//                     flappu.angle = -20;
//                 }
//             },
//             onComplete: function () {
//                 console.log("Transition to y -100 completed!");
//                 flappu.angle = 0;
//             },
//             onCompleteScope: this          
//         });
//     }, this);
//     if(flappu.coll)
//     Matter.Collision.create(flappu, pipe2)
//     let sprite1 = flappu;
//     let sprite2 = pipe1
//     this.matter.world.on('collisionstart', function(event) {
//         if ((event.pairs[0].bodyA === sprite1.body && event.pairs[0].bodyB === sprite2.body) ||
//             (event.pairs[0].bodyA === sprite2.body && event.pairs[0].bodyB === sprite1.body)) {
//             console.log('Collision detected between sprite1 and sprite2');
//             // Add your collision handling logic here
//         }
//     });                                              
//     var i = 1;
//     function getRandomInt() {
//         let a =  Math.floor(Math.random() * (9-4)+4);
//         return a + '00'
//         } 
//         let yaxispipe1 = getRandomInt()
//         let yaxispipe2 = getRandomInt()

//         function logNumber() {
//         pipe1.x = pipe1.x-40;
//         pipe2.x = pipe2.x-40;
//         pipe1.y = yaxispipe1
//         pipe2.y = pipe1.y - 600

//         pipe3.x = pipe3.x-40;
//         pipe4.x = pipe4.x-40
//         pipe3.y = yaxispipe2
//         pipe4.y = pipe3.y - 600
//         // pipe4.y = pipe4.y-650
//         if(pipe1.x <= -10){
//             pipe1.x = 800
//             pipe2.x = 800
//         }
//         else if(pipe4.x < -10){
//             pipe3.x = 1600
//             pipe4.x = 1600
//         }
//         i++;
//         if (i <= 100) {
//             setTimeout(logNumber, 1000);
//         }
//     }
//     logNumber();
    
//     }
// console.log('ih')

    

// function update() {
//     // flappu.setVelocity(
//     }

import Phaser from 'phaser';
import * as Matter from 'matter-js';

const { Engine, Render, World, Bodies } = Matter;

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'matter',
        matter: {
            gravity: { y: 0.5 }
        }
    },
    scene: {
        preload: preload,
        create: create
    }
};

const game = new Phaser.Game(config);

function preload() {
    // Preload assets if needed
}

function create() {
    // Create Matter.js engine and renderer
    const engine = Engine.create();
    const render = Render.create({
        element: document.body,
        engine: engine
    });

    // Create a Matter.js box
    const box = Bodies.rectangle(400, 200, 80, 80);

    // Add the box to the Matter.js world
    World.add(engine.world, box);

    // Create a Phaser sprite for the box
    const phaserBox = this.matter.add.gameObject(box).setExistingBody(box);

    // Start the Matter.js engine
    Engine.run(engine);

    // Start the Phaser game loop
    Render.run(render);
}
