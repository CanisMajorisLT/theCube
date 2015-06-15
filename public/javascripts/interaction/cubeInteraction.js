/**
 * Implements logic related to users interaction with cube
 * @param {object} cube*/
var CubeInteraction = module.exports = function (cube) {
    this.cube = cube;
    this.locked = false; //if true any interaction is locked, any media is stopped (for when user is focusing other tab);
    this.autoplayInProgres = false; // if true user interaction such as wheel/swipe is disabled;
    this.autoplayBlueprint = {};

    this.swipeRotate = {initialized: false}

};

CubeInteraction.prototype.addPauseOnUserInactivity = function () {
    window.addEventListener('blur', function () {
        // stop all action if user switches tabs
        this.locked = true;
        this.cube.frontFaceDeactivate()
    }.bind(this));

    window.addEventListener('focus', function () {
        // continue
        this.locked = false;
        this.cube.frontFaceActivate()
    }.bind(this));
};

/**
 * Adds cube auto-rotation blue print
 * @param {object} blueprint - contain information about auto-rotation logic:
 *  {
        blueprint: [['rotateDirection', 'timesToRotate', 'intervalBetweenRotations [including first]'], 'numberSleep seconds [optional]',
            ['direction', 'times', 'intervalBetweenRotations']],
        currentPart: 0,
        options: {repeat: 'bool', repeatInterval: 'number s'}
    }
 * @param {number} delayBeforeStart - number of ms before starting auto-rotation
 * */
CubeInteraction.prototype.addAutorotateBlueprint = function (blueprint, delayBeforeStart) {
    // TODO fix timing calculations
    this.autoplayBlueprint = blueprint;
    setTimeout(this.startAutorotate.bind(this), delayBeforeStart)
};

CubeInteraction.prototype.startAutorotate = function () {
    var partNum;
    var partContent;
    var length = this.autoplayBlueprint.blueprint.length;
    var repeatInterval = (this.autoplayBlueprint.options.repeatInterval || 1) * 1000;

    if (this.autoplayBlueprint.hasOwnProperty('currentPart')) {
        partNum = this.autoplayBlueprint.currentPart + 1;
        this.autoplayBlueprint.currentPart += 1
    }
    else {
        this.autoplayBlueprint.currentPart = 0;
        partNum = 0
    }

    if (partNum >= length) {
        // if partNum is same as length, means that last part was done already.
        if (this.autoplayBlueprint.options.repeat === true) {
            this.autoplayBlueprint.currentPart = -1; // -1 because property exists so it will add 1
            setTimeout(this.startAutorotate.bind(this), repeatInterval)
        }
        else {
            // autoplay is over, allow user interaction
            this.autoplayInProgres = false;
        }
    }
    else {
        // this is where action is called!
        partContent = this.autoplayBlueprint.blueprint[partNum];
        if (typeof partContent === 'number') {
            // add pause if number
            setTimeout(this.startAutorotate.bind(this), partContent * 1000)
        }
        else {
            this.autoplayInProgres = true;
            this.__startIntervalRotation.apply(this, partContent)
        }
    }
};

/**
 * Called by startAutoplay and executes a cut of blue print*/
CubeInteraction.prototype.__startIntervalRotation = function (direction, times, interval) {

    var inter = interval || 500;
    var tms = times || 1;
    var spinnedTimes = 0;

    var spinInterval = this.spinInterval = setInterval(function () {
        if (this.locked) {
            return
        }
        if (direction === 'left') this.cube.rotateLeft();
        else if (direction === 'right') this.cube.rotateRight();
        else if (direction === 'up') this.cube.rotateUp();
        else this.cube.rotateDown();
        spinnedTimes += 1;
        console.log('iam still auto-rotating', this.cube);


        if (spinnedTimes >= tms) {
            clearInterval(spinInterval);
            this.startAutorotate()
        }

    }.bind(this), inter)
};


/**
 * Adds mobile interaction to cube, user can rotate cube to any of the 4 [or ones that are implemented by cube API]
 *  sides by swiping*/
CubeInteraction.prototype.addSwipeRotate = function (direction) {
    var oppositeDirections = {leftRight: 'upDown', upDown: 'leftRight'};
    direction = direction || 'leftRight';
    this.swipeRotate[direction] = true;

    if (this.cube.hasOwnProperty('perspectiveWrap')) {
        // for 3D cube allow only one of the directions to be enabled
        this.swipeRotate[oppositeDirections[direction]] = false;
    }

    this.swipeRotate[direction] = true;
    if (!this.swipeRotate.initialized) {
        swipeRotate.call(this);
        this.swipeRotate.initialized = true;
    }
};

/**
 * Adds ability for user to rotate cube by mouse wheel
 * @param {string} direction which way to rotate: upDown, leftRight*/
CubeInteraction.prototype.addMiddleScrollRotate = function (direction) {

    // since FF has wheel event, while all others have mousewheel and wheel.
    var wheelEvent = 'onwheel' in window ? 'wheel' : 'mousewheel';

    this.cube.shape.addEventListener(wheelEvent, function (wheelEvent) {
        if (this.autoplayInProgres) {
            return
        }

        wheelEvent.preventDefault();

        var value = wheelEvent.deltaY;

        if (value > 0) {
            if (direction === 'leftRight') {
                this.cube.rotateRight()
            }
            else {
                this.cube.rotateUp()
            }
        }
        else {
            if (direction === 'leftRight') {
                this.cube.rotateLeft()
            }
            else {
                this.cube.rotateDown()
            }

        }


    }.bind(this))
};


var swipeRotate = function (direction) {
//TODO ideti ri cia specifikavima i kuria puse, nes i visur leidziant - isibuginti gali del userio scrollinimo
    var startX;
    var startY;
    this.cube.shape.addEventListener('touchstart', function (touchEvent) {
        if (this.autoplayInProgres) {
            return
        }
        startX = touchEvent.touches[0].clientX;
        startY = touchEvent.touches[0].clientY;
    });

    this.cube.shape.addEventListener('touchmove', function (touchEvent) {
        if (!startX || !startY) {
            return
        }

        var diffX = startX - touchEvent.touches[0].clientX;
        var diffY = startY - touchEvent.touches[0].clientY;


        if (Math.abs(diffX) > Math.abs(diffY)) {
            if (this.swipeRotate.leftRight) {
                if (diffX > 0) {
                    this.cube.rotateLeft()
                }
                else {
                    this.cube.rotateRight()
                }
            }
        }
        else {
            if (this.swipeRotate.upDown) {
                if (diffY > 0) {
                    this.cube.rotateUp()
                }
                else {
                    this.cube.rotateDown()
                }
            }
        }

        // set to null, so only touchmove is ignored after it fires once
        startX = null;
        startY = null;

    }.bind(this))
};


// NOT finished, ability to rotate cube by hovering over it
/*CubeInteraction.prototype.__calculateSpinSideAndSpin = function (mouse) {
 if (mouse.offsetX >= (this.cube.width / 2)) {
 return this.cube.rotateLeft()
 }
 else {
 return this.cube.rotateRight()
 }
 };

 CubeInteraction.prototype.addHoverSpin = function () {
 var debouncedSpin = utils.debounce.call(this, this.__calculateSpinSideAndSpin, 200);
 this.cube.shape.addEventListener('mousemove', debouncedSpin)
 };


 var calculateSide = function calculateSide(mouse, cubeWidth) {
 if (mouse.offsetX >= (cubeWidth / 2)) {
 return 'spinRight'
 }
 else {
 return 'spinLeft'
 }
 };*/
