import React from "react";
import InputChip from "./InputChip";
import Button from "@material-ui/core/Button";
import "./cssFiles/filter.css";
import store from "../redux/store";

function Filter(props) {
  function Onfilter() {
    const Filtereddata = store.getState().filter;
    props.getFilter(Filtereddata);
  }

  return (
    <div className="filter">
      <h3>Filter</h3>
      <InputChip options={props.options.name} name="name" />
      <InputChip options={props.options.author} name="author" />
      <InputChip options={props.options.title} name="title" />
      <Button
        onClick={Onfilter}
        style={{
          marginTop: "2%",
        }}
        className="fitlerButton"
        variant="contained"
        color="primary"
      >
        Apply Filter
      </Button>
    </div>
  );
}

export default Filter;
