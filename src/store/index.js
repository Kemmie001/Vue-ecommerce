import axios from 'axios';
import { createStore } from 'vuex'
import toastr from 'toastr';
import 'toastr/build/toastr.css';

export default createStore({
  state: {
    products:  [],
    gettingProducts: false,
    cart: [],
  },
  getters: {
    getProducts: (state) => state.products,
    gettingProducts: (state) => state.gettingProducts,
    getCart: (state) => state.cart
  },
  mutations: {
    setProducts(state, products) {
      state.products = products
    },
    setGettingProducts: (state, status) => {
      state.gettingProducts = status
    },
    pushProductToCart(state, productId) {
      state.cart.push({
        id: productId
      })
    }
  },
  actions: {
    getProducts: async(context) => {
      context.commit('setGettingProducts', true);
      await axios.get('https://fakestoreapi.com/products' )
      .then((res) => {
        context.commit('setProducts', res.data)
        
      })
      .catch((err) => {
        console.log(err)
        toastr.error('An error ocurred')
       })
       .finally(() => {
        context.commit('setGettingProducts', false);
      });
    },
    addProductToCart(context, product) {
      const cartItem = context.state.cart.find(item => item.id == product.id)
      if (!cartItem) {
        context.commit('pushProductToCart', product.id)
        toastr.success('Product added to cart')
      } else {
        toastr.success('Product already exists inside the cart')
      }
    }
  },
  modules: {
  }
})
