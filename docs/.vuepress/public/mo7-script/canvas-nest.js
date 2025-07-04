(function () {
  console.log('加载 canvas-nest.js');
  // JavaScript Document
  var requestAnimationFrame =
    window.requestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    };
  // 选取 canvas 并开始
  var canvas = document.getElementById('mo7_bg_canvas_nest');
  var ctx = canvas.getContext('2d');
  var maximumPossibleDistance;
  var centerX;
  var centerY;
  var mousePositionX;
  var mousePositionY;
  var mouseElement;
  var isRunning;
  var myAnimation;
  var delta;

  var lines = 0;
  var objects = [];

  var initAnimation = function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    maximumPossibleDistance = Math.round(Math.sqrt(canvas.width * canvas.width + canvas.height * canvas.height));

    centerX = Math.floor(canvas.width / 2);
    centerY = Math.floor(canvas.height / 2);

    objects.length = 0;
    clearCanvas();
    createParticles();
  };

  window.addEventListener(
    'resize',
    function () {
      initAnimation();
    },
    false,
  );

  var options = {
    particlesNumber: 80, // 粒子数量
    initialSize: 3, // 粒子大小
    moveLimit: 50, // 运动速度
    durationMin: 50, // 无规则运动最小数和最大数
    durationMax: 300,
    drawConnections: true,
    mouseInteractionDistance: 150, // 鼠标交互距离
    mouseGravity: true,
    drawMouseConnections: true,
    // 点的颜色 和透明度
    red: 166,
    green: 126,
    blue: 183,
    opacity: 0.6,
    // 线的颜色 和透明度
    connectionRed: 178,
    connectionGreen: 182,
    connectionBlue: 182,
    connectionOpacity: 0.4,
    // 鼠标连线的颜色 和透明度
    mouseConnectionRed: 178,
    mouseConnectionGreen: 182,
    mouseConnectionBlue: 182,
    mouseConnectionOpacity: 0.4,
  };

  // ----------------------------------------------------
  // Helper functions //
  //-----------------------------------------------------

  var getRandomBetween = function (a, b) {
    return Math.floor(Math.random() * b) + a;
  };

  var hitTest = function (object1, object2) {
    if (
      object1.positionX < object2.positionX + object2.size &&
      object1.positionX + object2.size > object2.positionX &&
      object1.positionY < object2.positionY + object2.size &&
      object1.positionY > object2.positionY
    ) {
      return true;
    } else {
      return false;
    }
  };

  // Get distance between particles by using Pythagorean theorem

  var getDistance = function (element1, element2) {
    var difX = Math.round(Math.abs(element1.positionX - element2.positionX));
    var difY = Math.round(Math.abs(element1.positionY - element2.positionY));

    return Math.round(Math.sqrt(difX * difX + difY * difY));
  };

  // ----------------------------------------------------
  // Particle constructor function //
  //-----------------------------------------------------
  function Particle(positionX, positionY, size, red, green, blue, opacity) {
    this.positionX = positionX;
    this.positionY = positionY;
    this.size = size;

    this.duration = getRandomBetween(options.durationMin, options.durationMax);
    this.limit = options.moveLimit;
    this.timer = 0;

    this.red = red;
    this.green = green;
    this.blue = blue;
    this.opacity = opacity;

    this.color = 'rgba(' + this.red + ',' + this.green + ',' + this.blue + ',+' + this.opacity + ')';
  }

  // ----------------------------------------------------
  // Mouse Particle constructor function //
  //-----------------------------------------------------
  function MouseParticle(positionX, positionY, size, red, green, blue, opacity) {
    this.positionX = mousePositionX;
    this.positionY = mousePositionY;
    this.size = size;

    this.red = red;
    this.green = green;
    this.blue = blue;
    this.opacity = opacity;

    this.color = 'rgba(' + this.red + ',' + this.green + ',' + this.blue + ',+' + this.opacity + ')';
  }

  Particle.prototype.animateTo = function (newX, newY) {
    var duration = this.duration;

    var animatePosition = function (newPosition, currentPosition) {
      if (newPosition > currentPosition) {
        var step = (newPosition - currentPosition) / duration;
        newPosition = currentPosition + step;
      } else {
        var step = (currentPosition - newPosition) / duration;
        newPosition = currentPosition - step;
      }

      return newPosition;
    };

    this.positionX = animatePosition(newX, this.positionX);
    this.positionY = animatePosition(newY, this.positionY);

    // generate new vector

    if (this.timer == this.duration) {
      this.calculateVector();
      this.timer = 0;
    } else {
      this.timer++;
    }
  };

  Particle.prototype.updateColor = function () {
    this.color = 'rgba(' + this.red + ',' + this.green + ',' + this.blue + ',+' + this.opacity + ')';
  };

  Particle.prototype.calculateVector = function () {
    var distance;
    var newPosition = {};
    var particle = this;

    var getCoordinates = function () {
      newPosition.positionX = getRandomBetween(0, window.innerWidth);
      newPosition.positionY = getRandomBetween(0, window.innerHeight);

      distance = getDistance(particle, newPosition);
    };

    while (typeof distance === 'undefined' || distance > this.limit) {
      getCoordinates();
    }

    this.vectorX = newPosition.positionX;
    this.vectorY = newPosition.positionY;
  };

  Particle.prototype.testInteraction = function () {
    if (!options.drawConnections) return;

    var closestElement;
    var distanceToClosestElement = maximumPossibleDistance;

    for (var x = 0; x < objects.length; x++) {
      var testedObject = objects[x];
      var distance = getDistance(this, testedObject);

      if (distance < distanceToClosestElement && testedObject !== this) {
        distanceToClosestElement = distance;
        closestElement = testedObject;
      }

      // Hittest

      /* if (hitTest(this, testedObject)) {

            var winner = true;

            if (this.size > testedObject.size) {

                var objToDelete = testedObject
                var objToSave = this


            } else if (this.size < testedObject.size) {

                var objToDelete = this
                var objToSave = testedObject

            } else {

                winner = false

            }


            if (winner) {

                var index = objects.indexOf(objToDelete)
                objects.splice(index, 1)
                objToSave.size++;



                if (objToSave.opacity <= 1) objToSave.opacity += 0.1;

                objToSave.updateColor();
            }

        }*/

      // Hittest end
    }

    if (closestElement) {
      ctx.beginPath();
      ctx.moveTo(this.positionX + this.size / 2, this.positionY + this.size / 2);
      ctx.lineTo(
        closestElement.positionX + closestElement.size * 0.5,
        closestElement.positionY + closestElement.size * 0.5,
      );
      ctx.strokeStyle =
        'rgba(' +
        options.connectionRed +
        ',' +
        options.connectionGreen +
        ',' +
        options.connectionBlue +
        ',' +
        options.connectionOpacity +
        ')';
      ctx.stroke();
      lines++;
    }
  };

  MouseParticle.prototype.testInteraction = function () {
    if (options.mouseInteractionDistance === 0) return;

    var closestElements = [];
    var distanceToClosestElement = maximumPossibleDistance;

    for (var x = 0; x < objects.length; x++) {
      var testedObject = objects[x];
      var distance = getDistance(this, testedObject);

      if (distance < options.mouseInteractionDistance && testedObject !== this) {
        closestElements.push(objects[x]);
      }
    }

    for (var x = 0; x < closestElements.length; x++) {
      if (options.drawMouseConnections) {
        var element = closestElements[x];
        ctx.beginPath();
        ctx.moveTo(this.positionX, this.positionY);
        ctx.lineTo(element.positionX + element.size * 0.5, element.positionY + element.size * 0.5);
        ctx.strokeStyle =
          'rgba(' +
          options.mouseConnectionRed +
          ',' +
          options.mouseConnectionGreen +
          ',' +
          options.mouseConnectionBlue +
          ',' +
          options.mouseConnectionOpacity +
          ')';
        ctx.stroke();
        lines++;
      }

      if (options.mouseGravity) {
        closestElements[x].vectorX = this.positionX;
        closestElements[x].vectorY = this.positionY;
      }
    }
  };

  Particle.prototype.updateAnimation = function () {
    this.animateTo(this.vectorX, this.vectorY);
    this.testInteraction();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.positionX, this.positionY, this.size, this.size);
  };

  MouseParticle.prototype.updateAnimation = function () {
    this.positionX = mousePositionX;
    this.positionY = mousePositionY;

    this.testInteraction();
  };

  var createParticles = function () {
    // create mouse particle
    mouseElement = new MouseParticle(0, 0, options.initialSize, 255, 255, 255);

    for (var x = 0; x < options.particlesNumber; x++) {
      var randomX = Math.floor(Math.random() * window.innerWidth + 1);
      var randomY = Math.floor(Math.random() * window.innerHeight + 1);

      var particle = new Particle(
        randomX,
        randomY,
        options.initialSize,
        options.red,
        options.green,
        options.blue,
        options.opacity,
      );
      particle.calculateVector();

      objects.push(particle);
    }
  };

  var updatePosition = function () {
    for (var x = 0; x < objects.length; x++) {
      objects[x].updateAnimation();
    }

    // handle mouse
    mouseElement.updateAnimation();
  };

  window.onmousemove = function (e) {
    mousePositionX = e.clientX;
    mousePositionY = e.clientY;
  };

  var clearCanvas = function () {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  };

  var stopAnimation = function () {
    window.cancelAnimationFrame(myAnimation);
    isRunning = false;
  };

  // ----------------------------------------------------
  // FPS //
  //-----------------------------------------------------
  var lastCalledTime;
  var fps;
  var averageFps;
  var averageFpsTemp = 0;
  var averageFpsCounter = 0;

  function requestFps() {
    if (!lastCalledTime) {
      lastCalledTime = Date.now();
      fps = 0;
      return;
    }

    delta = (new Date().getTime() - lastCalledTime) / 1000;
    lastCalledTime = Date.now();
    fps = Math.floor(1 / delta);

    averageFpsTemp = averageFpsTemp + fps;
    averageFpsCounter++;

    if (averageFpsCounter === 5) {
      averageFps = Math.floor(averageFpsTemp / 5);
      averageFpsCounter = 0;
      averageFpsTemp = 0;
    }

    if (!averageFps) {
      return;
    } else if (averageFps < 10) {
    }
  }

  // ----------------------------------------------------
  // Init! //
  //-----------------------------------------------------

  var loop = function () {
    clearCanvas();
    updatePosition();

    // ctx.fillStyle = '#fff';
    // ctx.fillText(`FPS:${fps} lines:${lines} Average FPS:${averageFps}`, 10, 20);

    lines = 0;

    myAnimation = requestAnimationFrame(loop);
    isRunning = true;
    requestFps();
  };

  initAnimation();
  loop();
})();
