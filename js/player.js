class Player {
	constructor(game){
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
		this.width = 72;
		this.height = 61;
		this.maxSpeed = 5;
        this.speed = {x:0,y:0};
        this.image = document.getElementById('cat1');
		this.position = {
			x: game.gameWidth / 2 - this.width / 2,
			y: game.gameHeight /2 - this.height - 10,
        };
        this.imageToggled = true;
        this.toggleImage = this.toggleImage.bind(this);
        this.animate = setInterval(this.toggleImage,300);


        this.hurt = false;
        this.getHurt = this.getHurt.bind(this);

    };
    
	draw(ctx){
		ctx.drawImage(
			this.image, 
			this.position.x, 
			this.position.y, 
			this.width, 
			this.height
        );  
	}

	update(deltaTime){
		this.position.x+=this.speed.x;
        this.position.y+=this.speed.y;
		if(this.position.x < 0) this.position.x = 0;
        if(this.position.x + this.width > this.gameWidth) this.position.x = this.gameWidth - this.width;
        
        if(this.position.y < 0) this.position.y = 0;
        if(this.position.y + this.height > this.gameHeight) this.position.y = this.gameHeight - this.height; 
	}

	moveLeft(){
		this.speed.x = -this.maxSpeed;
	}

	moveRight(){
		this.speed.x = this.maxSpeed;
	}

	moveUp(){
		this.speed.y = -this.maxSpeed;
	}

	moveDown(){
		this.speed.y = this.maxSpeed;
	}

	stopX(){
        this.speed.x = 0;
    }

	stopY(){
        this.speed.y = 0;
    }

    toggleImage(){
        if(this.imageToggled){
            this.imageToggled = false;
            this.image = document.getElementById('cat1');
        }else{
            this.imageToggled = true;
            this.image = document.getElementById('cat2');
        }
    }

    getHurt(){
        clearInterval(this.animate);
        game.lives --;
        game.statBox.innerHTML = `Taco Cat X ${game.lives}`;
        if(game.lives == 0){
            clearInterval(this.animate);
            clearInterval(this.toggleImage);
            this.image = document.getElementById('cat4');
            game.gameOver();
        }else{
            this.image = document.getElementById('cat3');
            game.yuckAudio.pause();
            game.yuckAudio.play();
            setTimeout(()=>{
                clearInterval(this.animate);
                this.animate = setInterval(this.toggleImage,300); 
            },1000);
        }
    }
}