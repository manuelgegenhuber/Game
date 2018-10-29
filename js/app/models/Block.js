define(['models/BaseObject'], function(BaseObject) {
    'use strict';

    /**
     * _points
     * The amount of points a player receives by destroying the block. (INT)
     * via constructor or setter
     * WRITE & READ
     */
    let _points = new WeakMap();

    /**
     * _strength
     * The amount of times the block can be hit until it's destroyed. (INT)
     * via constructor or setter
     * WRITE & READ
     */
    let _strength = new WeakMap();

    /**
     * _counter
     * To create the elementId
     * only used in constructor
     */
    let _counter = 0;

    //variable für alle Instanzen in der die Destroy-Animation gespeichert wird?

    class Block extends BaseObject {
        constructor(parentId, width, height, points = 0, strength = 1, cssClasses = []) {
            _counter++;
            super("block-" + _counter, parentId, width, height, cssClasses);
            this.points = points;
            this.strength = strength;
        }

        get points() {
            return _points.get(this);
        }

        set points(points) {
            if (typeof points === "number" && points >= 0) {
                _points.set(this, points);
            } else if (typeof points !== "number") {
                throw new Error("The given points is NaN.");
            } else if (points < 0) {
                throw new Error("he given points must be equal / greater than 0");
            }
        }

        get strength() {
            return _strength.get(this);
        }

        set strength(strength) {
            if (typeof strength === "number" && strength > 0) {
                _strength.set(this, strength);
            } else if (typeof strength !== "number") {
                throw new Error("The given strength is NaN.");
            } else if (strength <= 0) {
                throw new Error("he given strength must be greater than 0");
            }
        }

        hasBeenHit() {
            if (this.strength !== 1) {
                --this.strength;
            } else {
                return 0;
            }
            return this.strength;
        }
    }
    return Block;
});