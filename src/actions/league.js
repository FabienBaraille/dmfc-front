export const TOGGLE_CONFIRMATION_POPUP = 'TOGGLE_CONFIRMATION_POPUP';

export const toggleConfirmationPopup = (isConfirmationVisible) => ({
  type: TOGGLE_CONFIRMATION_POPUP,
  isConfirmationVisible,
});