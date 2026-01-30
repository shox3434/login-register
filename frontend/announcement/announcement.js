let InpImg = document.querySelector("#InpImg")
let InpTitle = document.querySelector("#InpImg")
let InpDescription = document.querySelector("#InpImg")
let InpPcolor = document.querySelector("#InpImg")
let InpPrice = document.querySelector("#InpImg")
let Send = document.querySelector("#Send")

Send.addEventListener("click", (e) => {
    e.preventDefault()

    let announcement = {
    "img":InpImg.value,
    "title":InpTitle.value,
    "description":InpDescription.value,
    "color":InpPcolor.value,
    "price":InpPrice
    
    }

    fetch('https://login-register-5w9c.onrender.com/api-create-announcement',{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(announcement)
    })
    .then(res=>res.json())
    .then(data => {
        console.log(data);
        
    })
})
  


  
