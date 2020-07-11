import React from "react";
import { TextField } from "@material-ui/core";

const SearchBox = ({ searchChange, place }) => {
  return (
    <div>
      <TextField
        variant="outlined"
        style={{ marginBottom: "10px" }}
        placeholder={place}
        type="search"
        onChange={searchChange}
      />
    </div>
  );
};

export default SearchBox;
