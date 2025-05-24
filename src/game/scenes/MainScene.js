import { EventBus } from '../EventBus';
import { Scene } from 'phaser';
import Monster from '../Monster';

export default class MainScene extends Scene {
    constructor() {
        super('MainScene');
    }

    create() {
        const monsters = ['champi', 'bat'];

        function getRandomMonster() {
            return monsters[Math.floor(Math.random() * monsters.length)];
        }

        let firstClick = true;
        this.cameras.main.setBackgroundColor('#298484');
        this.sound.add('hit');
        this.sound.add('death');
        this.sound.add('death2');
        this.sound.add('death3');
        this.sound.add('loop', {
            loop: true,
            volume: 0.1
        }).play();


        this.anims.create({
            key: 'champiFly',
            frames: this.anims.generateFrameNumbers('Champi', { start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'champiHit',
            frames: this.anims.generateFrameNumbers('ChampiHit', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: 0
        });

        console.log(this.anims);


        this.anims.create({
            key: 'champiDie',
            frames: this.anims.generateFrameNumbers('ChampiDie', { start: 0, end: 16 }),
            frameRate: 10,
            repeat: 0
        });
        this.anims.create({
            key: 'batFly',
            frames: this.anims.generateFrameNumbers('Bat', { start: 0, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'batHit',
            frames: this.anims.generateFrameNumbers('BatHit', { start: 0, end: 4 }),
            frameRate: 10,
            repeat: 0
        });
        this.anims.create({
            key: 'batDie',
            frames: this.anims.generateFrameNumbers('BatDie', { start: 0, end: 11 }),
            frameRate: 10,
            repeat: 0
        });
        function spawnMonster() {
            const newMonster = new Monster(this, window.innerWidth / 2, window.innerHeight / 2, getRandomMonster(), 1);
            this.add.existing(newMonster);
            newMonster.on('destroy', () => {
                console.log('Monster killed');
                EventBus.emit('monsterKilled', newMonster.value);
                spawnMonster.call(this);
            });
        }
        spawnMonster.call(this);
    }

}


