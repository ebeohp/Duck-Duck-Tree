class Scene3 extends Phaser.Scene{
    constructor(){
        super("endGame");
    }
    create(){

        this.add.bitmapText(200,200, "pixelFont", "Game over ",50);
        this.add.bitmapText(180,350, "pixelFont", "Press SPACE to restart. ",30);
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        
        this.over = this.sound.add("over");
        this.over.play();
        this.start = this.sound.add("start");
    
    }
    update()
    {
         if(Phaser.Input.Keyboard.JustDown(this.spacebar)){
            this.restartGame();
            this.start.play();
        }
    }
    restartGame(){
        this.scene.start("bootGame");
    }
}