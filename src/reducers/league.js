import { TOGGLE_CONFIRMATION_MODAL } from "../actions/league";

const initialState = {
  'isConfirmationVisible': false,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {  
    case TOGGLE_CONFIRMATION_MODAL:
      return {
        ...state,
        'isConfirmationVisible': action.isConfirmationVisible
    }

    default:
      return state;
  }
};

export default reducer;