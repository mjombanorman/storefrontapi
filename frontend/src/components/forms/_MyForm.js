import React from "react";

import { useForm } from "react-hook-form";
import api from "../helpers/Gateway";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useEffect } from "react";
import Dayjs from "dayjs";
import schema from "../helpers/MyFormHelpers";
import FormFields from "./_FormFields";

const MyForm = ({ submit, defaultValues, isEdit, myID }) => {
  const [myData, setMyData] = useState();
  const [loading, setLoading] = useState(true);
  const [projectManager, setProjectManager] = useState([]);


  const getData = async () => {
    try {
     
      if (isEdit) {
         const projectRes = await api.get(`store/products/${myID}`);
        setMyData(projectRes.data);
        setValue("id", projectRes.data.id);
        setValue("title", projectRes.data.title);
        setValue("unit_price", projectRes.data.unit_price);
        setValue("slug", projectRes.data.slug);
        setValue("description", projectRes.data.description);
        setValue("inventory", projectRes.data.inventory);
        setValue("price_with_tax", projectRes.data.price_with_tax);
        setValue("collection", projectRes.data.collection);
        setValue("images", projectRes.data.images);
      } 
         setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, [myID]);

  const { handleSubmit, setValue, control } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <FormFields
          handleSubmit={handleSubmit}
          submit={submit}
          control={control}
          isEdit={isEdit}
             />
      )}
    </div>
  );
};

export default MyForm;
