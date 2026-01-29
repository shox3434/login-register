let InpFullName = document.querySelector("#InpFullName")
let InpEmail = document.querySelector("#InpEmail")
let InpPasswor = document.querySelector("#InpPasswor")
let Send = document.querySelector("#Send")

Send.addEventListener("click", (e) => {

    let userNew = {
        fullName:InpFullName.value,
        email:InpEmail.value,
        password:InpPasswor.value
    }

    fetch('https://login-register-5w9c.onrender.com/api-register',{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(userNew)
    })
    .then(res=>res.json())
    .then(data => {
        console.log(data);
        
        if (data.status == "success"){
            // Tokenni brauzer xotirasiga saqlaymiz
        localStorage.setItem("userToken", data.data.token);
        localStorage.setItem("userId", data.data.id);
        
        alert("Sizga ID: " + data.data.id + " berildi");
        window.location.href = "../api.html";
        }
        else{
            alert("Qandaydir xato" + data.message)
        }
})
})