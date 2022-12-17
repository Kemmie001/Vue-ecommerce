<template>
  <header>
    <div class="logo">
      logo
    </div>
    <div class="nav-li ml-auto md:hidden">
          <a class="nav--lin relative" href>
            <i class="uil uil-shopping-cart text-3xl"></i> 
            <sub class="absolute -top-2 bg-[#b774fd] text-white flex items-center right-0 justify-center w-4 h-4 rounded-full">{{cart.length}}</sub>  
          </a>
    </div>
    <span class="menu-toggle" @click="toggleMenu">
        <i class="uil uil-bars"></i>
    </span>
    <nav class="nav" v-bind:class="{active:menuOpen}">
      <span class="close" @click="toggleMenu">X</span>
      <ul class="nav-ul">
        <li class="nav-li">
          <a class="nav--link" href>About</a>
        </li>
        <li class="nav-li">
          <a class="nav--link" href>Contact</a>
        </li>
         <li class="search-bar hidden md:flex">
          <i class="uil uil-search text-lg px-2"></i>
          <input type="search" name="" placeholder="" id="">
        </li>
        <li class="nav-li hidden md:flex">
          <a class="nav--lin relative" href>
            <i class="uil uil-shopping-cart text-3xl"></i> 
            <sub class="absolute top-0 bg-[#b774fd] text-white flex items-center right-0 justify-center w-4 h-4 rounded-full">{{cart.length}}</sub>  
          </a>
        </li>
        <li class="nav-li">
          <a class="nav--link" href>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDJzEaxLN-jGRYYUO65pWu7Q9GXoNt4LUSSA&usqp=CAU" alt="" class="rounded-full w-8 h-8">
          </a>
        </li>
        
      </ul>
    </nav>
    
  </header>
</template>
<script>
export default {
  name: "TheHeader",
  data: () => ({
    menuOpen: false
  }),
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    }
  },
  computed: {
     cart() {
      return this.$store.getters['getCart'];
    }
  },
};
</script>

<style  lang="scss" scoped>
header {
  margin: 0 auto;
  padding: 0rem 2rem;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #d3d3d3;
  position: fixed;
  z-index: 10;
  background: #fff;
}

.nav-ul {
  flex: 1;
  list-style: none;
  display: flex;
  align-items: center;
}
.nav-li:not(:last-child) {
  margin-right: 1rem;
}
.nav--link {
  display: block;
  padding: 1rem 2rem;
  font-size: 14px;
  text-decoration: none;

  text-transform: capitalize;
  font-weight: 400;
  justify-content: center;
  align-items: center;

  transition: all 0.5s ease-in-out;
  position: relative;
}
.search-bar{
   margin: 1rem 1rem;
    color: #d3d3d3;
    background-color:#fafafa ;
    border-radius: 8px;
    width: 200px;
    height: 38px;
    align-items: center;
    /* padding: 0.5rem; */
    input {
        color: #000333;
        border: none;
         background-color:transparent;
         outline: none;
         font-weight: 300;
    }
}
.nav--link:hover {
  letter-spacing: 1px;
}

.nav--link::before,
.nav--link::after {
  visibility: hidden;
  content: "";
  margin: 0 auto;
  display: block;
  border: 1px solid #b774fd;
  transition: width 0.5s ease-in-out;
  position: absolute;
  width: 0;
}
.nav--link::before {
  right: 0;
  left: 0;
  top: 0;
}
.nav--link::after {
  right: 0;
  left: 0;
  bottom: 0;
}
.nav--link:hover:before,
.nav--link:hover:after {
  visibility: visible;
  width: 80%;
}

.logo {
  letter-spacing: 2px;
  font-weight: 900;
  font-size: 2rem;
  font-family: "Helvetica", Roboto;
  cursor: pointer;
}
.menu-toggle,
.nav .close {
  display: none;
}
@media (max-width: 768px) {

  .menu-toggle {
    font-size: 1.5rem;
    padding: 0.5rem;
    cursor: pointer;
    display: block;
  }
  .nav {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100vw;
    height: 100vh;
    background: #b774fd;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.6s cubic-bezier(0.86, 0, 0.07, 1);
    transform: translate3d(-100%, 0, 0);
  }
  .nav.active {
    transform: translateZ(0);
  }
  .nav .close {
    color: #fff;
    position: absolute;
    top: 2rem;
    right: 2rem;
    width: 40px;
    height: 40px;
    font-weight: 900;

    background: #fcb8e1;

    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  .nav-ul {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>
