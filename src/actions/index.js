const setCategories = (categories) => {
  return { type: "setCategories", payload: categories };
};

const addNewCategory = (category) => {
  return { type: "addNewCategory", payload: category };
};

const setLocalStorageUser = (user) => {
  return { type: "setLocalStorageUser", payload: user };
};

const setIsLoggedIn = (value) => {
  return { type: "setIsLoggedIn", payload: value };
};

const setNewLinkThisCategory = (category) => {
  return { type: "setNewLinkThisCategory", payload: category };
};

const setPlayVideoLink = (link) => {
  return { type: "setPlayVideoLink", payload: link };
};

const setMenuToggle = () => {
  return { type: "setMenuToggle" };
};

const setNewLinkLoader = (value) => {
  return { type: "setNewLinkLoader", payload: value };
};

const setLinkWithChosenCategory = (value) => {
  return { type: "setLinkWithChosenCategory", payload: value };
};

export {
  setCategories,
  addNewCategory,
  setLocalStorageUser,
  setIsLoggedIn,
  setNewLinkThisCategory,
  setPlayVideoLink,
  setNewLinkLoader,
  setLinkWithChosenCategory,
  setMenuToggle,
};
