
document.getElementById("signup-toggle").addEventListener("click", ()=>{
    document.getElementById("signup-form").style.display = "block";
    document.getElementById("login-form").style.display = "none";

})

document.getElementById("login-toggle").addEventListener("click", ()=>{
    document.getElementById("signup-form").style.display = "block";
    document.getElementById("login-form").style.display = "block";
})

document.getElementById("login-form").addEventListener("submit", async event =>{
    event.preventDefault();


    const email = document.getElementById("login-email").value;

    const password = document.getElementById("login-password").value;


    const response = await fetch("https://mock5-95s0.onrender.com/user/login",{


    method: "POST",
    headers: {
        "Content-Type" : "application/json"
    },
    body: JSON.stringify({email,password})
    })

    if(response.ok){
        const data = await response.json();

        localStorage.setItem("token", data.token);

        console.log(data.token)

        window.location.href = "./dashbord.html"
    }
    else{
        alert("invalid Credential. Try again")
    }
})

document.getElementById("signup-form").addEventListener("submit", async event =>{
    event.preventDefault();

    const email = document.getElementById("signup-email").value
    const password = document.getElementById("signup-password").value;
const confirmPass = document.getElementById("signup-confirm-password").value;


if(password!==confirmPass){
    alert("password mismatch");
    return;
}


const response = await fetch("https://mock5-95s0.onrender.com/user/signup", {
    method: "POST",
    headers:{
        "Content-Type" : "application/json"
    },
    body: JSON.stringify({email,password})
})

if(response.ok){
    alert("signup successfully");
    document.getElementById("signup-email").value = "";

    document.getElementById("signup-password").value = "";
    document.getElementById("signup-confirm-password").value = "";

}
else{
    alert("signup failed")
}
})