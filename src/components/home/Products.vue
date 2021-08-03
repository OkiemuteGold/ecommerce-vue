<template>
    <div class="products section-padd" id="products">
        <div class="container">
            <div class="section-head">
                <h1 class="title text-center">Our Products</h1>
            </div>

            <div class="row">
                <div class="col-md-4">
                    <div class="card product-item">
                        <img
                            src="img/products/product1.jpg"
                            alt="surface book 2"
                            class="card-img-top"
                        />
                        <p class="sold-text">Sold Out</p>
                        <div class="card-body">
                            <div class="title-container">
                                <h5 class="card-title">Surface Book 2</h5>
                                <h6><span>$</span>1000</h6>
                            </div>
                            <p class="card-text">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Autem, delectus!
                            </p>

                            <a href="#" class="btn btn-outline-secondary btn-sm"
                                >Add to Cart</a
                            >
                        </div>
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="card product-item">
                        <img
                            src="img/products/product2.jpg"
                            alt="surface pro"
                            class="card-img-top"
                        />
                        <p class="sold-text">Sold Out</p>
                        <div class="card-body">
                            <div class="title-container">
                                <h5 class="card-title">Surface Pro</h5>
                                <h6><span>$</span>1200</h6>
                            </div>
                            <p class="card-text">
                                Lorem ipsum dolor, sit amet consectetur
                                adipisicing elit. Minima, beatae.
                            </p>
                            <a href="#" class="btn btn-outline-secondary btn-sm"
                                >Add to Cart</a
                            >
                        </div>
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="card product-item">
                        <img
                            src="img/products/product3.jpg"
                            alt=""
                            class="card-img-top"
                        />
                        <p class="sold-text">Sold Out</p>
                        <div class="card-body">
                            <div class="title-container">
                                <h5 class="card-title">Surface Pro Max</h5>
                                <h6 class="price"><span>$</span>1500</h6>
                            </div>
                            <p class="card-text">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Ab, temporibus.
                            </p>
                            <a href="#" class="btn btn-outline-secondary btn-sm"
                                >Add to Cart</a
                            >
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
.products {
    background: var(--customSectionBg);
}

.product-item {
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.075);
    overflow: hidden;
    transition: 0.4s ease;

    &:hover {
        box-shadow: 0 0.75rem 1.5rem rgba(0, 0, 0, 0.175);
    }

    &:before {
        content: "";
        position: absolute;
        top: -20px;
        right: -25px;
        background: rgb(50, 50, 50);
        height: 50px;
        width: 130px;

        transform: rotate(30deg);
    }

    .sold-text {
        position: absolute;
        right: 6px;
        top: 20px;
        padding: 2px 10px;
        border-radius: 5px 0 5px 0px;
        transform: rotate(30deg);
        background: #ffd34d;
        // box-shadow: -3px 4px 1px 1px rgba(0, 0, 0, 0.03);
        // border-bottom: 1px solid var(--customSectionBg);
        box-shadow: -3px 4px 12px #d1c295;
        font-size: 13px;

        backface-visibility: visible;
    }

    .card-body {
        padding: 30px;

        .title-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: var(--customBlue);

            .card-title {
                font-weight: 600;
                margin-bottom: 15px;
                letter-spacing: 2px;
            }

            h6 {
                font-size: 14px;
                font-style: italic;
                font-weight: 900;
                color: var(--customParaText);
                margin-bottom: 15px;
            }
        }

        .card-text {
            font-size: 14px;
            color: var(--customParaText);
            margin-bottom: 20px;
        }
    }
}
@media screen and (min-width: 767px) and (max-width: 1025px) {
    .product-item .card-body {
        padding: 20px;
    }
}
@media screen and (max-width: 426px) {
    .product-item {
        margin-top: 20px;
    }
}
</style>