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
const MAX_ASTEROIDS: number = 20;
const MAX_BULLETS: number = NUMBER;
const SPEED_ASTEROIDS: number = 3;
const SPEED_BULLETS: number = 5;
const SPEED_PLAYER: number = 15;

let bullets: PIXI.Graphics[] = [];
let asteroids: PIXI.Graphics[] = [];
let remainingTime: number = GAME_TIME;

let gameTimer: NodeJS.Timeout;
let levelTwoStarted = false;

let boss: PIXI.Sprite;
let bossHealthBar: PIXI.Graphics;
let bossBullets: PIXI.Graphics[] = [];
let bossHP: number = 4;
let bossSpeed: number = 2;
let lastBossBulletTime: number = 0;

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
    if (bullets.length < MAX_BULLETS) {
        const bullet: PIXI.Graphics = new PIXI.Graphics();
        bullet.beginFill(0x09DCDD);
        bullet.drawCircle(0, 0, 9);
        bullet.endFill();
        bullet.x = player.x;
        bullet.y = player.y;
        app.stage.addChild(bullet);

        bullets.push(bullet);

        updateBullets();

        const moveBullet = setInterval(() => {
            bullet.y -= SPEED_BULLETS;

            if (bullet.y < 0) {
                app.stage.removeChild(bullet);
                clearInterval(moveBullet);
            }
        }, 1000 / 60);
    }
};

// Asteroid
const createAsteroid = (): void => {
    const asteroid: PIXI.Graphics = new PIXI.Graphics();
    asteroid.beginFill(0xCCCCCC);
    asteroid.drawCircle(0, 0, 30);
    asteroid.endFill();
    asteroid.x = Math.random() * (appWidth - asteroid.width) + asteroid.width / 2;
    asteroid.y = Math.random() * appHeight - appHeight;
    app.stage.addChild(asteroid);

    asteroids.push(asteroid);

    const moveAsteroid = setInterval(() => {
        asteroid.y += SPEED_ASTEROIDS;

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
const bulletText: PIXI.Text = new PIXI.Text('Bullets: ' + MAX_BULLETS, {
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
    boss.y = 120;
    app.stage.addChild(boss);

    bossHealthBar = new PIXI.Graphics();
    bossHealthBar.beginFill(0xFF0000);
    bossHealthBar.drawRect(0, 0, 100, 10);
    bossHealthBar.endFill();
    bossHealthBar.x = appWidth / 2 - 50;
    bossHealthBar.y = 10;
    app.stage.addChild(bossHealthBar);
};

// BossBullet
const createBossBullet = (): void => {
    const bossBullet: PIXI.Graphics = new PIXI.Graphics();
    bossBullet.beginFill(0x05CDFF);
    bossBullet.drawCircle(0, 0, 20);
    bossBullet.endFill();
    bossBullet.x = boss.x;
    bossBullet.y = boss.y;
    app.stage.addChild(bossBullet);

    bossBullets.push(bossBullet);

    const moveBossBullet = setInterval(() => {
        bossBullet.y += SPEED_BULLETS;

        if (bossBullet.y > appHeight) {
            clearInterval(moveBossBullet);
            app.stage.removeChild(bossBullet);
        } else if (
            bossBullet.x > player.x - player.width / 2 &&
            bossBullet.x < player.x + player.width / 2 &&
            bossBullet.y > player.y - player.height / 2 &&
            bossBullet.y < player.y + player.height / 2
        ) {
            loseText.visible = true;
            app.stage.removeChild(bossBullet);
            setTimeout(() => {
                clearInterval(moveBossBullet);
                app.ticker.stop();
            }, 0);
        }
    }, 1000 / 60);
};

// Some Asteroids
for (let i: number = 0; i < MAX_ASTEROIDS; i++) {
    createAsteroid();
}

const detectCollisionsWithAsteroid = (): void => {
    for (let i: number = bullets.length - 1; i >= 0; i--) {
        const bullet: PIXI.Graphics = bullets[i];
        for (let j: number = asteroids.length - 1; j >= 0; j--) {
            const asteroid: PIXI.Graphics = asteroids[j];

            if (
                bullet.x > asteroid.x - asteroid.width / 2 &&
                bullet.x < asteroid.x + asteroid.width / 2 &&
                bullet.y > asteroid.y - asteroid.height / 2 &&
                bullet.y < asteroid.y + asteroid.height / 2
            ) {
                app.stage.removeChild(bullet);
                app.stage.removeChild(asteroid);

                bullet.x = 0;
                bullet.y = 0;

                asteroids.splice(j, 1);
            }
        }
    }
};

const detectCollisionsWithBossBullet = (): void => {
    for (let i: number = bullets.length - 1; i >= 0; i--) {
        const bullet: PIXI.Graphics = bullets[i];
        for (let j: number = bossBullets.length - 1; j >= 0; j--) {
            const bossBullet: PIXI.Graphics = bossBullets[j];

            if (
                bullet.x > bossBullet.x - bossBullet.width / 2 &&
                bullet.x < bossBullet.x + bossBullet.width / 2 &&
                bullet.y > bossBullet.y - bossBullet.height / 2 &&
                bullet.y < bossBullet.y + bossBullet.height / 2
            ) {
                app.stage.removeChild(bullet);
                app.stage.removeChild(bossBullet);

                bossBullet.x = 0;
                bossBullet.y = 0;

                bossBullets.splice(j, 1);
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
        let lastBullet = bullets[MAX_BULLETS - 1];
        if (lastBullet.y < 0) {
            loseText.visible = true;
            clearInterval(gameTimer);
            app.ticker.stop();
        }
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
        player.x -= SPEED_PLAYER;
    } else if (e.key == "ArrowRight" && player.x < appWidth - player.width / 2) {
        player.x += SPEED_PLAYER;
    } else if (e.key == " ") {
        createBullet();
    }
};

const moveBoss = (): void => {
    if (boss) {
        boss.x += bossSpeed;

        if (boss.x < boss.width / 2 || boss.x > appWidth - boss.width / 2) {
            bossSpeed *= -1;
        }
    }
};

const updateBullets = (): void => {
    bulletText.text = 'Bullets: ' + (MAX_BULLETS - bullets.length);
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

startGameTimer();

const resetGame = (): void => {
    asteroids.forEach(asteroid => app.stage.removeChild(asteroid));
    bullets = [];
    remainingTime = GAME_TIME;

    bulletText.text = 'Bullets: ' + MAX_BULLETS;
    timerText.text = 'Time: ' + remainingTime;

    player.x = appWidth / 2;
    player.y = appHeight - 64;

    winText.visible = false;
    loseText.visible = false;

    startGameTimer();
};

const hitBoss = (): void => {
    bossHP--;
    bossHealthBar.clear();
    bossHealthBar.beginFill(0xFF0000);
    bossHealthBar.drawRect(0, 0, 100 * (bossHP / 4), 10);
    bossHealthBar.endFill();

    if (bossHP === 0) {
        winText.text = 'YOU WIN';
        winText.visible = true;
        stopAnimation(0);
    }
};

const detectCollisionsWithBoss = (): void => {
    for (let i: number = bullets.length - 1; i >= 0; i--) {
        const bullet: PIXI.Graphics = bullets[i];

        if (bullet.x > boss.x - boss.width / 2 &&
            bullet.x < boss.x + boss.width / 2 &&
            bullet.y > boss.y - boss.height / 2 &&
            bullet.y < boss.y + boss.height / 2) {

            hitBoss();

            bullet.x = 0;
            bullet.y = 0;

            app.stage.removeChild(bullet);
            return;
        }
    }
};

// Player Actions
window.addEventListener("keydown", handlePlayerAction);

// Start Level I
app.ticker.add(() => {
    detectCollisionsWithAsteroid();
    checkGameStatus();

    if (boss) {
        moveBoss();
        detectCollisionsWithBoss();
        detectCollisionsWithBossBullet();

        const currentTime: number = Date.now();
        if (currentTime - lastBossBulletTime >= 2000) {
            createBossBullet();
            lastBossBulletTime = currentTime;
        }
    }
});

// Start Level II
const startLevelTwo = (): void => {
    resetGame();
    createBoss();
};