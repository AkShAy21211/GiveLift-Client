import * as yup from "yup";


export const registerSchema = yup.object().shape({
  name: yup.string().required("Name is required"),

  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),

  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),

  country: yup
    .string()
    .required("Country is required"),

  state: yup
    .string()
    .required("State is required"),

    district: yup
    .string()
    .required("City is required"),
});

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),

  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export const resetPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
  token: yup.string().required("Token is required"),
});

export const forgotPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
});
