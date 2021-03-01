class CoctailDB {
  // Save the recipes into local storage
  saveIntoDB(drink) {
    const drinks = this.getFromDB();

    drinks.push(drink);

    // Add the new array into the localStorage
    localStorage.setItem('drinks', JSON.stringify(drinks));
  }

  //Removes element from local Storage 
  removeFromDB(id) {
    const drinks = this.getFromDB();

    // loop
    drinks.forEach((drink, index) => {
      if (id === drink.id) {
        drinks.splice(index, 1);
      }
    })

    // set the array into the local storage
    localStorage.setItem('drinks', JSON.stringify(drinks));
  }

  // Return the recipes from localStorage
  getFromDB() {
    let drinks;
    // Check from localStorage

    if (localStorage.getItem('drinks') === null) {
      drinks = [];
    } else {
      drinks = JSON.parse(localStorage.getItem('drinks'));
    }
    return drinks;
  }
}