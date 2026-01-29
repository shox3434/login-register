inpName = document.querySelector("#inpName")
inpSoname = document.querySelector("#inpSoname")
inpAge = document.querySelector("#inpAge")
btn = document.querySelector("#btn")
Container = document.querySelector("#Container")


btn.addEventListener("click", (e) =>{
    e.preventDefault()

    fetch("http://127.0.0.1:8000/api")
    .then(res=>res.json())
    .then(data =>{
        console.log(data);
        
    })
})

