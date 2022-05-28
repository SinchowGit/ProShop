export const orderCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case 'ORDER_CREATE_REQUEST':
            return { loading: true }
        case 'ORDER_CREATE_SUCCESS':
            return { loading: false, success: true, order: action.payLoad }
        case 'ORDER_CREATE_FAIL':
            return { loading: false, error: action.payLoad }
        case 'ORDER_CREATE_RESET':
            return {}
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
        case 'ORDER_DETAILS_RESET':
            return { loading: true, orderItems: [], shippingAddress: {} }
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
 
export const orderDeliverReducer = (state = {}, action) => {
    switch (action.type) {
        case 'ORDER_DELIVER_REQUEST':
            return { loading: true }
        case 'ORDER_DELIVER_SUCCESS':
            return { loading: false, success: true }
        case 'ORDER_DELIVER_FAIL':
            return { loading: false, error: action.payLoad }
        case 'ORDER_DELIVER_RESET':
            return {}
        default:
            return state
    }
}
 
export const myOrdersReducer = (state = { loading: true }, action) => {
    switch (action.type) {
        case 'MY_ORDER_REQUEST':
            return { loading: true }
        case 'MY_ORDER_SUCCESS':
            return { loading: false, orders: action.payLoad }
        case 'MY_ORDER_FAIL':
            return { loading: false, error: action.payLoad }
        default:
            return state
    }
}

export const OrdersListReducer = (state = { loading: true }, action) => {
    switch (action.type) {
        case 'ORDERS_REQUEST':
            return { loading: true }
        case 'ORDERS_SUCCESS':
            return { loading: false, orders: action.payLoad }
        case 'ORDERS_FAIL':
            return { loading: false, error: action.payLoad }
        default:
            return state
    }
}