class Food {
    constructor(){
        this.foodStock = 10;
        this.lastFed;
    }

    updateFoodStock(foodStock){

        this.foodStock = foodStock;
    }

    deductFood(){

        if (this.foodStock > 0){

            this.foodStock --;
        } else {
            this.foodStock = 0;
        }
    }

    getFoodStock(){
        return this.foodStock
    }
    
    display(){
        console.log(this.foodStock)
        var x = 200;
        var y = 600;

        imageMode(CENTER);

        if(this.foodStock != 0){
            for(var i = 0; i < this.foodStock; i++){
                if(i % 20 === 0){
                    x = 200;
                    y += 50;
                }
                image(milk, x, y, 50, 50)
                x += 30;
            }
        }
    }
}