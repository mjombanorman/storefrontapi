import React from "react";
import { Typography } from "@mui/material";
import api from "./helpers/Gateway";
import Dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import MyForm from "./forms/_MyForm";

const Create = () => {
  const navigate = useNavigate();

 const defaultValues = {
   title: "",
   unit_price: "",
   description: "",
   inventory: "",
   price_with_tax: "",
   collection: "",
   images: "",
 };

  const submit = async (data) => {
    try {
      console.log(data);
      await api.post(`project/`, {
        // ... your post request data
        title: data.title,
        
        unit_price: data.unit_price,
        description:data.description,
        inventory:data.inventory,
        price_with_tax:data.price_with_tax,
        collection: data.collection,
        images: data.images,
    
      });
      navigate("/"); // Redirect after successful submission
    } catch (error) {
      console.error(error);
      // Handle error scenarios
    }
  };

  return (
    <div>
      <Typography
        variant="h5"
        sx={{ paddingBottom: "1%", textAlign: "left" }}
        gutterBottom>
        Create New Record
      </Typography>
          <MyForm submit={submit} defaultValues={defaultValues} />
    </div>
  );
};

export default Create;
