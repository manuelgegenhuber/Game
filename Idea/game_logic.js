function GameObject(element, speed = 10) {
    this.domElement = element;
    this.verticalCounter = 0;
    this.horizontalCounter = 0;
    this.speed = speed;
    this.parentNode = this.domElement.parentNode;

    this.move = function(direction) {
        direction = direction.toLowerCase();
        this.horizontalCounter += (direction === "left") ? (-1) : (direction === "right") ? 1 : 0;
        this.verticalCounter += (direction === "up") ? (-1) : (direction === "down") ? 1 : 0;
    }
    this.updatePosition = function() {
        //Array.prototype.every(arguments) damit man so viel wie man will validierungsfunktion übergeben kann
        if (this.insideParent()) {
            this.domElement.style.left = (this.horizontalCounter * this.speed) + "px";
            this.domElement.style.top = (this.verticalCounter * this.speed) + "px";
        }
    }
    this.createAsDomElement = function(newId) {
        var newNode = document.createElement(this.domElement.tagName);
        newNode.id = typeof newId === "string" ? newId : "box" + document.getElementsByTagName('div').length;
        newNode.classList = this.domElement.classList;
        newNode.style.cssText = this.domElement.style.cssText;
        this.parentNode.appendChild(newNode);
    }
    this.insideParent = function() {
        var rightPointOfElement = (this.horizontalCounter * this.speed) + this.domElement.offsetWidth;
        var maxAllowedRight = this.parentNode.offsetWidth;
        var bottomPointOfElement = (this.verticalCounter * this.speed) + this.domElement.offsetHeight;
        var maxAllowedBottom = this.parentNode.offsetHeight;

        if ((this.horizontalCounter * this.speed) < 0) {
            console.log("Nope Horizontal");
            this.horizontalCounter = 0;
        } else if (rightPointOfElement > maxAllowedRight) {
            console.log("Nope Horizontal");
            this.horizontalCounter = (this.parentNode.offsetWidth - this.domElement.offsetWidth) / this.speed;
        }
        if ((this.verticalCounter * this.speed) < 0) {
            console.log("Nope Vertical");
            this.verticalCounter = 0;
        } else if (bottomPointOfElement > maxAllowedBottom) {
            console.log("Nope Vertical");
            this.verticalCounter = (this.parentNode.offsetHeight - this.domElement.offsetHeight) / this.speed;
        }
        return true;
    }
}

window.onload = function() {
    var g = new GameObject(document.getElementById("box"), 50);
    window.addEventListener("keydown", function(key) {
        //console.log(key.keyCode);
        switch (key.keyCode) {
            case 32:
                g.createAsDomElement();
                break;
            case 37:
                g.move("Left");
                g.updatePosition();
                break;
            case 38:
                g.move("Up");
                g.updatePosition();
                break;
            case 39:
                g.move("Right");
                g.updatePosition();
                break;
            case 40:
                g.move("Down");
                g.updatePosition();
                break;
        }
    }, false);
}