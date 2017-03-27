import { combineReducers } from 'redux';
import FoodsReducer from './reducer_foods';

const rootReducers = combineReducers({
  foods: FoodsReducer
})

export default rootReducers
