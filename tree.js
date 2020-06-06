class Tree extends Phaser.GameObjects.Sprite{
    constructor(scene,place){
        var x = scene.duck.x;
        var y = scene.duck.y;
        
        
        super(scene,x,y, "tree");
        scene.add.existing(this);
    }
    
    update(){
        this.destroy();
    }
   
}