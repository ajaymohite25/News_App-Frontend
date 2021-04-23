const initialState = {
  name: [],
  author: [],
  title: [],
};

function FilterReducer(state = initialState, action) {
  switch (action.type) {
    case "name":
      return {
        ...state,
        name: action.payload.name,
      };
    case "author":
      return {
        ...state,
        author: action.payload.author,
      };
    case "title":
      return {
        ...state,
        title: action.payload.title,
      };
    default:
      return state;
  }
}

export default FilterReducer;
