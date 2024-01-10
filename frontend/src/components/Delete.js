import React from "react";
import { Box, Button, Typography } from "@mui/material";
import api from "./helpers/Gateway";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const Delete = () => {
  const [loading, setLoading] = useState(true);
  const [myData, setMyData] = useState();
  const myParam = useParams();
  const myID = myParam.id;

  const getData = () => {
    api.get(`project/${myID}`).then((res) => {
       setMyData(res.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    console.log(myID);
    getData();
  }, []);

  const navigate = useNavigate();

  const submit = (data) => {
    api.delete(`project/${myID}/`).then((res) => navigate("/"));
  };
  const backHome = () => {
    navigate("/");
  };
  return (
    <div>
      {loading ? (
        <p>"Loading ..."</p>
      ) : (
        <div>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              backgroundColor: "lightblue",
              marginBottom: "10px",
            }}>
            <Typography sx={{ marginLeft: "20px", color: "#d01500" }}>
              Delete Project: {myData.name}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              width: "100%",
              border: "2px solid gray",
              paddng: "20px",
              flexDirection: "column",
            }}>
            <h4>This action is irreversable </h4>
            <p>Are you sure you want to delete this project ?</p>
            <Box
              sx={{
                padding: "20px",
              }}>
              <Button
                variant="contained"
                onClick={submit}
                  sx={{ marginTop: "20px",paddingRight:"20px" }}>
                Yes
              </Button>
              <Button
                variant="outlined"
                onClick={backHome}
                sx={{ marginTop: "20px" }}>
                No
              </Button>
            </Box>
          </Box>
        </div>
      )}
    </div>
  );
};

export default Delete;
