
/**
 * A wrap object for DOM element containing one of cubes faces,
 * logic and state related to cubes faces go there*/
var Face = module.exports = function (DOMel) {
    this.domElement = DOMel;
    this.content = null;
};

Face.prototype.onFront = function () {
    if (this.content) this.content.onFront()
};

Face.prototype.offFront = function () {
    if (this.content) this.content.offFront()
};

/**
 * @param {object} contObj - StaticImage or Video objects*/
Face.prototype.addContent = function (contObj) {
    this.content = contObj;
    this.domElement.appendChild(contObj.domElement)
};
