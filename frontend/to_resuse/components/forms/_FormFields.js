import { Button, Grid } from "@mui/material";
import MyDatePicker from "./MyDatePicker";
import MySelectField from "./MySelectField";
import MyTextField from "./MyTextField";
import MyTextAreaField from "./MyTextAreaField";

const FormFields = ({ handleSubmit, submit, control, isEdit }) => {
  return (
    <>
      <form onSubmit={handleSubmit(submit)}>
        <Grid container width={"60%"} spacing={3}>
          <Grid item xs={12}>
            <MyTextField
              label="Title"
              placeholder="Title"
              control={control}
              name="title"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <MyTextField
              label="Unit Price"
              placeholder="Unit Price"
              control={control}
              name="unit_price"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <MyTextField
              label="Inventory"
              placeholder="Inventory"
              control={control}
              name="inventory"
            />
          </Grid>
          <Grid item xs={12}>
            <MyTextField
              label="Description"
              placeholder="Description"
              control={control}
              name="description"
            />
          </Grid>
             <Grid item xs={12}>
            <Button
              variant="outlined"
              type="submit"
              sx={{
                marginTop: "20px",
                width: "30%",
                display: "flex",
                alignItems: "left",
              }}>
              {isEdit ? "Update" : "Save"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default FormFields;
