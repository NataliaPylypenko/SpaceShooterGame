import * as PIXI from 'pixi.js';
import {EnemyObjectInterface} from "./EnemyObjectInterface";

export class BulletWatcher {
    private bullets: PIXI.Graphics[];
    private objects: EnemyObjectInterface[];
    private app: PIXI.Application<HTMLCanvasElement>;

    public constructor(app: PIXI.Application<HTMLCanvasElement>) {
        this.bullets = [];
        this.objects = [];
        this.app = app;
    }

    public watch(): void {
        this.objects.forEach((goalObject, goalObjectIndex: number) => {
            this.detectCollisions(this.bullets, goalObjectIndex, (bulletIndex: number, objectIndex: number) => {
                this.removeBullet(bulletIndex);
                this.hitObject(objectIndex);
            })
        })
    }

    private detectCollisions = (bullets: PIXI.Graphics[], objectIndex: number, callback: Function): void => {
        const goalObject = this.objects[objectIndex].getContainer();
        bullets.forEach((bullet: PIXI.Graphics, bulletIndex: number): void => {
            if (bullet.x > goalObject.x - goalObject.width / 2 &&
                bullet.x < goalObject.x + goalObject.width / 2 &&
                bullet.y > goalObject.y - goalObject.height / 2 &&
                bullet.y < goalObject.y + goalObject.height / 2) {
                callback(bulletIndex, objectIndex);
            }
        })
    };

    public addObject(goalObject: EnemyObjectInterface): void {
        this.objects.push(goalObject)
    }

    public hitObject(index: number): void {
        this.objects[index].hit()
    }

    public addBullet(bullet: PIXI.Graphics): void {
        this.bullets.push(bullet);
    }

    public removeBullet(index: number): void {
        this.app.stage.removeChild(this.bullets[index]);
        this.bullets.splice(index, 1);
    }
}