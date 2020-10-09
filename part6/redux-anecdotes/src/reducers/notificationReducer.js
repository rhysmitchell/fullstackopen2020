
const initialState = {
    message: null
}

export const createNotification = (message) => {
    return {
        type: 'CREATE_NOTIFICATION',
        data: {
            message
        }
    }
}

export const clearNotification = () => {
    return {
        type: 'CLEAR_NOTIFICATION',
        data: initialState
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