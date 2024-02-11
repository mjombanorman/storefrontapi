import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { TbInputSearch } from "react-icons/tb";

const SearchBar = ({ handleSearch, searchQuery }) => {
  

  return (
    <InputGroup className="mb-3">
      <Form.Control
        name="search"
        value={searchQuery} // Ensure value prop is passed correctly
        onChange={(e) => handleSearch(e.target.value)} // Update searchQuery on change
        placeholder="Search product..."
      />
      <Button
        variant="outline-secondary"
        id="button-addon2"
       >
        <TbInputSearch />
      </Button>
    </InputGroup>
  );
};

export default SearchBar;
