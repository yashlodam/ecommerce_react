import * as Yup from "yup";

export const validationSchemas = [

  // Step 1
  Yup.object({
    mobile: Yup.string()
      .matches(/^[6-9]\d{9}$/, "Enter a valid mobile number")
      .required("Mobile number is required"),

    

    gstin: Yup.string().required("GSTIN is required"),
  }),

  // Step 2
  Yup.object({
    pickupAddress: Yup.object({
      name: Yup.string().required("Name is required"),

      mobile: Yup.string()
        .matches(/^[6-9]\d{9}$/, "Enter valid mobile")
        .required("Mobile is required"),

      pincode: Yup.string()
        .matches(/^\d{6}$/, "Pincode must be 6 digits")
        .required("Pincode is required"),

      address: Yup.string().required("Address is required"),

      locality: Yup.string().required("Locality is required"),

      city: Yup.string().required("City is required"),

      state: Yup.string().required("State is required"),
    }),
  }),

  // Step 3
  Yup.object({
    bankDetails: Yup.object({
      accountNumber: Yup.string()
        .min(9)
        .max(18)
        .required("Account number is required"),

      ifscCode: Yup.string()
        .required("IFSC is required"),

      accountHoldername: Yup.string()
        .required("Account holder name is required"),
    }),
  }),

  // Step 4
  Yup.object({
    sellerName: Yup.string().required("Seller name is required"),

    email: Yup.string()
      .email("Invalid email")
      .required("Email is required"),

    password: Yup.string()
      .min(8, "Minimum 8 characters")
      .required("Password is required"),

    businessDetails: Yup.object({
      businessName: Yup.string().required("Business name is required"),

      businessEmail: Yup.string()
        .email("Invalid email")
        .required("Business email is required"),

      businessMobile: Yup.string()
        .matches(/^[6-9]\d{9}$/, "Invalid mobile")
        .required("Business mobile is required"),

      logo: Yup.string().required("Logo is required"),

      banner: Yup.string().required("Banner is required"),

      businessAddress: Yup.string().required("Business address is required"),
    }),
  }),
];