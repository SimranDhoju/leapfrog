
var imageWidth= 400;
var Container = document.getElementsByClassName('carousel-container')[0];
var Wrapper = document.getElementsByClassName('carousel-image-wrapper')[0];
var Image = document.getElementsByTagName('img');
var imagecount = Wrapper.childElementCount;


if(imagecount>Image.length){
   imagecount=0;
}
  
// console.log(imagecount);

Container.style.width = imageWidth + 'px';


Wrapper.style.width = imageWidth * Image.length + 'px';

// var period;
//var carouselContainer = document.getElementById('carousel-container');
// var carouselWrapper = document.getElementById('carousel-image-wrapper');
// var images = document.getElementsByTagName('img');



var timer;

//carouselContainer.style.width = imageWidth + 'px';
//carouselWrapper.style.width = imageWidth * images.length + 'px';

var imageCount = 0;
var left = -(imageWidth * imageCount);
var direction = 'left';

function slide() {
  timer = setInterval(function() {
      if (direction === 'left') {
          left -= 10;
          if (left < -(Image.length - 1) * imageWidth) {

              left = -(imageWidth * (imageCount - 1));
          }
      } else {
          left += 10;
          if (left >= 0) {
              direction = 'left';
          }
      }

     Image = left + 'px';
     console.log( Image);
      imageCount++;

      if (Image>= -(imageWidth * imageCount)) {
          imageCount = 0;
      }
      // console.log('left after>> ', left);
      if (Image % imageWidth == 0) {
          //slide delay

          clearInterval(timer);
          setTimeout(slide, 10);
      }
  }, 20);
}

slide();


// slideshow
  // var index = 0;
//    function slides(){
//     var i;
//     var slides = document.getElementsByTagName('img');
//     if (n > slides.length) {slideIndex = 1}    
//   if (n < 1) {slideIndex = slides.length}
//   for (i = 0; i < slides.length; i++) {
//       slides[i].style.display = "none"; 
//   }
//       slides[slideIndex-1].style.display = "block";
//  }
//   setInterval(slides,1000);

//   slides();


//   // Wrapper.style.left = left+'px';
//   // index++;
// var Index = 0;
// carousel();

// function carousel() {
//   var i;
//   var x = document.getElementsByTagName("img");
//   for (i = 0; i < x.length; i++) {
//      x[i].style.display = "none";
//   }
//   Index++;
//   if (Index > x.length) {Index = 1}
//   x[Index-1].style.display = "block";
//   setTimeout(carousel, 3000);
// }




// slides();
  
// function slides() {
//   var left = -(imageWidth * index);
  // setInterval(function () {
  //     if (direction === "left") {
  //         left -= 10;
  //         if (index > imageWidth)
  //             direction = "left";
  //     }
  //     else {
  //         top += 10;
  //         if (top < 10) direction = "none";
  //     }
//       Wrapper.style.left = left + "px";
//       index++;
//   }, 50);
// }

// slides();

  
 
    
    
    




    //slider


var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByTagName('img');
  var dots = document.getElementsByClassName('dot');
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
   slides[slideIndex-1].style.display = "block";  
   dots[slideIndex-1].className += " active"; 
}

showSlides();

