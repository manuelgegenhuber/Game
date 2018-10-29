define([
    'models/BaseObject',
    'models/Block',
    'view/painter'
], function(BaseObject, Block, Painter) {

    /**
     * MAIN GAME LOGIC
     */

    let block1 = new Block();
    let block2 = new Block();
    let base1 = new BaseObject();
    let painter1 = new Painter('#playfield');

    let blockCss = [
        'block1',
    ];

    block1.addCssClass(blockCss);
    block1.x = 60;
    block1.y = 10;
    block1.points = 2;

    block2.addCssClass(blockCss);
    block2.x = 20;
    block2.y = 75;
    block2.points = 7009;

    painter1.paint(block1);

    block1.points = 10;
    block1.cssClasses = ['block2'];
    block1.width = 75;
    block1.height = 30;

    painter1.paint(block1);

    console.dir(block1);
    console.dir(block2);
    console.dir(base1);
    console.dir(painter1);
});


/**
 * Require a RequireJs Module in Chrome Console
 * 
 * load module by:
 * require(['module']);
 * 
 * get return value of module on variable by:
 * var x = require('module');
 */