import React, { useEffect, useState } from "react";
import "./cssFiles/Home.css";
import Spinner from "./spinner";
import axios from "../axios";
import HomeNewsCard from "./HomeNewsCard";

function Home(props) {
  const [isLoaded, setLoaded] = useState(false);
  const [fewArticles, updateFewArticles] = useState([]);

  useEffect(() => {
    axios({ url: "/", method: "GET" })
      .then((data) => {
        // console.log(data, "home");
        updateFewArticles(data.data);
        setLoaded(true);
      })
      .catch((err) => {
        // console.log(err);
        window.history.pushState({}, "", window.location.pathname);
        setLoaded(true);
      });
  }, []);

  // console.log(props);

  return (
    <div className="Home">
      {isLoaded ? (
        <div className="HomeNewscontainer">
          <h3 className="HomeNewsTitle">Trending News</h3>
          <div className="homeNews">
            {fewArticles.map((doc, i) => {
              return <HomeNewsCard key={i} content={doc} />;
            })}
          </div>
        </div>
      ) : (
        <Spinner loading={isLoaded} />
      )}
    </div>
  );
}

export default Home;
