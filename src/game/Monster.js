import Phaser from "phaser";

export default class Monster extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, monster, playerDmg) {
        super(scene, x, y, monster, 0);
        this.scene = scene;
        this.playerDmg = playerDmg;
        this.monster = monster;
        this.hp = 3;
        this.dmg = 1;
        this.def = 0;
        this.value = 10;

        this.setScale(4);
        this.setInteractive();
        this.play(this.monster + 'Fly');

        this.on('pointerdown', () => {
            this.hit();
        });
    }


    getRandomDeathSound() {
        const deathSounds = ['death', 'death2', 'death3'];
        return deathSounds[Math.floor(Math.random() * deathSounds.length)];
    }

    hit() {
        console.log('Monster clicked!');
        this.play(this.monster + 'Hit');
        this.scene.sound.play('hit', {
            volume: 0.1
        });
        this.hp -= this.playerDmg;
        console.log(`Monster HP: ${this.hp}`);

        if (this.hp <= 0) {
            this.die();
        }
        else {
            setTimeout(() => {
                this.play(this.monster + 'Fly');
            }, 500);
        }
    }

    die() {
        console.log('Monster died!');
        this.play(this.monster + 'Die');
        this.scene.sound.play(this.getRandomDeathSound(), {
            volume: 0.1
        });
        setTimeout(() => {
            this.destroy();
        }, this.anims.currentAnim.duration + 500);
    }
}
