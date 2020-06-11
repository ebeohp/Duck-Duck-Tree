class Scene2 extends Phaser.Scene{
    constructor(){
        super("playGame");
    }
    create(){
        //this.add.text(20,20, "Playing" , {font: "25px Arial", fill: "yellow"});
        
        
        this.grass = this.add.tileSprite(0,0,config.width,config.height,'grass').setOrigin(0,0);
   
        this.ella = this.add.sprite(250, 400, "ella"); 
        this.ella.play("ella_anim");
        this.ella.setScale(.45);
        
        this.tiger = this.add.sprite(500, 200, "tiger");
        this.tiger.play("tiger_anim");
        this.tiger.setScale(.4);
        
        this.monkey = this.add.sprite(200, 150, "monkey"); 
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
        
        
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        
       
        var timedEvent = this.time.addEvent({ //destroys trees 
            delay: 1000, 
            callback: this.onEvent, 
            callbackScope: this, 
            loop: true 
        });
        
        this.initialTime = 100; //2 minutes in seconds?
        //var text = this.add.text(32,32, "Time Left: " + this.timeFormat(this.initialTime));
        this.timeLabel = this.add.bitmapText(300,15, "pixelFont", "Time Left: ",25).setDepth(200);
        var countDown = this.time.addEvent({
            delay:1000,
            callback: this.onCount,
            callbackScore: this,
            loop: true
        });
        
        
        var graphics = this.add.graphics();
        graphics.fillStyle("Black");
        graphics.fillRect(0,0,config.width,40).setDepth(150);
        
        this.planted = 0; //number of trees planted
        this.score = 0; //number of trees on screen
        this.scoreLabel = this.add.bitmapText(20,15, "pixelFont", "TREES ",25).setDepth(200);
        
        this.projectiles = this.add.group(); //holds all the trees
        for(var i = 0; i <10; i++){
            this.plantTree(true);
            this.score += 1;
            this.scoreLabel.text = "TREES " + this.score;
        }
        
        
    }
    
    onEvent(){
        var ranNum = Math.random()*15;
        for(var i = 0; i<ranNum; i++){ 
            var tree = this.projectiles.getChildren()[i];
            if(tree){
                tree.destroy();
                this.score-= 1;
                this.scoreLabel.text = "TREES " + this.score;
            }
            if(this.score == 0){
            this.endGame();
            }   
        }
    }
    
    onCount(){
        this.initialTime -=1;
        this.timeLabel.text = "Time Left: " + this.timeFormat(this.initialTime); //Getting error for this timeFormat not a function.
        //this.text.setText("Time Left: " + this.timeFormat(this.initialTime));
    }
    timeFormat(seconds){
        var minutes = Math.floor(seconds/60);
        var partInSeconds = seconds%60;
        partInSeconds = partInSeconds.toString().padStart(2,"0");
        return `${minutes}:${partInSeconds}`;
    }
    update(){
        
        if(Phaser.Input.Keyboard.JustDown(this.spacebar)){
            this.plantTree();
        }
        
    }
    
    plantTree(rand){ //can plant trees on where the duck is or at a random location.
        if(rand){
            var tree = new Tree(this).setScale(.2).setRandomPosition(0,0, game.config.width, game.config.height);
        }
        else{
            var tree = new Tree(this).setScale(.2);
            this.score+= 1;
            this.scoreLabel.text = "TREES " + this.score;
            this.planted+=1;
        }
        
        this.projectiles.add(tree);
    }
    endGame(){
        this.scene.start("endGame");
    }
    
  
    
}