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
const MAX_ASTEROIDS: number = 2;
const MAX_BULLETS: number = NUMBER;
const SPEED_ASTEROIDS: number = 3;
const SPEED_BULLETS: number = 5;
const SPEED_PLAYER: number = 15;

let playerBullets: PIXI.Graphics[] = [];
const playerBulletsOnStage: PIXI.Graphics[] = [];
let asteroids: PIXI.Graphics[] = [];
let remainingTime: number = GAME_TIME;

let gameTimer: NodeJS.Timeout;
let levelTwoStarted = false;

let boss: PIXI.Sprite;
let bossHealthBar: PIXI.Graphics;
const bossBulletsOnStage: PIXI.Graphics[] = [];
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


// Bullet
const createPlayerBullet = (): PIXI.Graphics => {
    const bullet: PIXI.Graphics = new PIXI.Graphics();
    bullet.beginFill(0x09DCDD);
    bullet.drawCircle(0, 0, 9);
    bullet.endFill();

    return bullet;
};

// Asteroid
const createAndMoveAsteroid = (): void => {
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

// Boss
const createBoss = (): void => {
    boss = PIXI.Sprite.from('image/boss.png');
    boss.anchor.set(0.5);
    boss.x = appWidth / 2;
    boss.y = 120;
    app.stage.addChild(boss);
};

const createBossHealthBar = (): void => {
    bossHealthBar = new PIXI.Graphics();
    bossHealthBar.beginFill(0xFF0000);
    bossHealthBar.drawRect(0, 0, 100, 10);
    bossHealthBar.endFill();
    bossHealthBar.x = appWidth / 2 - 50;
    bossHealthBar.y = 10;
    app.stage.addChild(bossHealthBar);
};

// BossBullet
const createBossBullet = (): PIXI.Graphics => {
    const bossBullet: PIXI.Graphics = new PIXI.Graphics();
    bossBullet.beginFill(0x05CDFF);
    bossBullet.drawCircle(0, 0, 20);
    bossBullet.endFill();
    bossBullet.x = boss.x;
    bossBullet.y = boss.y;

    return bossBullet;
};

const shootOutPlayer = (): void => {
    if(!playerBullets.length){
        return;
    }
    const bullet = playerBullets.pop();

    bullet.x = player.x;
    bullet.y = player.y;
    app.stage.addChild(bullet);

    playerBulletsOnStage.push(bullet);
    updateBulletsText();

    const moveBullet = setInterval(async () => {
        bullet.y -= SPEED_BULLETS;

        if (playerBullets.length === 0) {
            if (bullet.y < 0) {
                loseText.visible = true;
                stopAnimation('gameTimer', 250);
            }
        }

        if (bullet.y < 0) {
            app.stage.removeChild(bullet);
            playerBulletsOnStage.pop();
            clearInterval(moveBullet);
        }

    }, 1000 / 60);
};

const shootOutBoss = (): void => {
    const bossBullet = createBossBullet();
    app.stage.addChild(bossBullet);
    bossBulletsOnStage.push(bossBullet);

    const moveBossBullet = setInterval(() => {
        bossBullet.y += SPEED_BULLETS;
        if (bossBullet.y > appHeight) {
            clearInterval(moveBossBullet);
            app.stage.removeChild(bossBullet);
            bossBulletsOnStage.pop()
        }
    }, 1000 / 60);
};
const detectCollisionsWithAsteroid = (): void => {
    asteroids.forEach((asteroid: PIXI.Graphics, ai: number): void => {
        _detectCollisionsWithObjects(playerBulletsOnStage, asteroid, (bulletIdx: number): void => {
            app.stage.removeChild(playerBulletsOnStage[bulletIdx]);
            app.stage.removeChild(asteroid);
            asteroids.splice(ai, 1);
            playerBulletsOnStage.splice(bulletIdx, 1);
        })
    })
};

const detectCollisionsWithBoss = (): void => {
    console.log('shoot')
    _detectCollisionsWithObjects(playerBulletsOnStage, boss, (bulletIdx: number): void => {
        hitBoss();
        app.stage.removeChild(playerBulletsOnStage[bulletIdx]);
        playerBulletsOnStage.splice(bulletIdx, 1);
    })
};

const detectCollisionsWithPlayer = (): void => {
    _detectCollisionsWithObjects(bossBulletsOnStage, player, () => {
        loseText.visible = true;
        stopAnimation('moveBossBullet', 200);
    })
};

const detectCollisionsWithBullets = (): void => {
    playerBulletsOnStage.forEach((playerBullet: PIXI.Graphics, pbi: number): void => {
        bossBulletsOnStage.forEach((bossBullet: PIXI.Graphics, bbi: number): void => {
            if (
                playerBullet.x > bossBullet.x - bossBullet.width / 2 &&
                playerBullet.x < bossBullet.x + bossBullet.width / 2 &&
                playerBullet.y > bossBullet.y - bossBullet.height / 2 &&
                playerBullet.y < bossBullet.y + bossBullet.height / 2
            ) {
                bossBulletsOnStage.splice(bbi, 1);
                playerBulletsOnStage.splice(pbi, 1);

                app.stage.removeChild(playerBullet);
                app.stage.removeChild(bossBullet);
            }
        })
    })
};

const _detectCollisionsWithObjects = (bullets: PIXI.Graphics[], goalObject: PIXI.Container, callback: Function): void => {
    bullets.forEach((bullet: PIXI.Graphics, index: number): void => {
        if (bullet.x > goalObject.x - goalObject.width / 2 &&
            bullet.x < goalObject.x + goalObject.width / 2 &&
            bullet.y > goalObject.y - goalObject.height / 2 &&
            bullet.y < goalObject.y + goalObject.height / 2) {
            callback(index);
        }
    })
};

const handlePlayerAction = (e: KeyboardEvent): void => {
    if (e.key == "ArrowLeft" && player.x - player.width / 2 > 0) {
        player.x -= SPEED_PLAYER;
    } else if (e.key == "ArrowRight" && player.x < appWidth - player.width / 2) {
        player.x += SPEED_PLAYER;
    } else if (e.key == " ") {
        shootOutPlayer();
    }
};

const moveBoss = (): void => {
    boss.x += bossSpeed;

    if (boss.x < boss.width / 2 || boss.x > appWidth - boss.width / 2) {
        bossSpeed *= -1;
    }
};

const updateBulletsText = (): void => {
    bulletText.text = 'Bullets: ' + playerBullets.length;
};

const updateTimerText = (): void => {
    timerText.text = 'Time: ' + remainingTime;
};

const startGameTimer = (): void => {
    gameTimer = setInterval(() => {
        remainingTime--;
        updateTimerText();

        if (remainingTime <= 0) {
            loseText.visible = true;
            stopAnimation('gameTimer', 250)
        }
    }, 1000);
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
        stopAnimation('gameTimer', 250);
    }
};

const stopAnimation = (nameTimeout: string, time: number) => {
    setTimeout(() => {
        clearInterval(nameTimeout);
        app.ticker.stop();
    }, time);
};

// Player Actions
window.addEventListener("keydown", handlePlayerAction);

const checkGameStatus = (): void => {
    if (asteroids.length === 0 && !levelTwoStarted) {
        clearInterval(gameTimer);
        levelTwoStarted = true;
        startLevelTwo();
    }
};

const resetGame = (): void => {
    playerBullets = new Array(MAX_BULLETS).fill(createPlayerBullet());

    remainingTime = GAME_TIME;
    bulletText.text = 'Bullets: ' + MAX_BULLETS;
    timerText.text = 'Time: ' + remainingTime;

    player.x = appWidth / 2;
    player.y = appHeight - 64;

    winText.visible = false;
    loseText.visible = false;

    startGameTimer();
};

// Start Animation
app.ticker.add(() => {
    detectCollisionsWithAsteroid();
    checkGameStatus();

    if (boss) {
        moveBoss();
        detectCollisionsWithBoss();
        detectCollisionsWithPlayer();
        detectCollisionsWithBullets();

        const currentTime: number = Date.now();
        if (currentTime - lastBossBulletTime >= 2000) {
            shootOutBoss();
            lastBossBulletTime = currentTime;
        }
    }
});

// Start Level I
const startLevelOne = (): void => {
    resetGame();
    for (let i: number = 0; i < MAX_ASTEROIDS; i++) {
        createAndMoveAsteroid();
    }
};

// Start Level II
const startLevelTwo = (): void => {
    resetGame();
    createBoss();
    createBossHealthBar();
};

startLevelOne();