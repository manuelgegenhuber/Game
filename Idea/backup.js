function GameObject(element, speed = 10) {
    this.domElement = element;
    this.verticalCounter = 0;
    this.horizontalCounter = 0;
    this.speed = speed;
    this.parentNode = this.domElement.parentNode;

    this.move = function(direction) {
        direction = direction.toLowerCase();
        this.verticalCounter += (direction === "left") ? (-1) : (direction === "right") ? 1 : 0;
        this.horizontalCounter += (direction === "up") ? (-1) : (direction === "down") ? 1 : 0;
    }
    this.updatePosition = function() {
        this.domElement.style.left = (this.verticalCounter * this.speed) + "px";
        this.domElement.style.top = (this.horizontalCounter * this.speed) + "px";
    }
    this.createAsDomElement = function(newId) {
        var newNode = document.createElement(this.domElement.tagName);
        newNode.id = typeof newId === "string" ? newId : "box" + document.getElementsByTagName('div').length;
        newNode.classList = this.domElement.classList;
        newNode.style.cssText = this.domElement.style.cssText;
        this.parentNode.appendChild(newNode);
    }
    this.validateNewPosition = function() {

    }
}

window.onload = function() {
    var g = new GameObject(document.getElementById("box"));
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