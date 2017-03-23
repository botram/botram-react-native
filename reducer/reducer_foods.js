export default(state=[], action) => {
  switch (action.type) {
    case 'FETCH_TIMELINE_FOODS':
      return action.payload
    case 'POST_FOOD_SUCCESS':
      return [action.payload, ...state]
    default:
      return state
  }
}
