<template>
  <div class="container">
    <h3 class="text-center mt-3">Nuxt.js + Express.js + Express Session</h3>
    <div class="d-flex pt-3 justify-content-center" style="height: 100%">
      <ProductList :products="getProducts" />
      <CartList :carts="getCarts" />
    </div>
  </div>
</template>

<script>
import ProductList from "@/components/product/Products";
import CartList from "@/components/cart/Cart";
export default {
  components: {
    ProductList,
    CartList
  },
  computed: {
    getProducts() {
      return this.$store.getters.getProducts;
    },
    getCarts(){
      return this.$store.getters.getCarts;
    }
  }
}
</script>

<style>
    .product-container, .cart-container {
        padding: 1em;
        flex: 1 !important;
    }
    .container {
        height: 90vh;
    }
    body {
        background-color: #FAF3DF;
    }
    .price-container{
        background-color: #D15385 !important;
        font-size: 12px;
    }
    .total-price-container{
        color: #D15385 !important;
        font-size: 20px;
    }
    .custom-alert {
        background-color: #FAF3DF !important;
        font-size: 12px;
    }
    .bg-custom-color {
        background-color: #FAF3DF !important;
    }
</style>
