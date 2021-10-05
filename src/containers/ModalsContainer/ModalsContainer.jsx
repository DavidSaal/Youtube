import React, { useState } from "react";
import AddNewLinkModal from "../../components/AddNewLinkModal";
import PlayYoutubeModal from "../../components/PlayYoutubeModal";
import ForgotPasswordModal from "../../components/ForgotPasswordModal";
import { useDispatch, useSelector } from "react-redux";
import {
  setCategories,
  setNewLinkLoader,
  setNewLinkThisCategory,
} from "../../actions";
import { toast } from "react-toastify";
import { API_URL } from "../../utils/utils";

const ModalsContainer = () => {
  const dispatch = useDispatch();
  let categories = useSelector((state) => state.categories);
  let newLinkThisCategory = useSelector((state) => state.newLinkThisCategory);
  let localStorageUser = useSelector((state) => state.localStorageUser);
  let linkWithChosenCategory = useSelector(
    (state) => state.linkWithChosenCategory
  );

  const [newLink, setNewLink] = useState("");
  const [chosenCategoryValue, setChosenCategoryValue] = useState("");
  const [forgotPassUser, setForgotPassUser] = useState({
    email: "",
    password: "",
  });

  const handleForgotPasswordChange = (event) => {
    const { name, value } = event.target;
    setForgotPassUser({ ...forgotPassUser, [name]: value });
  };

  const handleOnChangeNewLink = (event) => {
    setNewLink(event.target.value);
  };

  const handleLinkWithChosenCategory = (event) => {
    dispatch(setNewLinkThisCategory(event.target.name));
    setChosenCategoryValue(event.target.name);
  };

  const handleChangeChosenCategoryValue = (event) => {
    setChosenCategoryValue(event.target.value);
  };

  const handleForgotPassword = (e) => {
    fetch(`${API_URL}/forgotPassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(forgotPassUser),
    })
      .then(async (res) => {
        try {
          const data = await res.json();
          if (res.status !== 200) {
            toast.error(data.message);
          } else {
            toast.success(data.message);
            setForgotPassUser({
              email: "",
              password: "",
            });
          }
        } catch (err) {
          console.log(err);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    e.preventDefault();
  };

  const handleAddNewLink = () => {
    dispatch(setNewLinkLoader(true));
    fetch(`${API_URL}/addNewLink`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: localStorageUser.email,
        category: newLinkThisCategory,
        link: newLink,
      }),
    })
      .then(async (res) => {
        try {
          const data = await res.json();
          if (res.status !== 200) {
            toast.error(data.message);
            dispatch(setNewLinkLoader(false));
          } else {
            let index = categories.findIndex(
              (category) => category.category === newLinkThisCategory
            );
            categories[index].links = categories[index].links
              ? categories[index].links + "," + newLink
              : newLink;
            dispatch(setCategories(categories));
            dispatch(setNewLinkLoader(false));
            toast.success("Link added successfully.");
            setNewLink("");
            setChosenCategoryValue("");
          }
        } catch (err) {
          console.log(err);
          dispatch(setNewLinkLoader(false));
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch(setNewLinkLoader(false));
      });
  };

  return (
    <div>
      <AddNewLinkModal
        handleOnChangeNewLink={handleOnChangeNewLink}
        handleAddNewLink={handleAddNewLink}
        newLink={newLink}
        categories={categories}
        handleLinkWithChosenCategory={handleLinkWithChosenCategory}
        chosenCategoryValue={chosenCategoryValue}
        handleChangeChosenCategoryValue={handleChangeChosenCategoryValue}
        linkWithChosenCategory={linkWithChosenCategory}
      />
      <PlayYoutubeModal />
      <ForgotPasswordModal
        handleForgotPassword={handleForgotPassword}
        handleForgotPasswordChange={handleForgotPasswordChange}
        forgotPassUser={forgotPassUser}
      />
    </div>
  );
};

export default ModalsContainer;
