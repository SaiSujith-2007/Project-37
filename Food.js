class Food{
constructor(){
    this.image=loadImage("Milk.png");
    this.foodStock=0;
    this.lastFed=0;
        

}

display(){
    var x=300,y=300;

    imageMode(CENTER);
    image(this.image,720,220,70,70);

    if(this.foodStock!=0){
        for(var i=0;i<this.foodStock;i++){
            if(i%10==0){
                x=80;
                y=y+50;
            }
            image(this.image,x,y,50,50);
            x=x+30;
        }
    }
       
}


    getFoodStock(){

        return this.foodStock;

    }

    updateFoodStock(foodStock){
        this.foodStock=foodStock;

    }

    deductFood(){
    if(this.foodStock>0){
        this.foodStock=this.foodStock-1;
    }
    }

    getLastFed(lastFed){
        this.lastFed=getLastFed;
    }

    bedroom(){
        background(bedroomImage,550,500);
    }

    garden(){
        background(gardenImage,550,500);
    }

    washroom(){
        background(washroomImage,550,500);
    }
}