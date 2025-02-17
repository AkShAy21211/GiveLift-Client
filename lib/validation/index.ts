import * as Yup from "yup";

export const registerValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be less than 50 characters")
    .required("Name is required"),

  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),

  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .max(30, "Password must be less than 30 characters")
    .required("Password is required"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),


  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be a 10-digit number")
    .required("Phone number is required"),
});

export const profileSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be less than 50 characters")
    .required("Name is required"),

  //validation fo avatar it willbe a link
  avatar: Yup.string().url("Invalid avatar link"),

  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),

  address: Yup.object().shape({
    district: Yup.string().required("District is required"),
    city: Yup.string().required("City is required"),
    pincode: Yup.number()
      .typeError("Pincode must be a number")
      .required("Pincode is required"),
  }),

  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be a 10-digit number")
    .required("Phone number is required"),
});

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),

  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .max(30, "Password must be less than 30 characters")
    .required("Password is required"),
});

export const createCoordinatorSchema = Yup.object().shape({
  name: Yup.string().required("Full Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  address: Yup.object().shape({
    district: Yup.string().required("District is required"),
    city: Yup.string().required("City is required"),
    pincode: Yup.number()
      .typeError("Pincode must be a number")
      .required("Pincode is required"),
  }),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  image: Yup.mixed().optional(), // Image is optional
});

