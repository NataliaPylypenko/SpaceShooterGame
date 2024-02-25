import * as PIXI from 'pixi.js';
import {EventEmitter} from "./EventEmitter";
import {Game} from "./Game";

export class Player {
    static readonly SPEED_BULLET = 4;
    static readonly SPEED_ROCKET = 20;

    static readonly SHOOT_EVENT = 'player_shoot';
    static readonly DESTROYED = 'destroyed';
    static readonly OUT_OF_BULLETS = 'out of bullets';

    private events: EventEmitter;
    private app: PIXI.Application<HTMLCanvasElement>;
    private bullets: PIXI.Graphics[];
    private _rocket: PIXI.Sprite;

    constructor(app: PIXI.Application<HTMLCanvasElement>, events: EventEmitter) {
        this.events = events;
        this.app = app;
        this.respawn();
        this.chargeBullets();
    }

    public getBulletsCount(): number {
        return this.bullets.length;
    }

    public respawn(): void {
        this.removeRocket();
        this._rocket = PIXI.Sprite.from('image/rocket.png');
        this._rocket.anchor.set(0.5);
        this._rocket.x = this.app.view.width / 2;
        this._rocket.y = this.app.view.height - 64;

        this.app.stage.addChild(this._rocket)
    }

    public chargeBullets(): void {
       this.bullets = [...Array(Game.MAX_BULLETS)].map(this.createBullet)
    }

    get rocket(): PIXI.Sprite {
        return this._rocket;
    }

    moveRight(): void {
        if (this.rocket.x < this.app.view.width - this.rocket.width / 2) {
            this._rocket.x += Player.SPEED_ROCKET;
        }
    }

    moveLeft(): void {
        if (this.rocket.x - this.rocket.width / 2 > 0) {
            this._rocket.x -= Player.SPEED_ROCKET;
        }
    }

    shoot(): void {
        if (!this.bullets.length) {
            return;
        }
        const bullet: PIXI.Graphics = this.bullets.pop();

        this.events.emit(Player.SHOOT_EVENT, {player: this, bullet: bullet});

        bullet.x = this._rocket.x;
        bullet.y = this._rocket.y;
        this.app.stage.addChild(bullet);

        const moveBullet = () => {
            animationId = requestAnimationFrame(moveBullet);
            bullet.y -= Player.SPEED_BULLET;

            if (bullet.y < 0) {
                this.app.stage.removeChild(bullet);
                if (this.isBulletsEmpty()) {
                    this.events.emit(Player.OUT_OF_BULLETS, {})
                }
                cancelAnimationFrame(animationId);
            }
        };
       let animationId= requestAnimationFrame(moveBullet);
    }

    private isBulletsEmpty(): boolean {
        return this.getBulletsCount() === 0;
    }

    private removeRocket(): void {
        this.app.stage.removeChild(this._rocket)
    }

    private createBullet(): PIXI.Graphics {
        const bullet: PIXI.Graphics = new PIXI.Graphics();
        bullet.beginFill(0x09DCDD);
        bullet.drawCircle(0, 0, 9);
        bullet.endFill();
        return bullet;
    }

    public destroy() {
        this.events.emit(Player.DESTROYED, {})
    }
}