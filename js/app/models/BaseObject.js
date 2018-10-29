define(['lodash'], function(_) {
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
     * via Constructor or setter
     * WRITE & READ
     */
    let _width = new WeakMap();
    /**
     * _height
     * height of Element (INT)
     * via Constructor or setter
     * WRITE & READ
     */
    let _height = new WeakMap();
    /**
     * _cssClasses
     * Css classes of Element (Array - String)
     * via Constructor or setter
     * WRITE & READ
     */
    let _cssClasses = new WeakMap();
    /**
     * _xPosition
     * Top Point of Element (% of parent height)
     * via constructor or setter
     * WRITE & READ
     */
    let _xPosition = new WeakMap();
    /**
     * _yPosition
     * Left Point of Element (% of parent width)
     * via constructor or setter
     * WRITE & READ
     */
    let _yPosition = new WeakMap();

    class BaseObject {
        constructor(elementId, parentId, width, height, cssClasses = []) {
            _elementId.set(this, (typeof elementId === "string") ? elementId : "");
            _parenId.set(this, typeof parentId === "string" ? parentId : "");
            this.width = (typeof width === "number") ? width : 10;
            this.height = (typeof height === "number") ? height : 10;
            this.cssClasses = cssClasses;
            this.x = 0;
            this.y = 0;
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
            if (typeof width === "number" && width > 0) {
                _width.set(this, width);
            } else if (typeof width !== "number") {
                throw new Error("The given width is NaN.");
            } else if (width < 0) {
                throw new Error("The given width must be greater than 0");
            }
        }

        get height() {
            return _height.get(this);
        }

        set height(height) {
            if (typeof height === "number" && height > 0) {
                _height.set(this, height);
            } else if (typeof height !== "number") {
                throw new Error("The given height is NaN.");
            } else if (height < 0) {
                throw new Error("The given height must be greater than 0");
            }
        }

        get x() {
            return _xPosition.get(this);
        }

        set x(x) {
            if (typeof x === "number" && x <= 100 && x >= 0) {
                _xPosition.set(this, x);
            } else if (typeof x !== "number") {
                throw new Error("The given width is NaN.");
            } else if (x > 100 || x < 0) {
                throw new Error("x must be between 0 and 100 as it represents the % of its parents height.");
            }
        }

        get y() {
            return _yPosition.get(this);
        }

        set y(y) {
            if (typeof y === "number" && y <= 100 && y >= 0) {
                _yPosition.set(this, y);
            } else if (typeof y !== "number") {
                throw new Error("The given width is NaN.");
            } else if (y > 100 || y < 0) {
                throw new Error("y must be between 0 and 100 as it represents the % of its parents width.");
            }
        }

        get cssClasses() {
            return _cssClasses.get(this);
        }

        set cssClasses(cssClasses) {
            if (cssClasses instanceof Array && _.every(cssClasses, current => { return typeof current === "string" })) {
                _cssClasses.set(this, _.uniq(cssClasses));
            } else {
                throw new Error("The given cssClasses must be instance of Array (String)");
            }
        }

        addCssClass(...cssClasses) {

            this.cssClasses = this.cssClasses.concat(_.flattenDeep(cssClasses));

            return this;
        }

        deleteCssClass(...cssClasses) {
            let deleteClasses = _.flattenDeep(cssClasses);

            _.remove(this.cssClasses, function(value, index, array) {
                //delete every class in 'this.class' that can be found in 'deleteClasses'
                return deleteClasses.indexOf(value) !== -1;
            });

            return this;
        }
    }

    return BaseObject;
});