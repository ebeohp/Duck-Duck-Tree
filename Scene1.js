class Scene1 extends Phaser.Scene{
    constructor(){
        super("bootGame");
    }
    preload(){
        this.load.image("tree", "assets/images/tree.png");
        this.load.image("grass", "assets/images/grass.png");
        this.load.spritesheet("duck" , "assets/sprites/duck.png", {
                frameWidth: 250,
                frameHeight: 320
            });
        this.load.spritesheet("ella", "assets/sprites/ella.png", { //Ill probably want these animals to load on random spots so its more interesting.
            frameWidth: 320,
            frameHeight: 320
        });
        this.load.spritesheet("tiger" , "assets/sprites/tiger.png", {
            frameWidth: 320,
            frameHeight: 320
        });
        this.load.spritesheet("monkey" , "assets/sprites/monkey.png", {
            frameWidth: 320,
            frameHeight: 320
        });
        
        this.load.bitmapFont("pixelFont", "assets/font/font.png", "assets/font/font.xml");
    }
    create(){
        this.scene.start("playGame");
        
        this.anims.create({
            key: "duck_anim", //id for animation
            frames: this.anims.generateFrameNumbers("duck"), //array of frames
            frameRate: 10, //speed of animation
            repeat: -1 //will it loop? -1 means infinite
        });
        this.anims.create({
            key: "ella_anim", //id for animation
            frames: this.anims.generateFrameNumbers("ella"), //array of frames
            frameRate: 8, //speed of animation
            repeat: -1 //will it loop? -1 means infinite
        });
        this.anims.create({
            key: "tiger_anim", //id for animation
            frames: this.anims.generateFrameNumbers("tiger"), //array of frames
            frameRate: 4, //speed of animation
            repeat: -1 //will it loop? -1 means infinite
        });
        this.anims.create({
            key: "monkey_anim", //id for animation
            frames: this.anims.generateFrameNumbers("monkey"), //array of frames
            frameRate: 8, //speed of animation
            repeat: -1 //will it loop? -1 means infinite
        });
    }
}