let fav = JSON.parse(localStorage.getItem("favourites")) || [];
const container = document.getElementById("favcontainer");


function init() {
   if (fav.length === 0) {
       container.innerHTML = `<h2 style="text-align:center; width:100%; grid-column: 1/-1; color: #693737;">No favourites yet</h2>`;
   } else {
       displayFav(fav);
   }
}


function displayFav(recipes) {
   container.innerHTML = "";
   recipes.forEach(recipe => {
       const card = document.createElement("div");
       card.classList.add('card');


       const description = (recipe.summary || "No description available.")
           .replace(/<[^>]+>/g, "")
           .slice(0, 100) + "...";


       card.innerHTML = `
           <div class="pic-box">
               <img src="${recipe.image}" alt="${recipe.title}">
           </div>
           <div class="desc-box">
               <div class="header">${recipe.title}</div>
               <p>${description}</p>
           </div>
           <button class="view-btn">View Recipe</button>
           <div class="footer">
               <span class="time-text">⏱ ${recipe.readyInMinutes || '??'} mins</span>
               <div class="footer-actions">
                   <button class="read-more-btn" title="Summary Info">...</button>
                   <button class="remove-btn">×</button>
               </div>
           </div>`;




       card.querySelector(".view-btn").addEventListener("click", () => {
           localStorage.setItem("selectedRecipe", JSON.stringify(recipe));
           window.location.href = "ViewRecipe.html";
       });
      const readMoreBtn = card.querySelector(".read-more-btn");


      readMoreBtn.addEventListener("mouseenter",function(){ readMoreBtn.innerHTML=`<span class="readmore-text"> Read More </span>` })
      readMoreBtn.addEventListener("mouseleave",function(){ readMoreBtn.innerHTML=`...` })
     
       card.querySelector(".read-more-btn").addEventListener("click", () => {
           document.getElementById("modalTitle").innerText = recipe.title;
           document.getElementById("modalText").innerHTML = recipe.summary;
           document.getElementById("modalPrep").innerText = `Preparation Time: ${recipe.readyInMinutes} mins`;
           document.getElementById("modal").style.display = "flex";
       });


       card.querySelector(".remove-btn").addEventListener("click", () => {
           fav = fav.filter(item => item.id !== recipe.id);
           localStorage.setItem("favourites", JSON.stringify(fav));
           card.remove();
           if (fav.length === 0) init();
       });


       container.appendChild(card);
   });
}


const modal = document.getElementById("modal");
const closeBtn = document.getElementById("closeModal");


closeBtn.onclick = () => modal.style.display = "none";


window.onclick = (e) => {
   if (e.target == modal) modal.style.display = "none";
};


init();