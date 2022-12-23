<template>
  <div v-if="open">
    <Transition name="fade">  
      <div
        class="fixed top-0 right-0 w-screen h-screen bg-[rgb(0,0,0,0.1)] flex justify-center items-center z-50"
        @click.self="close"
        
      >
        <div
          class="fixed top-0 right-0 shadow-xl bg-white pb-8 w-11/12 md:max-w-[300px] h-screen overflow-y-scroll overflow-x-hidden"
        >
          <div
            class="flex justify-between items-center py-4 sticky top-0 w-inherit bg-white shadow-sm px-6"
          >
            <p class="text-xl md:text-4xl font-semibold">
              Cart<span class="text-priText">.</span>
            </p>
            <span class="close" @click="close">X</span>
          </div>
          <div class="flex flex-col gap-3 p-5" v-if="cart.length">
            <div v-for="item in cart" :key="item.id">
              <div
                class="bg-white shadow-sm rounded-sm flex justify-between items-center p-2"
              >
                <div class="flex items-center gap-2">
                  <img
                    :src="item.image"
                    alt="image"
                    class="w-[40px] h-[40px] object-contain"
                  />
                  <div class="flex flex-col gap-0.5">
                    <p class="font-semibold title text-sm">
                      {{ item.title }}
                    </p>
                    <p class="capitalize text-xs">{{ item.category }}</p>
                    <p class="font-semibold text-xs">
                      ${{parseFloat(item.price.toFixed(2))}}
                    </p>
                  </div>
                </div>
                <i class="uil uil-trash-alt text-red-500 cursor-pointer" @click="removeFromCart(item)"></i>
              </div>
            </div>
            <hr />
            <div class="flex justify-between">
              <p class="font-semibold">Total</p>
              <p class="font-medium"> ${{parseFloat(totalPrice.toFixed(2))  }}</p>
            </div>
          </div>
          <div v-else class="text-center pt-12">
            <p class="mt-4 text-xl">Your cart is empty.</p>
          </div>
        </div>
      </div>
    </Transition>
    </div>
</template>

<script>
export default {
  name: 'HomeView',
  components: {
  },
  data() {
    return {

    }
  },
   computed: {
    cart() {
       return this.$store.getters['getCart']
    },
    totalPrice() {
       return this.$store.getters['getCartTotal']
    },
  },
  methods: {
    removeFromCart (product){
        
      this.$store.dispatch('removeFromCart', product)
    },
  },
  props: {
    open: Boolean,
    close: Function,
  }
}
</script>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity ease-in-out 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.title {

    width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0;
    resize: none;

  }
  .close {
    color: #fff;
    width: 30px;
    height: 30px;
    font-weight: 900;

    background: rgb(226, 60, 60);

    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
</style>