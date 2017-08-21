const initialState = {
  gameState: 'start',
};

export default function croupie(state = initialState, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}
