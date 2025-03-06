export function checkForValidEmail(value: string, errorMessage: string) {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!value) {
      return true;
    }

    if (!value.match(emailRegex)) {
      return errorMessage;
    }

    return true;
  }

export function validatePhoneNumber(value: string, errorMessage: string) {
    const specialCharRegex = new RegExp(`[() -]`, "g");

    const cleanValue = value.replace(specialCharRegex, "");

    if(cleanValue.length !== 10) {
      return errorMessage;
    }

    return true;

}