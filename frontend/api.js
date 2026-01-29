inpName = document.querySelector("#inpName")
inpSoname = document.querySelector("#inpSoname")
inpAge = document.querySelector("#inpAge")
btn = document.querySelector("#btn")
Container = document.querySelector("#Container")


btn.addEventListener("click", (e) =>{
    e.preventDefault()

    fetch("https://login-register-5w9c.onrender.com/api")
    .then(res=>res.json())
    .then(data =>{
        console.log(data);
        
    })
})

