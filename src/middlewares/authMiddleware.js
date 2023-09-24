import { CHECK_LOGIN } from "../actions/user";

const authMiddelware = (store) => (next) => (action) => {
  switch (action.type) {
    case CHECK_LOGIN: {
      console.log(action);
    }
    break;
    default:
  }
  next(action);
};

export default authMiddelware;
