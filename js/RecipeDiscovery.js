const stored =localStorage.getItem('userchoice');
const userData= JSON.parse(stored);
const storedRecipe = localStorage.getItem('recipeResults');
const data = JSON.parse(storedRecipe);




if (data && data.results && data.results.length > 0) {
   displayRecipes(data.results);
} else {
   document.getElementById("container").innerHTML = "<h2>No recipes found. Try searching again!</h2>";
}


function getFavourites() {
    return JSON.parse(localStorage.getItem('favourites') || '[]');
}


function saveFavourites(favs) {
    localStorage.setItem('favourites', JSON.stringify(favs));
}


function isFavourited(id) {
    return getFavourites().some(r => r.id === id);
}



function displayRecipes(recipes) {
   const container = document.getElementById("container");
   container.innerHTML = "";


   recipes.forEach(recipe => {
       const card = document.createElement("div");
       card.classList.add('card');
      
      
       const description = (recipe.summary || "N/A").replace(/<[^>]+>/g, "").slice(0, 120) + "...";

       const alreadyFaved = isFavourited(recipe.id);

       card.innerHTML = `
         <div class="card-inner-layout">
             <div class="pic-box">
                 <img src="${recipe.image}" alt="${recipe.title}">
             </div>
             <div class="desc-box">
                 <div class="header">${recipe.title}</div>
                 <div class="content">
                     <p>${description}</p>
                 </div>
             </div>
         </div>
         <button class="btn view-btn">View Recipe</button>
         <div class="footer">
           <span>Time: ${recipe.readyInMinutes || '??'} mins</span>
           <div class="footer-actions">
               <button class="read-more-btn">...</button>
               <button class="fav-btn ${alreadyFaved ? 'faved' : ''}">
                    ${alreadyFaved ? '♥️' : '♡'}
                </button>

            </div>
        </div>

       `;


       const modal = document.getElementById("modal");
       const readMoreBtn = card.querySelector(".read-more-btn");


       readMoreBtn.addEventListener("mouseenter",function(){ readMoreBtn.innerHTML=`<span class="readmore-text"> Read More </span>` }) 
       readMoreBtn.addEventListener("mouseleave",function(){ readMoreBtn.innerHTML=`...` })

       readMoreBtn.addEventListener("click", () => {
           document.getElementById("modalTitle").innerText = recipe.title;
           document.getElementById("modalText").innerHTML = recipe.summary;
           document.getElementById("modalPrep").innerText = `Preparation Time: ${recipe.readyInMinutes} mins`;
          
           modal.style.display = "flex";
       });


      
       card.querySelector(".view-btn").addEventListener("click", () => {
           localStorage.setItem("selectedRecipe", JSON.stringify(recipe));
           window.location.href = "ViewRecipe.html";
       });


       const favBtn = card.querySelector(".fav-btn");
        favBtn.addEventListener("click", function () {
            let favs = getFavourites();
            const alreadySaved = favs.some(r => r.id === recipe.id);


            if (alreadySaved) {
                favs = favs.filter(r => r.id !== recipe.id);
                favBtn.textContent = '♡';
                favBtn.classList.remove('faved');
            } else {
                favs.push(recipe);
                favBtn.textContent = '♥️';
                favBtn.classList.add('faved');
            }
            saveFavourites(favs);
        });


       container.appendChild(card);
   });
}




const modal = document.getElementById("modal");
const closeBtn = document.getElementById("closeModal");


closeBtn.onclick = () => {
   modal.style.display = "none";
};




window.onclick = (e) => {
   if (e.target == modal) {
       modal.style.display = "none";
   }
};