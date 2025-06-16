import {Scene} from 'phaser';

export class Preloader extends Scene {
  constructor() {
    super('Preloader');
  }

  init() {
    //  We loaded this image in our Boot Scene, so we can display it here


// Calculer les dimensions basées sur la taille de l'écran
    const barWidth = Math.min(360, window.innerWidth * 0.8);
    const barHeight = 24;
    const barX = window.innerWidth / 2;
    const barY = window.innerHeight / 2;

// Contour de la barre de progression
    this.add.rectangle(barX, barY, barWidth, barHeight).setStrokeStyle(1, 0xffffff);


// La barre de progression elle-même. Elle s'agrandira de gauche à droite selon le % de progression.
    const bar = this.add.rectangle(barX - (barWidth / 2) + 2, barY, 4, barHeight, 0xffffff);
    const percent = this.add.text(barX, barY - 10, 0 + '%', {
      color: '#000',
      fontSize: '20px',
    })
    //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
    this.load.on('progress', (progress) => {

      //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
      bar.width = 4 + (barWidth * progress);
      percent.setText(Math.floor(progress * 100) + '%');

    });
  }

  preload() {
    //  Charger les assets depuis le dossier public/assets
    this.load.setPath('/assets');

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

    this.load.spritesheet('bat', 'Monsters/bat/Bat-IdleFly.png', {
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
