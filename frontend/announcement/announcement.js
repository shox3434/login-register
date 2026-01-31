let InpImg = document.querySelector("#InpImg");
let InpTitle = document.querySelector("#InpTitle"); // ID to'g'rilandi
let InpDescription = document.querySelector("#InpDescription"); // ID to'g'rilandi
let InpPcolor = document.querySelector("#InpPcolor"); // ID to'g'rilandi
let InpPrice = document.querySelector("#InpPrice"); // ID to'g'rilandi
let Send = document.querySelector("#Send");
let list = document.querySelector("#announcement-list")


Send.addEventListener("click", (e) => {
    e.preventDefault()

let announcement = {
    "img": InpImg.value || "",
    "title": InpTitle.value || "",
    "description": InpDescription.value || "",
    "color": InpPcolor.value || "",
    "price": Number(InpPrice.value) || 0
};

    fetch('https://login-register-5w9c.onrender.com/api-create-announcement',{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(announcement)
    })
.then(res => res.json())
.then(data => {
    console.log(data); 

    
    list.innerHTML = ""; 

    data.map(item => {
        
        let upload_dsp = document.createElement("div");
        
        upload_dsp.innerHTML = `
            <div  ${item.color}">
                <img src="${item.img}"  class="ad-img">
                <div class="ad-info">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                    <div class="price-tag">${item.price} so'm</div>
                </div>
            </div>
        `;

        
        list.append(upload_dsp);

        response.json().then(result => {
    
    if (result.status === "success") {
        console.log("Yaratilgan e'lon ID-si:", result.data.id);
        // Endi sahifani yangilaganingda, har bir e'lon blokiga shu ID-ni berib chiqasan
    }
    })
    });
})
.catch(err => console.error("Xatolik:", err));
        
    })

  


  
