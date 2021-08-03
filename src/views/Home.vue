<template>
    <div class="home">
        <Navbar />
        <Hero />
        <Products />
        <About />
    </div>
</template>

<script>
import Navbar from "../components/home/Navbar.vue";
import Hero from "../components/home/Hero.vue";
import Products from "../components/home/Products.vue";
import About from "../components/home/About.vue";

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
