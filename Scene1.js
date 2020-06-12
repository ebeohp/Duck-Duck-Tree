class Scene1 extends Phaser.Scene{
    constructor(){
        super("bootGame");
    }
    preload(){
        this.load.image("tree", "assets/images/tree.png");
        this.load.image("grass", "assets/images/grass.png");
        
        this.load.spritesheet("title" , "assets/sprites/title.png", {
                frameWidth: 576,
                frameHeight: 576
            });
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
        
        this.load.audio("music", "assets/sound/Boss Fight.ogg");
        this.load.audio("over", "assets/sound/over.mp3");
        this.load.audio("start", "assets/sound/start.mp3");
    }
    create(){
        this.background=this.add.tileSprite(0,0,config.width, config.height, "grass"); //TileSprite is different from images!
        this.background.setOrigin(0,0);
        
        this.anims.create({
            key: "title_anim", //id for animation
            frames: this.anims.generateFrameNumbers("title"), //array of frames
            frameRate: 5, //speed of animation
            repeat: -1 //will it loop? -1 means infinite
        });
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
        
        this.title = this.add.sprite(300, 300, "title").setDepth(100); 
        this.title.play("title_anim");
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.add.bitmapText(150,400, "pixelFont", "Press SPACE to start",40);
    
    
         this.spiny = this.add.image(450, 200, "tree").setScale(.5);
         this.spiny2 = this.add.image(100, 100, "tree").setScale(.5);
         this.spiny3 = this.add.image(200, 500, "tree").setScale(.5);
        
         this.start = this.sound.add("start");
    }
    
    update(){
        this.spiny.angle+=3;
        this.spiny2.angle-=3;
        this.spiny3.angle+=3;
        this.background.tilePositionY-= 0.5;
        this.background.tilePositionX-= 0.5;
        if(Phaser.Input.Keyboard.JustDown(this.spacebar)){
            this.start.play();
            this.startGame();
        }
    }
 
    startGame()
    {   
        this.scene.start("playGame");
    }
    
    
}