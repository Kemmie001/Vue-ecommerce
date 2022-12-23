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
    getCart: (state) => state.cart,
    getCartTotal: (state, getters) => {
      let total = 0
      getters.getCart.forEach(product => {
        total += product.price
      })
      return total
    }
  },
  mutations: {
    setProducts(state, products) {
      state.products = products
    },
    setGettingProducts: (state, status) => {
      state.gettingProducts = status
    },
    pushProductToCart(state, product) {
      state.cart.push({
        id: product.id,
        title: product.title,
        image: product.image,
        price: product.price
      })
    },
    filteredCart(state, product){
      state.cart = product
    },

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
        context.commit('pushProductToCart', product)
        toastr.success('Product added to cart')
      } else {
        toastr.success('Product already exists inside the cart')
      }
    },
    removeFromCart(context, product)  {
     const newCartList = context.state.cart.filter((item) => item !== product)
     context.commit('filteredCart', newCartList)
    },
  },
  modules: {
  }
})
