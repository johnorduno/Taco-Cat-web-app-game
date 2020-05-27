class Food {
    constructor(game){
        game.gameObjects.push(this);
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.dryChance = game.dryChance;
        this.foodScore = 100;
        let typeNumber = Math.ceil(Math.random() * 100);
        (typeNumber >= this.dryChance) ? this.type = "taco" : this.type = "dry";
        if (this.type === "taco"){
            this.width = 59;
            this.height = 32;
            this.image = document.getElementById('taco');
        }else if(this.type === "dry"){
            this.width = 30;
            this.height = 49;
            this.image = document.getElementById('dryFood');
        }
        this.speed = Math.ceil(Math.random()*game.maxSpeed+1);
        this.position = {x:0,y:(Math.ceil(Math.random()*(this.gameHeight - this.height)))};
        this.markedForDeletion = false; 
    }

    update(deltaTime){
        this.position.x += this.speed;
        if(this.position.x + this.width > this.gameWidth){this.markedForDeletion=true};
        if(detectCollision(this,game.player)){
            if(this.type==="dry"){
                game.player.getHurt()
            }else{
                game.score += this.foodScore;
                game.levelScore += this.foodScore;
                game.crunchAudio.pause();
                game.crunchAudio.play();
            }
            this.markedForDeletion = true; 
        }
    }

    draw(ctx){
		ctx.drawImage(
			this.image, 
			this.position.x, 
			this.position.y, 
			this.width, 
			this.height
        );  
	}
}