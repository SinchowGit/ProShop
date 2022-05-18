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