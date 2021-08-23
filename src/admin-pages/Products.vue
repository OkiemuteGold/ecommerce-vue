<template>
    <div class="overview-container">
        <div class="container">
            <section class="intro px-md-4 section-padd-40">
                <div
                    class="row h-100 justify-content-center align-items-center"
                >
                    <div class="col-md-6">
                        <div class="left-content pr-lg-5">
                            <h3>Best Products</h3>
                            <p>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Iure, impedit?
                            </p>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <img
                            src="/img/svg/products.svg"
                            alt=""
                            class="img-fluid"
                        />
                    </div>
                </div>
            </section>

            <hr />

            <section class="product-test px-md-4 section-padd-40">
                <h3>Basic CRUD in Firebase and Vue.</h3>
                <form class="form">
                    <div class="form-group">
                        <input
                            type="text"
                            placeholder="Product Name"
                            class="form-control"
                            required
                            v-model="product.name"
                        />
                    </div>
                    <div class="form-group">
                        <input
                            type="text"
                            placeholder="Price"
                            class="form-control"
                            required
                            v-model="product.price"
                        />
                    </div>
                    <div class="form-group">
                        <button
                            class="btn btn-primary"
                            :disabled="isInValid"
                            @click.prevent="saveData"
                        >
                            Save Data
                        </button>
                    </div>
                </form>

                <h3>Product list</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(product, index) in products" :key="index">
                            <td>{{ product.name }}</td>
                            <td>{{ product.price }}</td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </div>
    </div>
</template>

<script>
import { db } from "../firebase";
// import "@/mixins";

export default {
    data() {
        return {
            products: [],
            product: {
                name: null,
                price: null,
            },
        };
    },
    computed: {
        isInValid() {
            return this.product.name == null || this.product.price == null;
        },
    },
    methods: {
        saveData() {
            db.collection("products")
                .add(this.product)
                .then((docRef) => {
                    console.log("Document written with ID: ", docRef.id);

                    // this.resetFormData();
                })
                .catch((error) => {
                    console.error("Error adding document: ", error);
                });

            // this.product = {
            //     name: null,
            //     price: null,
            // };
        },
        readData() {
            db.collection("products")
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        // doc.data() is never undefined for query doc snapshots
                        // console.log(doc.id, " => ", doc.data());

                        this.products.push(doc.data());
                    });
                });
        },
    },
    created() {
        this.readData();
    },
};
</script>

<style scoped lang="scss">
h3 {
    margin-bottom: 20px;
}
.form {
    max-width: 600px;
}
@media screen and (max-width: 426px) {
    .left-content {
        padding: 0 20px 30px;
    }
}
</style>
