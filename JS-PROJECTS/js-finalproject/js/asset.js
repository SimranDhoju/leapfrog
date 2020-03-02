var ctx, jewels = [];
var imageList = [orange, red, blue, green, grey, purple]
var row = 8;
var col = 8;
        function Jewel(x, y) {
            this.x1 = x;
            this.y1 = y;
            this.x2 = x;
            this.y2 = y;
        }

        function initialize() {
            //create Jewel objects
            for (let x = 0; x < row; x++) {
                jewels[x] = [];
                for (let y = 0; y < col; y++) {
                    jewels[x][y] = new Jewel(x, y);
                }
            }
            //set color
            for (let x = 0; x < row; x++) {
                for (let y = 0; y < col; y++) {
                    while (true) {
                        let colorNum = Math.floor(Math.random() * 6); //generate random number from 0 to 5
                        if (checkColor(x, y, colorNum)) {
                            jewels[x][y].color = colorNum;
                            break;
                        }
                    }
                }
            }
            //initialize canvas
            var canvas = document.getElementById("canvas");
            ctx = canvas.getContext("2d");

            draw();
        }
        function checkColor(x, y, c) {
            let flag = true;
            if (x > 1) {
                var c0 = jewels[x - 2][y].color;
                var c1 = jewels[x - 1][y].color;
                if (c0 == c1 && c1 == c) {
                    flag = false;
                }
            }
            if (y > 1) {
                var c0 = jewels[x][y - 2].color;
                var c1 = jewels[x][y - 1].color;
                if (c0 == c1 && c1 == c) {
                    flag = false;
                }
            }
            return flag;
        }

        function draw() {
            for (var x = 0; x < 8; x++) {
                for (var y = 0; y < 8; y++) {
                    //drawimage(image, x, y, width, height)
                    ctx.drawImage(imageList[jewels[x][y].color], x * 60, y * 60 + 70, 50, 50);
                }
            }
            
            
        }

        