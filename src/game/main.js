// import { Game } from './scenes/Game';
import Phaser from 'phaser';
import MainScene from './scenes/MainScene';
import { Preloader } from './scenes/Preloader';

// Find out more information about the Game Config at:
// https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig
const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    parent: 'game-container',
    scene: [
        Preloader,
        MainScene,
    ],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    }
};

const StartGame = (parent) => {

    return new Phaser.Game({ ...config, parent });
}

export default StartGame;