import React, { useState } from "react";
import axios from "../axios";
import Store from "../redux/store";
import Button from "@material-ui/core/Button";
import "./cssFiles/newsWrapper.css";

function NewsWrapper(props) {
  const [savedNews, setSavedNews] = useState(props.savedNews);

  function SaveArticle() {
    axios({
      url: "/savenews",
      method: "POST",
      data: { article: props.doc, id: Store.getState().auth.objId },
    })
      .then((data) => {
        setSavedNews((prev) => {
          return [...prev, props.doc.source.name];
        });
      })
      .catch((err) => {
        window.history.pushState({}, "", window.location.pathname);
      });
  }

  return (
    <>
      <div className="newswrapper">
        {savedNews.includes(props.doc.source.name) ? (
          <div className="newswrapperInner">
            <Button
              className="newswrapperSaveButton"
              variant="contained"
              color="primary"
              disabled
            >
              Saved
            </Button>
            {props.children}
          </div>
        ) : (
          <div className="newswrapperInner">
            <Button
              className="newswrapperSaveButton"
              variant="outlined"
              color="primary"
              onClick={SaveArticle}
            >
              Save
            </Button>
            {props.children}
          </div>
        )}
      </div>
    </>
  );
}

export default NewsWrapper;
