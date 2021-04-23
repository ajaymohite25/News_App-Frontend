import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import store from "../redux/store";

import Select from "@material-ui/core/Select";

import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    // minWidth: 120,
    // maxWidth: 500,
    width: "90%",
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 50;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: "250",
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
//////////////////////
function MultipleSelect(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [values, setValue] = React.useState([]);

  const handleChange = (event) => {
    // console.log(event.target.value);

    switch (event.target.name) {
      case "name":
        store.dispatch({
          type: "name",
          payload: { name: event.target.value },
        });
        break;
      case "author":
        store.dispatch({
          type: "author",
          payload: { author: event.target.value },
        });
        break;
      case "title":
        store.dispatch({
          type: "title",
          payload: { title: event.target.value },
        });
        break;
      default:
        // console.log("filter default");
        break;
    }
    // console.log(store.getState());
    setValue(event.target.value);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id={props.name}>{props.name}</InputLabel>
        <Select
          labelId={props.name}
          id={props.name}
          multiple
          name={props.name}
          value={values}
          onChange={handleChange}
          input={<Input id={props.name} />}
          renderValue={(selected) => (
            <div className={classes.chips}>
              {selected.map((value) => (
                <Chip key={value} label={value} className={classes.chip} />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {props.options.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, values, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default MultipleSelect;
