import {
  LOAD_CARDS, ADD_CARD, REMOVE_CARD
} from '../utils/ActionTypes';

export function loadCards() {
  return {
    type: LOAD_CARDS
  };
}

export function createNew(newCard) {
  return (dispatch) =>{
    dispatch({
      type: ADD_CARD,
      newCard
    })
  }
}

export function remove() {
  return {
    type: REMOVE_CARD
  }
}


export function initialize() {
  return {
    type: CREATE_NEWCARD
  }
}

export function cancelNew() {
  return {
    type: CANCEL_NEWCARD
  }
}

// export function incrementIfOdd() {
//   return (dispatch, getState) => {
//     const { counter } = getState();
//
//     if (counter % 2 === 0) {
//       return;
//     }
//
//     dispatch(increment());
//   };
// }
//
// export function incrementAsync(delay = 1000) {
//   return dispatch => {
//     setTimeout(() => {
//       dispatch(increment());
//     }, delay);
//   };
// }
