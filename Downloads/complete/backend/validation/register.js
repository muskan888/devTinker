const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.user_name = !isEmpty(data.user_name) ? data.user_name : "";
  data.full_name = !isEmpty(data.full_name) ? data.full_name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.reEnteredpassword = !isEmpty(data.reEnteredpassword) ? data.reEnteredpassword : "";

  if (!validator.isLength(data.user_name, { min: 2, max: 30 })) {
    errors.user_name = "UserName must be between 2 and 30 characters";
  }

  if (!validator.isLength(data.full_name, { min: 2, max: 30 })) {
    errors.full_name = "FullName must be between 2 and 30 characters";
  }

  if (validator.isEmpty(data.user_name)) {
    errors.user_name = "User_Name field is required";
  }

  if (validator.isEmpty(data.full_name)) {
    errors.full_name = "Full_Name field is required";
  }

  if (validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  if (!validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (!validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }

  if (validator.isEmpty(data.reEnteredpassword)) {
    errors.reEnteredpassword = "Confirm Password field is required";
  }

  if (!validator.equals(data.password, data.reEnteredpassword)) {
    errors.reEnteredpassword = "Passwords must match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
