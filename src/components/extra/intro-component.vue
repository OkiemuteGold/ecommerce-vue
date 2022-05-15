<template>
    <section class="row h-100 justify-content-center align-items-center pb-5">
        <div class="col-md-6">
            <div class="left-content">
                <h1 class="mb-3">{{ title }}</h1>
                <p>
                    {{ description }}
                </p>
            </div>
        </div>
        <div class="col-md-6">
            <img
                :src="imageUrl"
                :alt="imageAlt"
                class="img-fluid p-0 px-lg-4"
            />
        </div>
    </section>
</template>

<script>
export default {
    props: ["title", "description", "imageUrl", "imageAlt"],
};
</script>

<style scoped lang="scss">
.left-content {
    max-width: 380px;
}

@media screen and (max-width: 426px) {
    .left-content {
        text-align: center;
        margin-bottom: 40px;
    }
}
</style>
