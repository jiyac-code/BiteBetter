window.onload = function() {
   const page = document.getElementById("Recipepg");
   const modal = document.getElementById("nutritionModal");
   const modalContent = document.getElementById("modalContent");
   const closeBtn = document.getElementById("closeBtn");


   const selectedRecipe = localStorage.getItem("selectedRecipe");
   if (!selectedRecipe) {
       page.innerHTML = "<h1>No recipe found!</h1>";
       return;
   }


   const recipe = JSON.parse(selectedRecipe);




   let ingredients = (recipe.extendedIngredients || []).map(ing => `<li>${ing.original}</li>`).join("");
   let instrsteps = "No Instructions available.";
   if (recipe.analyzedInstructions?.length > 0) {
       instrsteps = recipe.analyzedInstructions[0].steps.map(s => `<li>${s.step}</li>`).join("");
   }


    page.innerHTML = `
       <h1>${recipe.title}</h1>
       <div class="flex-row">
           <div class="pic-box"><img src="${recipe.image}" alt="${recipe.title}"></div>
           <div class="ingredients">
               <h3>Ingredients</h3>
               <ul style="margin: 0; line-height: 1.7;">${ingredients}</ul>
           </div>
       </div>
       <div class="desc">
           <h3>Instructions</h3>
           <ol style="margin: 0; line-height: 1.7;">${instrsteps}</ol>
       </div>
       <button id="summaryBtn" class="btn" type="button">Nutrition Summary</button>
   `;




   document.getElementById("summaryBtn").onclick = function() {
       const nutrients = recipe.nutrition?.nutrients || [];
      

       const getVal = (name) => Math.round(nutrients.find(n => n.name === name)?.amount || 0);
      
       const carbs = getVal("Carbohydrates");
       const protein = getVal("Protein");
       const fat = getVal("Fat");
       const fiber = getVal("Fiber");


       modalContent.innerHTML = `
           <div class="container">
               <h1 class="main-title">Nutrition Dashboard</h1>
               <div class="content-layout">
                   <div class="box">
                       <h2>Nutritional Values</h2>
                       <table>
                           <thead><tr><th>Nutrient</th><th>Amount (g)</th></tr></thead>
                           <tbody>
                               <tr><td>Carbohydrates</td><td>${carbs}g</td></tr>
                               <tr><td>Protein</td><td>${protein}g</td></tr>
                               <tr><td>Fats</td><td>${fat}g</td></tr>
                               <tr><td>Fiber</td><td>${fiber}g</td></tr>
                           </tbody>
                       </table>
                   </div>
                   <div class="pie">
                       <h2>Pie Chart</h2>
                       <canvas id="nutrientChart"></canvas>
                   </div>
               </div>
           </div>
       `;


       modal.style.display = "block";


       const ctx = document.getElementById('nutrientChart').getContext('2d');
       new Chart(ctx, {
           type: 'pie',
           data: {
               labels: ['Carbs', 'Protein', 'Fats', 'Fiber'],
               datasets: [{
                   data: [carbs, protein, fat, fiber],
                   backgroundColor: ['#cd776a', '#548f91', '#72b76e', '#4c75a4']
               }]
           },
           options: {
               responsive: true,
               maintainAspectRatio: true
           }
       });
   };


   
   closeBtn.onclick = () => modal.style.display = "none";
   window.onclick = (e) => { if (e.target == modal) modal.style.display = "none"; };
};
