
var bg, castleImg, castle2Img, castle3Img;
var castle, castle2, castle3;
var will, willWlk, willAtk, power, powerImg;
var skeleton, skeletonAtk;
var wall, wall2, wall3;
var timer1 = 1;
var timer2 = 0;
var test = true;

function preload() {
    bg = loadImage("images/bg.png");

    castleImg = loadImage("images/castle1.png");
    castle2Img = loadImage("images/castle2.png");
    castle3Img = loadImage("images/castle3.png");

    willWlk = loadAnimation("images/willsonWlk.png", "images/willsonWlk2.png", "images/willsonWlk3.png", 
    "images/willsonWlk4.png", "images/willsonWlk5.png");
    
    willAtk = loadAnimation("images/willsonAtk.png", "images/willsonAtk2.png", "images/willsonAtk3.png", 
    "images/willsonAtk4.png", "images/willsonAtk5.png");

    skeletonAtk = loadAnimation("images/skeleton1.png", "images/skeleton2.png", "images/skeleton3.png",
    "images/skeleton4.png", "images/skeleton5.png", "images/skeleton6.png", "images/skeleton7.png", 
    "images/skeleton8.png", "images/skeleton9.png", "images/skeleton10.png", "images/skeleton11.png", 
    "images/skeleton12.png", "images/skeleton13.png");
    
    powerImg = loadImage("images/power.png");

}

function setup() {
    castle = createSprite(200, 350);
    castle.addImage("castillo", castleImg);
    castle.scale = 0.5;

    will = createSprite(600, 525);
    will.addAnimation("willCaminando", willWlk);
    will.addAnimation("willAtacando", willAtk);

    wall = createSprite(displayWidth / 2, 355, displayWidth, 1);
    wall.visible = false;
    wall2 = createSprite(displayWidth / 2, displayHeight +8, displayWidth, 20);
    wall2.visible = false;
}

function draw() {
    createCanvas(displayWidth, displayHeight);

    background(bg);

    if(keyDown("UP_ARROW")) {
        will.y = will.y -10;
    }

    if(keyDown("DOWN_ARROW")) {
        will.y = will.y +10;
    }

    if(keyWentDown("SPACE")) {
        will.changeAnimation("willAtacando", willAtk);
    }
    else if(test === false){
        will.changeAnimation("willCaminando", willWlk);
    }

    if(frameCount % 60 === 0) {
        timer1 = timer1 -1;
        test = false;
    }
    else if(timer1 <= 0) {
        timer1 = timer1 +1;
        test = true;
    }

    if(frameCount % 20 === 0) {
        timer2 = timer2 +1;
    }

    will.collide(wall);
    will.collide(wall2);

    castle.debug = true;

    keyPressed();

    if(frameCount % 30 === 0) {
        skeleton = createSprite(displayWidth +10, random(displayHeight / 2 +50, displayHeight / 2 +225));
        skeleton.addAnimation("esqueletoAtacando", skeletonAtk);
        skeleton.scale = 1.8;
        skeleton.velocityX = -5;
        skeleton.collide(castle);
        skeleton.setCollider("rectangle", 0, -5, 80, 80);
    }
    /*if(power.isTouching(skeleton)) {
        power.destroy();
    }*/

    drawSprites();
}

function keyPressed() {
    if(keyCode === 32 && timer2 >= 1) {
        power = createSprite(420, 405);
        power.addImage("poder", powerImg);
        power.scale = 0.3;
        power.visible = true;

        power.velocityX = +10;
        power.position.x = will.position.x +25;
        power.position.y = will.position.y;
        power.lifetime = 75;
        power.setCollider("rectangle", 0, 0, 50, 50);
        
        timer2 = 0;
    }

    
}