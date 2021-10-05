import React from "react";
import "./Card.css";
import { youtubeParser } from "../../utils/utils";

const Card = ({ category, link, handleDeleteLink, handlePlayVideoLink }) => {
  return (
    <div className="card h-100">
      <button
        type="button"
        className="btn-close fs-6 ms-2 mt-2"
        aria-label="Close"
        data-category={category}
        data-link={link}
        onClick={handleDeleteLink}
      ></button>
      <div className="card-body text-center py-1">
        <img
          className="shadow"
          src={`https://img.youtube.com/vi/${youtubeParser(
            link
          )}/hqdefault.jpg`}
          alt="book"
        />
        <h4
          className="fs-6 text-center text-dark mt-3 mb-2 py-2 border-top border-bottom text text-decoration-underline"
          data-bs-toggle="modal"
          data-bs-target="#PlayYoutubeModal"
          data-link={link}
          onClick={handlePlayVideoLink}
        >
          {link}
        </h4>
      </div>
    </div>
  );
};

export default Card;
