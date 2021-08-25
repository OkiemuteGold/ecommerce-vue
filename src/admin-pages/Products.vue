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

            <!-- Save product form -->
            <section class="product-test px-md-4 section-padd-40">
                <h3>Basic CRUD in Firebase and Vue.</h3>
                <form class="add-product-form">
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
                            @click.prevent="addProduct"
                        >
                            Add Product
                        </button>
                    </div>
                </form>

                <h3>Product list</h3>
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Modify</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="(product, index) in products"
                                :key="index"
                            >
                                <th>{{ (index += 1) }}</th>
                                <td>
                                    {{ product.data().name }}
                                </td>
                                <td>
                                    {{ product.data().price }}
                                </td>
                                <td>
                                    <!-- <button
                                        class="btn btn-primary"
                                        data-bs-toggle="modal"
                                        data-bs-target="#editModal"
                                    > -->

                                    <button
                                        class="btn btn-primary mr-1"
                                        @click="editProduct(product)"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        class="btn btn-danger"
                                        @click="deleteProduct(product.id)"
                                    >
                                        X
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </div>

        <!-- Edit product modal -->
        <div
            class="modal fade"
            id="editModal"
            tabindex="-1"
            aria-labelledby="editModalLabel"
            aria-hidden="true"
        >
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="editModalLabel">
                            Edit Product
                        </h5>
                        <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div class="modal-body pt-md-4 pb-md-2">
                        <form>
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
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button
                            type="button"
                            class="btn btn-secondary"
                            data-bs-dismiss="modal"
                            @click.prevent="resetChanges()"
                        >
                            Reset
                        </button>
                        <button
                            type="button"
                            class="btn btn-primary"
                            @click="updateProduct()"
                        >
                            Save changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import $ from "jquery";
// import "@/mixins";

import { db } from "../firebase";

export default {
    data() {
        return {
            products: [],
            product: {
                name: null,
                price: null,
            },
            activeProduct: null,
        };
    },
    computed: {
        isInValid() {
            return this.product.name == null || this.product.price == null;
        },
    },
    methods: {
        productUpdateWatcher() {
            db.collection("products").onSnapshot((querySnapshot) => {
                let updatedProducts = (this.products = []);
                querySnapshot.forEach((doc) => {
                    updatedProducts.push(doc);
                });
                console.log(
                    "Current products are: ",
                    updatedProducts.join(", ")
                );
            });
        },

        addProduct() {
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

        readProduct() {
            db.collection("products")
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        // doc.data() is never undefined for query doc snapshots
                        // console.log(doc.id, " => ", doc.data());

                        this.products.push(doc);
                    });
                });
        },

        deleteProduct(productId) {
            if (confirm("Are you sure ?")) {
                db.collection("products")
                    .doc(productId)
                    .delete()
                    .then(() => {
                        console.log("Product deleted successfully!");
                    })
                    .catch((error) => {
                        console.log("Error removing document: ", error);
                    });
            }
        },

        editProduct(product) {
            $("#editModal").modal("show");
            this.product = product.data();
            this.activeProduct = product.id;
        },

        // async updateProduct() {
        //     let updatedProduct = db
        //         .collection("products")
        //         .doc(this.activeProduct);
        //     try {
        //         await updatedProduct.update(this.product);
        //         console.log("Document successfully updated!");

        //         $("#editModal").modal("hide");
        //     } catch (error) {
        //         console.log("Error updating document: ", error);
        //     }
        // },

        updateProduct() {
            var updatedProduct = db
                .collection("products")
                .doc(this.activeProduct);

            return updatedProduct
                .update(this.product)
                .then(() => {
                    $("#editModal").modal("hide");
                    console.log("Document successfully updated!");
                })
                .catch((error) => {
                    console.error("Error updating document: ", error);
                });
        },

        // resetChanges() {
        //     let currentProductId = this.activeProduct;
        //     console.log(currentProductId);
        // },
    },
    created() {
        this.readProduct();
    },
    mounted() {
        this.productUpdateWatcher();
    },
};
</script>

<style scoped lang="scss">
h3 {
    margin-bottom: 20px;
}

.add-product-form {
    max-width: 600px;
    margin-bottom: 40px;
}

tbody tr th,
tbody tr td {
    vertical-align: middle;
    color: var(--customText);
}

thead th {
    background-color: var(--customSectionBg);
    border-bottom-color: var(--customText) !important;
}

tbody tr:hover {
    background-color: var(--customSectionBg);
}

@media screen and (max-width: 426px) {
    .left-content {
        padding: 0 20px 30px;
    }
}
</style>
