<template>
    <div class="container">
        <IntroComponent
            :title="title"
            :description="description"
            :imageUrl="imageUrl"
            :imageAlt="imageAlt"
        ></IntroComponent>

        <hr />

        <Profile></Profile>
    </div>
</template>

<script>
import IntroComponent from "../components/extra/intro-component.vue";
import Profile from "../components/profile/Profile.vue";

export default {
    data() {
        return {
            title: "Profile Settings",
            description: "Change your profile settings here",
            imageUrl: "/img/svg/profile.svg",
            imageAlt: "profile image",
        };
    },

    components: {
        IntroComponent,
        Profile,
    },
};
</script>

<style scoped lang="scss">
</style>
