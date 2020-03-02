// class User{
//     constructor(name,email,password,pid=[],qty=[]){
//        this.name = name;
//        this.email = email;
//        this.password = password;
//        this.pid = pid;
//        this.qty = qty;
//     }
//  }
 
 
//  function signin()
//  {
//     var name = document.getElementById("name").value;
//     var email = document.getElementById("email").value;
//     var password = document.getElementById("password").value;
//     var newUser = new User(name,email,password);
//     if(localStorage.getItem('Users')) {
//        let users = JSON.parse(localStorage.getItem('Users') || "[]");
//        users.push(newUser);
//        cartedProduct.push({"email":email,"purchased_product_id":[]});
//        localStorage.setItem('Users', JSON.stringify(users));
//        window.location = 'login.html'
//        window.alert("User successfully created. Now login to continue.!");
//    } else {
//        localStorage.setItem('Users', JSON.stringify([newUser]));
//        window.location = 'login.html'
//        window.alert("User successfully created. Now login to continue.!");
//    }
//  }
 
 function login()
 {
    
    var email = document.getElementById("uemail").value;
    var password = document.getElementById("upassword").value;
    let users = JSON.parse(localStorage.getItem('details') || "[]");
  
    //console.log(users[0].password);
    let isAuthUser = false;
    var i;
    for(i = 0; i < users.length; i++) 
    {
        if(users[i].email === email && users[i].password === password) {
            isAuthUser = true;
            sessionStorage.setItem('isAuthenticated', true);
            break;
        }
    }
    if(isAuthUser) {
       sessionStorage.setItem('currUserEmail', users[i].email);
       sessionStorage.setItem('currUserPassword', users[i].password);
       sessionStorage.setItem('isAuthenticated', true);

       let loginBlock = document.querySelector(".login-form-block");
       loginBlock.style.display = "none";
   } else {
       window.alert("Invalid email or incorrect password. Try Again!");
      // setError(password, "Incorrect Password");

   }
 }

 let loginForm = document.getElementById("login-form");
    loginForm.addEventListener('submit', function(e){
       e.preventDefault();
       login();
    })
 
 
 
 
//  function getUser()
//  {
//     if(sessionStorage.getItem('isAuthenticated'))
//     {
//        document.getElementById("user_name").innerHTML = sessionStorage.getItem('currUserName');
//        document.getElementById("loginhref").removeAttribute("href");
//     }
//     else
//     {
//        document.getElementById('user_name').innerHTML = "Login";
//        document.getElementById('carthref').removeAttribute("href");
//     }
//  }
 
//  function myFunction() {
//     var name = document.getElementById("submit");
//     popup.classList.toggle("show"); 
//  }