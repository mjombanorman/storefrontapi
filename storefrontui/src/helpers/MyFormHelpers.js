import * as yup from "yup";

const schema = yup
  .object({
    // Define validation schema using Yup
    name: yup.string().required("Name is required"),
    project_manager: yup.string().required("Project Manager is required"),
    status: yup.string().required("Status is required"),
    comment: yup.string(),
    start_date: yup.date().required("Start Date is required"),
    end_date: yup
      .date()
      .required("End Date is required")
      .min(yup.ref("start_date"), "End date cannot be greater than start date"),
  })
  .required();

export default schema;
