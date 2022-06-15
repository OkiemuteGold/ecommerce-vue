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
                    @click="openAddProductModal('add')"
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
                            <span v-if="modal == 'add'">Add New Product</span>
                            <span v-if="modal == 'edit'">
                                Edit Product Details
                            </span>
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
                                        placeholder="Enter product price"
                                        v-model="product.price"
                                        @input="checkForm"
                                    />
                                </div>

                                <div class="form-group">
                                    <p class="tag-instruction">
                                        Add comma (,) after each tag to add
                                        multiple tags
                                    </p>

                                    <input
                                        type="text"
                                        class="form-control"
                                        placeholder="Enter tags"
                                        title="Add comma (,) after each tag to add multiple tags"
                                        v-model="tagInput"
                                        @keyup.188="addTag"
                                        @input="checkForm"
                                    />

                                    <div
                                        class="tags"
                                        v-if="
                                            product.tags &&
                                            product.tags.length > 0
                                        "
                                    >
                                        <p
                                            v-for="(tag, index) in product.tags"
                                            :key="index"
                                        >
                                            {{ tag | capitalizeFirstLetter }}
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
                            @click="updateProduct"
                            :disabled="isInValid"
                            v-if="modal == 'edit'"
                        >
                            Update Details
                        </button>
                        <button
                            type="button"
                            class="btn btn-primary"
                            @click="addProduct"
                            :disabled="isInValid"
                            v-if="modal == 'add'"
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
                tags: null,
                image: null,
            },
            tagInput: null,
            tagsArray: [],
            isUpdateDetailsBtnClicked: false,
            originalProductDetails: {},
            isInValid: true,
            modal: null,

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
                !this.tagInput;

            if (checkParams && this.tagsArray.length == 0) {
                this.isInValid = true;
                return;
            }
            this.isInValid = false;
        },

        // closeModal() {
        //     if (!this.isUpdateDetailsBtnClicked && this.modal == "edit") {
        //         this.product = this.originalProductDetails;
        //         console.log(
        //             this.products,
        //             this.originalProductDetails,
        //             this.isUpdateDetailsBtnClicked
        //         );
        //     }
        // },

        openAddProductModal(mode) {
            this.resetProductDetails();
            this.modal = mode;
            $("#addProductModal").modal("show");
        },

        addProduct() {
            this.product.tags = this.tagsArray;
            this.$firestore.products.add(this.product);

            const payload = {
                icon: "success",
                title: `${this.product.name} added sucessfully!`,
                text: null,
            };
            this.notificationToast(payload);

            this.resetProductDetails();
        },

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
                    this.$firestore.products.doc(product.id).delete();

                    // Swal.fire(`${product.name} has been deleted.`, "success");
                    const payload = {
                        icon: "success",
                        title: `${product.name} has been deleted!`,
                        text: null,
                    };
                    this.notificationToast(payload);
                }
            });
        },

        updateProduct() {
            console.log(this.product);
            // this.addTag();
            this.$firestore.products.doc(this.product.id).update(this.product);
            this.resetProductDetails();
            $("#addProductModal").modal("hide");

            const payload = {
                icon: "success",
                title: "Product details updated sucessfully!",
                text: null,
            };
            this.notificationToast(payload);
            // this.isUpdateDetailsBtnClicked = true;
        },

        editProduct(product) {
            this.openAddProductModal("edit");
            this.product = product;
            // this.originalProductDetails = product;
        },

        uploadImage() {},

        deleteImage() {},

        addTag() {
            this.tagsArray.push(this.removeComma(this.tagInput));

            if (this.tagsArray && this.tagsArray.length > 0) {
                this.product.tags = this.tagsArray;

                console.log(typeof this.tagsArray);
                console.log(this.product.tags);
            }

            this.tagInput = "";
        },
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

input {
    font-size: 0.875rem;

    &::placeholder {
        font-style: italic;
    }
}

.tag-instruction {
    font-size: 0.75rem;
    margin-bottom: 5px;
}

.tags {
    display: flex;
    flex-wrap: wrap;

    & p {
        font-size: 0.75rem;
        padding: 2px 6px;
        margin: 8px 2px 2px;
        background: var(--customSectionBg);
        color: var(--customText);
        border-radius: 4px;
    }
}
</style>
