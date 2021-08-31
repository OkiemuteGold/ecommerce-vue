<template>
    <div class="overview-container pb-5">
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
                <form class="add-product-form" @submit.prevent="addProduct">
                    <div class="form-group">
                        <input
                            type="text"
                            placeholder="Product Name"
                            class="form-control"
                            required
                            @input="checkForm"
                            v-model="name"
                        />
                    </div>
                    <div class="form-group">
                        <input
                            type="text"
                            placeholder="Price"
                            class="form-control"
                            required
                            @input="checkForm"
                            v-model="price"
                        />
                    </div>
                    <div class="form-group">
                        <button
                            class="btn btn-primary"
                            :disabled="isInValid"
                            type="submit"
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
                        <tbody v-if="products && products.length > 0">
                            <!-- {{
                                products
                            }} -->
                            <tr
                                v-for="(product, index) in products"
                                :key="index"
                            >
                                <th>{{ (index += 1) }}</th>
                                <td>
                                    {{ product.name }}
                                </td>
                                <td>
                                    {{ product.price }}
                                </td>
                                <td>
                                    <i
                                        class="fas fa-edit text-primary"
                                        @click="editProduct(product)"
                                    ></i>

                                    <i
                                        class="fas fa-trash-alt text-danger"
                                        @click="deleteProduct(products.id)"
                                    ></i>
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
                    <div
                        class="modal-body pt-md-4 pb-md-2"
                        v-if="activeProduct"
                    >
                        <form class="modal-form">
                            <div class="form-group">
                                <input
                                    type="text"
                                    placeholder="Product Name"
                                    class="form-control"
                                    v-model="activeProduct.name"
                                />
                            </div>
                            <div class="form-group">
                                <input
                                    type="text"
                                    placeholder="Price"
                                    class="form-control"
                                    v-model="activeProduct.price"
                                />
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button
                            type="button"
                            class="btn btn-secondary"
                            @click="resetProduct"
                        >
                            Reset
                        </button>
                        <!-- <button
                            type="button"
                            class="btn btn-primary"
                            @click="updateProduct(activeProduct)"
                        >
                            Update
                        </button> -->
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
            id: 0,
            name: null,
            price: null,
            products: null,
            product: {
                name: null,
                price: null,
            },
            activeProduct: null,
            isInValid: true,
        };
    },
    computed: {},
    methods: {
        // productUpdateWatcher() {
        //     db.collection("products").onSnapshot((querySnapshot) => {
        //         let updatedProducts = (this.products = []);
        //         querySnapshot.forEach((doc) => {
        //             updatedProducts.push(doc);
        //         });
        //         // console.log(
        //         //     "Current products are: ",
        //         //     updatedProducts.join(", ")
        //         // );
        //     });
        // },

        checkForm: function () {
            if (!this.name || !this.price) {
                this.isInValid = true;
                return;
            }

            this.isInValid = false;
        },

        addProduct() {
            let newData = {
                name: this.name,
                price: this.price,
            };
            console.log(newData);
            db.collection("products")
                .add(newData)
                .then((docRef) => {
                    docRef;
                    this.name = "";
                    this.price = "";
                    // console.log("Document written with ID: ", docRef.id);

                    // this.resetFormData();
                })
                .catch((error) => {
                    error;
                    // console.error("Error adding document: ", error);
                });

            // this.product = {
            //     name: null,
            //     price: null,
            // };
        },

        readProduct() {
            let allProducts = [];

            db.collection("products").onSnapshot((querySnapshot) => {
                querySnapshot.docs.map((doc) => {
                    let singleProduct = {
                        id: doc.id,
                        name: doc.data().name,
                        price: doc.data().price,
                    };

                    allProducts.push(singleProduct);
                });

                this.products = this.eliminateDuplicateId(allProducts);
                console.log(this.products);
                // console.log(
                //     "Current products are: ",
                //     updatedProducts.join(", ")
                // );
            });
            // db.collection("products")
            //     .get()
            //     .then((querySnapshot) => {
            //         querySnapshot.forEach((doc) => {
            //             // doc.data() is never undefined for query doc snapshots
            //             // console.log(doc.id, " => ", doc.data())

            //         });

            //     });
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
            // this.product = product.data();
            this.activeProduct = product;
            // this.id = product.id;
            // this.name = product.name;
            // this.price = product.price;

            if (this.activeProduct) {
                console.log(this.activeProduct);
                $("#editModal").modal("show");
            }

            // console.log(product);
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

        // updateProduct() {
        //     var updatedProduct = db
        //         .collection("products")
        //         .doc(this.activeProduct);

        //     return updatedProduct
        //         .update(this.product)
        //         .then(() => {
        //             $("#editModal").modal("hide");
        //             console.log("Document successfully updated!");
        //         })
        //         .catch((error) => {
        //             console.error("Error updating document: ", error);
        //         });
        // },

        resetProduct() {
            console.log(this.products);
            // let productId = this.activeProduct.id;
            // let newData = {
            //     id: this.id,
            //     name: this.name,
            //     price: this.price,
            // };

            let singleProduct = this.products.find(
                (product) => product.id === this.activeProduct.id
            );

            if (singleProduct) {
                this.activeProduct = singleProduct;
            }

            // let valInput = $(".modal-form input").val();
            // console.log(valInput);

            console.log(singleProduct);
            console.log(this.activeProduct);
            // console.log(product);
        },

        eliminateDuplicateId(arr) {
            return arr
                .map((e) => e["id"])
                .map((e, i, final) => final.indexOf(e) === i && i)
                .filter((obj) => arr[obj])
                .map((e) => arr[e]);
        },
    },
    // created() {

    // },
    mounted() {
        this.readProduct();
        // this.productUpdateWatcher();
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

tbody tr td i {
    font-size: 1.05rem;
    margin-left: 0.4rem;
    margin-right: 0.4rem;
    transition: 0.3s ease-in;
}

tbody tr td i:hover {
    cursor: pointer;
    transform: scale(1.1);
}

@media screen and (max-width: 426px) {
    .left-content {
        padding: 0 20px 30px;
    }
}
</style>
