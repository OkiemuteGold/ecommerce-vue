<template>
    <div class="card product-item p1" v-scroll_animation>
        <carousel :perPage="1">
            <slide v-for="(image, index) in product.images" :key="index">
                <img
                    :src="image.imageUrl"
                    class="card-img-top"
                    :alt="image.imageName"
                    width="250px"
                />
                <p class="sold-text">Sold Out</p>
            </slide>
        </carousel>

        <div class="card-body">
            <div class="title-container">
                <h5 class="card-title">{{ product.name }}</h5>
                <h6>{{ product.price | currency }}</h6>
            </div>
            <!-- <p class="card-text">
                {{ product.description }}
            </p> -->

            <div class="card-text" v-html="product.description"></div>

            <!-- <a href="#" class="btn btn-outline-secondary btn-sm">Add to Cart</a> -->

            <AddToCart
                :image="getImage(product.images)"
                :prod-id="product.id"
                :price="product.price"
                :name="product.name"
            >
            </AddToCart>
        </div>
    </div>
</template>

<script>
export default {
    props: ["product"],

    methods: {
        getImage(images) {
            console.log(images);
            return images[0];
        },
    },

    mounted() {
        this.product;
    },
};
</script>

<style lang="scss" scoped>
// animation ---- using :nth-child(1,2,3) they all come in together ---->
.p1 {
    &.before_enter {
        opacity: 0;
        transform: scale(0.5) rotateZ(-45deg);
        transition: all 1s ease-in;
        transition-delay: 0.5s;
    }
    &.enter {
        opacity: 1;
        transform: scale(1) rotateZ(0);
    }
}
.p2 {
    &.before_enter {
        opacity: 0;
        transform: scale(0.5) rotateZ(-45deg);
        transition: all 1s ease-in;
        transition-delay: 1.5s;
    }
    &.enter {
        opacity: 1;
        transform: scale(1) rotateZ(0);
    }
}
.p3 {
    &.before_enter {
        opacity: 0;
        transform: scale(0.5) rotateZ(-45deg);
        transition: all 1s ease-in;
        transition-delay: 2.5s;
    }
    &.enter {
        opacity: 1;
        transform: scale(1) translate(0);
    }
}

.products {
    background: var(--customSectionBg);
}

.product-item {
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.075);
    overflow: hidden;
    transition: 0.4s ease-in;

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
        background: #fff;
        // background: #ffd34d;

        // box-shadow: -3px 4px 1px 1px rgba(0, 0, 0, 0.03);
        // border-bottom: 1px solid var(--customSectionBg);
        box-shadow: -3px 4px 12px #d1c295;
        font-size: 13px;

        backface-visibility: visible;
    }

    .card-body {
        padding: 25px 30px;

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
                // color: var(--customParaText);
                color: #ffd34d;
                margin-bottom: 15px;
            }
        }

        .card-text {
            font-size: 13px;
            color: var(--customParaText);
            margin-bottom: 20px;
        }
    }
}

@media only screen and (max-width: 1024px) {
    .product-item .card-body {
        padding: 20px;
    }
}
@media screen and (max-width: 769px) {
    .product-item {
        margin-top: 20px;
    }
}
</style>