<template>
    <div class="cart-container card shadow">
        <h3 class="text-center">Shopping Cart</h3>
        <Alert v-if="carts.length == 0 || !carts" />
        <CartItems v-else :carts="carts" />
        <CartFooter />
    </div>
</template>

<script>
import Alert from "@/components/cart/Alert";
import CartItems from "@/components/cart/CartItems";
import CartFooter from "@/components/cart/CartFooter";

export default {
    components: {
        Alert,
        CartItems,
        CartFooter
    },
    props: {
        carts: {
            type: Array,
            required: false
        }
    }    
}
</script>

<style scoped>

</style>