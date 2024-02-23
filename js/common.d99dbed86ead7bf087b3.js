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

/***/ "./src/js/common.ts":
/*!**************************!*\
  !*** ./src/js/common.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scss/style.scss */ "./src/scss/style.scss");
/* harmony import */ var pixi_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! pixi.js */ "./node_modules/pixi.js/lib/index.mjs");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// SCSS


// Create Scene And Add To Body
var appWidth = 1280;
var appHeight = 720;
var app = new pixi_js__WEBPACK_IMPORTED_MODULE_1__.Application({ width: appWidth, height: appHeight });
document.body.appendChild(app.view);
// Constants
var GAME_TIME = 60;
var NUMBER = 10;
var MAX_ASTEROIDS = NUMBER;
var MAX_BULLETS = NUMBER;
var SPEED_ASTEROIDS = 3;
var SPEED_BULLETS = 5;
var SPEED_PLAYER = 15;
var playerBullets = [];
var playerBulletsOnStage = [];
var asteroids = [];
var remainingTime = GAME_TIME;
var gameTimer;
var levelTwoStarted = false;
var boss;
var bossHealthBar;
var bossBulletsOnStage = [];
var bossHP = 4;
var bossSpeed = 2;
var lastBossBulletTime = 0;
// Create Elements And Add To Scene
// Background
var background = pixi_js__WEBPACK_IMPORTED_MODULE_1__.Sprite.from("./image/space.jpg");
background.width = appWidth;
background.height = appHeight;
app.stage.addChild(background);
// Player
var player = pixi_js__WEBPACK_IMPORTED_MODULE_1__.Sprite.from('image/rocket.png');
player.anchor.set(0.5);
player.x = appWidth / 2;
player.y = appHeight - 64;
app.stage.addChild(player);
// Message "YOU WIN"
var winText = new pixi_js__WEBPACK_IMPORTED_MODULE_1__.Text('YOU WIN', {
    fontFamily: 'Arial',
    fontSize: 48,
    fill: 0x00FF00,
    align: 'center',
});
winText.anchor.set(0.5);
winText.x = appWidth / 2;
winText.y = appHeight / 2;
app.stage.addChild(winText);
winText.visible = false;
// Message "YOU LOSE"
var loseText = new pixi_js__WEBPACK_IMPORTED_MODULE_1__.Text('YOU LOSE', {
    fontFamily: 'Arial',
    fontSize: 48,
    fill: 0xFF0000,
    align: 'center',
});
loseText.anchor.set(0.5);
loseText.x = appWidth / 2;
loseText.y = appHeight / 2;
app.stage.addChild(loseText);
loseText.visible = false;
// Shots
var bulletText = new pixi_js__WEBPACK_IMPORTED_MODULE_1__.Text('Bullets: ' + MAX_BULLETS, {
    fontFamily: 'Arial',
    fontSize: 24,
    fill: 0xFFFFFF,
});
bulletText.anchor.set(0, 0);
bulletText.x = 10;
bulletText.y = 10;
app.stage.addChild(bulletText);
// Timer
var timerText = new pixi_js__WEBPACK_IMPORTED_MODULE_1__.Text('Time: ' + remainingTime, {
    fontFamily: 'Arial',
    fontSize: 24,
    fill: 0xFFFFFF,
});
timerText.anchor.set(1, 0);
timerText.x = appWidth - 10;
timerText.y = 10;
app.stage.addChild(timerText);
// Bullet
var createPlayerBullet = function () {
    var bullet = new pixi_js__WEBPACK_IMPORTED_MODULE_1__.Graphics();
    bullet.beginFill(0x09DCDD);
    bullet.drawCircle(0, 0, 9);
    bullet.endFill();
    return bullet;
};
// Asteroid
var createAndMoveAsteroid = function () {
    var asteroid = new pixi_js__WEBPACK_IMPORTED_MODULE_1__.Graphics();
    asteroid.beginFill(0xCCCCCC);
    asteroid.drawCircle(0, 0, 30);
    asteroid.endFill();
    asteroid.x = Math.random() * (appWidth - asteroid.width) + asteroid.width / 2;
    asteroid.y = Math.random() * appHeight - appHeight;
    app.stage.addChild(asteroid);
    asteroids.push(asteroid);
    var moveAsteroid = setInterval(function () {
        asteroid.y += SPEED_ASTEROIDS;
        if (asteroid.y > appHeight) {
            app.stage.removeChild(asteroid);
            clearInterval(moveAsteroid);
        }
    }, 1000 / 10);
};
// Boss
var createBoss = function () {
    boss = pixi_js__WEBPACK_IMPORTED_MODULE_1__.Sprite.from('image/boss.png');
    boss.anchor.set(0.5);
    boss.x = appWidth / 2;
    boss.y = 120;
    app.stage.addChild(boss);
};
var createBossHealthBar = function () {
    bossHealthBar = new pixi_js__WEBPACK_IMPORTED_MODULE_1__.Graphics();
    bossHealthBar.beginFill(0xFF0000);
    bossHealthBar.drawRect(0, 0, 100, 10);
    bossHealthBar.endFill();
    bossHealthBar.x = appWidth / 2 - 50;
    bossHealthBar.y = 10;
    app.stage.addChild(bossHealthBar);
};
// BossBullet
var createBossBullet = function () {
    var bossBullet = new pixi_js__WEBPACK_IMPORTED_MODULE_1__.Graphics();
    bossBullet.beginFill(0x05CDFF);
    bossBullet.drawCircle(0, 0, 20);
    bossBullet.endFill();
    bossBullet.x = boss.x;
    bossBullet.y = boss.y;
    return bossBullet;
};
var shootOutPlayer = function () {
    if (!playerBullets.length) {
        return;
    }
    var bullet = playerBullets.pop();
    bullet.x = player.x;
    bullet.y = player.y;
    app.stage.addChild(bullet);
    playerBulletsOnStage.push(bullet);
    updateBulletsText();
    var moveBullet = setInterval(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            bullet.y -= SPEED_BULLETS;
            if (playerBullets.length === 0) {
                if (bullet.y < 0) {
                    loseText.visible = true;
                    stopAnimation('gameTimer', 250);
                }
            }
            if (bullet.y < 0) {
                app.stage.removeChild(bullet);
                playerBulletsOnStage.pop();
                clearInterval(moveBullet);
            }
            return [2 /*return*/];
        });
    }); }, 1000 / 60);
};
var shootOutBoss = function () {
    var bossBullet = createBossBullet();
    app.stage.addChild(bossBullet);
    bossBulletsOnStage.push(bossBullet);
    var moveBossBullet = setInterval(function () {
        bossBullet.y += SPEED_BULLETS;
        if (bossBullet.y > appHeight) {
            clearInterval(moveBossBullet);
            app.stage.removeChild(bossBullet);
            bossBulletsOnStage.pop();
        }
    }, 1000 / 60);
};
var detectCollisionsWithAsteroid = function () {
    asteroids.forEach(function (asteroid, ai) {
        _detectCollisionsWithObjects(playerBulletsOnStage, asteroid, function (bulletIdx) {
            app.stage.removeChild(playerBulletsOnStage[bulletIdx]);
            app.stage.removeChild(asteroid);
            asteroids.splice(ai, 1);
            playerBulletsOnStage.splice(bulletIdx, 1);
        });
    });
};
var detectCollisionsWithBoss = function () {
    console.log('shoot');
    _detectCollisionsWithObjects(playerBulletsOnStage, boss, function (bulletIdx) {
        hitBoss();
        app.stage.removeChild(playerBulletsOnStage[bulletIdx]);
        playerBulletsOnStage.splice(bulletIdx, 1);
    });
};
var detectCollisionsWithPlayer = function () {
    _detectCollisionsWithObjects(bossBulletsOnStage, player, function () {
        loseText.visible = true;
        stopAnimation('moveBossBullet', 200);
    });
};
var detectCollisionsWithBullets = function () {
    playerBulletsOnStage.forEach(function (playerBullet, pbi) {
        bossBulletsOnStage.forEach(function (bossBullet, bbi) {
            if (playerBullet.x > bossBullet.x - bossBullet.width / 2 &&
                playerBullet.x < bossBullet.x + bossBullet.width / 2 &&
                playerBullet.y > bossBullet.y - bossBullet.height / 2 &&
                playerBullet.y < bossBullet.y + bossBullet.height / 2) {
                bossBulletsOnStage.splice(bbi, 1);
                playerBulletsOnStage.splice(pbi, 1);
                app.stage.removeChild(playerBullet);
                app.stage.removeChild(bossBullet);
            }
        });
    });
};
var _detectCollisionsWithObjects = function (bullets, goalObject, callback) {
    bullets.forEach(function (bullet, index) {
        if (bullet.x > goalObject.x - goalObject.width / 2 &&
            bullet.x < goalObject.x + goalObject.width / 2 &&
            bullet.y > goalObject.y - goalObject.height / 2 &&
            bullet.y < goalObject.y + goalObject.height / 2) {
            callback(index);
        }
    });
};
var handlePlayerAction = function (e) {
    if (e.key == "ArrowLeft" && player.x - player.width / 2 > 0) {
        player.x -= SPEED_PLAYER;
    }
    else if (e.key == "ArrowRight" && player.x < appWidth - player.width / 2) {
        player.x += SPEED_PLAYER;
    }
    else if (e.key == " ") {
        shootOutPlayer();
    }
};
var moveBoss = function () {
    boss.x += bossSpeed;
    if (boss.x < boss.width / 2 || boss.x > appWidth - boss.width / 2) {
        bossSpeed *= -1;
    }
};
var updateBulletsText = function () {
    bulletText.text = 'Bullets: ' + playerBullets.length;
};
var updateTimerText = function () {
    timerText.text = 'Time: ' + remainingTime;
};
var startGameTimer = function () {
    gameTimer = setInterval(function () {
        remainingTime--;
        updateTimerText();
        if (remainingTime <= 0) {
            loseText.visible = true;
            stopAnimation('gameTimer', 250);
        }
    }, 1000);
};
var hitBoss = function () {
    bossHP--;
    bossHealthBar.clear();
    bossHealthBar.beginFill(0xFF0000);
    bossHealthBar.drawRect(0, 0, 100 * (bossHP / 4), 10);
    bossHealthBar.endFill();
    if (bossHP === 0) {
        winText.text = 'YOU WIN';
        winText.visible = true;
        stopAnimation('gameTimer', 250);
    }
};
var stopAnimation = function (nameTimeout, time) {
    setTimeout(function () {
        clearInterval(nameTimeout);
        app.ticker.stop();
    }, time);
};
// Player Actions
window.addEventListener("keydown", handlePlayerAction);
var checkGameStatus = function () {
    if (asteroids.length === 0 && !levelTwoStarted) {
        clearInterval(gameTimer);
        levelTwoStarted = true;
        startLevelTwo();
    }
};
var resetGame = function () {
    playerBullets = new Array(MAX_BULLETS).fill(null).map(function () { return createPlayerBullet(); });
    remainingTime = GAME_TIME;
    bulletText.text = 'Bullets: ' + MAX_BULLETS;
    timerText.text = 'Time: ' + remainingTime;
    player.x = appWidth / 2;
    player.y = appHeight - 64;
    winText.visible = false;
    loseText.visible = false;
    startGameTimer();
};
// Start Animation
app.ticker.add(function () {
    detectCollisionsWithAsteroid();
    checkGameStatus();
    if (boss) {
        moveBoss();
        detectCollisionsWithBoss();
        detectCollisionsWithPlayer();
        detectCollisionsWithBullets();
        var currentTime = Date.now();
        if (currentTime - lastBossBulletTime >= 2000) {
            shootOutBoss();
            lastBossBulletTime = currentTime;
        }
    }
});
// Start Level I
var startLevelOne = function () {
    resetGame();
    for (var i = 0; i < MAX_ASTEROIDS; i++) {
        createAndMoveAsteroid();
    }
};
// Start Level II
var startLevelTwo = function () {
    resetGame();
    createBoss();
    createBossHealthBar();
};
startLevelOne();


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