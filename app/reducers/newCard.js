import { CANCEL_NEWCARD } from '../utils/ActionTypes';

const initialState = {
  text: '',
  isLocal: false
};

export default function newCard(state = initialState, action) {
  switch (action.type) {
    case CANCEL_NEWCARD:
      return {}
    default:
      return state;
  }
}
