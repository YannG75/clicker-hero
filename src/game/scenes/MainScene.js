import {EventBus} from '../EventBus';
import {Scene} from 'phaser';
import Phaser from 'phaser';
import Monster from '../Monster';

export default class MainScene extends Scene {
  constructor() {
    super('MainScene');
  }

  init() {
    //  This is called when the scene is created
    this.player = {
      golds: 0,
      level: 1,
      dmg: 1,
    }

    EventBus.on('resumePlayer', (player) => {
      this.player.dmg = player.dmg;
      this.player.level = player.level;
      this.player.golds = player.golds;
      console.log(`Player resumed: ${this.player}`);
    });

    EventBus.emit('sceneInitialized');
  }

  create() {
    const monsters = ['champ', 'bat'];
    let rnd = Phaser.Math.RND;

    function getRandomMonster() {
      return rnd.pick(monsters);
    }

    EventBus.on('playerLevelUp', (player) => {
      this.player.dmg = player.dmg;
      this.player.level = player.level;
      this.player.golds = player.golds;
      console.log(`Player damage updated: ${this.player}`);
    });

    this.status = 'playing';

    this.cameras.main.setBackgroundColor('#222644');
    this.sound.add('hit');
    this.sound.add('death');
    this.sound.add('death2');
    this.sound.add('death3');

    this.sound.add('loop', {
      loop: true,
      volume: 0.15
    }).play();

    this.anims.create({
      key: 'champFly',
      frames: this.anims.generateFrameNumbers('Champi', {start: 0, end: 7}),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: 'champHit',
      frames: this.anims.generateFrameNumbers('ChampiHit', {start: 0, end: 3}),
      frameRate: 10,
      repeat: 0
    });

    this.anims.create({
      key: 'champDie',
      frames: this.anims.generateFrameNumbers('ChampiDie', {start: 0, end: 16}),
      frameRate: 10,
      repeat: 0
    });
    this.anims.create({
      key: 'batFly',
      frames: this.anims.generateFrameNumbers('bat', {start: 0, end: 8}),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: 'batHit',
      frames: this.anims.generateFrameNumbers('BatHit', {start: 0, end: 4}),
      frameRate: 10,
      repeat: 0
    });
    this.anims.create({
      key: 'batDie',
      frames: this.anims.generateFrameNumbers('BatDie', {start: 0, end: 11}),
      frameRate: 10,
      repeat: 0
    });


    function spawnMonster() {
      const newMonster = new Monster(this, window.innerWidth / 2, window.innerHeight / 2, getRandomMonster());
      this.add.existing(newMonster);
      newMonster.on('destroy', () => {

        if (this.scene.scene == null) {
          console.log(this.scene.scene);
          return;
        }
        console.log('Monster killed');
        spawnMonster.call(this);
      });
    }

    spawnMonster.call(this);
  }

}


