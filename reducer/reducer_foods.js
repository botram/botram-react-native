export default(state=[], action) => {
  console.log(action.payload);
  switch (action.type) {
    case 'FETCH_TIMELINE_FOODS':
      return action.payload
    case 'POST_FOOD_SUCCESS':
      return [action.payload, ...state]
    default:
      return state
  }
}
