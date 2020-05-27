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