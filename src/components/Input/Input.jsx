import React from "react";

const Input = ({ placeholder, onChangeHandler }) => {
  return (
    <div className="col-8 col-sm-7 col-md-6 col-xl-4">
      <div className="input-group">
        <input
          type="search"
          className="form-control py-3 border-end-0"
          placeholder={placeholder}
          aria-label="Search"
          aria-describedby="basic-addon1"
          onChange={onChangeHandler}
        />
      </div>
    </div>
  );
};

export default Input;
