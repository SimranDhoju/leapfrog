function Box (parentElement){
    this.x= 10;
    this.y= 10;
    this.width= 20;
    this.height= 20;
    this.element= null;
    //this.speed = 1;
    this.dx= 10;
    this.dy = 10;
    this.parentElement = parentElement;
    var that =this; 

    this.init = function(){
        //console.log("hello");
        var box = document.createElement('div');
        box.style.width= this.width + 'px';
        box.style.height = this.height +'px';
        box.classList.add('box');
        this.parentElement.appendChild(box);
        this.element = box;
        this.draw();
        return this;
    }

    this.draw = function(){
        this.element.style.left=this.x + 'px';
        this.element.style.top= this.y + 'px'; 
    }

    this.move = function(width,height){
       
        if(this.x + this.dx > width-this.width || this.x + this.dx < this.width/2) {
            this.dx = -this.dx;
        }
        if(this.y + this.dy > height-this.height || this.y + this.dy < this.height/2) {
            this.dy = -this.dy;
         }
        
        this.x += this.dx;
        this.y += this.dy;

        // this.x += this.speed;
        // this.y += this.speed;
        this.draw();

    }

     this.checkCollision = function(boxes){ 
            console.log("hi");
        for(var i=0; i< boxes.length; i++){
            if (this.x < boxes[i]. x + boxes[i].width &&
                this.x + this.width > boxes[i].x &&
                this.y < boxes[i].y + boxes[i].height &&
                this.y + this.height > boxes[i].y) {
                    // collision detected!
                    this.dx = -this.dx;
                    this.dy = -this.dy;
                    boxes[i].dx= -boxes[i].dx;
                    boxes[i].dy= -boxes[i].dy;
                    
                 }
            }
        }

    this.position= function(x, y){
        this.x = x;
        this.y = y;
    }
}



function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function Game(parentElement,boxCount){
    var boxes=[];
    var maxWidth = 400;
    var maxHeight = 400;
    this.parentElement = parentElement;
    this.boxCount= boxCount;


    this.startGame = function() {
        for(var i=0; i < this.boxCount; i++) {
            var box = new Box(parentElement).init();
            console.log(box);
            // box.position(
            // getRandomArbitrary(0, maxWidth - box.width),
            // getRandomArbitrary(0, maxHeight - box.height)
            // )
            var posx = getRandomArbitrary(0, maxWidth - box.width);
            var posy= getRandomArbitrary(0, maxHeight - box.height);
            box.position(posx,posy);

            for(var i=0;i<boxes.length;i++){
                if(posx >= boxes[i].x && posx <= boxes[i].x+boxes[i].width){
                    if(posy >= boxes[i].y && posy <= boxes[i].y+boxes[i].height){
                        var posx = getRandomArbitrary(0, maxWidth - box.width);
                        var posy= getRandomArbitrary(0, maxHeight - box.height);
                        box.position(posx,posy);
                    }
                }
            }

           
            box.draw();
            boxes.push(box);
            
            
        }

        
        setInterval(this.moveBoxes.bind(this), 100)
    }

    this.moveBoxes = function() {
        for(var i=0; i< this.boxCount; i++) {
            boxes[i].move(maxWidth,maxHeight);
            boxes[i].checkCollision(boxes);         
                 
        }
    }    
}




var parentElement = document.getElementById('box-container');

new Game(parentElement,10).startGame();

