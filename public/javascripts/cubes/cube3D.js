/**
 * Created by vyt on 2015-06-06.
 */

var CubeInteraction = require('./../interaction/cubeInteraction');
var Face = require('./../faces/face');

utils = require('./../utils');
var makeDiv = utils.makeDiv;


var Cube = module.exports = function (height, width, length) {
    this.height = height;
    this.width = width;
    this.length = length || height;

    Object.defineProperty(this, 'cube', {
        get: function () {
            // cube property is the one that will be appended to div, this cube has perspective, others might not, so need getter
            return this.perspectiveWrap
        }
    });

    this.perspectiveWrap = makeDiv({
        transition: 'all 200ms linear',
        perspective: '900px',
        height: height + 'px',
        width: width + 'px'
    }, 'perspective-wrap');

    this.shape = makeDiv({
        transform: 'rotateX(0) rotateY(0)',
        transition: 'all 450ms linear',
        position: 'relative',
        transformStyle: 'preserve-3d',
        height: (height || 200) + 'px',
        width: (width || 200) + 'px'
    }, 'cube');

    this.rotationDegreesY = 0;
    this.rotationDegreesX = 0;
    this.spinSpeed = 450;
    this.zoomOutValue = 0.8;

    this.frontFace = 'front';
    this.currentPosition = 'still'; // spinning

    this.interaction = new CubeInteraction(this);


    this.__initialize()

};

/**
 * Creates cubes faces*/
Cube.prototype.__initialize = function () {
    ['front', 'back', 'left', 'right', 'top', 'bottom'].forEach(function (direction) {
        var styles = {
            //transition: 'all 450ms linear',
            position: 'absolute',
            height: (this.height || 200) + 'px',
            width: (this.width || 200) + 'px'
        };

        if (direction === 'front') {
            styles.transform = 'translateZ(' + (this.length / 2) + 'px)'
        }
        if (direction === 'back') {
            styles.transform = 'translateZ(-' + (this.length / 2) + 'px) rotateY(180deg)'
        }
        if (direction === 'left') {
            styles.width = this.length + 'px';
            styles.transform = 'translateX(-' + (this.length / 2) + 'px) rotateY(270deg)'
        }
        if (direction === 'right') {
            styles.width = this.length + 'px';
            styles.transform = 'translateX(' + (this.width - (this.length / 2)) + 'px) rotateY(-270deg)'
        }
        if (direction === 'top') {
            styles.height = this.length + 'px';
            styles.transform = 'translateY(-' + (this.length / 2) + 'px) rotateX(90deg)'
        }
        if (direction === 'bottom') {
            styles.height = this.length + 'px';
            styles.transform = 'translateY(' + (this.height - (this.length / 2)) + 'px) rotateX(-90deg)'
        }
        this[direction] = new Face(makeDiv(styles, direction));
        this.shape.appendChild(this[direction].domElement)
    }.bind(this));

    this.perspectiveWrap.appendChild(this.shape);

    // to zoom cube back after it stop rotating
    this.shape.addEventListener('transitionend', function () {
        this.zoomIn();
        this.currentPosition = 'still';
        this.__calculateFrontElement()


    }.bind(this))

};

/**
 * Updates this.frontFace value and executes any scripts related to that face being on front*/
Cube.prototype.__calculateFrontElement = function () {
    // deactivate because sometimes when user rotates cube transitionend fire just miliseconds before he rotates again
    // and cube face that is out of focus is activated
    this.frontFaceDeactivate();
    var frontElementFace;
    var leadingElementSize = 0;
    ['front', 'back', 'left', 'right', 'top', 'bottom'].forEach(function (face) {
        var data = this[face].domElement.getBoundingClientRect();
        var size = data.height * data.width;
        if (size > leadingElementSize) {
            frontElementFace = face;
            leadingElementSize = size
        }
    }.bind(this));
    this.frontFace = frontElementFace;
    this.frontFaceActivate()
};

Cube.prototype.frontFaceActivate = function () {
    this[this.frontFace].onFront();
};

Cube.prototype.frontFaceDeactivate = function () {
    this[this.frontFace].offFront();
};

Cube.prototype.zoomOut = function () {
    this.perspectiveWrap.style.transform = 'scale(' + this.zoomOutValue + ')';
};

Cube.prototype.zoomIn = function () {
    this.perspectiveWrap.style.transform = 'scale(1)';
};

/**
 * Rotates cube by updating its containers RotateX and RotateY values*/
Cube.prototype.__rotate = function () {
    this.frontFaceDeactivate();
    var transform = 'rotateX(' + this.rotationDegreesX + 'deg) rotateY(' + this.rotationDegreesY + 'deg)';
    var timeoutVal = this.currentPosition === 'spinning' ? 20 : 100;
    if (this.currentPosition === 'still') this.zoomOut();
    setTimeout(function () {
        this.currentPosition = 'spinning';
        this.shape.style.transition = 'all ' + this.spinSpeed + 'ms linear';
        this.shape.style.transform = transform;
    }.bind(this), timeoutVal);

};


Cube.prototype.rotateLeft = function () {
    this.rotationDegreesY -= 90;
    this.__rotate()

};

Cube.prototype.rotateRight = function () {

    this.rotationDegreesY += 90;
    this.__rotate()


};
Cube.prototype.rotateUp = function () {
    this.rotationDegreesX += 90;
    this.__rotate()
};

Cube.prototype.rotateDown = function () {
    this.rotationDegreesX -= 90;
    this.__rotate()
};

Cube.prototype.setPerspectiveTo = function (value) {
    this.perspectiveWrap.style.perspective = value + 'px'
};
