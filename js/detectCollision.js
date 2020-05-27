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