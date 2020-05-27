class Star {
    constructor(game){
        game.gameObjects.push(this);
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.image = document.getElementById('star');
        this.width = 10;
        this.height = 10;

        this.position = {x:0,y:(Math.ceil(Math.random()*(this.gameHeight - this.height)))};

        this.markedForDeletion = false;

        this.speed = Math.ceil(Math.random()*10+1);
    }

    update(deltaTime){
        this.position.x += this.speed;
        if(this.position.x + this.width > this.gameWidth){this.markedForDeletion=true};
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