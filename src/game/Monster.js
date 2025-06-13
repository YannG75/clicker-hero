import Phaser from "phaser";
import {EventBus} from "./EventBus";

export default class Monster extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, monster) {
    super(scene, x, y, monster, 0);
    this.scene = scene;
    this.monster = monster;
    this.hp = Math.floor(5 + (this.scene.player.level * 2)); // Les PV augmentent progressivement à partir du niveau 5
    this.maxHp = this.hp;
    this.dmg = this.scene.player.dmg; // Assuming player damage is set in the scene
    this.def = 0;
    this.value = 10;
    this.dying = false;
    const scale = window.innerWidth < 800 ? 3 : 6;
    this.setScale(scale)
    const barWidth = 64;
    const barHeight = 10;
    const barY = y + (scale * 35); // Position proportionnelle à l'échelle
    this.scene.add.rectangle(x - 1, barY, barWidth, barHeight).setStrokeStyle(1, 0xffffff);
    this.lifeBar = this.scene.add.rectangle(x - 1, barY, barWidth, barHeight, 0xff0000);

    this.lifeBar.width = (this.hp / this.maxHp) * 64; // Assuming max HP is 10
    this.scene.add.existing(this);


    this.setInteractive();
    this.play(this.monster + 'Fly');

    this.on('pointerdown', () => {
      if (this.dying) {
        console.log('Monster is already dying, ignoring hit.');
        return;
      }
      this.hit(this.scene.player.dmg);
    });
  }

  applyDamage(dmg) {
    let newhp = this.hp - dmg;
    if (newhp < 0) {
      newhp = 0;
    }
    return newhp; // Example: return 10 HP for all monsters
  }

  getRandomDeathSound() {
    const deathSounds = ['death', 'death2', 'death3'];
    return deathSounds[Math.floor(Math.random() * deathSounds.length)];
  }

  hit(dmg) {
    console.log('dmg', dmg);

    this.play(this.monster + 'Hit');

    const dmgText = this.scene.add.text(this.x, this.y - 100, `-${dmg}`, {
      font: '50px Arial',
      fill: '#ff4444',
      stroke: '#000',
      strokeThickness: 4,
    }).setOrigin(0.5);

    this.scene.tweens.add({
      targets: dmgText,
      y: dmgText.y - 40,
      alpha: 0,
      duration: 500,
      yoyo: false,
      repeat: 0,
      onStart: () => {
        this.scene.sound.play('hit', {volume: 0.2});
      },
      ease: 'Power1',
      onComplete: () => {
        dmgText.destroy();
      }
    });


    this.hp = this.applyDamage(dmg);
    this.scene.tweens.add({
      targets: this,
      x: this.x + Phaser.Math.Between(-20, 20),
      duration: 50,
      yoyo: true,
      repeat: 2
    });
    this.scene.tweens.add({
      targets: this.lifeBar,
      width: (this.hp / this.maxHp) * 64, // Adjust width based on damage
      duration: 250,
      yoyo: false,
      ease: 'Power1',
      repeat: 0,
      onComplete: function () {

      }
    });

    // this.lifeBar.width = (this.hp / 10) * 64;
    console.log(`Monster HP: ${this.hp}`);

    if (this.hp <= 0) {
      // Only call setTimeout in die()
      this.dying = true;
      this.die();
    } else {
      // Wait for the 'Hit' animation to finish before playing 'Fly'
      this.once(Phaser.Animations.Events.ANIMATION_COMPLETE, (anim) => {
        if (anim.key === this.monster + 'Hit') {
          this.play(this.monster + 'Fly');
        }
      });
    }
  }

  die() {
    console.log('Monster died!');

    this.play(this.monster + 'Die');
    EventBus.emit('monsterKilled', this.value);
    this.scene.sound.play(this.getRandomDeathSound(), {
      volume: 0.1
    });
    setTimeout(() => {
      this.destroy();
    }, this.anims.currentAnim.duration + 500);
  }
}
