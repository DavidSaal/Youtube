const categoriesReducer = (state = {}, action) => {
  switch (action.type) {
    case "setCategories":
      return [...action.payload];
    case "addNewCategory":
      return [...state, action.payload];
    default:
      return state;
  }
};

export default categoriesReducer;
