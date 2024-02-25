import * as PIXI from 'pixi.js';

export interface EnemyObjectInterface {
    hit(): void;
    getContainer(): PIXI.Container;
}