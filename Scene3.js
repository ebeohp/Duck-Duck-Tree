class Scene3 extends Phaser.Scene{
    constructor(){
        super("endGame");
    }
    create(){

        this.add.bitmapText(20,15, "pixelFont", "Game over ",25);
        
    }
    restartGame(){
        this.scene.start("bootGame");
    }
}