var game = new Phaser.Game(1200, 900, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('background','assets/tests/debug-grid-1920x1920.png');
    game.load.image('player','assets/sprites/kirito.png');
    game.load.image('diamond', 'assets/sprites/diamond.png');

}

var player;
var cursors;

function create() {

    game.add.tileSprite(0, 0, 1920, 1920, 'background');
    
    game.world.setBounds(0, 0, 1920, 1920);

    game.physics.startSystem(Phaser.Physics.P2JS);

    player = game.add.sprite(game.world.centerX, game.world.centerY, 'player');

    game.physics.p2.enable(player);

    cursors = game.input.keyboard.createCursorKeys();

    game.camera.follow(player);
    
    // FullScreen
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
    game.input.onDown.add(gofull, this);
    
    
}

function gofull() {

    if (game.scale.isFullScreen)  {
        game.scale.stopFullScreen();
    } else {
        game.scale.startFullScreen(false);
    }
}


function update() {

    player.body.setZeroVelocity();

    charController();
    
    game.time.events.repeat(Phaser.Timer.SECOND * 2, 10, createDiamond, this);

}

function charController() {
    if (cursors.up.isDown)
    {
        player.body.moveUp(300);
    }
    
    else if (cursors.down.isDown)
    {
        player.body.moveDown(300);
    }

    if (cursors.left.isDown)
    {
        player.body.velocity.x = -300;
    }
    else if (cursors.right.isDown)
    {
        player.body.moveRight(300);
    }    
}

function createDiamond() {
    var diamond = game.add.image(0, 0, 'diamond');
    game.physics.enable(diamond, Phaser.Physics.ARCADE);

    diamond.body.bounce.y = 0.9;
    diamond.body.collideWorldBounds = true;
}

function render() {

    game.debug.cameraInfo(game.camera, 32, 32);
    // game.debug.spriteCoords(player, 32, 500);

}