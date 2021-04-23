import React from "react";
import "./cssFiles/newCard.css";

function HomeNewsCard(props) {
  const date = new Date(props.content.publishedAt).toLocaleDateString();
  return (
    <div className="newsCard">
      <div className="newsCardTitle">
        <h3>{props.content.title}</h3>
      </div>
      <div className="newsCardImg">
        <img src={props.content.urlToImage} alt="" />
      </div>
      <div className="newsCardDetails">
        <span className="newsCardDetail3 ">
          <b>Author:</b>
          {props.content.author}
        </span>
        <span className="newsCardDetail2">
          <b>Source:</b>
          {props.content.source.name}
        </span>
        <span className="newsCardDetail3">
          <b>Published At:</b>
          {date}
        </span>
      </div>
      <article className="newsCardContent">
        <p>
          {props.content.content}
          <span>
            <a href={props.content.url}> view more</a>
          </span>
        </p>
      </article>
    </div>
  );
}

export default HomeNewsCard;
