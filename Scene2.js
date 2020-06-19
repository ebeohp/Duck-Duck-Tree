class Scene2 extends Phaser.Scene{
    constructor(){
        super("playGame");
    }
    create(){
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
            delay: 1500, 
            callback: this.onEvent, 
            callbackScope: this, 
            loop: true 
        });
        
        this.initialTime = 60; //should be 60secs
        this.timeLabel = this.add.bitmapText(300,15, "pixelFont", "Time Left: ",25).setDepth(200);
        this.timeLabel.text = "Time Left: " + this.timeFormat(this.initialTime);
        var countDown = this.time.addEvent({
            delay:1000,
            callback: this.onCount,
            callbackScope: this,
            loop: true
        });
        
        this.planted = 0; //number of trees planted
        this.score = 0; //number of trees on screen
        this.scoreLabel = this.add.bitmapText(20,15, "pixelFont", "TREES ",25).setDepth(200);
        
        this.projectiles = this.add.group(); //holds all the trees
        for(var i = 0; i <50; i++){
            this.plantTree(true);
            this.score += 1;
            this.scoreLabel.text = "TREES " + this.score;
        }
        this.music = this.sound.add("music");
        
        var musicConfig = { //optional
            mute: false,
            volume: 1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: false,
            delay: 1
        }
        this.music.play(musicConfig);
        
    }
    
    onEvent(){
        var ranNum = Math.random()*15;
        for(var i = 0; i<ranNum; i++){ 
            var tree = this.projectiles.getChildren()[i];
            if(tree && this.initialTime!=0){
                tree.destroy();
                this.score-= 1;
                this.scoreLabel.text = "TREES " + this.score;
            }
            if(this.score == 0 && this.initialTime!=0){
                this.endGame();
            }   
        }
    }
    timeFormat(seconds){
        var minutes = Math.floor(seconds/60);
        var partInSeconds = seconds%60;
        partInSeconds = partInSeconds.toString().padStart(2,"0");
        return `${minutes}:${partInSeconds}`;
    }
    onCount(){
        if(this.initialTime!=0)
        {
            this.initialTime -=1;
        }else{
            this.winner();
        }
        this.timeLabel.text = "Time Left: " + this.timeFormat(this.initialTime);
    }
    
    update(){
        if(Phaser.Input.Keyboard.JustDown(this.spacebar)){
            this.plantTree();
        }
        if(this.score<5){
            var graphics = this.add.graphics();
            graphics.fillStyle(0xff0000, 1).setDepth(151);
            graphics.beginPath();
            graphics.moveTo(0,0);
            graphics.lineTo(config.width, 0);
            graphics.lineTo(config.width, 40);
            graphics.lineTo(0,40);
            graphics.lineTo(0,0);
            graphics.closePath();
            graphics.fillPath();   
        }else{
            var graphics = this.add.graphics();
            graphics.fillStyle(0x000000, 1).setDepth(151);
            graphics.beginPath();
            graphics.moveTo(0,0);
            graphics.lineTo(config.width, 0);
            graphics.lineTo(config.width, 40);
            graphics.lineTo(0,40);
            graphics.lineTo(0,0);
            graphics.closePath();
            graphics.fillPath();
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
        this.music.stop();
        this.scene.start("endGame");
    }
    winner(){
        this.music.stop();
        this.scene.start("winGame", {Trees: this.score, Total: this.planted});
    }
  
    
}