const apiKEY= "c541de5247ee4de1904ea02120cb1907"
document.getElementById("SMNP").addEventListener('submit',async function(event){
  event.preventDefault()
  const diet=document.querySelector('input[name="Diet"]:checked')?.value || '';
  const allergies=[];
  document.querySelectorAll(`input[name="Allergy"]:checked`).forEach(el =>{allergies.push(el.value)});


  let url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKEY}&number=6&addRecipeNutrition=true&instructionsRequired=true&addRecipeInformation=true&fillIngredients=true`;
  if(diet)
      url+=`&diet=${diet}`


  if(allergies.length > 0 && !allergies.includes("None"))
      url+=`&intolerances=${allergies.join(',')}`


  localStorage.setItem('userchoice', JSON.stringify({
  diet: diet,
  allergies:allergies
  }));
  const response = await fetch(url);
  const data=await response.json();


  localStorage.setItem('recipeResults',JSON.stringify(data));


  window.location.href = "pages/RecipeDiscovery.html";
})
