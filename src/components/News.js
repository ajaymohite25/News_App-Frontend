import React, { useEffect, useState } from "react";
import Spinner from "./spinner";
import axios from "../axios";
import NewsWrapper from "./newsWrapper";
import NewsCard from "./HomeNewsCard";
import Store from "../redux/store";
import "./cssFiles/News.css";
import store from "../redux/store";
import SignIn from "./SignIn";
import Filter from "./filter";
import SearchBar from "./searchBar";
import Button from "@material-ui/core/Button";

function News() {
  const [isLoaded, setLoaded] = useState(false);
  const [Allnews, setAllNews] = useState([]);
  const [savedNews, setSavedNews] = useState([]);
  const [FilterOptions, setFilterOptions] = useState({});

  useEffect(() => {
    sessionStorage.setItem("loadnumber", 1);

    let allnews, savenewsIdentifiers, filteroptions;

    async function getData() {
      allnews = (
        await axios({
          url: "/news",
          method: "POST",
          data: { loadnumber: sessionStorage.getItem("loadnumber") },
        })
      ).data;
      // console.log(allnews);

      savenewsIdentifiers = (
        await axios({
          url: "/savenews/getidentifiers",
          method: "POST",
          data: { id: Store.getState().auth.objId },
        })
      ).data;
      // console.log(savenewsIdentifiers);

      filteroptions = (await axios({ url: "/getdata", method: "get" })).data;
      // console.log(filteroptions);
      setAllNews(allnews);
      setSavedNews(savenewsIdentifiers);
      setFilterOptions(filteroptions);
      setLoaded(true);
    }

    getData().catch((err) => {
      // console.log(err);
      window.history.pushState({}, "", window.location.pathname);
      setLoaded(true);
    });
  }, []);

  function OnLoadMore() {
    // setLoaded(false);
    sessionStorage.loadnumber++;
    const currentLoadnumber = sessionStorage.loadnumber;
    axios({
      url: "/news",
      method: "post",
      data: { loadnumber: currentLoadnumber },
    })
      .then((data) => {
        setAllNews(data.data);
        // setLoaded(true);
      })
      .catch((err) => {
        // console.log(err);
        window.history.pushState({}, "", window.location.pathname);
        // setLoaded(true);
      });
  }

  //CALL BACK FOR FILTER DATA ON FILTER
  function getFilter(Filtereddata) {
    // console.log(Filtereddata);
    if (
      Filtereddata.name.length ||
      Filtereddata.author.length ||
      Filtereddata.title.length
    ) {
      // setLoaded(false);
      axios({ url: "/news/filter", method: "post", data: Filtereddata })
        .then((data) => {
          // console.log(data);
          setAllNews(data.data);
          // setLoaded(true);
        })
        .catch((err) => {
          // console.log(err);
          window.history.pushState({}, "", window.location.pathname);
          // setLoaded(true);
        });
    }
  }
  //CALL BACK FOR SEARCHED DATA ON SEARCH
  function getSearch(searchQuery) {
    // console.log(searchQuery);
    if (searchQuery) {
      // setLoaded(false);
      axios({
        url: "/news/searchquery",
        method: "get",
        params: { searchquery: searchQuery },
      })
        .then((data) => {
          // console.log(data);
          setAllNews(data.data);
          // setLoaded(true);
        })
        .catch((err) => {
          // console.log(err);
          window.history.pushState({}, "", window.location.pathname);
          // setLoaded(true);
        });
    }
  }

  return (
    <>
      {store.getState().auth.jwt ? (
        isLoaded ? (
          <div>
            <div className="searchBarNews">
              <SearchBar getSearch={getSearch} />
            </div>
            <div className="news">
              <div className="newsFilter">
                <Filter getFilter={getFilter} options={FilterOptions} />
              </div>
              <div className="AllnewsParent">
                {Allnews.length ? (
                  Allnews.map((doc, i) => {
                    return (
                      <NewsWrapper key={i} doc={doc} savedNews={savedNews}>
                        <NewsCard content={doc} />
                      </NewsWrapper>
                    );
                  })
                ) : (
                  <h3>
                    No News! according to search or filter load more to see more
                    news
                  </h3>
                )}
                <Button
                  className="LoadMoreButton"
                  onClick={OnLoadMore}
                  style={{
                    marginTop: "1%",
                    marginBottom: "3%",
                  }}
                  variant="contained"
                  color="primary"
                >
                  Load More
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <Spinner loadinng={isLoaded} />
        )
      ) : (
        <SignIn />
      )}
    </>
  );
}

export default News;
