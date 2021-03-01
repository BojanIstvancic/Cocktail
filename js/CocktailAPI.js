class CoctailAPI {
  // Get recipes by name
  async getDrinksByName(name) {
    // Seach by name
    const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);

    // Returns a JSON response
    const coctails = await apiResponse.json();

    return {
      coctails
    }
  }
  // Get Recipes By Ingredient
  async getDrinksByIngredient(ingredient) {
    // Seach by ingredient
    const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);

    // Returns a JSON response
    const coctails = await apiResponse.json();

    return {
      coctails
    }
  }

  // Get Single Recipe
  async getSingleRecipe(id) {
    // Seach by ingredient
    const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);

    // Returns a JSON response
    const recipe = await apiResponse.json();

    return {
      recipe
    }
  }

  // Retrieves all the Categoreis from REST API
  async getCategories() {
    const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`);

    const categories = await apiResponse.json();

    return {
      categories
    }
  }

  // Get Drinks By Category

  async getDrinksByCategory(category) {
    // Seach by category
    const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
    // Returns a JSON response
    const coctails = await apiResponse.json();

    return {
      coctails
    }
  }

  // Get Alcohol or Non alcohol Drinks

  async getDrinksByAlcohol(term) {
    // Seach by category
    const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${term}`);

    // Returns a JSON response
    const coctails = await apiResponse.json();

    return {
      coctails
    }
  }
}