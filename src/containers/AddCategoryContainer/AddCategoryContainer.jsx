import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Input from "../../components/Input";
import { addNewCategory } from "../../actions";
import { toast } from "react-toastify";
import { API_URL } from "../../utils/utils";

const AddCategoryContainer = () => {
  const dispatch = useDispatch();
  let localStorageUser = useSelector((state) => state.localStorageUser);
  const [categoryName, setCategoryName] = useState("");
  const [loader, setLoader] = useState(false);

  const onChangeHandler = (e) => {
    setCategoryName(e.target.value);
  };

  const addCategory = () => {
    setLoader(true);
    fetch(`${API_URL}/addCategory`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: localStorageUser.email,
        category: categoryName,
      }),
    })
      .then(async (res) => {
        try {
          const resolve = await res.json();
          if (res.status !== 200) {
            toast.error(resolve.message);
          } else {
            dispatch(
              addNewCategory({
                email: localStorageUser.email,
                category: categoryName,
              })
            );
            toast.success(`Added '${categoryName}' category.`);
          }
        } catch (err) {
          console.log(err);
        }
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
      });
  };

  return (
    <div className="row d-flex justify-content-center m-0">
      <div className="d-flex justify-content-center mt-4">
        <Input
          placeholder="category name...  ❔"
          onChangeHandler={onChangeHandler}
        />
        <button className="btn btn-dark" onClick={addCategory}>
          Add Category
        </button>
        {loader && (
          <div className="d-flex align-items-center">
            <div
              className="spinner-border spinner-border-sm ms-2"
              role="status"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AddCategoryContainer;
