import { css } from "@emotion/core";
import GridLoader from "react-spinners/GridLoader";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 40vh auto;
`;

function Spinner(props) {
  return (
    <div className="sweet-loading">
      <GridLoader
        color="#203B5E"
        loading={!props.loading}
        css={
          props.size
            ? css`
                display: block;
                margin: 40vh auto;
              `
            : override
        }
        size={props.size ? props.size : 15}
      />
    </div>
  );
}

export default Spinner;
