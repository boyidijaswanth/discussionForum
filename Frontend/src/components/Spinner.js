import { useState } from "react";
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  margin: 0 auto;
  border-color: red;
`;

function Spinner({loading}) {
  let [color, setColor] = useState("#ffffff");

  return (
      <ClipLoader color={color} loading={loading} css={override} size={10} />
  );
}

export default Spinner