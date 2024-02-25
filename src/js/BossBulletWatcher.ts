import * as PIXI from 'pixi.js';
import {Container} from "pixi.js";
import {Player} from "./Player";

export class BossBulletWatcher {
    private bullets: Container[];
    private player: Player;
    private app: PIXI.Application<HTMLCanvasElement>;

    public constructor(app: PIXI.Application<HTMLCanvasElement>, player: Player) {
        this.bullets = [];
        this.player = player;
        this.app = app;
    }

    public watch(): void {
        this.detectCollisions(this.bullets, this.player, (bulletIndex: number) => {
            this.removeBullet(bulletIndex);
            this.destroyPlayer();
        })
    }

    private detectCollisions = (bullets: Container[], player: Player, callback: Function): void => {
        const goalObject = player.rocket;
        bullets.forEach((bullet: PIXI.Graphics, bulletIndex): void => {
            if (bullet.x > goalObject.x - goalObject.width / 2 &&
                bullet.x < goalObject.x + goalObject.width / 2 &&
                bullet.y > goalObject.y - goalObject.height / 2 &&
                bullet.y < goalObject.y + goalObject.height / 2) {
                callback(bulletIndex);
            }
        })
    };

    public destroyPlayer(): void {
        this.player.destroy()
    }

    public addBullet(bullet: Container): void {
        this.bullets.push(bullet);
    }

    public removeBullet(index: number): void {
        this.app.stage.removeChild(this.bullets[index]);
        this.bullets.splice(index, 1);
    }
}