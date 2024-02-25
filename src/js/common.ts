// SCSS
import '../scss/style.scss';

import * as PIXI from 'pixi.js';
import {Player} from "./Player";
import {BulletWatcher} from "./BulletWatcher";
import {Game} from "./Game";
import {EnemyObjectInterface} from "./EnemyObjectInterface";
import {Asteroid} from "./Asteroid";
import {Boss} from "./Boss";
import {BossBullet} from "./BossBullet";
import {BossBulletWatcher} from "./BossBulletWatcher";

// Create Scene And Add To Body
const appWidth: number = 1280;
const appHeight: number = 720;
const app = new PIXI.Application<HTMLCanvasElement>({ width: appWidth, height: appHeight });
document.body.appendChild(app.view);

const game = new Game(app);
const player = game.player;
const bulletWatcher = new BulletWatcher(app);
const bossBulletWatcher = new BossBulletWatcher(app, player);

game.startLevel1();

game.on(Player.OUT_OF_BULLETS, () => {
    game.loose()
});

game.on(Player.SHOOT_EVENT, (e: {player: Player, bullet: PIXI.Graphics}) => {
    bulletWatcher.addBullet(e.bullet);
    game.updateBulletsText(player.getBulletsCount())
});

game.on(Asteroid.ASTEROID_ON_SCENE, (e: {asteroid: EnemyObjectInterface}) => {
    bulletWatcher.addObject(e.asteroid)
});

game.on(Boss.ROCKET_CREATED, (e: {rocket: EnemyObjectInterface}) => {
    bulletWatcher.addObject(e.rocket)
});

game.on(BossBullet.BULLET_CREATED, (e: {bullet: EnemyObjectInterface}) => {
    bulletWatcher.addObject(e.bullet);
    bossBulletWatcher.addBullet(e.bullet.getContainer())
});

game.on(Player.DESTROYED, () => {
    game.loose();
});

game.on(Boss.ROCKET_DESTROYED, () => {
    game.win();
});

game.on(Asteroid.ASTEROID_DESTROYED, () => {
    game.asteroidProcessor.removeAsteroid();
    if (!game.asteroidProcessor.asteroids.length) {
        game.startLevel2()
    }
});

// Player Actions
window.addEventListener("keydown", (e: KeyboardEvent): void => {
    e.preventDefault();
    switch (e.key) {
        case 'ArrowLeft':
            player.moveLeft();
            break;
        case 'ArrowRight':
            player.moveRight();
            break;
        case ' ':
            player.shoot();
            break;
    }
});

app.ticker.add(() => {
    bulletWatcher.watch();
    bossBulletWatcher.watch()
});