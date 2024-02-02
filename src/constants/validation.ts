export const usernameValidationRules = {
  required: "Username is required!",
  maxLength: {
    value: 30,
    message: "Username is too long! 30 characters max"
  }
}

export const passwordValidationRules = {
  required: "Password is required!",
  minLength: {
    value: 8,
    message: "Minimum password length is 8 characters!"
  },
  maxLength: {
    value: 80,
    message: "Maximum password length is 80 characters!"
  }
}

export const confirmPasswordValidationRules = {
  required: "Confirm the password!"
}