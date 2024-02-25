import {EnemyObjectInterface} from "./EnemyObjectInterface";
import * as PIXI from 'pixi.js';
import {EventEmitter} from "./EventEmitter";
import {Container} from "pixi.js";

export class Asteroid implements EnemyObjectInterface {
    static readonly SPEED: number = 0.5;

    static readonly ASTEROID_ON_SCENE = 'asteroid_on_scene';
    static readonly ASTEROID_DESTROYED = 'asteroid_destroyed';

    private asteroid: PIXI.Graphics;

    private app: PIXI.Application<HTMLCanvasElement>;
    private events: EventEmitter;

    constructor(app: PIXI.Application<HTMLCanvasElement>, events: EventEmitter, asteroid: PIXI.Graphics) {
        this.events = events;
        this.app = app;
        this.asteroid = asteroid;
    }

    public move(): void {
        this.asteroid.x = Math.random() * (this.app.view.width - this.asteroid.width) + this.asteroid.width / 2;
        this.asteroid.y = 0;
        this.app.stage.addChild(this.asteroid);

        this.events.emit(Asteroid.ASTEROID_ON_SCENE, {asteroid: this})

        const moveAsteroid = () => {
            requestAnimationFrame(moveAsteroid);
            this.asteroid.y += Asteroid.SPEED;

            if (this.asteroid.y > this.app.view.height) {
                this.app.stage.removeChild(this.asteroid);
            }
        };
        requestAnimationFrame(moveAsteroid);
    }

    getContainer(): Container {
        return this.asteroid;
    }

    public hit(): void {
        this.events.emit(Asteroid.ASTEROID_DESTROYED, {});
        this.app.stage.removeChild(this.asteroid);
    }
}