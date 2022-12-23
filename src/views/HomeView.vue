<template>
  <div class="home">
    <the-header/>
    <section class="md:px-10 lg:px-16 px-5 md:flex justify-between items-center pt-20">
      <div class="md:w-5/12">
        <span class="text-gray-400 font-thin">Absolutely hot arrivals 🔥</span>
        <h1 class="lg:text-5xl text-4xl  py-2 font-bold">
          The Best Place To<br>
          Find And Buy <br>
          Amazing <span class="color-gradient">Products</span>
        </h1>
        <p class="text-gray-400 font-thin">
          Get access to a trusted support team and resources whenever you want
        </p>
        <div class="flex gap-x-5 py-5">
          <button class="explore-btn">Explore Now</button>
        <button class="start-btn">Create Account</button>
        </div>
        <div class="flex items-center my-4">
          <span class="flex flex-col">
            <h3 class="text-xl font-bold">20k+</h3>
            <p class="font-medium">Collections</p>
          </span>
          <span class="bg-gray-200 w-1 mx-8 h-8"></span>
          <span class="flex flex-col">
            <h3 class="text-xl font-bold">16k+</h3>
            <p class="font-medium">Users</p>
          </span>
        </div>
      </div>
      <div class="md:w-6/12">
        <img src="../assets/banner2.png" alt="">
      </div>
    </section>
    <main class="text-center mt-20 md:px-10 lg:px-16 px-5">
      <h1 class="lg:text-5xl text-4xl  py-2 font-bold">
          <span class="text-gradient">Exclusive</span> Products
        </h1>
        <span class="text-gray-400 font-thin text-lg">Search for latest fashion, electronics, household and etc. products to buy from our collections.</span>
        <div class="search-bar my-5">
          <i class="uil uil-search text-xl px-2"></i>
          <input type="search" v-model="search" name="" placeholder="Search" id="">
          <button class="explore-btn ml-auto my-2">Explore Now</button>
        </div>
        <div class="flex justify-center items-center">
          <loader :loading="loading" :color="'#6D5BD0'" :radius="'20'" />
        </div>
        <section v-if="productsData" class="my-10">
          <div class="md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-x-10 gap-y-16">
            <div v-for="product in filteredProduct" :key="product.id" class="product-card my-8 md:my-0 relative">
              <div class="flex justify-center items-center w-full pt-8 pb-4">
                
                <img :src="product.image" class="w-28 h-36" :alt="product.title">
              </div>
              <span class="rate">
                  <i class="uis uis-star text-orange-400"></i>
                  {{product.rating.rate}}
                </span>
              <div class="product-detail px-2  text-left">
                  <h4 class=" font-medium w-full title">{{product.title}}</h4>
                  <p class="w-full font-thin text-sm capitalize py-1">Category: {{product.category}}</p>
                <span class="flex justify-between items-center pb-2 w-full">         
                  <h4 class="text-md font-medium">${{parseFloat(product.price.toFixed(2))}}</h4>
                  <button class="buy" @click="addToCart(product)">
                    Add to Cart
                  </button>
                </span>
              </div>
            </div>
          </div>
        </section>
        <section v-if="search.length > 1 && filteredProduct.length == 0" class="my-10">
          <div class="text-center">
            <h4 class="text-lg font-medium">
              No product found with such name
            </h4>
          </div>
        </section>
    </main>
    <the-footer/>
  </div>
</template>

<script>
// @ is an alias to /src

import loader from '@/components/loadingSpinner.vue';
import TheHeader from '@/components/The-Header.vue'
import TheFooter from '@/components/The-Footer.vue'
export default {
  name: 'HomeView',
  components: {
    TheHeader,
    loader,
    TheFooter
  },
  data() {
    return {
      search: '',
    }
  },
   computed: {
    loading() {
      return this.$store.getters['gettingProducts'];
    },
    productsData() {
        const increasedPrice  =  this.$store.getters['getProducts']
        for (let i = 0; i < increasedPrice.length; i++) {
          increasedPrice[i].price += increasedPrice[i].price * (2.2 /100)
        }
        return increasedPrice
 
    },
   filteredProduct() {
      return this.productsData.filter(product => {
        return product.title.toLowerCase().includes(this.search.toLowerCase())
      })
    },
  },
  mounted(){
    if (!this.productsData.data) {
      this.$store.dispatch('getProducts');
    } 
  },
  methods: {
    addToCart (product){
      this.$store.dispatch('addProductToCart', product)
    },
  },
}
</script>
<style lang="scss">
@import '@/assets/scss/_mixin.scss'; 
/* @import '../src/assets/scss/_variables.scss'; */
.color-gradient {
  background: -webkit-linear-gradient(#fcb8e1, #b774fd);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.text-gradient {
  background: -webkit-linear-gradient( #ad5ef4, #fa85b6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.explore-btn {
  background: #151515;
  font-size: 14px;
  color: #fff;
  border-radius: 8px;
  padding: 0.6rem 1.2rem;
}
.start-btn {
  border: 1px solid #151515;
  border-radius: 8px;
  font-size: 14px;
  padding: 0.6rem 1.2rem;
}
h1 {
  line-height: 3.2rem !important;
}
.search-bar{
   margin: 1rem 1rem;
    color: #c4c4c4;
    font-weight: 500;
    background-color:#fafafa ;
    border-radius: 8px;
    width: 400px;
    display: flex;
    align-items: center;
    margin: 0 auto;
    input {
        color: #000333;
        border: none;
         background-color:transparent;
         outline: none;
         font-weight: 300;
    }
    @include sm {
      width: 100%;
    }
}
.product-card {
  .rate {
    position: absolute;
    top: 10px;
    z-index: 4;
    background: #151515;
    color: #fff;
    margin-left: 10px;
    border-radius: 4px;
    padding: 1px 4px;
  }
  /* height: 330px; */
  border: 1px solid #151515;
  border-radius: 8px;
  
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .product-detail {
    border-bottom-right-radius: 7px;
    border-bottom-left-radius: 7px;
    background: #151515;
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    height: 150px;
  }
  .buy {
    background: #ad5ef4;
    padding: 8px;
    border-radius: 4px;
  }
  
}
.title {
    width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0;
    resize: none;
  }
</style>