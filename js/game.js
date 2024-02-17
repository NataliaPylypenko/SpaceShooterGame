const appWidth = 1280;
const appHeight = 720;

const app = new PIXI.Application({ width: appWidth, height: appHeight });
document.body.appendChild(app.view);

// Створимо спрайт для фону
const background = PIXI.Sprite.from("./image/space.jpg");
background.width = appWidth;
background.height = appHeight;

// Додамо фон на сцену
app.stage.addChild(background);

// Додамо гравця (корабель)
const player = PIXI.Sprite.from('image/rocket.png');
player.anchor.set(0.5);
player.x = appWidth / 2;
player.y = appHeight - 64;
app.stage.addChild(player);


const bullets = [];

// Рух гравця
window.addEventListener("keydown", (e) => {
    if (e.key == "ArrowLeft" && player.x - player.width / 2 > 0) {
        player.x -= 10;
    } else if (e.key == "ArrowRight" && player.x < appWidth - player.width / 2) {
        player.x += 10;
    } else if (e.key == " ") {
        const bullet = new PIXI.Graphics();
        bullet.beginFill(0xFFFF00);
        bullet.drawCircle(0, 0, 9);
        bullet.endFill();
        bullet.x = player.x;
        bullet.y = player.y;

        // Додавання кулі на сцену
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
});
