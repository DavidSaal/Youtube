const newLinkLoaderReducer = (state = false, action) => {
  switch (action.type) {
    case "setNewLinkLoader":
      return action.payload;
    default:
      return state;
  }
};

export default newLinkLoaderReducer;
