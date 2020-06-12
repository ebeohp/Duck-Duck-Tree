class Tree extends Phaser.GameObjects.Sprite{
    constructor(scene,){
        
            var x = scene.duck.x;
            var y = scene.duck.y;
            
     
        
        super(scene,x,y, "tree");
        scene.add.existing(this);
    }
    
    update(){
        
    }
   /* randomXY(scene){
        var ranX = Math.Random() * 600;
        var ranY = Math.Random() * 600;
        super(scene, ranX, ranY, "tree");
        scene.add.existing(this);
    }*/
   
}