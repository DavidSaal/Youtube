const newLinkThisCategoryReducer = (state = "", action) => {
  switch (action.type) {
    case "setNewLinkThisCategory":
      return action.payload;
    default:
      return state;
  }
};

export default newLinkThisCategoryReducer;
