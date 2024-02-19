// SCSS
import '../scss/style.scss';

import * as PIXI from 'pixi.js';

// Create Scene And Add To Body
const appWidth: number = 1280;
const appHeight: number = 720;
const app = new PIXI.Application<HTMLCanvasElement>({ width: appWidth, height: appHeight });
document.body.appendChild(app.view);

// Constants
const GAME_TIME: number = 60;
const NUMBER: number = 10;
const MAX_ASTEROIDS: number = NUMBER;
const MAX_BULLETS: number = NUMBER;

let bullets: PIXI.Graphics[] = [];
let asteroids: PIXI.Graphics[] = [];
let remainingBullets: number = MAX_BULLETS;
let remainingTime: number = GAME_TIME;

let gameTimer: NodeJS.Timeout;
let levelTwoStarted = false;

let boss: PIXI.Sprite;
let bossHP: number = 4;
let bossHealthBar: PIXI.Graphics;

// Create Elements And Add To Scene
// Background
const background: PIXI.Sprite = PIXI.Sprite.from("./image/space.jpg");
background.width = appWidth;
background.height = appHeight;
app.stage.addChild(background);

// Player
const player: PIXI.Sprite = PIXI.Sprite.from('image/rocket.png');
player.anchor.set(0.5);
player.x = appWidth / 2;
player.y = appHeight - 64;
app.stage.addChild(player);

// Bullet
const createBullet = (): void => {
    if (remainingBullets > 0) {
        remainingBullets--;
        updateBullets();

        if (bullets.length < MAX_BULLETS) {
            const bullet: PIXI.Graphics = new PIXI.Graphics();
            bullet.beginFill(0xFFFFFF);
            bullet.drawCircle(0, 0, 9);
            bullet.endFill();
            bullet.x = player.x;
            bullet.y = player.y;
            app.stage.addChild(bullet);
            bullets.push(bullet);

            const moveBullet = setInterval(() => {
                bullet.y -= 5;

                if (bullet.y < 0) {
                    app.stage.removeChild(bullet);
                    clearInterval(moveBullet);
                }
            }, 1000 / 60);
        }
    }
};

// Asteroid
const createAsteroid = (): void => {
    const asteroid: PIXI.Graphics = new PIXI.Graphics();
    asteroid.beginFill(0xCCCCCC);
    asteroid.drawCircle(0, 0, 30);
    asteroid.endFill();
    asteroid.x = Math.random() * appWidth;
    asteroid.y = Math.random() * appHeight - appHeight;
    app.stage.addChild(asteroid);
    asteroids.push(asteroid);

    const moveAsteroid = setInterval(() => {
        asteroid.y += 5;

        if (asteroid.y > appHeight) {
            app.stage.removeChild(asteroid);
            clearInterval(moveAsteroid);
        }
    }, 1000 / 10);
};

// Message "YOU WIN"
const winText: PIXI.Text = new PIXI.Text('YOU WIN', {
    fontFamily: 'Arial',
    fontSize: 48,
    fill: 0x00FF00,
    align: 'center',
});
winText.anchor.set(0.5);
winText.x = appWidth / 2;
winText.y = appHeight / 2;
app.stage.addChild(winText);
winText.visible = false;

// Message "YOU LOSE"
const loseText: PIXI.Text = new PIXI.Text('YOU LOSE', {
    fontFamily: 'Arial',
    fontSize: 48,
    fill: 0xFF0000,
    align: 'center',
});
loseText.anchor.set(0.5);
loseText.x = appWidth / 2;
loseText.y = appHeight / 2;
app.stage.addChild(loseText);
loseText.visible = false;

// Shots
const bulletText: PIXI.Text = new PIXI.Text('Bullets: ' + remainingBullets, {
    fontFamily: 'Arial',
    fontSize: 24,
    fill: 0xFFFFFF,
});
bulletText.anchor.set(0, 0);
bulletText.x = 10;
bulletText.y = 10;
app.stage.addChild(bulletText);

// Timer
const timerText: PIXI.Text = new PIXI.Text('Time: ' + remainingTime, {
    fontFamily: 'Arial',
    fontSize: 24,
    fill: 0xFFFFFF,
});
timerText.anchor.set(1, 0);
timerText.x = appWidth - 10;
timerText.y = 10;
app.stage.addChild(timerText);

// Boss
const createBoss = (): void => {
    boss = PIXI.Sprite.from('image/boss.png');
    boss.anchor.set(0.5);
    boss.x = appWidth / 2;
    boss.y = 64;
    app.stage.addChild(boss);

    bossHealthBar = new PIXI.Graphics();
    bossHealthBar.beginFill(0xFF0000);
    bossHealthBar.drawRect(0, 0, 100, 10);
    bossHealthBar.endFill();
    bossHealthBar.x = appWidth / 2 - 50;
    bossHealthBar.y = 50;
    app.stage.addChild(bossHealthBar);
};

// Some Asteroids
for (let i: number = 0; i < MAX_ASTEROIDS; i++) {
    createAsteroid();
}

const detectCollisions = (): void => {
    for (let i: number = bullets.length - 1; i >= 0; i--) {
        const bullet: PIXI.Graphics = bullets[i];
        for (let j: number = asteroids.length - 1; j >= 0; j--) {
            const asteroid: PIXI.Graphics = asteroids[j];

            if (bullet.x > asteroid.x - asteroid.width / 2 &&
                bullet.x < asteroid.x + asteroid.width / 2 &&
                bullet.y > asteroid.y - asteroid.height / 2 &&
                bullet.y < asteroid.y + asteroid.height / 2) {

                app.stage.removeChild(bullet);
                app.stage.removeChild(asteroid);
                bullets.splice(i, 1);
                asteroids.splice(j, 1);
            }
        }
    }
};

const checkGameStatus = (): void => {
    if (asteroids.length === 0 && !levelTwoStarted) {
        clearInterval(gameTimer);
        levelTwoStarted = true;
        startLevelTwo();
    } else if (bullets.length === MAX_BULLETS) {
        loseText.visible = true;
        stopAnimation(3000);
    }
};

const stopAnimation = (time: number) => {
    setTimeout(() => {
        clearInterval(gameTimer);
        app.ticker.stop();
    }, time);
};

const handlePlayerAction = (e: KeyboardEvent): void => {
    if (e.key == "ArrowLeft" && player.x - player.width / 2 > 0) {
        player.x -= 10;
    } else if (e.key == "ArrowRight" && player.x < appWidth - player.width / 2) {
        player.x += 10;
    } else if (e.key == " ") {
        createBullet();
    }
};

const updateBullets = (): void => {
    bulletText.text = 'Bullets: ' + remainingBullets;
};

const updateTimer = (): void => {
    timerText.text = 'Time: ' + remainingTime;
};

const startGameTimer = (): void => {
    gameTimer = setInterval(() => {
        remainingTime--;
        updateTimer();

        if (remainingTime <= 0) {
            loseText.visible = true;
            stopAnimation(500)
        }
    }, 1000);
};

const resetGame = (): void => {
    asteroids.forEach(asteroid => app.stage.removeChild(asteroid));

    remainingBullets = MAX_BULLETS;
    remainingTime = GAME_TIME;
    bulletText.text = 'Bullets: ' + remainingBullets;
    timerText.text = 'Time: ' + remainingTime;

    player.x = appWidth / 2;
    player.y = appHeight - 64;

    winText.visible = false;
    loseText.visible = false;

    startGameTimer();
};

startGameTimer();

// Player Actions
window.addEventListener("keydown", handlePlayerAction);

// Start Level I
app.ticker.add(() => {
    detectCollisions();
    checkGameStatus();
});

// Start Level II
const startLevelTwo = (): void => {
    resetGame();
    createBoss();
};