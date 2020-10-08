
const initialState = {
    message: '[Placeholder Message]'
}

export const createNotification = (content) => {
    return {
        type: 'CREATE_NOTIFICATION',
        data: {
            message: `${content} was successfully added.`
        }
    }
}

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CREATE_NOTIFICATION':
            return action.data
        default:
            return state
    }
}

export default notificationReducer