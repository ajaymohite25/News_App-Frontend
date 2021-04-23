import React, { useEffect, useState } from "react";
import Spinner from "./spinner";
import axios from "../axios";
import DeleteNewsWrapper from "./DeleteNewsWrapper";
import NewsCard from "./HomeNewsCard";
import Store from "../redux/store";
import "./cssFiles/News.css";
import store from "../redux/store";
import SignIn from "./SignIn";
import Filter from "./filter";
import SearchBar from "./searchBar";

function SavedNews() {
  const [isLoaded, setLoaded] = useState(false);
  const [AllSavenews, setAllSavenews] = useState([]);

  const [FilterOptions, setFilterOptions] = useState({});

  useEffect(() => {
    let allsavenews, filteroptions;

    async function getData() {
      allsavenews = (
        await axios({
          url: "/savenews/get",
          method: "POST",
          data: { id: store.getState().auth.objId },
        })
      ).data;

      filteroptions = (
        await axios({
          url: "/savenews/savefilter",
          method: "POST",
          data: { id: Store.getState().auth.objId },
        })
      ).data;

      setFilterOptions(filteroptions);
      setAllSavenews(allsavenews);
      setLoaded(true);
    }

    getData().catch((err) => {
      // console.log(err);
      window.history.pushState({}, "", window.location.pathname);
      setLoaded(true);
    });
  }, []);

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
          setAllSavenews(data.data);
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
          setAllSavenews(data.data);
          // setLoaded(true);
        })
        .catch((err) => {
          // console.log(err);
          window.history.pushState({}, "", window.location.pathname);
          // setLoaded(true);
        });
    }
  }
  function deleteNews(data) {
    setAllSavenews(data);
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
                {AllSavenews.length ? (
                  AllSavenews.map((doc, i) => {
                    return (
                      <DeleteNewsWrapper
                        key={i}
                        doc={doc}
                        deleteNews={deleteNews}
                      >
                        <NewsCard key={i} content={doc} />
                      </DeleteNewsWrapper>
                    );
                  })
                ) : (
                  <h2 className="NoSaveTitle">No Saved News</h2>
                )}
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

export default SavedNews;
