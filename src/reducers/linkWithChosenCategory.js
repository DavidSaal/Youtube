const linkWithChosenCategoryReducer = (state = false, action) => {
  switch (action.type) {
    case "setLinkWithChosenCategory":
      return action.payload;
    default:
      return state;
  }
};

export default linkWithChosenCategoryReducer;
