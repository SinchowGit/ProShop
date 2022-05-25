export const orderCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case 'ORDER_CREATE_REQUEST':
            return { loading: true }
        case 'ORDER_CREATE_SUCCESS':
            return { loading: false, success: true, order: action.payLoad }
        case 'ORDER_CREATE_FAIL':
            return { loading: false, error: action.payLoad }
        default:
            return state
    }
}

export const orderDetailsReducer = (state = { loading: true, orderItems: [], shippingAddress: {} }, action) => {
    switch (action.type) {
        case 'ORDER_DETAILS_REQUEST':
            return { loading: true }
        case 'ORDER_DETAILS_SUCCESS':
            return { loading: false, order: action.payLoad }
        case 'ORDER_DETAILS_FAIL':
            return { loading: false, error: action.payLoad }
        default:
            return state
    }
}

export const orderPayReducer = (state = {}, action) => {
    switch (action.type) {
        case 'ORDER_PAY_REQUEST':
            return { loading: true }
        case 'ORDER_PAY_SUCCESS':
            return { loading: false, success: true }
        case 'ORDER_PAY_FAIL':
            return { loading: false, error: action.payLoad }
        case 'ORDER_PAY_RESET':
            return {}
        default:
            return state
    }
}