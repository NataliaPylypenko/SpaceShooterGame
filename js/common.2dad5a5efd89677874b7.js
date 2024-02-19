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
// SCSS


// Create Scene And Add To Body
var appWidth = 1280;
var appHeight = 720;
var app = new pixi_js__WEBPACK_IMPORTED_MODULE_1__.Application({ width: appWidth, height: appHeight });
document.body.appendChild(app.view);
// Constants
var NUMBER_ASTEROIDS = 3;
var MAX_BULLETS = NUMBER_ASTEROIDS;
var GAME_TIME = 60;
var bullets = [];
var asteroids = [];
var remainingBullets = MAX_BULLETS;
var remainingTime = GAME_TIME;
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
// Bullet
var createBullet = function () {
    if (remainingBullets > 0) {
        remainingBullets--;
        updateBullets();
        if (bullets.length < MAX_BULLETS) {
            var bullet_1 = new pixi_js__WEBPACK_IMPORTED_MODULE_1__.Graphics();
            bullet_1.beginFill(0xFFFFFF);
            bullet_1.drawCircle(0, 0, 9);
            bullet_1.endFill();
            bullet_1.x = player.x;
            bullet_1.y = player.y;
            app.stage.addChild(bullet_1);
            bullets.push(bullet_1);
            var moveBullet_1 = setInterval(function () {
                bullet_1.y -= 5;
                if (bullet_1.y < 0) {
                    app.stage.removeChild(bullet_1);
                    clearInterval(moveBullet_1);
                }
            }, 1000 / 60);
        }
    }
};
// Asteroid
var createAsteroid = function () {
    var asteroid = new pixi_js__WEBPACK_IMPORTED_MODULE_1__.Graphics();
    asteroid.beginFill(0xCCCCCC);
    asteroid.drawCircle(0, 0, 30);
    asteroid.endFill();
    asteroid.x = Math.random() * appWidth;
    asteroid.y = Math.random() * appHeight - appHeight;
    app.stage.addChild(asteroid);
    asteroids.push(asteroid);
    var moveAsteroid = setInterval(function () {
        asteroid.y += 5;
        if (asteroid.y > appHeight) {
            app.stage.removeChild(asteroid);
            clearInterval(moveAsteroid);
        }
    }, 1000 / 10);
};
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
var bulletText = new pixi_js__WEBPACK_IMPORTED_MODULE_1__.Text('Bullets: ' + remainingBullets, {
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
// Some Asteroids
for (var i = 0; i < NUMBER_ASTEROIDS; i++) {
    createAsteroid();
}
var detectCollisions = function () {
    for (var i = bullets.length - 1; i >= 0; i--) {
        var bullet = bullets[i];
        for (var j = asteroids.length - 1; j >= 0; j--) {
            var asteroid = asteroids[j];
            if (bullet.x > asteroid.x - asteroid.width / 2 &&
                bullet.x < asteroid.x + asteroid.width / 2 &&
                bullet.y > asteroid.y - asteroid.height / 2 &&
                bullet.y < asteroid.y + asteroid.height / 2) {
                app.stage.removeChild(bullet);
                app.stage.removeChild(asteroid);
                bullets.splice(i, 1);
                asteroids.splice(j, 1);
            }
        }
    }
};
var checkGameStatus = function () {
    if (asteroids.length === 0) {
        winText.visible = true;
        clearInterval(gameTimer);
        app.ticker.stop();
    }
    else if (bullets.length === MAX_BULLETS) {
        loseText.visible = true;
        app.ticker.stop();
    }
};
var handlePlayerAction = function (e) {
    if (e.key == "ArrowLeft" && player.x - player.width / 2 > 0) {
        player.x -= 10;
    }
    else if (e.key == "ArrowRight" && player.x < appWidth - player.width / 2) {
        player.x += 10;
    }
    else if (e.key == " ") {
        createBullet();
    }
};
var updateBullets = function () {
    bulletText.text = 'Bullets: ' + remainingBullets;
};
var updateTimer = function () {
    timerText.text = 'Time: ' + remainingTime;
};
var gameTimer;
var startGameTimer = function () {
    gameTimer = setInterval(function () {
        remainingTime--;
        updateTimer();
        if (remainingTime <= 0) {
            clearInterval(gameTimer);
            loseText.visible = true;
            app.ticker.stop();
        }
    }, 1000);
};
startGameTimer();
// Player Actions
window.addEventListener("keydown", handlePlayerAction);
// Animation
app.ticker.add(function () {
    detectCollisions();
    checkGameStatus();
    console.log('go');
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