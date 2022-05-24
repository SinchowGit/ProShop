import axios from "axios";

export const addToCart = (id, qty) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${id}`)

    dispatch({
        type: 'CART_ADD_ITEM',
        payLoad: {
            product: data._id,
            image: data.image,
            name: data.name,
            price: data.price,
            countInStock: data.countInStock,
            qty
        }
    })

    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => async (dispatch, getState) => {
    dispatch({
        type: 'CART_REMOVE_ITEM',
        payLoad: id
    })

    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddress = (data) => async (dispatch) => {
    dispatch({
        type: 'CART_SAVE_SHIPPING_ADDRESS',
        payLoad: data
    })

    localStorage.setItem('shippingAddress',JSON.stringify(data))
}

export const savePaymentMethod = (data) => async (dispatch) => {
    dispatch({
        type: 'CART_SAVE_PAYMENT_METHOD',
        payLoad: data
    })

    localStorage.setItem('paymentMethod',JSON.stringify(data))
}