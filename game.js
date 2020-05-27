//**********************************************************************************************************************

class Game {
	constructor(gameWidth,gameHeight){
		this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.hiScore = 0;
	}

	start(){

        this.splashImage = new Image()
        this.splashImage.src = "splash.jpg";
        this.starting = true;

        this.introAudio = document.getElementById('introAudio');
        this.deathAudio = document.getElementById('deathAudio');
        this.crunchAudio = document.getElementById('crunchAudio');
        this.yuckAudio = document.getElementById('yuckAudio');
        //this.introAudio.muted = true;
        console.log(this.introAudio);
        //this.introAudion.muted = true;
        
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
        this.background.src = "canvasbg.jpg"
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

//********************************************************************************

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
//********************************************************************************

class InputHandler {
	constructor(player){
		document.addEventListener('keydown',(event)=>{
			//alert(event.keyCode);
			switch(event.keyCode){
				case 37:
					player.moveLeft();
                    break;
                case 38:
                    player.moveUp();
                    break;
				case 39:
					player.moveRight();
                    break;
                case 40:
                    player.moveDown();
                    break;
			}
		});
		document.addEventListener('keyup',(event)=>{
            switch(event.keyCode){
                case 37:
                    if(player.speed.x < 0){player.stopX()};
                    break;
                case 38:
                    if(player.speed.y < 0){player.stopY()};
                    break;
                case 39:
                    if(player.speed.x > 0){player.stopX()};
                    break;
                case 40:
                    if(player.speed.y > 0){player.stopY()};
                    break;
            };
        });
    }
}

//********************************************************************************

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

//********************************************************************************

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

//********************************************************************************

function detectCollision(food,player){
    let foodTop = food.position.y;
    let foodBottom = food.position.y + food.height;
    let foodLeft = food.position.x;
    let foodRight = food.position.x + food.width;

    let playerTop = player.position.y;
    let playerBottom = player.position.y + player.height;
    let playerLeft = player.position.x;
    let playerRight = player.position.x + player.width;
   
    if(
        foodBottom >= playerTop
        && foodTop <= playerBottom
        && foodLeft <= playerRight
        && foodRight >= playerLeft
        ){
        return true;
        }else{
        return false;
    }
}

//********************************************************************************

let canvas = document.getElementById('gameScreen');
let ctx = canvas.getContext('2d');

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

let game = new Game(GAME_WIDTH,GAME_HEIGHT);
game.start()

ctx.clearRect(0,0,800,600);

let lastTime = 0;

requestAnimationFrame(gameLoop);

function gameLoop(timestamp){
	let deltaTime = timestamp - lastTime;
	lastTime = timestamp;

	ctx.clearRect(0,0,GAME_WIDTH,GAME_HEIGHT);

	game.update(deltaTime);
	game.draw(ctx);
	requestAnimationFrame(gameLoop);
};

//**********************************************************************************************************************