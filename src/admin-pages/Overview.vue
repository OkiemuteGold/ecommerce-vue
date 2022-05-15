<template>
    <div class="container">
        <IntroComponent
            :title="title"
            :description="description"
            :imageUrl="imageUrl"
            :imageAlt="imageAlt"
        ></IntroComponent>
    </div>
</template>

<script>
import IntroComponent from "../components/extra/intro-component.vue";

export default {
    data() {
        return {
            title: "Overview Page",
            description:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit Iure impedit.",
            imageUrl: "/img/svg/overview.svg",
            imageAlt: "overview image",
        };
    },

    components: {
        IntroComponent,
    },
};
</script>

<style scoped lang="scss">
</style>
