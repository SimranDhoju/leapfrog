let carts = document.querySelectorAll(".store-item-icon");

let products = [
    {
        name: 'Stripped colorful dress',
        tag: 'img-block1',
        price: 29.99,
        inCart: 0
    },

    {
        name: 'Polka dot light blue blouse',
        tag: 'image2',
        price: 13.99,
        inCart: 0
    },

    {
        name: 'Basic sleeveless sweater',
        tag: 'image3',
        price: 15,
        inCart: 0
    },
    {
        name: 'Colorfull summer dress',
        tag: 'image4',
        price: 16.99,
        inCart: 0
    },

    {
        name: 'Black&whute polka dot dress',
        tag: 'image5',
        price: 29.99,
        inCart: 0
    },

    {
        name: 'Elegant sweater with tie',
        tag: 'img-block2',
        price: 59.99,
        inCart: 0
    },

    {
        name: 'Basic white foulard',
        tag: 'image7',
        price: 9.99,
        inCart: 0
    },

    {
        name: 'White summer dress',
        tag: 'image8',
        price: 49.99,
        inCart: 0
    },

    {
        name: 'Blue polka dot dress',
        tag: 'image5',
        price: 29.99,
        inCart: 0
    },
];

for(let i = 0; i < carts.length; i++){
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    });
}

function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');
    let totalPrice = localStorage.getItem('totalCost');


    if(productNumbers && totalPrice){
        document.querySelector('.items-count').textContent = productNumbers;
        document.querySelector('.items-price').textContent = totalPrice;
    }
}

function cartNumbers(product){
    let productNumbers = localStorage.getItem('cartNumbers');
    let totalPrice = localStorage.getItem('totalCost');

    productNumbers = parseInt(productNumbers);
    totalPrice = parseInt(totalPrice);

    if(productNumbers){
        localStorage.setItem('cartNumbers' , productNumbers + 1);
        document.querySelector('.items-count').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers' , 1);
        document.querySelector('.items-count').textContent = 1;
    }

    // if(totalPrice){
    //     localStorage.setItem('totalCost' , totalPrice);
    //     document.querySelector('.items-price').textContent += totalPrice ;
    // } else {
    //     localStorage.setItem('totalCost' , totalPrice);
    //     document.querySelector('.items-price').textContent = totalPrice;
    // }

    setItems(product);
}

function setItems(product){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if(cartItems != null){
        if(cartItems[product.tag] == undefined){ //eg: cartItems[product.tag] is different than cartItems['iOSWireframe'] 
            cartItems = {
                ...cartItems,   //grabs whatever is on the cartItems from before.
                [product.tag]: product 
            }
        }
        cartItems[product.tag].inCart += 1; // eg: cartItems['iOSWireframe']
    }else{
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }
    localStorage.setItem("productsInCart" , JSON.stringify(cartItems));
}

function totalCost(product){
    // console.log(product.price);
    let cartCost = localStorage.getItem('totalCost');

    if(cartCost != null){
        cartCost = parseInt(cartCost);
        console.log(typeof product.price);
        localStorage.setItem('totalCost', cartCost + product.price);
    }else{
        localStorage.setItem('totalCost', product.price);
    }

}

function displayCart(){
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".cartItems");
    console.log(cartItems);

    let cartTotalPrice = document.querySelector('.total');


    // let totalContainer = document.querySelector(".shoppingCartRight");
    let cartCost = localStorage.getItem('totalCost');
    let cartNumbers = localStorage.getItem('cartNumbers');

    // document.querySelector(".cartTitle span").innerHTML = cartNumbers;
    
    if(cartItems && productContainer){
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += ` 
            <div class="cart-item" >
                <div class="item-text">
                   <figure class="smallimg">
                     <img src="images/${item.tag}.png" class="item-image"> 
                   </figure>
                     <p id="cart-item-title" class="title">${item.name}</p>
                     <span id="cart-item-price" class="cart-item-price">${item.price}</span>
                 </div>
                 <a href="#" id='cart-item-remove' class="cart-item-remove">
                     <i class="fas fa-trash"></i>
                 </a>
               </div>
            `;
        });
        cartTotalPrice.innerHTML = cartCost;

        // totalContainer.innerHTML += `
        // <div class="orderSummary">
        //     <h3 class="fullWidth">Subtotal(<span>${cartNumbers}</span> Items): $ <span>${cartCost}</span></h3>
        //     <button class="login-btn"><img src="images/basket-logo.png"> BUY NOW</button>
        // </div>
        // `;
    }

    // let productContent = document.querySelectorAll(".product");
    // for(let i=0; i<productContent.length; i++){
    //     productContent[i].addEventListener('click', function(e){
    //         console.log(e.target);
    //     });
    // }
    

    // removeItems(cartItems);
}

function removeItems(cartItems){
    let clearItems = document.querySelectorAll(".clearCart");
    // let cartItems = localStorage.getItem('productsInCart');
    let productContent = document.querySelectorAll(".product")
    let products = Object.values(cartItems);

    for(let i=0; i<productContent.length; i++){
        productContent[i].addEventListener('click' , function(event){
            if(event.target.classList.contains("clearCart")){
                productContent[i].parentNode.removeChild(productContent[i]);
                // console.log(productContent);
                // localStorage.setItem('productsInCart', JSON.stringify(productContent));
            }
            // let index = productContent.indexOf(productContent[i]);
            // console.log(index);
            // console.log(event.target);
            // console.log(products.indexOf(productContent[i]));
        });
    }
    
}

onLoadCartNumbers();
displayCart();