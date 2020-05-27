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