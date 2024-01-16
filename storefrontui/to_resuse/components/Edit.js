import React from "react";
import { Typography } from "@mui/material";

import api from "./helpers/Gateway";
import Dayjs from "dayjs";
import { useNavigate, useParams } from "react-router-dom";

import MyForm from "./forms/_MyForm";

const Edit = () => {
  const myParam = useParams();
  const myID = myParam.id;
  const navigate = useNavigate();

  const defaultValues = {
    name: "",
    comment: "",
    status: "",
    start_date: "",
    end_date: "",
  };

  const submit = (data) => {
    api
      .put(`store/products/${myID}/`, {
        name: data.name,
        status: data.status,
        project_manager: data.project_manager,
        start_date: Dayjs(data.start_date["$d"]).format("YYYY-MM-DD"),
        end_date: Dayjs(data.end_date["$d"]).format("YYYY-MM-DD"),
        comment: data.comment,
      })
      .then((res) => navigate("/"))
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <Typography
        variant="h5"
        sx={{ paddingBottom: "1%", textAlign: "left" }}
        gutterBottom>
        Edit Record
      </Typography>

      <MyForm
        submit={submit}
        defaultValues={defaultValues}
        myID={myID}
        isEdit
      />
    </div>
  );
};
export default Edit;
