import React from "react";
import { useSelector } from "react-redux";
import { youtubeParser } from "../../utils/utils";

const PlayYoutubeModal = () => {
  let playVideoLink = useSelector((state) => state.playVideoLink);

  return (
    <div
      className="modal fade"
      id="PlayYoutubeModal"
      tabIndex="-1"
      aria-labelledby="PlayYoutubeModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="PlayYoutubeModalLabel">
              Youtube Player
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
              <div className="d-flex justify-content-center">
                <iframe
                  width="600"
                  height="400"
                  src={`https://www.youtube.com/embed/${youtubeParser(
                    playVideoLink
                  )}`}
                  title="Embedded youtube"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayYoutubeModal;
