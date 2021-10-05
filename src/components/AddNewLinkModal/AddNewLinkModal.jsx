import React from "react";

const AddNewLinkModal = ({
  handleOnChangeNewLink,
  handleAddNewLink,
  newLink,
  categories,
  handleLinkWithChosenCategory,
  chosenCategoryValue,
  handleChangeChosenCategoryValue,
  linkWithChosenCategory,
}) => {
  return (
    <div
      className="modal fade"
      id="AddNewLinkModal"
      tabIndex="-1"
      aria-labelledby="AddNewLinkModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="AddNewLinkModalLabel">
              Add New Link
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div>
              <div className="container">
                <h4>Youtube Link</h4>
                <input
                  type="text"
                  className="form-control border"
                  name="name"
                  value={newLink}
                  onChange={handleOnChangeNewLink}
                />
                {linkWithChosenCategory && (
                  <div>
                    <h4 className="mt-3">Choose Category</h4>
                    <input
                      type="text"
                      className="form-control border"
                      name="name"
                      value={chosenCategoryValue}
                      onChange={handleChangeChosenCategoryValue}
                    />
                    {chosenCategoryValue &&
                      categories.map(
                        (category, index) =>
                          chosenCategoryValue.toLocaleLowerCase() ===
                            category.category
                              .toLocaleLowerCase()
                              .substring(0, chosenCategoryValue.length) && (
                            <button
                              key={index}
                              name={category.category}
                              onClick={handleLinkWithChosenCategory}
                              className="btn btn-light mt-3 mx-2 shadow-sm fs-4 col-12 col-sm-2"
                            >
                              {category.category}
                            </button>
                          )
                      )}
                  </div>
                )}
              </div>
              <div className="d-flex justify-content-center">
                <button
                  className="btn btn-dark mt-4 col-2"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={handleAddNewLink}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewLinkModal;
