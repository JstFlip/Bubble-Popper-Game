/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/canvas.js":
/*!**************************!*\
  !*** ./src/js/canvas.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/js/utils.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_utils__WEBPACK_IMPORTED_MODULE_0__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


var body = document.querySelector('body');
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var hueRotate = 0;
canvas.width = innerWidth;
canvas.height = innerHeight;
var mouse = {
  x: undefined,
  y: undefined
};
var score = 0;
addEventListener('mousemove', function (event) {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});
addEventListener('click', function (event) {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});
addEventListener('resize', function () {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
});

var Player = /*#__PURE__*/function () {
  function Player() {
    _classCallCheck(this, Player);

    this.x = 200;
    this.y = 200;
    this.radius = 20;
    this.velX = 0.5;
    this.velY = 0.5;
  }

  _createClass(Player, [{
    key: "draw",
    value: function draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      ctx.fillStyle = 'rgba(0, 0, 0, 1)';
      ctx.fill();
      ctx.closePath();
    }
  }, {
    key: "move",
    value: function move() {
      this.x = mouse.x;
      this.y = mouse.y;
    }
  }, {
    key: "update",
    value: function update() {
      this.draw();
      this.move();
    }
  }]);

  return Player;
}();

var bubbleImg = new Image();
bubbleImg.src = '../bubble.png';

var Bubble = /*#__PURE__*/function () {
  function Bubble() {
    _classCallCheck(this, Bubble);

    this.radius = 50;
    this.x = Math.floor(Math.random() * (canvas.width - this.radius)) + (0 + this.radius);
    this.y = canvas.height + this.radius;
    this.velY = Math.random() * 3 + 1;
    this.counted = false;
  }

  _createClass(Bubble, [{
    key: "draw",
    value: function draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      ctx.fillStyle = 'rgba(0, 0, 0, 1)';
      ctx.fill();
      ctx.closePath(); //ctx.drawImage(bubbleImg, this.x - 75, this.y - 75, this.radius / 0.34, this.radius / 0.34)
    }
  }, {
    key: "move",
    value: function move() {
      this.y -= this.velY;
    }
  }, {
    key: "update",
    value: function update() {
      this.draw();
      this.move();
    }
  }]);

  return Bubble;
}();

var bubbles = [];
var player = new Player();

function init() {
  score = 0;
  bubbles = [];

  for (var i = 0; i < 6; i++) {
    bubbles.push(new Bubble());
  }
}

var animId = null;

function animate() {
  animId = requestAnimationFrame(animate);
  canvas.style.backgroundColor = "hsl(".concat(hueRotate, ", 100%, 56%)");
  hueRotate++;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = '1.5rem Arial';
  ctx.fillStyle = '#fff';
  ctx.fillText("Score: ".concat(score), 50, 50);
  player.update();

  for (var i = 0; i < bubbles.length; i++) {
    bubbles[i].update();

    if ((0,_utils__WEBPACK_IMPORTED_MODULE_0__.distance)(mouse.x, mouse.y, bubbles[i].x, bubbles[i].y) < 70) {
      if (!bubbles[i].counted) {
        score++;
        bubbles[i].counted = true;
        bubbles.splice(i, 1);
        i--;
      }
    } else if (bubbles[i].y < 0 - bubbles[i].radius) {
      bubbles.splice(i, 1);
      i--;
      end(animId, score); // cancelAnimationFrame(animId)
      // if (confirm(`You just lost!\nYour score: ${score}\nDo you want to play again?`)) {
      //   location.reload()
      // } else {
      //   window.close()
      // }
      // createDiv('end', score)
    }

    if (score < 100) {
      if (bubbles.length < 6) {
        bubbles.push(new Bubble());
      }
    } else if (score < 200) {
      if (bubbles.length < 14) {
        bubbles.push(new Bubble());
      }
    } else {
      if (bubbles.length < 20) {
        bubbles.push(new Bubble());
      }
    }
  }
}

function end(animId, score) {
  cancelAnimationFrame(animId);
  createDiv('end', score);
  var btn = document.querySelector('button');
  var DivEl = document.querySelector('div');
  btn.addEventListener('click', function () {
    body.removeChild(DivEl);
    init();
    animate();
  });
}

function createDiv(args, score) {
  var newDiv = document.createElement('div');
  var newParagraph = document.createElement('p');
  var newBtn = document.createElement('button');

  if (args === 'start') {
    newParagraph.innerHTML = 'Bubble popper';
    newBtn.innerHTML = 'Start!';
  }

  if (args === 'end') {
    newParagraph.innerHTML = "Your score: ".concat(score);
    newBtn.innerHTML = 'Start over!';
  }

  newDiv.appendChild(newParagraph);
  newDiv.appendChild(newBtn);
  body.appendChild(newDiv);
}

window.addEventListener('load', function () {
  createDiv('start');
  var btn = document.querySelector('button');
  var DivEl = document.querySelector('div');
  btn.addEventListener('click', function () {
    body.removeChild(DivEl);
    init();
    animate();
  });
});

/***/ }),

/***/ "./src/js/utils.js":
/*!*************************!*\
  !*** ./src/js/utils.js ***!
  \*************************/
/***/ ((module) => {

function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function distance(x1, y1, x2, y2) {
  var xDist = x2 - x1;
  var yDist = y2 - y1;
  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

module.exports = {
  randomIntFromRange: randomIntFromRange,
  distance: distance
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
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
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/js/canvas.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=canvas.bundle.js.map