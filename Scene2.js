class Scene2 extends Phaser.Scene{
    constructor(){
        super("playGame");
    }
    //var timedEvent;
    
    create(){    
        this.grass = this.add.tileSprite(0,0,config.width,config.height,'grass').setOrigin(0,0);
        
        //maybe add loops (and some updated sprites) for animals to move in place. i can learn that from one of gamedev acad's tutorials.
        this.ella = this.add.sprite(200, 400, "ella"); // later do random spots
        this.ella.play("ella_anim");
        this.ella.setScale(.45);
        
        this.tiger = this.add.sprite(500, 200, "tiger"); // later do random spots
        this.tiger.play("tiger_anim");
        this.tiger.setScale(.4);
        
        this.monkey = this.add.sprite(100, 100, "monkey"); // later do random spots
        this.monkey.play("monkey_anim");
        this.monkey.setScale(.4);
       
        this.duck =this.physics.add.sprite(200,300, "duck");
        var follower = this.duck.setDepth(100);
        follower.play("duck_anim");
        follower.setScale(.6);
        this.input.on('pointermove', function(pointer) 
        {
            this.physics.moveToObject(follower, pointer, 240);
            
        },this);
        follower.setCollideWorldBounds(true);
        //follower.setScale(.5);
        this.add.text(20,20, "Playing game", {font: "25px Arial", fill: "yellow"});
        
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        
       
        var timedEvent = this.time.addEvent({ delay: 1000, callback: this.onEvent, callbackScope: this, loop: true });
        this.projectiles = this.add.group(); //holds all the trees
    }
    onEvent(){
        for(var i = 0; i<2; i++){ 
            var treee = this.projectiles.getChildren()[i];
            treee.update();
        }
    }
    update(){
        
        if(Phaser.Input.Keyboard.JustDown(this.spacebar)){
            
            this.plantTree();
           
        }
    }
    
    plantTree(){
        var tree = new Tree(this).setScale(.2);
        
    }
}