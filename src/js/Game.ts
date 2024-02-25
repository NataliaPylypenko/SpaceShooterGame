import * as PIXI from "pixi.js";
import {EventEmitter} from "./EventEmitter";
import {Player} from "./Player";
import {AsteroidsProcessor} from "./AsteroidsProcessor";
import {Boss} from "./Boss";

export class Game {
    static readonly GAME_TIME: number = 60;
    static readonly MAX_BULLETS: number = 10;
    static readonly MAX_ASTEROIDS: number = 1;

    private events: EventEmitter;
    private app: PIXI.Application<HTMLCanvasElement>;
    private bulletText: PIXI.Text;
    private timerText: PIXI.Text;

    private _player: Player;

    private boss: Boss;
    public asteroidProcessor: AsteroidsProcessor;

    constructor(app: PIXI.Application<HTMLCanvasElement>) {
        this.app = app;
        this.events = new EventEmitter();
        this.initBackGround();
        this.initBulletText(Game.MAX_BULLETS);
        this.initTimerText(Game.GAME_TIME);

        this._player = new Player(app, this.events);
        this.asteroidProcessor = new AsteroidsProcessor(app, this.events);
    }

    public startLevel1(): void {
        this.reset();
        this.asteroidProcessor.process()
    }

    public startLevel2(): void {
        this.reset();

        this.boss = new Boss(this.app, this.events);

        this.app.ticker.add(() => {
            this.boss.move();
        });

        let shootInterval = setInterval(() => {
            this.boss.shoot();
        }, 2000);
    }

    get player(): Player {
        return this._player;
    }

    public updateBulletsText = (bulletsCount: number): void => {
        this.bulletText.text = 'Bullets: ' + bulletsCount;
    };

    public updateTimerText = (remainingTime: number): void => {
        this.timerText.text = 'Time: ' + remainingTime;
    };

    public win(): void
    {
        const winText = new PIXI.Text('YOU WIN', {
            fontFamily: 'Arial',
            fontSize: 48,
            fill: 0x00FF00,
            align: 'center',
        });
        winText.anchor.set(0.5);
        winText.x = this.app.view.width / 2;
        winText.y = this.app.view.height / 2;
        this.app.stage.addChild(winText);

        setTimeout(() => this.app.ticker.stop(), 500);
    }

    public loose(): void
    {
        const loseText: PIXI.Text = new PIXI.Text('YOU LOSE', {
            fontFamily: 'Arial',
            fontSize: 48,
            fill: 0xFF0000,
            align: 'center',
        });
        loseText.anchor.set(0.5);
        loseText.x = this.app.view.width / 2;
        loseText.y = this.app.view.height / 2;
        this.app.stage.addChild(loseText);

        setTimeout(() => this.app.ticker.stop(), 500);
    }

    public on(eventName: string, callback: Function): void {
        this.events.subscribe(eventName, callback);
    }

    private initBulletText(bulletsCount: number): void {
        this.bulletText = new PIXI.Text('Bullets: ' + bulletsCount, {
            fontFamily: 'Arial',
            fontSize: 24,
            fill: 0xFFFFFF,
        });

        this.bulletText.anchor.set(0, 0);
        this.bulletText.x = 10;
        this.bulletText.y = 10;
        this.app.stage.addChild(this.bulletText);
    }

    private initTimerText(remainingTime: number): void {
        this.timerText = new PIXI.Text('Time: ' + remainingTime, {
            fontFamily: 'Arial',
            fontSize: 24,
            fill: 0xFFFFFF,
        });
        this.timerText.anchor.set(1, 0);
        this.timerText.x = this.app.view.width - 10;
        this.timerText.y = 10;
        this.app.stage.addChild(this.timerText);
    }

    private initBackGround(): void
    {
        const background: PIXI.Sprite = PIXI.Sprite.from("./image/space.jpg");
        background.width = this.app.view.width;
        background.height = this.app.view.height;
        this.app.stage.addChild(background);
    }

    private startTimer(): void {
        let remainingSeconds: number = Game.GAME_TIME;
        const gameTimer: NodeJS.Timeout = setInterval(() => {
            remainingSeconds--;
            this.updateTimerText(remainingSeconds);

            if (remainingSeconds <= 0) {
                this.loose();
                clearInterval(gameTimer);
            }
        }, 1000);
    }

    private reset(): void {
        this.updateTimerText(Game.GAME_TIME);
        this.updateBulletsText(Game.MAX_BULLETS);
        this.startTimer();
        this._player.respawn();
    }
}