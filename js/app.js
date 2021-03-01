// Instanciate the classes
const ui = new UI(),
  coctail = new CoctailAPI(),
  coctailDB = new CoctailDB();


// Create the event listeners

function eventListeners() {
  // Document Ready 
  document.addEventListener('DOMContentLoaded', documentReady)

  // Add event listener when form is submited
  const searchForm = document.querySelector('#search-form');
  if (searchForm) {
    searchForm.addEventListener('submit', getCoctails);
  }

  // The results div listeners
  const resultsDiv = document.querySelector('#results');
  if (resultsDiv) {
    resultsDiv.addEventListener('click', resultsDelegation);
  }
}

eventListeners();

function getCoctails(e) {
  e.preventDefault();

  const searchTerm = document.querySelector('#search').value;

  // Check if something is in the search input
  if (searchTerm === '') {
    // Call UI print message
    ui.printMessage('Please add something into the form', 'danger')
  } else {
    // Server response from promise
    let serverResponse;
    // Type of search (ingredients, coctail or name)
    const type = document.querySelector('#type').value;

    // Evaluate the type of method and execute the query
    switch (type) {
      case 'name':
        serverResponse = coctail.getDrinksByName(searchTerm);
        break;
      case 'ingredient':
        serverResponse = coctail.getDrinksByIngredient(searchTerm);
        break
      case 'category':
        serverResponse = coctail.getDrinksByCategory(searchTerm);
        break
      case 'alcohol':
        serverResponse = coctail.getDrinksByAlcohol(searchTerm);
        break
    }

    // Clear old display results
    ui.clearResults();

    // Query by the name of the drink

    serverResponse.then(coctails => {
      if (coctails.coctails.drinks === null) {
        // Call UI print message
        ui.printMessage('There are no results, try a different term', 'danger')
      } else {
        if (type === 'name') {
          // Display with ingredients
          ui.displayDrinksWithIngredients(coctails.coctails.drinks);
        } else {
          // Display without ingredients (cathegory, alcohol, ingredient)
          ui.displayDrinks(coctails.coctails.drinks);
        }
      }
    })
  }
}

// Delegation for the results area
function resultsDelegation(e) {
  e.preventDefault();

  if (e.target.classList.contains('get-recipe')) {
    coctail.getSingleRecipe(e.target.dataset.id)
      .then(recipe =>
        // Displays single recipe into a modal
        ui.displaySingleRecipe(recipe.recipe.drinks[0])
      )
  }

  if (e.target.classList.contains('favorite-btn')) {
    if (e.target.classList.contains('is-favorite')) {
      // remove the class
      e.target.classList.remove('is-favorite');
      e.target.textContent = '+';

      // Remove from storage
      coctailDB.removeFromDB(e.target.dataset.id);
    } else {
      // add the class
      e.target.classList.add('is-favorite');
      e.target.textContent = '-';

      // Get Info 
      const cardBody = e.target.parentElement;

      const drinkInfo = {
        id: e.target.dataset.id,
        name: cardBody.querySelector('.card-title').textContent,
        image: cardBody.querySelector('.card-img-top').src
      }

      // Add the element into the storage
      coctailDB.saveIntoDB(drinkInfo);
    }
  }
}

// Document Ready
function documentReady() {
  // Display on load the favorites from storage 
  ui.isFavorite();

  // Select the search category
  const seachCategory = document.querySelector('.search-category');
  if (seachCategory) {
    ui.displayCategories();
  }

  // When favourite page 
  const favouritesTable = document.querySelector('#favorites');
  if (favouritesTable) {
    // Get favorites from storage and display them
    const drinks = coctailDB.getFromDB();
    ui.displayFavorites(drinks);

    // When view or delete are clicked

    favouritesTable.addEventListener('click', (e) => {
      e.preventDefault();

      // Delegation

      if (e.target.classList.contains('get-recipe')) {
        coctail.getSingleRecipe(e.target.dataset.id)
          .then(recipe =>
            // Displays single recipe into a modal
            ui.displaySingleRecipe(recipe.recipe.drinks[0])
          )
      }
      // When remove button is clicked in favorites
      if (e.target.classList.contains('remove-recipe')) {
        // Remove from DOM
        ui.removeFavorite(e.target.parentElement.parentElement);

        // Remove from Local Storage
        coctailDB.removeFromDB(e.target.dataset.id);
      }
    })
  }
}