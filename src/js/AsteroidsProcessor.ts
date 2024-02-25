import * as PIXI from "pixi.js";
import {EventEmitter} from "./EventEmitter";
import {Game} from "./Game";
import {Asteroid} from "./Asteroid";

export class AsteroidsProcessor {
    private app: PIXI.Application<HTMLCanvasElement>;
    private events: EventEmitter;
    private _asteroids: Asteroid[];

    constructor(app: PIXI.Application<HTMLCanvasElement>, events: EventEmitter) {
        this.events = events;
        this.app = app;
        this._asteroids = this.generateAsteroids()
    }

    public generateAsteroids(): Asteroid[]
    {
        return [...Array(Game.MAX_ASTEROIDS)].map(() => this.createAsteroid())
    }

    public removeAsteroid(): void{
        this._asteroids.pop();
    }

    public process(): void {
        const asteroids = [... this._asteroids];
        const runProcess = setInterval(() => {
            asteroids
                .splice(0, this.getRandomInt(1, 2))
                .forEach((asteroid) => asteroid.move());

            if (!this._asteroids.length) {
                clearInterval(runProcess);
            }
        }, this.getRandomInt(2000, 4000))
    }

    get asteroids(): Asteroid[] {
        return this._asteroids;
    }

    private createAsteroid(): Asteroid {
        const asteroid: PIXI.Graphics = new PIXI.Graphics();
        asteroid.beginFill(0xCCCCCC);
        asteroid.drawCircle(0, 0, 30);
        asteroid.endFill();
        return new Asteroid(this.app, this.events, asteroid);
    }

    private getRandomInt(min: number, max: number): number {
        const minCelled = Math.ceil(min);
        const maxFloored = Math.floor(max);
        return Math.floor(Math.random() * (maxFloored - minCelled) + minCelled);
    }
}