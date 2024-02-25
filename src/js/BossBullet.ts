import * as PIXI from "pixi.js";
import {Container} from "pixi.js";
import {EnemyObjectInterface} from "./EnemyObjectInterface";
import {EventEmitter} from "./EventEmitter";

export class BossBullet implements EnemyObjectInterface {
    static readonly BULLET_DESTROYED = 'bullet_destroyed';
    static readonly BULLET_CREATED = 'bullet_created';

    private app: PIXI.Application<HTMLCanvasElement>;
    private events: EventEmitter;
    private bullet: PIXI.Graphics;

    constructor(app: PIXI.Application<HTMLCanvasElement>, events: EventEmitter) {
        this.events = events;
        this.app = app;
        this.bullet = this.createBullet();
        this.events.emit(BossBullet.BULLET_CREATED, {bullet: this})
    }

    getContainer(): Container {
        return this.bullet;
    }

    hit(): void {
        this.events.emit(BossBullet.BULLET_DESTROYED, {});
        this.app.stage.removeChild(this.bullet);
    }

    private createBullet = (): PIXI.Graphics => {
        const bullet: PIXI.Graphics = new PIXI.Graphics()
            .beginFill(0x05CDFF)
            .drawCircle(0, 0, 20)
            .endFill();

        this.app.stage.addChild(bullet);
        return bullet;
    };
}
