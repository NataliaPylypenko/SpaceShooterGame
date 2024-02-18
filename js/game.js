const appWidth = 1280;
const appHeight = 720;

const app = new PIXI.Application({ width: appWidth, height: appHeight });
document.body.appendChild(app.view);

// added background
const background = PIXI.Sprite.from("./image/space.jpg");
background.width = appWidth;
background.height = appHeight;

app.stage.addChild(background);

// added player
const player = PIXI.Sprite.from('image/rocket.png');
player.anchor.set(0.5);
player.x = appWidth / 2;
player.y = appHeight - 64;
app.stage.addChild(player);

const maxBullets = 10;
const bullets = [];
const asteroids = [];

// player actions
window.addEventListener("keydown", (e) => {
    if (e.key == "ArrowLeft" && player.x - player.width / 2 > 0) {
        player.x -= 10;
    } else if (e.key == "ArrowRight" && player.x < appWidth - player.width / 2) {
        player.x += 10;
    } else if (e.key == " ") {
        createBullet()
    }
});

// create bullet
function createBullet() {
    if (bullets.length < maxBullets) {
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
}

// create asteroid
function createAsteroid() {
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
}

// added 10 asteroids
for (let i = 0; i < 10; i++) {
    createAsteroid();
}

// detect collisions
function detectCollisions() {
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
}

// create message "YOU WIN"
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

// create message "YOU LOSE"
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

function checkGameStatus() {
    if (asteroids.length === 0) {
        winText.visible = true;
        // stop animation?
    } else if (bullets.length === 10) {
        loseText.visible = true;
        // stop animation?
    }
}


// executing the code on each frame of the animation
app.ticker.add(() => {
    detectCollisions();
    checkGameStatus();

    // console.log(asteroids.length)
    // console.log(bullets.length)
});
