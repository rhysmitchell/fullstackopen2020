const initialState = {
  message: null
}

export const createNotification = props => {
  const { message, type, resetInterval } = props

  return async dispatch => {
    dispatch({
      type: 'CREATE_NOTIFICATION',
      data: { message, type }
    })

    setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION',
        data: initialState
      })
    }, resetInterval)
  }
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'CREATE_NOTIFICATION':
    return action.data

  case 'CLEAR_NOTIFICATION':
    return action.data

  default:
    return state
  }
}

export default notificationReducer