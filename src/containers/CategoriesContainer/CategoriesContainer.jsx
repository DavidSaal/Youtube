import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  setCategories,
  setNewLinkThisCategory,
  setPlayVideoLink,
  setLinkWithChosenCategory,
} from "../../actions";
import Card from "../../components/Card";
import { API_URL } from "../../utils/utils";

const CategoriesContainer = () => {
  const dispatch = useDispatch();
  let categories = useSelector((state) => state.categories);
  let localStorageUser = useSelector((state) => state.localStorageUser);
  let newLinkThisCategory = useSelector((state) => state.newLinkThisCategory);
  let newLinkLoader = useSelector((state) => state.newLinkLoader);

  const handleOnNewLinkClick = (event) => {
    dispatch(setNewLinkThisCategory(event.target.name));
    dispatch(setLinkWithChosenCategory(false));
  };

  const handleLinkWithChosenCategory = () => {
    dispatch(setLinkWithChosenCategory(true));
  };

  const handlePlayVideoLink = (event) => {
    let playVideoLink = event.target.getAttribute("data-link");
    dispatch(setPlayVideoLink(playVideoLink));
  };

  const handleDeleteLink = (event) => {
    let categoryName = event.target.getAttribute("data-category");
    let link = event.target.getAttribute("data-link");

    fetch(`${API_URL}/deleteLink`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: localStorageUser.email,
        category: categoryName,
        link: link,
      }),
    })
      .then(async (res) => {
        try {
          const data = await res.json();
          if (res.status !== 200) {
            toast.error(data.message);
          } else {
            let index = categories.findIndex(
              (category) => category.category === categoryName
            );
            categories[index].links = categories[index].links
              .replace(link, "")
              .replace(/,+/g, ",")
              .replace(/^,|,$/g, "");
            dispatch(setCategories(categories));
            toast.success("Link deleted successfully.");
          }
        } catch (err) {
          console.log(err);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const exportToJson = () => {
    let links = {};
    categories.map(
      (category) =>
        category.links && (links[category.category] = category.links)
    );
    let filename = "youtubeLinks.json";
    let contentType = "application/json;charset=utf-8;";
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      var blob = new Blob(
        [decodeURIComponent(encodeURI(JSON.stringify(links)))],
        { type: contentType }
      );
      navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      var a = document.createElement("a");
      a.download = filename;
      a.href =
        "data:" + contentType + "," + encodeURIComponent(JSON.stringify(links));
      a.target = "_blank";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const getCategories = () => {
    fetch(`${API_URL}/getCategories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: localStorageUser.email }),
    })
      .then(async (res) => {
        try {
          const data = await res.json();
          if (res.status === 200) {
            dispatch(setCategories(data.categories));
          } else {
            console.log("Failed to get categories.");
          }
        } catch (err) {
          console.log(err);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="container text-center text-white mb-5">
      {categories.length > 0 && (
        <div>
          <button
            className="mt-2 btn shadow border-white export"
            onClick={exportToJson}
          >
            Export Video Links
          </button>
          <button
            className="mt-2 btn shadow border-white export ms-2"
            data-bs-toggle="modal"
            data-bs-target="#AddNewLinkModal"
            onClick={handleLinkWithChosenCategory}
          >
            Add Link (choose category)
          </button>
        </div>
      )}
      {categories.length > 0 &&
        categories.map((category, index) => (
          <div key={index}>
            <div className="d-flex flex-column shadow mt-3 display-5">
              <button
                className="btn btn-dark border-top border-bottom mb-2"
                data-bs-toggle="modal"
                data-bs-target="#AddNewLinkModal"
                name={category.category}
                onClick={handleOnNewLinkClick}
              >
                Add Link
                {newLinkLoader && newLinkThisCategory === category.category && (
                  <div
                    className="spinner-border spinner-border-sm ms-2"
                    role="status"
                  />
                )}
              </button>

              {category.category}
              {category.links && (
                <div className="row d-flex justify-content-center my-3">
                  {category.links.split(",").map((link, index) => (
                    <div
                      className="col-7 col-sm-6 col-md-4 col-xl-3"
                      key={index}
                    >
                      <Card
                        category={category.category}
                        link={link}
                        handleDeleteLink={handleDeleteLink}
                        handlePlayVideoLink={handlePlayVideoLink}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default CategoriesContainer;
