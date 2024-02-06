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

export const urlValidationRules = {
  required: {
    value: true,
    message: "You can't squeeze an empty string!"
  },
  pattern: {
    value: /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/g,
    message: "It doesn't look like URL..."
  }
}