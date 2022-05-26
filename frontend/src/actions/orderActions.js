import axios from 'axios'

export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({type: 'ORDER_CREATE_REQUEST'})

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post('/api/orders',order,config)
        dispatch({
            type: 'ORDER_CREATE_SUCCESS',
            payLoad: data
        })

    } catch (error) {
        dispatch({
            type: 'ORDER_CREATE_FAIL',
            payLoad: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const getOrderDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({type: 'ORDER_DETAILS_REQUEST'})

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/orders/${id}`,config)
        
        dispatch({
            type: 'ORDER_DETAILS_SUCCESS',
            payLoad: data
        })
    } catch (error) {
        dispatch({
            type: 'ORDER_DETAILS_FAIL',
            payLoad: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const payOrder = (id, paymentResult) => async (dispatch, getState) => {
    try {
        dispatch({type: 'ORDER_PAY_REQUEST'})

        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await axios.put(`/api/orders/${id}/pay`,paymentResult,config)
        
        dispatch({
            type: 'ORDER_PAY_SUCCESS',
        })
    } catch (error) {
        dispatch({
            type: 'ORDER_PAY_FAIL',
            payLoad: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const getMyOrders = () => async (dispatch, getState) => {
    try {
        dispatch({type: 'MY_ORDER_REQUEST'})

        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/orders/myorders`,config)
        
        dispatch({
            type: 'MY_ORDER_SUCCESS',
            payLoad: data
        })
    } catch (error) {
        dispatch({
            type: 'MY_ORDER_FAIL',
            payLoad: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}