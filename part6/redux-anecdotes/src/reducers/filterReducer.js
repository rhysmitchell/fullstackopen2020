
const initialState = {
    filter: null
}

export const setFilter = query => {
    return {
        type: 'SET_FILTER',
        data: {
            query
        }
    }
}

const filterReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_FILTER':
            return action.data

        default:
            return state
    }
}

export default filterReducer