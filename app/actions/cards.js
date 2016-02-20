export const LOAD_CARDS = 'LOAD_CARDS';
export const ADD_CARD = 'ADD_CARD';
export const REMOVE_CARD = 'REMOVE_CARD';

export function load() {
  return {
    type: LOAD_CARDS
  };
}

export function add(){
  return {
    type: ADD_CARD
  }
}

export function remove(){
  return {
    type: REMOVE_CARD
  }
}
//
// export function decrement() {
//   return {
//     type: DECREMENT_COUNTER
//   };
// }
//
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
