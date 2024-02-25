/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scss/style.scss":
/*!*****************************!*\
  !*** ./src/scss/style.scss ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/js/Asteroid.ts":
/*!****************************!*\
  !*** ./src/js/Asteroid.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Asteroid: () => (/* binding */ Asteroid)
/* harmony export */ });
var Asteroid = /** @class */ (function () {
    function Asteroid(app, events, asteroid) {
        this.events = events;
        this.app = app;
        this.asteroid = asteroid;
    }
    Asteroid.prototype.move = function () {
        var _this = this;
        this.asteroid.x = Math.random() * (this.app.view.width - this.asteroid.width) + this.asteroid.width / 2;
        this.asteroid.y = 0;
        this.app.stage.addChild(this.asteroid);
        this.events.emit(Asteroid.ASTEROID_ON_SCENE, { asteroid: this });
        var moveAsteroid = function () {
            requestAnimationFrame(moveAsteroid);
            _this.asteroid.y += Asteroid.SPEED;
            if (_this.asteroid.y > _this.app.view.height) {
                _this.app.stage.removeChild(_this.asteroid);
            }
        };
        requestAnimationFrame(moveAsteroid);
    };
    Asteroid.prototype.getContainer = function () {
        return this.asteroid;
    };
    Asteroid.prototype.hit = function () {
        this.events.emit(Asteroid.ASTEROID_DESTROYED, {});
        this.app.stage.removeChild(this.asteroid);
    };
    Asteroid.SPEED = 0.5;
    Asteroid.ASTEROID_ON_SCENE = 'asteroid_on_scene';
    Asteroid.ASTEROID_DESTROYED = 'asteroid_destroyed';
    return Asteroid;
}());



/***/ }),

/***/ "./src/js/AsteroidsProcessor.ts":
/*!**************************************!*\
  !*** ./src/js/AsteroidsProcessor.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AsteroidsProcessor: () => (/* binding */ AsteroidsProcessor)
/* harmony export */ });
/* harmony import */ var pixi_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! pixi.js */ "./node_modules/pixi.js/lib/index.mjs");
/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Game */ "./src/js/Game.ts");
/* harmony import */ var _Asteroid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Asteroid */ "./src/js/Asteroid.ts");
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};



var AsteroidsProcessor = /** @class */ (function () {
    function AsteroidsProcessor(app, events) {
        this.events = events;
        this.app = app;
        this._asteroids = this.generateAsteroids();
    }
    AsteroidsProcessor.prototype.generateAsteroids = function () {
        var _this = this;
        return __spreadArray([], Array(_Game__WEBPACK_IMPORTED_MODULE_1__.Game.MAX_ASTEROIDS), true).map(function () { return _this.createAsteroid(); });
    };
    AsteroidsProcessor.prototype.removeAsteroid = function () {
        this._asteroids.pop();
    };
    AsteroidsProcessor.prototype.process = function () {
        var _this = this;
        var asteroids = __spreadArray([], this._asteroids, true);
        var runProcess = setInterval(function () {
            asteroids
                .splice(0, _this.getRandomInt(1, 2))
                .forEach(function (asteroid) { return asteroid.move(); });
            if (!_this._asteroids.length) {
                clearInterval(runProcess);
            }
        }, this.getRandomInt(2000, 4000));
    };
    Object.defineProperty(AsteroidsProcessor.prototype, "asteroids", {
        get: function () {
            return this._asteroids;
        },
        enumerable: false,
        configurable: true
    });
    AsteroidsProcessor.prototype.createAsteroid = function () {
        var asteroid = new pixi_js__WEBPACK_IMPORTED_MODULE_0__.Graphics();
        asteroid.beginFill(0xCCCCCC);
        asteroid.drawCircle(0, 0, 30);
        asteroid.endFill();
        return new _Asteroid__WEBPACK_IMPORTED_MODULE_2__.Asteroid(this.app, this.events, asteroid);
    };
    AsteroidsProcessor.prototype.getRandomInt = function (min, max) {
        var minCelled = Math.ceil(min);
        var maxFloored = Math.floor(max);
        return Math.floor(Math.random() * (maxFloored - minCelled) + minCelled);
    };
    return AsteroidsProcessor;
}());



/***/ }),

/***/ "./src/js/Boss.ts":
/*!************************!*\
  !*** ./src/js/Boss.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Boss: () => (/* binding */ Boss)
/* harmony export */ });
/* harmony import */ var pixi_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! pixi.js */ "./node_modules/pixi.js/lib/index.mjs");
/* harmony import */ var _BossBullet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BossBullet */ "./src/js/BossBullet.ts");


var Boss = /** @class */ (function () {
    function Boss(app, events) {
        var _this = this;
        this.move = function () {
            _this.rocket.x += _this.speed;
            if (_this.rocket.x < _this.rocket.width / 2 || _this.rocket.x > _this.app.view.width - _this.rocket.width / 2) {
                _this.speed *= -1;
            }
        };
        this.hit = function () {
            _this.hp--;
            _this.updateHeathBar();
            if (_this.hp === 0) {
                _this.events.emit(Boss.ROCKET_DESTROYED, {});
            }
        };
        this.creatHealthBar = function () {
            _this.healthBar = new pixi_js__WEBPACK_IMPORTED_MODULE_0__.Graphics()
                .beginFill(0xFF0000)
                .drawRect(0, 0, 100, 10).endFill()
                .endFill();
            _this.healthBar.x = _this.app.view.width / 2 - 50;
            _this.healthBar.y = 10;
            _this.app.stage.addChild(_this.healthBar);
        };
        this.events = events;
        this.app = app;
        this.hp = Boss.MAX_HP;
        this.speed = Boss.SPEED_ROCKET;
        this.respawn();
        this.creatHealthBar();
    }
    Boss.prototype.getContainer = function () {
        return this.rocket;
    };
    Boss.prototype.shoot = function () {
        var _this = this;
        var bulletContainer = new _BossBullet__WEBPACK_IMPORTED_MODULE_1__.BossBullet(this.app, this.events);
        var bullet = bulletContainer.getContainer();
        bullet.x = this.rocket.x;
        bullet.y = this.rocket.y;
        var moveBullet = function () {
            animationId = requestAnimationFrame(moveBullet);
            bullet.y += Boss.SPEED_BULLET;
            if (bullet.y > _this.app.view.height) {
                _this.app.stage.removeChild(bullet);
                cancelAnimationFrame(animationId);
            }
        };
        var animationId = requestAnimationFrame(moveBullet);
    };
    Boss.prototype.respawn = function () {
        this.rocket = pixi_js__WEBPACK_IMPORTED_MODULE_0__.Sprite.from('image/boss.png');
        this.rocket.anchor.set(0.5);
        this.rocket.x = this.app.view.width / 2;
        this.rocket.y = 120;
        this.app.stage.addChild(this.rocket);
        this.events.emit(Boss.ROCKET_CREATED, { rocket: this });
    };
    ;
    Boss.prototype.updateHeathBar = function () {
        this.healthBar.clear()
            .beginFill(0xFF0000)
            .drawRect(0, 0, 100 * (this.hp / 4), 10)
            .endFill();
    };
    Boss.MAX_HP = 4;
    Boss.SPEED_ROCKET = 2;
    Boss.SPEED_BULLET = 2;
    Boss.ROCKET_DESTROYED = 'rocket_destroyed';
    Boss.ROCKET_CREATED = 'rocket_created';
    return Boss;
}());



/***/ }),

/***/ "./src/js/BossBullet.ts":
/*!******************************!*\
  !*** ./src/js/BossBullet.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BossBullet: () => (/* binding */ BossBullet)
/* harmony export */ });
/* harmony import */ var pixi_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! pixi.js */ "./node_modules/pixi.js/lib/index.mjs");

var BossBullet = /** @class */ (function () {
    function BossBullet(app, events) {
        var _this = this;
        this.createBullet = function () {
            var bullet = new pixi_js__WEBPACK_IMPORTED_MODULE_0__.Graphics()
                .beginFill(0x05CDFF)
                .drawCircle(0, 0, 20)
                .endFill();
            _this.app.stage.addChild(bullet);
            return bullet;
        };
        this.events = events;
        this.app = app;
        this.bullet = this.createBullet();
        this.events.emit(BossBullet.BULLET_CREATED, { bullet: this });
    }
    BossBullet.prototype.getContainer = function () {
        return this.bullet;
    };
    BossBullet.prototype.hit = function () {
        this.events.emit(BossBullet.BULLET_DESTROYED, {});
        this.app.stage.removeChild(this.bullet);
    };
    BossBullet.BULLET_DESTROYED = 'bullet_destroyed';
    BossBullet.BULLET_CREATED = 'bullet_created';
    return BossBullet;
}());



/***/ }),

/***/ "./src/js/BossBulletWatcher.ts":
/*!*************************************!*\
  !*** ./src/js/BossBulletWatcher.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BossBulletWatcher: () => (/* binding */ BossBulletWatcher)
/* harmony export */ });
var BossBulletWatcher = /** @class */ (function () {
    function BossBulletWatcher(app, player) {
        this.detectCollisions = function (bullets, player, callback) {
            var goalObject = player.rocket;
            bullets.forEach(function (bullet, bulletIndex) {
                if (bullet.x > goalObject.x - goalObject.width / 2 &&
                    bullet.x < goalObject.x + goalObject.width / 2 &&
                    bullet.y > goalObject.y - goalObject.height / 2 &&
                    bullet.y < goalObject.y + goalObject.height / 2) {
                    callback(bulletIndex);
                }
            });
        };
        this.bullets = [];
        this.player = player;
        this.app = app;
    }
    BossBulletWatcher.prototype.watch = function () {
        var _this = this;
        this.detectCollisions(this.bullets, this.player, function (bulletIndex) {
            _this.removeBullet(bulletIndex);
            _this.destroyPlayer();
        });
    };
    BossBulletWatcher.prototype.destroyPlayer = function () {
        this.player.destroy();
    };
    BossBulletWatcher.prototype.addBullet = function (bullet) {
        this.bullets.push(bullet);
    };
    BossBulletWatcher.prototype.removeBullet = function (index) {
        this.app.stage.removeChild(this.bullets[index]);
        this.bullets.splice(index, 1);
    };
    return BossBulletWatcher;
}());



/***/ }),

/***/ "./src/js/BulletWatcher.ts":
/*!*********************************!*\
  !*** ./src/js/BulletWatcher.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BulletWatcher: () => (/* binding */ BulletWatcher)
/* harmony export */ });
var BulletWatcher = /** @class */ (function () {
    function BulletWatcher(app) {
        var _this = this;
        this.detectCollisions = function (bullets, objectIndex, callback) {
            var goalObject = _this.objects[objectIndex].getContainer();
            bullets.forEach(function (bullet, bulletIndex) {
                if (bullet.x > goalObject.x - goalObject.width / 2 &&
                    bullet.x < goalObject.x + goalObject.width / 2 &&
                    bullet.y > goalObject.y - goalObject.height / 2 &&
                    bullet.y < goalObject.y + goalObject.height / 2) {
                    callback(bulletIndex, objectIndex);
                }
            });
        };
        this.bullets = [];
        this.objects = [];
        this.app = app;
    }
    BulletWatcher.prototype.watch = function () {
        var _this = this;
        this.objects.forEach(function (goalObject, goalObjectIndex) {
            _this.detectCollisions(_this.bullets, goalObjectIndex, function (bulletIndex, objectIndex) {
                _this.removeBullet(bulletIndex);
                _this.hitObject(objectIndex);
            });
        });
    };
    BulletWatcher.prototype.addObject = function (goalObject) {
        this.objects.push(goalObject);
    };
    BulletWatcher.prototype.hitObject = function (index) {
        this.objects[index].hit();
    };
    BulletWatcher.prototype.addBullet = function (bullet) {
        this.bullets.push(bullet);
    };
    BulletWatcher.prototype.removeBullet = function (index) {
        this.app.stage.removeChild(this.bullets[index]);
        this.bullets.splice(index, 1);
    };
    return BulletWatcher;
}());



/***/ }),

/***/ "./src/js/EventEmitter.ts":
/*!********************************!*\
  !*** ./src/js/EventEmitter.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EventEmitter: () => (/* binding */ EventEmitter)
/* harmony export */ });
var EventEmitter = /** @class */ (function () {
    function EventEmitter() {
        this.events = {};
    }
    /**
     * @param {string} eventName
     * @param {Function} callback
     */
    EventEmitter.prototype.subscribe = function (eventName, callback) {
        !this.events[eventName] && (this.events[eventName] = []);
        this.events[eventName].push(callback);
    };
    /**
     * @param {string} eventName
     * @param {Function} callback
     */
    EventEmitter.prototype.unsubscribe = function (eventName, callback) {
        this.events[eventName] = this.events[eventName].filter(function (eventCallback) { return callback !== eventCallback; });
    };
    /**
     * @param {string} eventName
     * @param {any} args
     */
    EventEmitter.prototype.emit = function (eventName, args) {
        var event = this.events[eventName];
        event && event.forEach(function (callback) { return callback.call(null, args); });
    };
    return EventEmitter;
}());



/***/ }),

/***/ "./src/js/Game.ts":
/*!************************!*\
  !*** ./src/js/Game.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Game: () => (/* binding */ Game)
/* harmony export */ });
/* harmony import */ var pixi_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! pixi.js */ "./node_modules/pixi.js/lib/index.mjs");
/* harmony import */ var _EventEmitter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EventEmitter */ "./src/js/EventEmitter.ts");
/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Player */ "./src/js/Player.ts");
/* harmony import */ var _AsteroidsProcessor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./AsteroidsProcessor */ "./src/js/AsteroidsProcessor.ts");
/* harmony import */ var _Boss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Boss */ "./src/js/Boss.ts");





var Game = /** @class */ (function () {
    function Game(app) {
        var _this = this;
        this.updateBulletsText = function (bulletsCount) {
            _this.bulletText.text = 'Bullets: ' + bulletsCount;
        };
        this.updateTimerText = function (remainingTime) {
            _this.timerText.text = 'Time: ' + remainingTime;
        };
        this.app = app;
        this.events = new _EventEmitter__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
        this.initBackGround();
        this.initBulletText(Game.MAX_BULLETS);
        this.initTimerText(Game.GAME_TIME);
        this._player = new _Player__WEBPACK_IMPORTED_MODULE_2__.Player(app, this.events);
        this.asteroidProcessor = new _AsteroidsProcessor__WEBPACK_IMPORTED_MODULE_3__.AsteroidsProcessor(app, this.events);
    }
    Game.prototype.startLevel1 = function () {
        this.reset();
        this.asteroidProcessor.process();
    };
    Game.prototype.startLevel2 = function () {
        var _this = this;
        this.reset();
        this.boss = new _Boss__WEBPACK_IMPORTED_MODULE_4__.Boss(this.app, this.events);
        this.app.ticker.add(function () {
            _this.boss.move();
        });
        var shootInterval = setInterval(function () {
            _this.boss.shoot();
        }, 2000);
    };
    Object.defineProperty(Game.prototype, "player", {
        get: function () {
            return this._player;
        },
        enumerable: false,
        configurable: true
    });
    Game.prototype.win = function () {
        var _this = this;
        var winText = new pixi_js__WEBPACK_IMPORTED_MODULE_0__.Text('YOU WIN', {
            fontFamily: 'Arial',
            fontSize: 48,
            fill: 0x00FF00,
            align: 'center',
        });
        winText.anchor.set(0.5);
        winText.x = this.app.view.width / 2;
        winText.y = this.app.view.height / 2;
        this.app.stage.addChild(winText);
        setTimeout(function () { return _this.app.ticker.stop(); }, 500);
    };
    Game.prototype.loose = function () {
        var _this = this;
        var loseText = new pixi_js__WEBPACK_IMPORTED_MODULE_0__.Text('YOU LOSE', {
            fontFamily: 'Arial',
            fontSize: 48,
            fill: 0xFF0000,
            align: 'center',
        });
        loseText.anchor.set(0.5);
        loseText.x = this.app.view.width / 2;
        loseText.y = this.app.view.height / 2;
        this.app.stage.addChild(loseText);
        setTimeout(function () { return _this.app.ticker.stop(); }, 500);
    };
    Game.prototype.on = function (eventName, callback) {
        this.events.subscribe(eventName, callback);
    };
    Game.prototype.initBulletText = function (bulletsCount) {
        this.bulletText = new pixi_js__WEBPACK_IMPORTED_MODULE_0__.Text('Bullets: ' + bulletsCount, {
            fontFamily: 'Arial',
            fontSize: 24,
            fill: 0xFFFFFF,
        });
        this.bulletText.anchor.set(0, 0);
        this.bulletText.x = 10;
        this.bulletText.y = 10;
        this.app.stage.addChild(this.bulletText);
    };
    Game.prototype.initTimerText = function (remainingTime) {
        this.timerText = new pixi_js__WEBPACK_IMPORTED_MODULE_0__.Text('Time: ' + remainingTime, {
            fontFamily: 'Arial',
            fontSize: 24,
            fill: 0xFFFFFF,
        });
        this.timerText.anchor.set(1, 0);
        this.timerText.x = this.app.view.width - 10;
        this.timerText.y = 10;
        this.app.stage.addChild(this.timerText);
    };
    Game.prototype.initBackGround = function () {
        var background = pixi_js__WEBPACK_IMPORTED_MODULE_0__.Sprite.from("./image/space.jpg");
        background.width = this.app.view.width;
        background.height = this.app.view.height;
        this.app.stage.addChild(background);
    };
    Game.prototype.startTimer = function () {
        var _this = this;
        var remainingSeconds = Game.GAME_TIME;
        var gameTimer = setInterval(function () {
            remainingSeconds--;
            _this.updateTimerText(remainingSeconds);
            if (remainingSeconds <= 0) {
                _this.loose();
                clearInterval(gameTimer);
            }
        }, 1000);
    };
    Game.prototype.reset = function () {
        this.updateTimerText(Game.GAME_TIME);
        this.updateBulletsText(Game.MAX_BULLETS);
        this.startTimer();
        this._player.respawn();
    };
    Game.GAME_TIME = 60;
    Game.MAX_BULLETS = 10;
    Game.MAX_ASTEROIDS = 1;
    return Game;
}());



/***/ }),

/***/ "./src/js/Player.ts":
/*!**************************!*\
  !*** ./src/js/Player.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Player: () => (/* binding */ Player)
/* harmony export */ });
/* harmony import */ var pixi_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! pixi.js */ "./node_modules/pixi.js/lib/index.mjs");
/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Game */ "./src/js/Game.ts");
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};


var Player = /** @class */ (function () {
    function Player(app, events) {
        this.events = events;
        this.app = app;
        this.respawn();
        this.chargeBullets();
    }
    Player.prototype.getBulletsCount = function () {
        return this.bullets.length;
    };
    Player.prototype.respawn = function () {
        this.removeRocket();
        this._rocket = pixi_js__WEBPACK_IMPORTED_MODULE_0__.Sprite.from('image/rocket.png');
        this._rocket.anchor.set(0.5);
        this._rocket.x = this.app.view.width / 2;
        this._rocket.y = this.app.view.height - 64;
        this.app.stage.addChild(this._rocket);
    };
    Player.prototype.chargeBullets = function () {
        this.bullets = __spreadArray([], Array(_Game__WEBPACK_IMPORTED_MODULE_1__.Game.MAX_BULLETS), true).map(this.createBullet);
    };
    Object.defineProperty(Player.prototype, "rocket", {
        get: function () {
            return this._rocket;
        },
        enumerable: false,
        configurable: true
    });
    Player.prototype.moveRight = function () {
        if (this.rocket.x < this.app.view.width - this.rocket.width / 2) {
            this._rocket.x += Player.SPEED_ROCKET;
        }
    };
    Player.prototype.moveLeft = function () {
        if (this.rocket.x - this.rocket.width / 2 > 0) {
            this._rocket.x -= Player.SPEED_ROCKET;
        }
    };
    Player.prototype.shoot = function () {
        var _this = this;
        if (!this.bullets.length) {
            return;
        }
        var bullet = this.bullets.pop();
        this.events.emit(Player.SHOOT_EVENT, { player: this, bullet: bullet });
        bullet.x = this._rocket.x;
        bullet.y = this._rocket.y;
        this.app.stage.addChild(bullet);
        var moveBullet = function () {
            animationId = requestAnimationFrame(moveBullet);
            bullet.y -= Player.SPEED_BULLET;
            if (bullet.y < 0) {
                _this.app.stage.removeChild(bullet);
                if (_this.isBulletsEmpty()) {
                    _this.events.emit(Player.OUT_OF_BULLETS, {});
                }
                cancelAnimationFrame(animationId);
            }
        };
        var animationId = requestAnimationFrame(moveBullet);
    };
    Player.prototype.isBulletsEmpty = function () {
        return this.getBulletsCount() === 0;
    };
    Player.prototype.removeRocket = function () {
        this.app.stage.removeChild(this._rocket);
    };
    Player.prototype.createBullet = function () {
        var bullet = new pixi_js__WEBPACK_IMPORTED_MODULE_0__.Graphics();
        bullet.beginFill(0x09DCDD);
        bullet.drawCircle(0, 0, 9);
        bullet.endFill();
        return bullet;
    };
    Player.prototype.destroy = function () {
        this.events.emit(Player.DESTROYED, {});
    };
    Player.SPEED_BULLET = 4;
    Player.SPEED_ROCKET = 20;
    Player.SHOOT_EVENT = 'player_shoot';
    Player.DESTROYED = 'destroyed';
    Player.OUT_OF_BULLETS = 'out of bullets';
    return Player;
}());



/***/ }),

/***/ "./src/js/common.ts":
/*!**************************!*\
  !*** ./src/js/common.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scss/style.scss */ "./src/scss/style.scss");
/* harmony import */ var pixi_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! pixi.js */ "./node_modules/pixi.js/lib/index.mjs");
/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Player */ "./src/js/Player.ts");
/* harmony import */ var _BulletWatcher__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./BulletWatcher */ "./src/js/BulletWatcher.ts");
/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Game */ "./src/js/Game.ts");
/* harmony import */ var _Asteroid__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Asteroid */ "./src/js/Asteroid.ts");
/* harmony import */ var _Boss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Boss */ "./src/js/Boss.ts");
/* harmony import */ var _BossBullet__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./BossBullet */ "./src/js/BossBullet.ts");
/* harmony import */ var _BossBulletWatcher__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./BossBulletWatcher */ "./src/js/BossBulletWatcher.ts");
// SCSS









// Create Scene And Add To Body
var appWidth = 1280;
var appHeight = 720;
var app = new pixi_js__WEBPACK_IMPORTED_MODULE_1__.Application({ width: appWidth, height: appHeight });
document.body.appendChild(app.view);
var game = new _Game__WEBPACK_IMPORTED_MODULE_4__.Game(app);
var player = game.player;
var bulletWatcher = new _BulletWatcher__WEBPACK_IMPORTED_MODULE_3__.BulletWatcher(app);
var bossBulletWatcher = new _BossBulletWatcher__WEBPACK_IMPORTED_MODULE_8__.BossBulletWatcher(app, player);
game.startLevel1();
game.on(_Player__WEBPACK_IMPORTED_MODULE_2__.Player.OUT_OF_BULLETS, function () {
    game.loose();
});
game.on(_Player__WEBPACK_IMPORTED_MODULE_2__.Player.SHOOT_EVENT, function (e) {
    bulletWatcher.addBullet(e.bullet);
    game.updateBulletsText(player.getBulletsCount());
});
game.on(_Asteroid__WEBPACK_IMPORTED_MODULE_5__.Asteroid.ASTEROID_ON_SCENE, function (e) {
    bulletWatcher.addObject(e.asteroid);
});
game.on(_Boss__WEBPACK_IMPORTED_MODULE_6__.Boss.ROCKET_CREATED, function (e) {
    bulletWatcher.addObject(e.rocket);
});
game.on(_BossBullet__WEBPACK_IMPORTED_MODULE_7__.BossBullet.BULLET_CREATED, function (e) {
    bulletWatcher.addObject(e.bullet);
    bossBulletWatcher.addBullet(e.bullet.getContainer());
});
game.on(_Player__WEBPACK_IMPORTED_MODULE_2__.Player.DESTROYED, function () {
    game.loose();
});
game.on(_Boss__WEBPACK_IMPORTED_MODULE_6__.Boss.ROCKET_DESTROYED, function () {
    game.win();
});
game.on(_Asteroid__WEBPACK_IMPORTED_MODULE_5__.Asteroid.ASTEROID_DESTROYED, function () {
    game.asteroidProcessor.removeAsteroid();
    if (!game.asteroidProcessor.asteroids.length) {
        game.startLevel2();
    }
});
// Player Actions
window.addEventListener("keydown", function (e) {
    e.preventDefault();
    switch (e.key) {
        case 'ArrowLeft':
            player.moveLeft();
            break;
        case 'ArrowRight':
            player.moveRight();
            break;
        case ' ':
            player.shoot();
            break;
    }
});
app.ticker.add(function () {
    bulletWatcher.watch();
    bossBulletWatcher.watch();
});


/***/ }),

/***/ "?4f7e":
/*!********************************!*\
  !*** ./util.inspect (ignored) ***!
  \********************************/
/***/ (() => {

/* (ignored) */

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var chunkIds = deferred[i][0];
/******/ 				var fn = deferred[i][1];
/******/ 				var priority = deferred[i][2];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"common": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkwebpack"] = self["webpackChunkwebpack"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	__webpack_require__.O(undefined, ["vendors-node_modules_babel_polyfill_lib_index_js-node_modules_pixi_js_lib_index_mjs"], () => (__webpack_require__("./node_modules/@babel/polyfill/lib/index.js")))
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_babel_polyfill_lib_index_js-node_modules_pixi_js_lib_index_mjs"], () => (__webpack_require__("./src/js/common.ts")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;