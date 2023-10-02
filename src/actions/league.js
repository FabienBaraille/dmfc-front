export const TOGGLE_CONFIRMATION_MODAL = 'TOGGLE_CONFIRMATION_MODAL';

export const toggleConfirmationModal = (isConfirmationVisible) => ({
  type: TOGGLE_CONFIRMATION_MODAL,
  isConfirmationVisible,
});