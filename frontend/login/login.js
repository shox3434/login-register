
let InpEmail = document.querySelector("#InpEmail")
let InpPasswor = document.querySelector("#InpPasswor")
let Send = document.querySelector("#Send")

Send.addEventListener("click", (e) => {

    let userNew = {
        email:InpEmail.value,
        password:InpPasswor.value
    }

    fetch('http://127.0.0.1:8000/api-login',{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(userNew)
    })
    .then(res=>res.json())
    .then(data => {
        console.log(data);
if (data.status === "success") {
        // Tokenni saqlashdan oldin borligini tekshiramiz
        if (data.token) {
            localStorage.setItem("userToken", data.token);
            alert("Xush kelibsiz!");
            window.location.href = "../api.html";
        } else {
            console.error("Backend token yubormadi!");
        }
    } else {
        alert("Xato: " + data.xabar);
    }
    })
})