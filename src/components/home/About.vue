<template>
    <div class="about-section section-padd">
        <div class="container">
            <div class="row justify-content-center align-items-center">
                <div class="col-md-6">
                    <div class="image">
                        <img
                            src="img/svg/product.svg"
                            alt="about image"
                            class="img-fluid"
                        />
                    </div>
                </div>

                <div class="col-md-6">
                    <div class="right-content side-content-shadow">
                        <h2 class="title">Learn More About Us</h2>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Ipsum maiores facere deleniti iste qui ad
                            eligendi dolore sunt consequuntur perferendis.
                        </p>

                        <div class="about-button">
                            <button class="btn">Browse Products</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.about-section {
    background: #fff;
}

.right-content {
    padding: 20px;

    & > .title {
        text-transform: capitalize;
        margin-bottom: 10px;
    }
}

.about-button {
    margin-top: 30px;
}

.about-button button {
    color: var(--customBlue);
    border-color: var(--customBlue);

    &:hover,
    &:active,
    &:focus {
        box-shadow: none;
        background: var(--customBlue);
        color: #fff;
    }
}

.image {
    padding: 30px;
}

@media screen and (max-width: 426px) {
    .image {
        padding-top: 0;
    }

    .right-content {
        text-align: center;
    }
}
</style>