export function getLocalCards() {
  return JSON.parse(localStorage.getItem('cards'));
}

export function updateLocalCards(cards) {
  localStorage.setItem('cards', JSON.stringify(cards));
}
