<template>
    <div class="hero">
        <div class="container h-100">
            <div class="row h-100 justify-content-center align-items-center">
                <div class="col-md-6 col-lg-5">
                    <div class="hero-content side-content-shadow">
                        <h1 class="hero-title">Welcome To Dummy Shop</h1>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Ipsum maiores facere deleniti iste qui ad
                            eligendi dolore sunt consequuntur perferendis.
                        </p>

                        <div class="hero-buttons">
                            <button class="btn btn-warning">Explore</button>
                            <button class="btn btn-outline-secondary">
                                Products
                            </button>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 col-lg-7">
                    <div class="image">
                        <img
                            src="img/svg/graphic.svg"
                            alt="hero image"
                            class="img-fluid"
                        />
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
.hero {
    height: 100vh;
    width: 100vw;
    background: #fff;
}

.hero-content {
    padding-left: 2.2rem;
    padding-bottom: 1rem;

    & > .hero-title {
        text-transform: capitalize;
        margin-bottom: 10px;
    }
}

.hero-buttons {
    margin-top: 30px;
}

.hero-buttons button {
    min-width: 120px;

    &:first-child {
        margin-right: 5px;
    }

    &:active,
    &:focus {
        box-shadow: none;
    }
}

// Media Queries
@media screen and (max-width: 426px) {
    .hero {
        max-height: 400px;
    }

    .hero-content {
        padding: 2rem 1rem 0;
        text-align: center;
    }

    .image {
        display: none;
    }
}
</style>