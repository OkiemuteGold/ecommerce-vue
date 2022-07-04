<template>
    <div class="add-to-cart">
        <button class="btn btn-primary" @click="addToCart">Add to Cart</button>
    </div>
</template>

<script>
import $ from "jquery";

export default {
    props: {
        name: String,
        price: String,
        image: Object,
        prodId: String,
    },

    data() {
        return {
            item: {
                productName: this.name,
                productImage: this.image,
                productPrice: this.price,
                productId: this.prodId,
                productQuantity: 1,
            },
        };
    },
    methods: {
        addToCart() {
            $("#miniCart").modal("show");
            this.$store.commit("addToCart", this.item);
        },
    },
};
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
