import { combineReducers } from "redux";

import categoriesReducer from "./categories";
import localStorageUserReducer from "./localStorageUser";
import isLoggedInReducer from "./isLoggedIn";
import newLinkLoaderReducer from "./newLinkLoader";
import linkWithChosenCategoryReducer from "./linkWithChosenCategory";
import newLinkThisCategoryReducer from "./newLinkThisCategory";
import playVideoLinkReducer from "./playVideoLink";
import menuToggleReducer from "./menuToggle";

const allReducers = combineReducers({
  categories: categoriesReducer,
  localStorageUser: localStorageUserReducer,
  isLoggedIn: isLoggedInReducer,
  newLinkLoader: newLinkLoaderReducer,
  linkWithChosenCategory: linkWithChosenCategoryReducer,
  newLinkThisCategory: newLinkThisCategoryReducer,
  playVideoLink: playVideoLinkReducer,
  menuToggle: menuToggleReducer,
});

export default allReducers;
