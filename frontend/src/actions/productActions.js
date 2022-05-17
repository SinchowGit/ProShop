import axios from 'axios'

export const listProducts = () => async (dispatch) => {
    try {
        dispatch({type: 'PRODUCT_LIST_REQUEST'})

        const { data } = await axios.get('/api/products')

        dispatch({
            type: 'PRODUCT_LIST_SUCCESS',
            payLoad: data
        })
    } catch (error) {
        dispatch({
            type: 'PRODUCT_LIST_FAIL',
            payLoad: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const listProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({type: 'PRODUCT_DETAILS_REQUEST'})

        const { data } = await axios.get(`/api/products/${id}`)

        dispatch({
            type: 'PRODUCT_DETAILS_SUCCESS',
            payLoad: data
        })
    } catch (error) {
        dispatch({
            type: 'PRODUCT_DETAILS_FAIL',
            payLoad: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}