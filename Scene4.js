class Scene2 extends Phaser.Scene{
    constructor(){
        super("winGame");
    }
    preload()
    {
        
    }
    create(){
        this.add.text(20,20, "No trees were harmed in the making of this game." , {font: "25px Arial", fill: "yellow"});
    }