const playVideoLinkReducer = (state = "", action) => {
  switch (action.type) {
    case "setPlayVideoLink":
      return action.payload;
    default:
      return state;
  }
};

export default playVideoLinkReducer;
