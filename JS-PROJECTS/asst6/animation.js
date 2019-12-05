var canvas = document.getElementById('animation');
var ctx = canvas.getContext('2d');
var phase = 0;
var speed = 0.03;
var maxCircleRadius =5;
var frame = 0;
var numRows = 10;
var numCols = 10;
var numStrands = 2;
var y;

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  var x = 0
  //var colOffset = 0;
  frame++;
  phase = frame * speed;

  for (var count = 0; count < numStrands; count++) {
    if (count === 0) {
      var strandPhase = phase;
    } else {
      var strandPhase = phase + count * Math.PI;
    }
    x = 0;
    for (var col = 0; col < numCols; col++) {
      x = x + 20;
     var colOffset = (col * 2 * Math.PI) / 10;

      for (var row = 0; row < numRows; row += 1) {
        var y = canvas.height / 2 + row * 10 + Math.sin(strandPhase + colOffset) * 50;
        console.log(y);
        //sizeOffset changes the radius of the circle
        var sizeOffset = (Math.cos(strandPhase - (row * 0.1) + colOffset) + 1) * 0.5;
        console.log(sizeOffset);
        var circleRadius = sizeOffset * maxCircleRadius;

        ctx.beginPath();
        ctx.arc(x, y, circleRadius, 0, Math.PI * 2, false);
        ctx.fillStyle = '#e17da4';
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

setInterval(draw, 20);