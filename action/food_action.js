export const fetchTimelineSuccess = (foods) => {
  return{
    type: 'FETCH_TIMELINE_FOODS',
    payload: foods
  }
}

export const fetchTimeline = (token) =>{
  return(dispatch) => {
        fetch('http://botram-api-dev.ap-southeast-1.elasticbeanstalk.com/api/users/food', {
          method: 'GET',
          headers: {
            token: token
          }
        })
        .then(res => {
          return res.json()
        })
        .then(food => dispatch(fetchTimelineSuccess(food)))
        .catch(err => console.log(err))
  }
}

export const postFoodSuccess = (newFood) => {
  return{
    type: 'POST_FOOD_SUCCESS',
    payload: newFood
  }
}

export const postFood = (token, userId, componentState, cbUpload, cbRedirect) => {
  return(dispatch) =>{
    fetch('http://botram-api-production.ap-southeast-1.elasticbeanstalk.com/api/users/food', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'token': token
      },
      body: JSON.stringify({
        food_title: componentState.state.title,
        food_pic: componentState.state.pic,
        food_price: componentState.state.price,
        food_qty: componentState.state.quantity,
        food_desc: componentState.state.description,
        food_tags: componentState.state.tags,
        _userId: userId
      })
    }).then(res => res.json()).then(data => {
      dispatch(postFoodSuccess);
      cbUpload(componentState.state, componentState.state.foodId);
      setTimeout(() => cbUpload(componentState.state, userId), 2000)
    })
  }
}

export const putFoodImage = (token, foodId, foodObj) => {
  fetch(`http://botram-api-production.ap-southeast-1.elasticbeanstalk.com/api/users/food/edit`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'token': token
    },
    body: JSON.stringify({
      _foodId: foodId,
      food_pic: foodObj
    })
  }).then(res => res.json())
}
