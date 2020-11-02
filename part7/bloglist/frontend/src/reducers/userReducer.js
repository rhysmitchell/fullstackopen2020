export const setLoggedInUser = user => {
  return dispatch => {
    dispatch({
      type: 'SET_LOGGED_IN_USER',
      data: user
    })
  }
}

export const setLoggedOutUser = () => {
  return dispatch => {
    dispatch({
      type: 'SET_LOGGED_OUT_USER'
    })
  }
}

const userReducer = (state = {}, action) => {
  switch (action.type) {
  case 'SET_LOGGED_IN_USER':
    return { ...state, user: action.data }

  case 'SET_LOGGED_OUT_USER':
    window.localStorage.removeItem('loggedBlogAppUser')
    return null

  default:
    return state
  }
}

export default userReducer