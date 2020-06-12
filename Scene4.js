class Scene4 extends Phaser.Scene{
    constructor(){
        super("winGame");
    }
    init(data){
        this.trees = data.Trees;
        this.planted = data.Total;
    }
    preload()
    {
        this.load.spritesheet("ellawin" , "assets/sprites/ellawin.png", {
            frameWidth: 128,
            frameHeight: 128
        });
        this.load.spritesheet("monkeywin" , "assets/sprites/monkeywin.png", {
            frameWidth: 128,
            frameHeight: 128
        });
        this.load.spritesheet("tigerwin" , "assets/sprites/tigerwin.png", {
            frameWidth: 128,
            frameHeight: 128
        });
        this.load.audio("win", "assets/sound/win.mp3");
    }
    create(){
        this.add.bitmapText(200,100, "pixelFont", "You won! ",50);
        this.add.bitmapText(205,360, "pixelFont", "Trees: " + this.trees,50);
        this.add.bitmapText(140,400, "pixelFont", "Total Planted: " + this.planted,50);
        this.add.bitmapText(170,480, "pixelFont", "[Press SPACE to play again] ",25);
        


        this.anims.create({
            key: "ellawin_anim", //id for animation
            frames: this.anims.generateFrameNumbers("ellawin"), //array of frames
            frameRate: 5, //speed of animation
            repeat: -1 //will it loop? -1 means infinite
        });
        this.anims.create({
            key: "monkeywin_anim", //id for animation
            frames: this.anims.generateFrameNumbers("monkeywin"), //array of frames
            frameRate: 5, //speed of animation
            repeat: -1 //will it loop? -1 means infinite
        });
        this.anims.create({
            key: "tigerwin_anim", //id for animation
            frames: this.anims.generateFrameNumbers("tigerwin"), //array of frames
            frameRate: 5, //speed of animation
            repeat: -1 //will it loop? -1 means infinite
        });


        this.ellawin = this.add.sprite(300, 250, "ellawin"); 
        this.ellawin.play("ellawin_anim");
        this.ellawin.setScale(2);

        this.monkeywin = this.add.sprite(100, 250, "monkeywin"); 
        this.monkeywin.play("monkeywin_anim");
        this.monkeywin.setScale(2);

        this.tigerwin = this.add.sprite(500, 250, "tigerwin"); 
        this.tigerwin.play("tigerwin_anim");
        this.tigerwin.setScale(2);

        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.win = this.sound.add("win");
        this.win.play();
    }
    update()
    {
         if(Phaser.Input.Keyboard.JustDown(this.spacebar)){
            this.restartGame();
            //this.start.play();
        }
    }
    restartGame(){
        this.scene.start("bootGame");
    }
}