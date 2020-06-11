class Scene3 extends Phaser.Scene{
    constructor(){
        super("endGame");
    }
    create(){
        this.add.text(20,20, "Game Over" , {font: "25px Arial", fill: "yellow"});
    }
    
}