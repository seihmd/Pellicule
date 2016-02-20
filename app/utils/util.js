export default class Util {
  addCard(state, card) {
    return {
      cards: [{
          id: state.cards.reduce((maxId, card) => { Math.max(card.id, maxId) }, -1) + 1,
          text: card.text,
          boardId: card.boardId
        },
        ...state
      ]
    };
  }

  removeCard(state, id) {
    return state.cards.filter((card) => {
      card.id !== id;
    });
  }
}
