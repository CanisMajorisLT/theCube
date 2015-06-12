/**
 * Implaments logic related to displaying an image on cubes face
 * @param {object} options
 * @param {string} options.url - url to static image
 * @param {boolean} options.autoplay - should autoplay function be started when face is on front
 * @param {function} options.autoplayFunction - function to be executed when face containing image is on front
 * @param {function} options.onclickDo - when image is clicked on the function will be executed.
 * @param {function} options.onmouseoverDo - when image is mouseover/mouseout on function will be executed.
 * */
var StaticImage = module.exports = function (options) {
    this.domElement = null;

    this.autoplay = options.autoplay;
    this.autoplayFunction = options.autoplayFunction;

    this.autoplayOn = false;
    this.__initialize(options);

};
StaticImage.prototype.onFront = function () {
    if (this.autoplay) {
        this.autoplayOn = true;
        this.autoplayFunction()
    }
};

StaticImage.prototype.offFront = function () {
    if (this.autoplay && this.autoplayOn) {
        this.autoplayOn = false;
        this.autoplayFunction()
    }
};


StaticImage.prototype.__initialize = function (options) {
    this.domElement = document.createElement('img');
    this.domElement.style.height = '100%';
    this.domElement.style.width = '100%';
    this.domElement.src = options.url;

    if (options.hasOwnProperty('onclickDo')) {
        this.domElement.addEventListener('click', options.onclickDo.bind(this))
    }

    if (this.hasOwnProperty('onmouseoverDo')) {
        this.domElement.addEventListener('mouseover', options.onmouseoverDo.bind(this))
    }
};
