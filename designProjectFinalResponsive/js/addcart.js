// //show cart

// (function (){
//  const cartInfo = document.getElementById('icon- cart');
//  const cart = document.getElementById('cart');
 

//  cartInfo.addEventListener('click',function(){
//      cart.classList.style.display="block";
    
//  })
//  console.log('hello');
// })(); 


// //add item
// let cartImg = document.querySelector('.item-image');
// console.log(cartImg);

(function(){
    const cartBtn = document.querySelectorAll(".store-item-icon");
    
    let cartItems = document.querySelector('.cartItems');
    
    cartBtn.forEach(function(btn){
      btn.addEventListener("click",function(event){
          //console.log(event.target);
        
          if(event.target.parentElement.classList.contains('store-item-icon')){
            const item=[];
            //console.log(event.target.parentElement.parentElement.children[1].children[0].textContent);
            let imgsrc= 
            event.target.parentElement.parentElement.querySelector("img").getAttribute('src') ;
            // console.log(imgsrc);
            item.imgsrc =imgsrc;
            let name= 
            event.target.parentElement.parentElement.children[1].children[0].textContent;
            // console.log(name);
            item.name =name;

            let price= 
            event.target.parentElement.parentElement.children[1].children[1].textContent;
            // console.log(price);
    

            let finalPrice = price.slice(1).trim();
            // console.log(finalPrice);
            item.finalPrice=finalPrice;
            // console.log(item);

            // cartItems.innerHTML = `
            //   <div class="cart-item" >
            //     <div class="item-text">
            //       <figure class="smallimg">
            //         <img src="${item.imgsrc}" class="item-image"> 
            //       </figure>
            //         <p id="cart-item-title" class="title">${item.name}</p>
            //         <span id="cart-item-price" class="cart-item-price">${item.price}</span>
            //     </div>
            //     <a href="#" id='cart-item-remove' class="cart-item-remove">
            //         <i class="fas fa-trash"></i>
            //     </a>
            //   </div>
            //     `
                let totalPrice = document.querySelector('.items-price');
                totalPrice.innerHTML = finalPrice; 
                console.log(totalPrice);
                let totalCount = document.querySelector('.items-count');
                totalCount.innerHTML = 2;
                console.log(item);
                
            
            display(imgsrc);


//select cart
            const cart= document.getElementById('cart')
            const total =document.querySelector(".cart-total-container");
 
            cart.insertBefore(cartItem,total);
            alert("added"); 
             
          }


      }); 
    });
})();

function display(imgsrc){
  
  
}



 