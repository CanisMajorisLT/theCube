
/**
 * NOT FINISHED
 * */

var Face = require('./../faces/face');

var faces = ['front2', 'back2', 'left2', 'right2', 'top2', 'bottom2'];


var Cube = module.exports = function (height, width) {
    this.height = height;
    this.width = width;

    this.shape = makeDiv({
        transform: 'perspective(900px)',
        transition: 'all 200ms linear',
        position: 'relative',
        height: (height || 200) + 'px',
        width: (width || 200) + 'px'
    }, 'cube2');

    this.rotationDegreesY = 0;
    this.rotationDegreesX = 0;
    this.zoomOutValue = 0.8;
    this.spinSpeed = 450;
    this.perspective = '';
    this.facesRotationSequenceYRight = ['front2', 'left2', 'back2', 'right2'];
    this.facesRotationSequenceYLeft = ["right2", "back2", "left2", "front2"];
    this.facesRotationSequenceXUp = ["front2", "bottom2", "back2", "top2"];
    this.facesRotationSequenceXDown = ["top2", "back2", "bottom2", "front2"];
    this.currentFrontFace = 'front2';


    faces.forEach(function (direction) {
        var styles = {
            transition: 'all 450ms linear',
            position: 'absolute',
            top: '0',
            left: '0',
            height: (height || 200) + 'px',
            width: (width || 200) + 'px'
        };

        if (direction === 'front2') {
            styles.zIndex = 2;
            styles.transform = this.perspective + 'rotateY(0) rotateX(0) rotateY(0) translateZ(' + (height / 2) + 'px)'
        }
        if (direction === 'back2') {
            styles.transform = this.perspective + 'rotateY(0) rotateX(0) rotateY(-180deg) translateZ(' + (height / 2) + 'px)'
        }
        if (direction === 'left2') {
            styles.zIndex = 1;
            styles.transform = this.perspective + 'rotateY(0) rotateX(0) rotateY(270deg) translateZ(' + (height / 2) + 'px)'
        }
        if (direction === 'right2') {
            styles.transform = this.perspective + 'rotateY(0) rotateX(0) rotateY(90deg) translateZ(' + (height / 2) + 'px)'
        }
        if (direction === 'top2') {
            styles.height = width + 'px';
            styles.transform = this.perspective + 'rotateY(0) rotateX(0) rotateX(90deg) translateZ(' + (height / 2) + 'px)'
        }
        if (direction === 'bottom2') {
            styles.height = width + 'px';
            styles.transform = this.perspective + 'rotateY(0) rotateX(0) rotateX(-90deg) translateZ(' + (height / 2) + 'px)'
        }
        this[direction] = new Face(makeDiv(styles, direction));
        this.shape.appendChild(this[direction].domElement)
    }.bind(this));


    this.shape.addEventListener('click', this.__rotate.bind(this))

};

Cube.prototype.zoomOut = function () {
    this.shape.style.transform = 'scale(' + this.zoomOutValue + ') perspective(900px)';
};

Cube.prototype.zoomIn = function () {
    this.shape.style.transform = 'scale(1) perspective(900px)';
};

Cube.prototype.changeZ = function () {
    var currentFaceIndex = this.facesRotationSequenceYRight.indexOf(this.currentFrontFace);

    var nextFaceIndex;
    var nextFace;

    var nextLeftFaceIndex;
    var nextLeftFace;

    if (currentFaceIndex === 3) {
        nextFaceIndex = 0;
    }
    else {
        nextFaceIndex = currentFaceIndex + 1
    }
    nextFace = this.facesRotationSequenceYRight[nextFaceIndex];

    if (nextFaceIndex === 3) {
        nextLeftFaceIndex = 0;
    }
    else {
        nextLeftFaceIndex = nextFaceIndex + 1;
    }
    nextLeftFace = this.facesRotationSequenceYRight[nextLeftFaceIndex];

    this[this.currentFrontFace].style.zIndex = 0;

    this[nextFace].style.zIndex = 2;

    //console.log('nextFace', nextFace, nextFaceIndex);
    //console.log('nextLeftFace', nextLeftFace, nextLeftFaceIndex);
    //console.log('CurrentFace', this.currentFrontFace);


    this.currentFrontFace = nextFace;


    this[nextLeftFace].style.zIndex = 1

};

Cube.prototype.__rotate = function () {
    this.zoomOut();
    var rotationStr = 'rotateY(' + this.rotationDegreesY + 'deg) rotateX(' + this.rotationDegreesX+'deg)';


    faces.forEach(function (direction) {
        if (direction === 'front2') {

            this[direction].domElement.style.transform = this.perspective + rotationStr + 'rotateY(0) translateZ(' + (this.height / 2) + 'px)'
        }
        if (direction === 'back2') {
            this[direction].domElement.style.transform = this.perspective + rotationStr + 'rotateY(180deg) translateZ(' + (this.height / 2) + 'px)'
        }
        if (direction === 'left2') {
            this[direction].domElement.style.transform = this.perspective + rotationStr + 'rotateY(270deg) translateZ(' + (this.height / 2) + 'px)'
        }
        if (direction === 'right2') {
            this[direction].domElement.style.transform = this.perspective + rotationStr + 'rotateY(90deg) translateZ(' + (this.height / 2) + 'px)'
        }
        if (direction === 'top2') {
            this[direction].domElement.style.transform = this.perspective + rotationStr + 'rotateX(90deg) translateZ(' + (this.height / 2) + 'px)'
        }
        if (direction === 'bottom2') {
            this[direction].domElement.style.transform = this.perspective + rotationStr + 'rotateX(-90deg) translateZ(' + (this.height / 2) + 'px)'
        }
    }.bind(this));
    setTimeout(function () {
        this.zoomIn();
        this.changeZ()
    }.bind(this), 450)

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



var makeDiv = function makeDiv(styleObj, className, idName) {
    var el = document.createElement('div');
    if (Object.getOwnPropertyNames(styleObj).length !== 0) {
        Object.keys(styleObj).forEach(function (key) {
            //console.log('addign style', key, styleObj[key]);
            el.style[key] = styleObj[key]
        })
    }
    if (className !== undefined && className.length !== 0) {
        el.className += className;
    }
    if (idName !== undefined && idName.length !== 0) {
        el.id = idName
    }
    return el
};
