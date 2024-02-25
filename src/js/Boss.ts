import * as PIXI from "pixi.js";
import {EnemyObjectInterface} from "./EnemyObjectInterface";
import {Container} from "pixi.js";
import {EventEmitter} from "./EventEmitter";
import {BossBullet} from "./BossBullet";

export class Boss implements EnemyObjectInterface {
    static readonly MAX_HP: number = 4;
    static readonly SPEED_ROCKET: number = 2;
    static readonly SPEED_BULLET: number = 2;

    static readonly ROCKET_DESTROYED = 'rocket_destroyed';
    static readonly ROCKET_CREATED = 'rocket_created';

    private hp: number;
    private speed: number;

    private app: PIXI.Application<HTMLCanvasElement>;
    private events: EventEmitter;
    private rocket: PIXI.Sprite;
    private healthBar: PIXI.Graphics;

    constructor(app: PIXI.Application<HTMLCanvasElement>, events: EventEmitter) {
        this.events = events;
        this.app = app;
        this.hp = Boss.MAX_HP;
        this.speed = Boss.SPEED_ROCKET;

        this.respawn();
        this.creatHealthBar();
    }

    public move = (): void => {
        this.rocket.x += this.speed;

        if (this.rocket.x < this.rocket.width / 2 || this.rocket.x > this.app.view.width - this.rocket.width / 2) {
            this.speed *= -1;
        }
    };

    public getContainer(): Container {
        return this.rocket;
    }

    public hit = (): void => {
        this.hp--;

        this.updateHeathBar();

        if (this.hp === 0) {
            this.events.emit(Boss.ROCKET_DESTROYED, {})
        }
    };

    public shoot(): void {
        const bulletContainer = new BossBullet(this.app, this.events);
        const bullet = bulletContainer.getContainer();
        bullet.x = this.rocket.x;
        bullet.y = this.rocket.y;

        const moveBullet = () => {
            animationId = requestAnimationFrame(moveBullet);
            bullet.y += Boss.SPEED_BULLET;

            if (bullet.y > this.app.view.height) {
                this.app.stage.removeChild(bullet);
                cancelAnimationFrame(animationId);
            }
        };
        let animationId= requestAnimationFrame(moveBullet);
    }

    private respawn(): void {
        this.rocket = PIXI.Sprite.from('image/boss.png');
        this.rocket.anchor.set(0.5);
        this.rocket.x = this.app.view.width / 2;
        this.rocket.y = 120;
        this.app.stage.addChild(this.rocket);
        this.events.emit(Boss.ROCKET_CREATED, {rocket: this})
    };

    private creatHealthBar = (): void => {
        this.healthBar = new PIXI.Graphics()
            .beginFill(0xFF0000)
            .drawRect(0, 0, 100, 10).endFill()
            .endFill();
        this.healthBar.x = this.app.view.width / 2 - 50;
        this.healthBar.y = 10;
        this.app.stage.addChild(this.healthBar);
    };

    private updateHeathBar(): void {
        this.healthBar.clear()
            .beginFill(0xFF0000)
            .drawRect(0, 0, 100 * (this.hp / 4), 10)
            .endFill();
    }
}