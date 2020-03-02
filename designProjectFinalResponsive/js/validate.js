function validateForm(){

    let data =localStorage.getItem('details') ? JSON.parse(localStorage.getItem('details')) : [];;
    let formData ={
            "fname":document.getElementById("fname").value,
            "lname":document.getElementById("lname").value,
            "email":document.getElementById("email").value,
            "password":document.getElementById("password").value,
            "confirmpassword":document.getElementById("conpassword").value
        }
        data.push(formData);
        if(localStorage){
            localStorage.setItem("details", JSON.stringify(data));
        } 
}
//Check if password is matching
function verifyPassword(input){
    
    if(input.value != document.getElementById("password").value){
        input.setCustomValidity("Password doesnot match.");
    }else{
        input.setCustomValidity("");
    }
}

function verifyEmail(input){
    var email = document.getElementById('email');
    console.log(email);
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (!filter.test(email.value)) {
        input.setCustomValidity("Invalid email");
    }else{
        input.setCustomValidity("");
    }
    emailExist(input);
    console.log(input);
}
    
    

//check already registered users
function emailExist(value){
    console.log(value);
    let existemail = JSON.parse(localStorage.getItem("details"));
    
    let emailid = existemail.map((email,i,existemail) =>{
        return existemail[i].email;
    });

     let getexistemail = emailid.filter((email)=>{
        if(email == value.value){
            value.setCustomValidity('email exist. try something else');
            
        }else{
            value.setCustomValidity("");
        }
    });
}

function addUser(){
    
    let user = {

        fname :document.getElementById("fname").value,
            lname: document.getElementById("lname").value,
            email:document.getElementById("email").value,
            password:document.getElementById("password").value,
            confirmpassword: document.getElementById("conpassword").value
    }
    this.users.push(user);
    // this.form.reset();

    console.log("added", this.users);
    //saving to localStorage
    localStorage.setItem('Users_List', JSON.stringify(this.users));

}
//Handling bubbling
    const form = document.getElementById("registerForm");
    console.log
    form.addEventListener("submit", function(e){
        e.preventDefault();
        form.reset();
        document.getElementById("popup").style.display="block";
        
        // form.style.display="inline";
    });

    
    

