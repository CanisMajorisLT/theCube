var Face = require('./../faces/face');
var CubeInteraction = require('../interaction/cubeInteraction');
utils = require('./../utils');
var makeDiv = utils.makeDiv;

/**
 * Implements 3D cubes logic in 2D. Uses mostly the same API as cube3D*/
var CubeFlat = module.exports = function (height, width) {
    this.height = height;
    this.width = width;

    Object.defineProperty(this, 'cube', {
        get: function () {
            return this.shape
        }
    });

    this.shape = makeDiv({
        position: 'relative',
        transition: 'all 450ms linear',
        height: (height || 200) + 'px',
        width: (width || 200) + 'px'
    }, 'cube-flat');


    this.spinSpeed = 450;
    this.frontFace = 'front';

    this.__currentAxis = 'x';
    this.__currentPositionX = 0;
    this.__currentPositionY = 0;
    this.__XtoRight = ['front', 'right', 'back', 'left'];
    this.__YtoTop = [, 'top', , 'bottom'];

    this.interaction = new CubeInteraction(this);

    this.__initialize()


};

CubeFlat.prototype.__initialize = function () {
    ['front', 'back', 'left', 'right', 'top', 'bottom'].forEach(function (direction) {
        var styles = {
            transition: 'all 450ms linear',
            position: 'absolute',
            height: (this.height || 200) + 'px',
            width: (this.width || 200) + 'px',
            display: 'none'
        };

        if (direction === 'front') {
            styles.top = '0';
            styles.left = '0';
            styles.display = 'block';
        }

        this[direction] = new Face(makeDiv(styles, direction));

        if (direction === 'front') {
            this.shape.appendChild(this[direction].domElement)
        }
    }.bind(this));
};


CubeFlat.prototype.frontFaceActivate = function () {
    this[this.frontFace].onFront();
};

CubeFlat.prototype.frontFaceDeactivate = function () {
    this[this.frontFace].offFront();
};


/**
 * Algorithm to calculate which face will be on front*/
CubeFlat.prototype.__rotate = function (way) {
    var nextSide;
    var oneSide;
    var secondSide;
    var pairs = {top: 'bottom', bottom: 'top', left: 'right', right: 'left', front: 'back', back: 'front'};


    if (way === 'right') {
        if (this.__currentAxis === 'x') {
            this.__currentPositionX = decreasePositionByOne(this.__currentPositionX);
            nextSide = this.__XtoRight[this.__currentPositionX];
        }
        else {
            oneSide = this.__YtoTop[this.__currentPositionY];
            secondSide = pairs[oneSide];

            this.__XtoRight[this.__currentPositionX] = oneSide;
            this.__XtoRight[increasePositionByOne(increasePositionByOne(this.__currentPositionX))] = secondSide;

            this.__currentPositionX = decreasePositionByOne(this.__currentPositionX);
            nextSide = this.__XtoRight[this.__currentPositionX];

            this.__currentAxis = 'x'


        }
    }
    else if (way === 'left') {
        if (this.__currentAxis === 'x') {
            this.__currentPositionX = increasePositionByOne(this.__currentPositionX);
            nextSide = this.__XtoRight[this.__currentPositionX]
        }
        else {
            oneSide = this.__YtoTop[this.__currentPositionY];
            secondSide = pairs[oneSide];

            this.__XtoRight[this.__currentPositionX] = oneSide;
            this.__XtoRight[increasePositionByOne(increasePositionByOne(this.__currentPositionX))] = secondSide;

            this.__currentPositionX = increasePositionByOne(this.__currentPositionX);
            nextSide = this.__XtoRight[this.__currentPositionX];

            this.__currentAxis = 'x'

        }

    }
    else if (way === 'top') {

        if (this.__currentAxis === 'y') {
            this.__currentPositionY = decreasePositionByOne(this.__currentPositionY);
            nextSide = this.__YtoTop[this.__currentPositionY]
        }
        else {
            console.log('top - current axis X');
            oneSide = this.__XtoRight[this.__currentPositionX];
            secondSide = pairs[oneSide];

            this.__YtoTop[this.__currentPositionY] = oneSide;
            this.__YtoTop[increasePositionByOne(increasePositionByOne(this.__currentPositionY))] = secondSide;

            this.__currentPositionY = decreasePositionByOne(this.__currentPositionY);
            nextSide = this.__YtoTop[this.__currentPositionY];

            this.__currentAxis = 'y'
        }
    }
    else if (way === 'bottom') {
        if (this.__currentAxis === 'y') {
            this.__currentPositionY = increasePositionByOne(this.__currentPositionY);
            nextSide = this.__YtoTop[this.__currentPositionY]
        }
        else {
            oneSide = this.__XtoRight[this.__currentPositionX];
            secondSide = pairs[oneSide];

            this.__YtoTop[this.__currentPositionY] = oneSide;
            this.__YtoTop[increasePositionByOne(increasePositionByOne(this.__currentPositionY))] = secondSide;

            this.__currentPositionY = increasePositionByOne(this.__currentPositionY);
            nextSide = this.__YtoTop[this.__currentPositionY];

            this.__currentAxis = 'y'
        }
    }

    return nextSide


};

CubeFlat.prototype.updateFrontFace = function (face, rotationWay) {
    var curFF = this[this.frontFace].domElement;
    this.frontFaceDeactivate();
    curFF.style.display = 'none';
    this.frontFace = face;

    var el = this[face].domElement;
    el.style.display = 'block';
    el.style.top = '0px';
    el.style.left = '0px';

    this.shape.appendChild(el);

    this.frontFaceActivate()
};

CubeFlat.prototype.rotateLeft = function () {
    var nextFace = this.__rotate('left');
    this.updateFrontFace(nextFace)
};

CubeFlat.prototype.rotateRight = function () {
    var nextFace = this.__rotate('right');
    this.updateFrontFace(nextFace)
};
CubeFlat.prototype.rotateUp = function () {
    var nextFace = this.__rotate('top');
    this.updateFrontFace(nextFace)
};

CubeFlat.prototype.rotateDown = function () {
    var nextFace = this.__rotate('bottom');
    this.updateFrontFace(nextFace)
};


var increasePositionByOne = function (position) {
    var next;
    if (position === 3) {
        next = 0
    }
    else {
        next = position + 1
    }

    return next
};

var decreasePositionByOne = function (position) {
    var next;
    if (position === 0) {
        next = 3
    }
    else {
        next = position - 1
    }

    return next
};

