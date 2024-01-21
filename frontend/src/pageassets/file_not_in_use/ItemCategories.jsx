import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import Container from "@mui/material/Container";
import api from "../helpers/Gateway";
import { useState, useEffect } from "react";

export default function ItemCategories() {
  const [collection, setCollection] = useState([]);

  // Api Request logic to fetch data from the database
  const fetchCollections = async () => {
    try {
      const response = await api.get(`store/collections/`);
      return response.data; // Return only the data property
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    const getCollection = async () => {
      try {
        const data = await fetchCollections();
        // Filter items where products_count is greater than 0
        const filteredData = data.filter((item) => item.products_count > 0);
        console.log(filteredData);
        setCollection(filteredData);
      } catch (error) {
        // Handle error gracefully
        console.error("Error fetching collection:", error);
      }
    };

    getCollection();
  }, []);
const image = "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e";
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "0 auto",
        paddingTop: "5%",
      }}>
      <ImageList
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "16px",
          overflow: "hidden",
        }}>
        {/* Map over the 'collection' array */}
        {collection.map((item) => (
          <ImageListItem
            key={item.id}
            sx={{
              cursor: "pointer",
              transition: "transform 0.3s",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}>
           
                
    <img
              style={{ width: "300px", height: "200px" }}
              src={`${image}?w=300&fit=crop&auto=format`}
              alt={item.title}
              loading="lazy"
                />
                

            <ImageListItemBar
              title={item.title}
              actionIcon={
                <IconButton
                  sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                  aria-label={`info about ${item.title}`}>
                  <InfoIcon />
                </IconButton>
              }
            />
          </ImageListItem>
        ))}

      
      </ImageList>
    </Container>
  );
}

