<template>
    <div class="container">
        <IntroComponent
            :title="title"
            :description="description"
            :imageUrl="imageUrl"
            :imageAlt="imageAlt"
        ></IntroComponent>

        <hr />

        <!-- Save product form -->
        <section class="row product-test pt-5">
            <!-- <h3>Basic CRUD in Firebase and Vue.</h3>
                <form class="add-product-form" @submit.prevent="addProduct">
                    <div class="form-group">
                        <input
                            type="text"
                            placeholder="Product Name"
                            class="form-control"
                            v-model="product.name"
                            @input="checkForm"
                        />
                    </div>
                    <div class="form-group">
                        <input
                            type="text"
                            placeholder="Price"
                            class="form-control"
                            v-model="product.price"
                            @input="checkForm"
                        />
                    </div>
                    <div class="form-group">
                        <button
                            class="btn btn-primary"
                            type="submit"
                            :disabled="isInValid"
                        >
                            Add Product
                        </button>
                    </div>
                </form> -->

            <div class="product-test-title col-12">
                <h3 class="float-left">Product list</h3>

                <button
                    class="btn btn-primary float-right"
                    @click="openAddProductModal"
                >
                    Add Product
                </button>
            </div>

            <div class="col-12 table-responsive">
                <table class="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Tag</th>
                            <th>Description</th>
                            <!-- <th>Image</th> -->
                            <th>Modify</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="(product, index) in products" :key="index">
                            <th>{{ (index += 1) }}</th>
                            <td>
                                {{ product.name }}
                            </td>
                            <td>
                                {{ product.price }}
                            </td>
                            <td>
                                {{ product.tag }}
                            </td>
                            <td class="description">
                                <span v-html="product.description"></span>
                            </td>
                            <td>
                                <i
                                    class="fas fa-edit text-primary"
                                    @click="editProduct(product)"
                                    title="edit product"
                                ></i>

                                <i
                                    class="fas fa-trash-alt text-danger"
                                    @click="deleteProduct(product)"
                                    title="delete product"
                                ></i>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>

        <!-- add product modal -->
        <div
            class="modal fade"
            id="addProductModal"
            tabindex="-1"
            aria-labelledby="addProductModalLabel"
            aria-hidden="true"
        >
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="addProductModalLabel">
                            Add New Product
                        </h5>
                        <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>

                    <div class="modal-body">
                        <div class="row">
                            <!-- main product -->
                            <div class="col-md-8">
                                <div class="form-group">
                                    <input
                                        type="text"
                                        class="form-control"
                                        placeholder="Product Name"
                                        v-model="product.name"
                                        @input="checkForm"
                                    />
                                </div>

                                <div class="form-group">
                                    <vue-editor
                                        :editorToolbar="customToolbar"
                                        placeholder="Enter product description"
                                        v-model="product.description"
                                        @input="checkForm"
                                    ></vue-editor>
                                </div>
                            </div>
                            <!-- side details -->
                            <div class="col-md-4">
                                <h5>Product Details</h5>
                                <hr />

                                <div class="form-group">
                                    <input
                                        type="text"
                                        class="form-control"
                                        placeholder="Product price"
                                        v-model="product.price"
                                        @input="checkForm"
                                    />
                                </div>

                                <div class="form-group">
                                    <input
                                        type="text"
                                        class="form-control"
                                        placeholder="Product tags"
                                        v-model="product.tag"
                                        @keyup.188="addTag"
                                        @input="checkForm"
                                    />

                                    <div class="d-flex">
                                        <p
                                            v-for="(tag, index) in product.tags"
                                            :key="index"
                                        >
                                            <span class="p-1">{{ tag }}</span>
                                        </p>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="product_image"
                                        >Product Images</label
                                    >
                                    <input
                                        type="file"
                                        class="form-control"
                                        @change="uploadImage"
                                    />
                                </div>

                                <div class="form-group d-flex">
                                    <div
                                        class="p-1"
                                        v-for="(image, index) in product.images"
                                        :key="index"
                                    >
                                        <div class="img-wrapp">
                                            <img
                                                :src="image"
                                                alt=""
                                                width="80px"
                                            />
                                            <span
                                                class="delete-img"
                                                @click="
                                                    deleteImage(image, index)
                                                "
                                                >X</span
                                            >
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="modal-footer">
                        <!-- <button
                            type="button"
                            class="btn btn-secondary"
                            @click="resetPrice || resetName"
                        >
                            Reset
                        </button> -->
                        <button
                            type="button"
                            class="btn btn-primary"
                            @click="addProduct"
                            :disabled="isInValid"
                        >
                            Add Product
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- <preLoader v-if="loading" /> -->
    </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import $ from "jquery";
import "@/mixins";
import Swal from "sweetalert2";

import { db } from "../firebase";
import IntroComponent from "../components/extra/intro-component.vue";
// import preLoader from "../components/extra/preLoader.vue";

export default {
    components: {
        VueEditor,
        IntroComponent,
        // preLoader
    },

    data() {
        return {
            title: "Best Products",
            description:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit Iure impedit.",
            imageUrl: "/img/svg/products.svg",
            imageAlt: "right product image",

            products: [],
            product: {
                name: null,
                description: null,
                price: null,
                tag: null,
                image: null,
            },
            isInValid: true,

            customToolbar: [],
            // loading: false,
        };
    },

    firestore() {
        return {
            products: db.collection("products"),
        };
    },

    methods: {
        checkForm: function () {
            const checkParams =
                !this.product.name ||
                !this.product.description ||
                !this.product.price ||
                !this.product.tag;

            if (checkParams) {
                this.isInValid = true;
                return;
            }
            this.isInValid = false;
        },

        openAddProductModal() {
            $("#addProductModal").modal("show");
        },

        addProduct() {
            this.$firestore.products.add(this.product);
            this.resetFormData();
        },

        uploadImage() {},

        deleteImage() {},

        addTag() {},

        readProduct() {},

        deleteProduct(product) {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#0d6cfd",
                cancelButtonColor: "#dc3545",
                confirmButtonText: "Yes, delete it!",
            }).then((result) => {
                if (result.isConfirmed) {
                    // console.log(product['.key']);
                    this.$firestore.products.doc(product[".key"]).delete();

                    Swal.fire(
                        "Deleted!",
                        `${product.name} has been deleted.`,
                        "success"
                    );
                }
            });
        },

        editProduct() {},

        updateProduct() {},
    },

    mounted() {},
};
</script>

<style scoped lang="scss">
// .add-product-form {
//     max-width: 600px;
//     margin-bottom: 40px;
// }

.product-test-title {
    margin-bottom: 1.5rem;

    @media screen and (max-width: 426px) {
        h3,
        button {
            float: none !important;
        }

        button {
            font-size: 0.875rem;
            margin-top: 0.5rem;
        }
    }
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

    &:hover {
        cursor: pointer;
        transform: scale(1.1);
    }
}

input::placeholder {
    font-size: 14px;
    font-style: italic;
}
</style>
