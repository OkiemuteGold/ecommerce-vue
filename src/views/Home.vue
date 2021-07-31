<template>
    <div class="home">
        <Navbar />
        <Hero />
        <Products />
        <About />
    </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import Hero from "../components/Hero.vue";
import Products from "../components/product/Products.vue";
import About from "../components/about/About.vue";

export default {
    name: "Home",
    components: {
        Navbar,
        Hero,
        Products,
        About,
    },
};
</script>
