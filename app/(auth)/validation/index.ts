import * as yup from "yup";

const nameRegex = /^[A-Za-z\s]+$/;
const phoneRegex = /^[0-9]{10}$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;

export const registerSchema = yup.object().shape({
  name: yup
    .string()
    .matches(nameRegex, "Name must contain only letters and spaces")
    .min(2, "Name must be at least 2 characters")
    .required("Name is required"),

  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),

  phone: yup
    .string()
    .matches(phoneRegex, "Phone number must be exactly 10 digits")
    .required("Phone is required"),

  password: yup
    .string()
    .matches(
      passwordRegex,
      "Password must be at least 8 characters and include uppercase, lowercase, number, and special character"
    )
    .required("Password is required"),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),

  country: yup.string().required("Country is required").optional(),
  state: yup.string().required("State is required").optional(),
  district: yup.string().required("City is required"),
});

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),

  password: yup
    .string()
    .matches(
      passwordRegex,
      "Password must be at least 8 characters and include uppercase, lowercase, number, and special character"
    )
    .required("Password is required"),
});

export const resetPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .matches(
      passwordRegex,
      "Password must be at least 8 characters and include uppercase, lowercase, number, and special character"
    )
    .required("Password is required"),

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
