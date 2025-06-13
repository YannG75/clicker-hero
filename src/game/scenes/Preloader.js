import { Scene } from 'phaser';

export class Preloader extends Scene {
    constructor() {
        super('Preloader');
    }

    init() {
        //  We loaded this image in our Boot Scene, so we can display it here


        //  A simple progress bar. This is the outline of the bar.
        this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);

        //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
        const bar = this.add.rectangle(512 - 230, 384, 4, 28, 0xffffff);

        //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
        this.load.on('progress', (progress) => {

            //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
            bar.width = 4 + (460 * progress);

        });
    }

    preload() {
        //  Load the assets for the game - Replace with your own assets
        this.load.setPath('./src/assets');

        this.load.spritesheet('Champi', 'Monsters/champi/Enemy3-Idle.png', {
            frameWidth: 64,
            frameHeight: 64,
        });
        this.load.spritesheet('ChampiHit', 'Monsters/champi/Enemy3-Hit.png', {
            frameWidth: 64,
            frameHeight: 64,
        });
        this.load.spritesheet('ChampiDie', 'Monsters/champi/Enemy3-Die.png', {
            frameWidth: 64,
            frameHeight: 64,
        });

        this.load.spritesheet('Bat', 'Monsters/bat/Bat-IdleFly.png', {
            frameWidth: 64,
            frameHeight: 64,
        });
        this.load.spritesheet('BatHit', 'Monsters/bat/Bat-Hurt.png', {
            frameWidth: 64,
            frameHeight: 64,
        });

        this.load.spritesheet('BatDie', 'Monsters/bat/Bat-Die.png', {
            frameWidth: 64,
            frameHeight: 64,
        });

        this.load.audio('hit', 'Sounds/hit.mp3');
        this.load.audio('death', 'Sounds/death.mp3');
        this.load.audio('death2', 'Sounds/death-2.mp3');
        this.load.audio('death3', 'Sounds/death-3.mp3');
        this.load.audio('loop', 'Sounds/loopT.mp3');
        this.load.audio('buy', 'Sounds/buy.mp3');
    }

    create() {
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.

        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        this.scene.start('MainScene');
    }
}
