// Create Scene And Add To Body
const appWidth = 1280;
const appHeight = 720;
const app = new PIXI.Application({ width: appWidth, height: appHeight });
document.body.appendChild(app.view);

// Constants
const NUMBER_ASTEROIDS = 3;
const MAX_BULLETS = NUMBER_ASTEROIDS;
const GAME_TIME = 10;

const bullets = [];
const asteroids = [];
let remainingBullets = MAX_BULLETS;
let remainingTime = GAME_TIME;

// Create Elements And Add To Scene
// Background
const background = PIXI.Sprite.from("./image/space.jpg");
background.width = appWidth;
background.height = appHeight;
app.stage.addChild(background);

// Player
const player = PIXI.Sprite.from('image/rocket.png');
player.anchor.set(0.5);
player.x = appWidth / 2;
player.y = appHeight - 64;
app.stage.addChild(player);

// Bullet
const createBullet = () => {
    remainingBullets--;
    updateBullets();

    if (bullets.length < MAX_BULLETS) {
        const bullet = new PIXI.Graphics();
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
};

// Asteroid
const createAsteroid = () => {
    const asteroid = new PIXI.Graphics();
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
const winText = new PIXI.Text('YOU WIN', {
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
const loseText = new PIXI.Text('YOU LOSE', {
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
const bulletText = new PIXI.Text('Bullets: ' + remainingBullets, {
    fontFamily: 'Arial',
    fontSize: 24,
    fill: 0xFFFFFF,
});
bulletText.anchor.set(0, 0);
bulletText.x = 10;
bulletText.y = 10;
app.stage.addChild(bulletText);

// Timer
const timerText = new PIXI.Text('Time: ' + remainingTime, {
    fontFamily: 'Arial',
    fontSize: 24,
    fill: 0xFFFFFF,
});
timerText.anchor.set(1, 0);
timerText.x = appWidth - 10;
timerText.y = 10;
app.stage.addChild(timerText);


// Some Asteroids
for (let i = 0; i < NUMBER_ASTEROIDS; i++) {
    createAsteroid();
}

const detectCollisions = () => {
    for (let i = bullets.length - 1; i >= 0; i--) {
        const bullet = bullets[i];
        for (let j = asteroids.length - 1; j >= 0; j--) {
            const asteroid = asteroids[j];

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

const checkGameStatus = () => {
    if (asteroids.length === 0) {
        winText.visible = true;
    } else if (bullets.length === MAX_BULLETS) {
        loseText.visible = true;
    }
};

const handlePlayerAction = e => {
    if (e.key == "ArrowLeft" && player.x - player.width / 2 > 0) {
        player.x -= 10;
    } else if (e.key == "ArrowRight" && player.x < appWidth - player.width / 2) {
        player.x += 10;
    } else if (e.key == " ") {
        createBullet()
    }
};

const updateBullets = () => {
    bulletText.text = 'Bullets: ' + remainingBullets;
};

const updateTimer = () => {
    timerText.text = 'Time: ' + remainingTime;
};

const startGameTimer = () => {
    const gameTimer = setInterval(() => {
        remainingTime--;
        updateTimer();

        if (remainingTime <= 0) {
            clearInterval(gameTimer);
            loseText.visible = true;
        }
    }, 1000);
};

startGameTimer();

// Player Actions
window.addEventListener("keydown", handlePlayerAction);

// Animation
app.ticker.add(() => {
    detectCollisions();
    checkGameStatus();
});