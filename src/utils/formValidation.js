import {
  LOGIN_ID_MAX,
  LOGIN_ID_MIN,
  LOGIN_PIN_MAX,
  LOGIN_PIN_MIN,
} from "../constants/constants";

class Validator {
  static validate(type, value) {
    switch (type) {
      case "loginId": {
        const range = `${LOGIN_ID_MIN},${LOGIN_ID_MAX}`;
        const regex = new RegExp(`^\\d{${range}}$`);
        return regex.test(value);
      }
      case "loginPin": {
        const range = `${LOGIN_PIN_MIN},${LOGIN_PIN_MAX}`;
        const regex = new RegExp(`^\\d{${range}}$`);
        return regex.test(value);
      }
    }
  }
}

export { Validator };
