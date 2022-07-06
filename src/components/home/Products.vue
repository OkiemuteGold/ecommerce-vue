<template>
    <div class="products section-padd px-lg-5" id="products">
        <div class="container">
            <div class="section-head">
                <h1 class="title text-center">Our Products</h1>
            </div>

            <div class="row" v-if="products && products.length > 0">
                <div
                    class="col-md-6 col-lg-4"
                    v-for="(product, index) in products"
                    :key="index"
                >
                    <ProductList :product="product"></ProductList>
                </div>
            </div>
            <div class="text-center" v-else>
                Problem Fetching Products <br />
                Please check your internet connection
            </div>
        </div>
    </div>
</template>

<script>
import ProductList from "./ProductList.vue";
import { db } from "../../firebase";

export default {
    components: { ProductList },

    data() {
        return {
            products: [],
        };
    },

    firestore() {
        return {
            products: db.collection("products"),
        };
    },
};
</script>

<style lang="scss" scoped>
.products {
    background: var(--customSectionBg);
}
</style>