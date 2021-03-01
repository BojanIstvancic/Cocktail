class UI {
  // Display all Drink Categorties
  displayCategories() {
    const categoryList = coctail.getCategories()
      .then(categories => {
        const categoryList = categories.categories.drinks;

        // Appendt a first option without the value
        const firstOption = document.createElement('option');
        firstOption.textContent = ' - Select -';
        firstOption.value = '';

        document.querySelector('#search').appendChild(firstOption);

        // Append into the select
        categoryList.forEach(category => {
          const option = document.createElement('option');
          option.textContent = category.strCategory;
          option.value = category.strCategory.split(' ').join('_');
          document.querySelector('#search').appendChild(option);
        })
      })
  }

  // Display Drinks without ingredients
  displayDrinks(drinks) {
    const resultsWrapper = document.querySelector('.results-wrapper');
    resultsWrapper.style.display = 'block';

    // Insert the results
    const resultsDiv = document.querySelector('#results'); // This is the div in results wrapper

    // Loop through drinkjs
    drinks.forEach(drink => {
      resultsDiv.innerHTML += `
      <div class="col-md-4">
        <div class="card my-3">
        <button type="button" data-id="${drink.idDrink}" class="favorite-btn btn btn-outline-info">
        +
        </button>
          <img class="card-img-top" src="${drink.strDrinkThumb}" alt ="{drinks.strDrink}" />
          <div class="card-body">
            <h2 class="card-title text-center">${drink.strDrink}</h2>
            <a data-target="#recipe" class="btn btn-success get-recipe" href="#" data-toggle="modal" data-id="${drink.idDrink}">Get Recipe</a>
          </div>
        </div>
      </div>
      `
    })
    this.isFavorite();
  }

  // Displays drinks with ingredients
  displayDrinksWithIngredients(drinks) {
    // show the results
    const resultsWrapper = document.querySelector('.results-wrapper');
    resultsWrapper.style.display = 'block';

    // Insert the results 
    const resultsDiv = document.querySelector('#results'); // This is the div in results wrapper

    drinks.forEach(drink => {
      resultsDiv.innerHTML += `
        <div class="col-md-6">
          <div class="card my-3">
          <button type="button" data-id="${drink.idDrink}" class="favorite-btn btn btn-outline-info">
          +
          </button>
            <img class="card-img-top" src="${drink.strDrinkThumb}" alt ="{drinks.strDrink}" />

            <div class="card-body">
              <h2 class="card-title text-center">${drink.strDrink}</h2>
              <p class="card-text font-weight-bold">Instructions:</p>     
              <p class="card-text">
              ${drink.strInstructions}
              </p><!-- card-text -->  
              <p class="card-text">
                <ul class="list-group">
                  <li class="list-group-item alert alert-danger">Ingredients</li>
                  ${this.displayIngredients(drink)}
                </ul><!-- list-group -->
              </p>  <!-- card-text -->     
              <p class="card-text font-weight-bold">Extra Information:</p>    
              <p class="card-text">
              <span class="badge badge-pill badge-success">
              ${drink.strAlcoholic}
              </span><!-- badge-success -->
              <span class="badge badge-pill badge-warning">
                Category: ${drink.strCategory}
              </span><!-- badge-warning -->
              </p><!-- card-text -->
            </div><!-- card-body -->
          </div><!-- card my-3 -->
        </div><!-- col-md-6 -->
      `;
    })

    this.isFavorite();
  }

  // Prints the ingredients and Measurments
  displayIngredients(drink) {
    let ingredients = [];

    for (let i = 1; i < 16; i++) {
      const ingrediantMeasure = {};
      if (drink[`strIngredient${i}`] !== null) {
        ingrediantMeasure.ingredient = drink[`strIngredient${i}`];
        ingrediantMeasure.measure = drink[`strMeasure${i}`];
        ingredients.push(ingrediantMeasure);
      }
    }
    // build the template
    let ingredientsTemplate = '';

    ingredients.forEach(ingredient => {
      const ingredientMeasure = (ingredient.measure !== null) ? ` - ${ingredient.measure}` : '';
      ingredientsTemplate += `
      <li class="list-group-item">${ingredient.ingredient}${ingredientMeasure}</li>
      `;
    })

    return ingredientsTemplate;
  }

  // Display Single Recipe
  displaySingleRecipe(recipe) {
    const modalTitle = document.querySelector('.modal-title'),
      modalDescription = document.querySelector('.modal-body .description-text'),
      modalIngredients = document.querySelector('.modal-body .list-group');

    // Set the values
    modalTitle.innerHTML = recipe.strDrink;
    modalDescription.innerHTML = recipe.strInstructions;

    // Display Ingredients
    let ingredientList = this.displayIngredients(recipe);
    modalIngredients.innerHTML = ingredientList;
  }

  // Displays a custom message
  printMessage(message, className) {
    const div = document.createElement('div');

    // Add the HTML
    div.innerHTML = `
    <div class="alert alert-dismissible alert-${className}">
      <button type="button" class="close" data-dismiss="alert">x</button>   
      ${message}
    </div>
  `;

    // Insert in HTML
    const reference = document.querySelector('.jumbotron h1');
    const parentNode = reference.parentElement;
    parentNode.insertBefore(div, reference);

    // remove after 3 seconds
    setTimeout(() => {
      document.querySelector('.alert').remove();
    }, 3000);
  }

  // Clear Previous Results

  clearResults() {
    const resultsDiv = document.querySelector('#results')
    resultsDiv.innerHTML = '';
  }

  // Displays favorites from Storage
  displayFavorites(favorites) {
    const favoritesTable = document.querySelector('#favorites tbody');

    favorites.forEach(drink => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
      <td>
        <img src="${drink.image}" alt="${drink.name}" width="100"/>
      </td>
      <td>${drink.name}</td>
      <td>
        <a href="#" data-toggle="modal" data-target="#recipe" data-id="${drink.id}" class="btn btn-success get-recipe">
          View
        </a>
      </td>
      <td>
      <a href="#" data-id="${drink.id}" class="btn btn-danger remove-recipe">
        Remove
      </a>
    </td>
      `
      favoritesTable.appendChild(tr);
    })
  }

  // Remove Single Favorite From DOM 
  removeFavorite(element) {
    element.remove();
  }

  // Add a Class when coctail is favorite
  isFavorite() {
    const drinks = coctailDB.getFromDB();

    drinks.forEach(drink => {
      // Destructuring the id
      let { id } = drink;

      // Select the favorites

      let favoriteDrink = document.querySelector(`[data-id="${id}"]`);

      if (favoriteDrink) {
        favoriteDrink.classList.add('is-favorite');
        favoriteDrink.textContent = '-';
      }
    })
  }
}
