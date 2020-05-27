class Game {
	constructor(gameWidth,gameHeight){
		this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.hiScore = 0;
	}

	start(){

        this.splashImage = new Image()
        this.splashImage.src = "images/splash.jpg";
        this.starting = true;
        this.introAudio = document.getElementById('introAudio');
        this.deathAudio = document.getElementById('deathAudio');
        this.crunchAudio = document.getElementById('crunchAudio');
        this.yuckAudio = document.getElementById('yuckAudio');
        this.startMenu = this.startMenu.bind(this);
        this.startMenu();
        this.gameOn = this.gameOn.bind(this);
        this.player = new Player(this);
        this.foodInterval = 1000;
        this.food = []
        this.scoreBox = document.getElementById('scoreBox');
        this.statBox = document.getElementById('statBox');
        this.score = 0;
        this.levelScore = 0;
        this.scoreState = 1;
        this.lives = 5;
        this.level = 1;
        this.scoreBox.innerHTML = `Score: ${this.score}`;
        this.statBox.innerHTML = `Hi Score: ${this.hiScore}`;
        this.gameOver = this.gameOver.bind(this);
        this.over = false;
        this.stars = [];
        this.background = new Image();
        this.background.src = "images/canvasbg.jpg"
        this.dryChance = 25;
        this.maxSpeed = 10;
        
        new InputHandler(this.player);
	}
	
	update(deltaTime){
        if(!game.starting){
            if(!this.over){
                this.gameObjects.forEach((object) => object.update(deltaTime));
                this.gameObjects = this.gameObjects.filter(object => !object.markedForDeletion);
            }
        }
        this.scoreBox.innerHTML = `Score: ${this.score}`;
        if (this.score > this.hiScore){this.hiScore = this.score};
        if(this.levelScore == 1000){
            this.levelScore = 0;
            this.level++;
            game.statBox.innerHTML = `Level: ${this.level}`;
            if(this.foodInterval > 100){this.foodInterval-=100};
            if(this.dryChance < 90){this.dryChance+=5};
            this.maxSpeed+=1;
            console.log(this.maxSpeed);
            console.log(this.foodInterval);
            console.log(this.dryChance);
        };
	}

	draw(ctx){
        if(!game.starting){
            ctx.drawImage(this.background,0,0);
            if(!this.over){
                this.gameObjects.forEach((object) => object.draw(ctx));
            }else{
                this.player.draw(ctx);
            }
        }else{
            ctx.drawImage(this.splashImage,0,0);
        }
    } 
    
    gameOver(){
        this.over = true;
        this.gameObjects = [this.player];
        this.player.maxSpeed = 0;
        this.statBox.innerHTML = `Taco Cat X ${this.lives}`;
        game.introAudio.pause();
        game.deathAudio.play();

        for (var i = 1; i < 99999; i++){
            window.clearInterval(i);
        };

        setTimeout(()=>{game.start();},5000);
    }

    startMenu(){
        document.addEventListener('click',game.gameOn);   
    }

    gameOn(){
        if(game.starting){
            game.starting = false;
            game.introAudio.pause();
            game.introAudio.currentTime = 0;
            game.introAudio.play();
            setInterval(()=>{
                switch(game.scoreState){
                    case 1:
                        game.statBox.innerHTML = `Hi Score: ${game.hiScore}`;
                        game.scoreState =2;
                        break;
                    case 2:
                        game.statBox.innerHTML = `Taco Cat X ${game.lives}`;
                        game.scoreState = 3;
                        break;
                    case 3:
                        game.statBox.innerHTML = `Level: ${game.level}`; 
                        game.scoreState = 1;
                        break;
                    }
                },2000);

            setInterval(()=>{
                let foodItem = new Food(game);
                game.food.push[foodItem];
            },game.foodInterval)
            
            setInterval(()=>{
                let star = new Star(game);
                game.stars.push[star];
            },200);

            game.gameObjects = [
                game.player,
                ...game.food,
                ...game.stars, 
            ];
        }
    }
}

