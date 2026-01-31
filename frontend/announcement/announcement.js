let InpImg = document.querySelector("#InpImg");
let InpTitle = document.querySelector("#InpTitle"); // ID to'g'rilandi
let InpDescription = document.querySelector("#InpDescription"); // ID to'g'rilandi
let InpPcolor = document.querySelector("#InpPcolor"); // ID to'g'rilandi
let InpPrice = document.querySelector("#InpPrice"); // ID to'g'rilandi
let Send = document.querySelector("#Send");
let list = document.querySelector("#announcement-list")


// 1. Funksiya async bo'lishi kerak, chunki await ishlatyapmiz
async function deleteAd(id) {
    console.log("Ochiriladigan ID:", id);

    if (confirm("Ushbu elonni o'chirmoqchimisz?")) {
        try {
            // URL ichiga {item_id} emas, argument sifatida kelgan 'id' ni qo'yamiz
            const response = await fetch(`https://login-register-5w9c.onrender.com/api-create-announcement-delete/${id}`, {
                method: "DELETE", // Backendda @app.delete bo'lsa DELETE, @app.post bo'lsa POST yozing
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const result = await response.json();

            if (result.status === "success") {
                alert("E'lon muvaffaqiyatli o'chirildi!");
                location.reload(); // Sahifani yangilab qo'yamiz
            } else {
                alert("Xatolik: " + result.message);
            }
        } catch (error) {
            console.error("Xatolik yuz berdi:", error);
        }
    }
}



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
                    <button class="delete-btn" onclick="deleteAd('${item.id}')">O'chirish</button>
                </div>
            </div>
        `;

        
        list.append(upload_dsp);

    
    });
})

        
    })



  


  
