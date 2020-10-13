
const initialState = {
    message: null
}

export const createNotification = props => {
    const { message, delay } = props

    return async dispatch => {
        dispatch({
            type: 'CREATE_NOTIFICATION',
            data: { message }
        })

        setTimeout(() => {
            dispatch({
                type: 'CLEAR_NOTIFICATION',
                data: initialState
            })
        }, delay)
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