/**
 * Implements logic related to displaying a video on cubes face
 *
 * @param {object} options
 * @param {string} options.url - url to video (only local allowed, no YT etc.)
 * @param {boolean} options.controls - display controls or not
 * @param {boolean} options.autoplay - should video autolay when on front
 * @param {string || function} options.onclickDo - what to do when video is clicked on
 *  if value is "playStop" it will do what value says, if value is function, then function will be executed.
 * @param {string || boolean} options.onmouseoverDo - what to do when video is mouseover/mouseout on
 *  if value is "playStop" it will do what value says, if value is function, then function will be executed.
 * */
var Video = module.exports = function (options) {
    this.domElement = null;
    this.autoplay = options.autoplay;

    this.__initialize(options)
};
Video.prototype.onFront = function () {
    if (this.autoplay) {
        this.play()
    }
};

Video.prototype.offFront = function () {
    this.stop()
};

Video.prototype.play = function () {
    if (this.domElement.paused) {
        this.domElement.play()
    }
};

Video.prototype.stop = function () {
    if (!this.domElement.paused) {
        this.domElement.pause();
    }
};

Video.prototype.__initialize = function (options) {
    this.domElement = document.createElement('video');
    this.domElement.style.height = '100%';
    this.domElement.style.width = '100%';
    this.domElement.src = options.url;
    if (options.hasOwnProperty('controls')) {
        if (options.controls) {
            this.domElement.controls = true;
        }
        else {
            this.domElement.controls = false;
        }
    }
    else {
        this.domElement.controls = true;

    }

    if (options.hasOwnProperty('onclickDo')) {
        if (options.onclickDo === 'playStop') {
            this.domElement.addEventListener('click', this.__startStopOnClick.bind(this))
        }
        else if (typeof options.onclickDo === 'function') {
            this.domElement.addEventListener('click', options.onclickDo.bind(this))
        }
    }

    if (options.hasOwnProperty('onmouseoverDo')) {
        if (options.onmouseoverDo === 'playStop') {
            this.domElement.addEventListener('mouseover', this.play.bind(this));
            this.domElement.addEventListener('mouseout', this.stop.bind(this))
        }
        else if (typeof options.onmouseoverDo === 'function') {
            this.domElement.addEventListener('mouseover', options.onmouseoverDo.bind(this))
        }
    }
};

Video.prototype.__startStopOnClick = function () {
    if (!this.domElement.paused) {
        this.stop()
    }
    else {
        this.play()
    }
};