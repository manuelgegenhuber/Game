define([
    'lodash',
    'jquery',
    'models/BaseObject',
    'models/Block'
], function(_, $, BaseObject, Block) {
    'use strict';

    /**
     * _parentId
     * Id of the Parent of the DomElement (string)
     * Default can be set via Constructor -> for Element's without parentIds
     * only via Constructor
     * READ
     */
    let _parentId = new WeakMap();

    /** 
     * existingElements
     * Array mit den bereits gezeichneten Elementen (Array - String)
     * READ
     */
    let existingElements = [];

    class Painter {

        constructor(parentId) {
            _parentId.set(this, typeof parentId === "string" ? parentId : "body");
        }

        get parentId() {
            return _parentId.get(this);
        }

        get existingElements() {
            return existingElements;
        }

        paint(element) {
            if (element instanceof BaseObject) {
                if (existingElements.indexOf(element.elementId) == -1) {
                    existingElements.push(element.elementId);
                    create(this.parentId, element)
                } else {
                    update(this.parentId, element);
                }
            } else {
                throw new Error("The given element is not an instance of 'BaseObject'.");
            }
        }
    }

    function create(parent, element) {
        let domElement = document.createElement('div');

        $(domElement).addClass(element.cssClasses)
            .prop('id', element.elementId)
            .height(element.height)
            .width(element.width)
            .offset(calculateOffsets(parent, element))
            .appendTo(parent);

        if (element instanceof Block) {
            let textElement = document.createElement('p');
            textElement.innerText = element.points;
            $(domElement).append(textElement);
        }
    }

    function update(parent, element) {

        let domElement = $('#' + element.elementId);

        domElement.removeClass().addClass(element.cssClasses)
            .height(element.height)
            .width(element.width);

        //works
        if (element instanceof Block) {
            domElement.children('p')[0].innerText = element.points;
        }
    }

    function calculateOffsets(parent, element) {
        let parentDomElement = $(parent);
        let offsets = {
            top: parentDomElement.height() * (element.y / 100),
            left: parentDomElement.width() * (element.x / 100)
        }
        console.dir(offsets);

        return offsets;
    }

    return Painter;
});