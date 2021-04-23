import React, { useState } from "react";
import axios from "../axios";
import Store from "../redux/store";

import Button from "@material-ui/core/Button";

import "./cssFiles/newsWrapper.css";
import Spinner from "./spinner";

function DeleteNewsWrapper(props) {
  const [isLoaded, setLoaded] = useState(true);

  function DeleteArticle() {
    setLoaded(false);
    axios({
      url: "/savenews/delete",
      method: "delete",
      data: {
        articleId: props.doc.source.name,
        id: Store.getState().auth.objId,
      },
    })
      .then((data) => {
        props.deleteNews(data.data);
        setLoaded(true);
      })
      .catch((err) => {
        // console.log(err);
        window.history.pushState({}, "", window.location.pathname);
        setLoaded(true);
      });
  }

  return (
    <>
      {isLoaded ? (
        <div className="newswrapper">
          <div className="newswrapperInner">
            <Button
              style={{
                borderColor: "red",
                color: "red",
              }}
              className="newswrapperSaveButton"
              variant="outlined"
              color="primary"
              onClick={DeleteArticle}
            >
              Delete
            </Button>

            {props.children}
          </div>
        </div>
      ) : (
        <Spinner loading={isLoaded} />
      )}
    </>
  );
}

export default DeleteNewsWrapper;
