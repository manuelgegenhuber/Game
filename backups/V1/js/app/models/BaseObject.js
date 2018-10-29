define(['lodash/lodash'], function(_) {
    'use strict';

    /**
     * elementId
     * Id of DomElement (string)
     * only via Constructor
     * READ
     */
    let _elementId = new WeakMap();
    /**
     * parentId
     * Id of the Parent of the DomElement (string)
     * only via Constructor
     * READ
     */
    let _parenId = new WeakMap();
    /**
     * _width
     * width of Element (INT)
     * via Constructor
     * WRITE & READ
     */
    let _width = new WeakMap();
    /**
     * _height
     * height of Element (INT)
     * via Constructor
     * WRITE & READ
     */
    let _height = new WeakMap();
    /**
     * _cssClasses
     * Css classes of Element (Array - String)
     * via Constructor
     * WRITE & READ
     */
    let _cssClasses = new WeakMap();
    /**
     * _topLeftPoint
     * Top-Left Point of Element (Object with Left (INT) and Top (INT))
     * gets calculated at creating the BaseObject
     * READ
     */
    let _topLeftPoint = new WeakMap();
    /**
     * _topRightPoint
     * Top-Right Point of Element (Object with Right (INT) and Top (INT))
     * gets calculated at creating the BaseObject
     * READ
     */
    let _topRightPoint = new WeakMap();
    /**
     * _bottomLeftPoint
     * Bottom-Left Point of Element (Object with Bottom (INT) and Left (INT))
     * gets calculated at creating the BaseObject
     * READ
     */
    let _bottomLeftPoint = new WeakMap();
    /**
     * _bottomRightPoint
     * Bottom-Right Point of Element (Object with Bottom (INT) and Right (INT))
     * gets calculated at creating the BaseObject
     * READ
     */
    let _bottomRightPoint = new WeakMap();

    class BaseObject {
        constructor(elementId, parentId, width = 0, height = 0, cssClasses = []) {
            _elementId.set(this, (typeof elementId === "string") ? elementId : "");
            _parenId.set(this, typeof parentId === "string" ? parentId : "");
            this.width = width;
            this.height = height;
            this.cssClasses = cssClasses;
        }

        get elementId() {
            return _elementId.get(this);
        }

        get parentId() {
            return _parenId.get(this);
        }

        get width() {
            return _width.get(this);
        }

        set width(width) {
            if (typeof width === "number") {
                _width.set(this, width);
            } else {
                throw new Error("The given width is NaN.");
            }
        }

        get height() {
            return _height.get(this);
        }

        set height(height) {
            if (typeof height === "number") {
                _height.set(this, height);
            } else {
                throw new Error("The given width is NaN.");
            }
        }

        get cssClasses() {
            return _cssClasses.get(this);
        }

        set cssClasses(cssClasses) {
            if (cssClasses instanceof Array) {
                _cssClasses.set(this, _.uniq(cssClasses));
            } else {
                throw new Error("The given cssClasses must be instance of Array");
            }
        }

        /**...spread & ..rest operator */
        addCssClass(...cssClasses) {
            this.cssClasses = this.cssClasses.concat(_.flattenDeep(cssClasses));
            console.log("New CssClasses: ", this.cssClasses);
            return this.cssClasses;
        }

        /**...spread & ..rest operator */
        deleteCssClass(...cssClasses) {
            let deleteClasses = _.flattenDeep(cssClasses);
            this.cssClasses = _.remove(this.cssClasses, function(value, index, array) {
                return deleteClasses.indexOf(value) === -1;
            });
            return this.cssClasses;
        }
    }

    return BaseObject;
});

/**
 * function test(...arg){
	return Array.prototype.concat.apply([],arg);
}
 */