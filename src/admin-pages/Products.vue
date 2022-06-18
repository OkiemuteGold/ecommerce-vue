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

                    <tbody v-if="products && products.length > 0">
                        <tr v-for="(product, index) in products" :key="index">
                            <th>{{ (index += 1) }}</th>
                            <td>
                                {{ product.name }}
                            </td>
                            <td>
                                {{ product.price }}
                            </td>

                            <td v-if="product.tags && product.tags.length > 0">
                                <span
                                    v-for="(productTag, index) in product.tags"
                                    :key="index"
                                >
                                    {{ addHash(productTag) }}
                                </span>
                            </td>
                            <td v-else class="text-danger">(no tag)</td>

                            <td
                                class="description"
                                v-html="product.description"
                            ></td>
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

                    <div class="pt-4 px-2" v-else>
                        <h4 class="mb-3">No product available!</h4>
                        <p class="mb-0">
                            You have either not uploaded any product yet, or may
                            be experiencing some network difficulties. Please
                            check your internet connection, or upload some
                            products if otherwise.
                        </p>
                    </div>
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
                            <div class="col-lg-7">
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
                            <div class="col-lg-5">
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
                                        @input="checkForm"
                                        @change="addTag"
                                        @keyup.188="addTag"
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
                                            {{ tag }}
                                        </p>
                                    </div>

                                    <p
                                        class="
                                            tag-error
                                            font-italic
                                            text-danger
                                            mt-2
                                            mb-1
                                        "
                                    >
                                        Please enter tag before pressing a comma
                                        (,)
                                    </p>
                                </div>

                                <div class="form-group">
                                    <label for="product_image"
                                        >Product Images</label
                                    >
                                    <input
                                        type="file"
                                        class="form-control"
                                        multiple
                                        @change="uploadImage"
                                    />
                                </div>

                                <div
                                    class="form-group d-flex"
                                    v-if="
                                        product.images &&
                                        product.images.length > 0 &&
                                        statusMessage == null
                                    "
                                >
                                    <div
                                        class="img-wrapper"
                                        v-for="(image, index) in product.images"
                                        :key="index"
                                    >
                                        <img
                                            :src="image.imageUrl"
                                            :alt="image.imageName"
                                            width="95%"
                                        />
                                        <div
                                            class="delete-img"
                                            @click="deleteImage(image, index)"
                                        >
                                            X
                                        </div>
                                    </div>
                                </div>

                                <div v-else>
                                    {{ statusMessage }}
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

import { db, fbase } from "../firebase";
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
                images: null,
            },
            tagInput: null,
            tagsArray: [],

            imageObj: null,
            imageArray: [],
            statusMessage: null,

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

        notifySuccess(title, text) {
            const payload = {
                icon: "success",
                title: title,
                text: text,
            };
            this.notificationToast(payload);
        },

        notifyError(error) {
            const payload = {
                icon: "error",
                title: error.code,
                text: error.message,
            };
            this.notificationToast(payload);
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

            this.statusMessage = null;

            $(".tags").show("slow");
            $(".tag-error").hide("slow");
        },

        addProduct() {
            this.$firestore.products.add(this.product);

            let title = `${this.product.name} added sucessfully!`,
                text = null;
            this.notifySuccess(title, text);

            this.resetProductDetails();
        },

        // readProduct() {},

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

                    let title = `${product.name} has been deleted!`,
                        text = null;
                    this.notifySuccess(title, text);
                }
            });
        },

        updateProduct() {
            this.$firestore.products.doc(this.product.id).update(this.product);
            this.resetProductDetails();
            $("#addProductModal").modal("hide");

            let title = "Product details updated sucessfully!",
                text = null;
            this.notifySuccess(title, text);
            // this.isUpdateDetailsBtnClicked = true;
        },

        editProduct(product) {
            this.openAddProductModal("edit");
            this.product = product;
            // this.originalProductDetails = product;
        },

        sendToFirebaseStorage(image) {
            let productName = this.product.name;
            let imagePath = "Products/" + productName;

            let uploadedImageName = this.generateUniqueId(image.name);
            // console.log(uploadedImageName);

            var storageRef = fbase.storage().ref(imagePath);

            const metadata = {
                customMetadata: {
                    activity: `${productName} product image`,
                },
            };

            let uploadTask = storageRef
                .child(`${uploadedImageName}`)
                .put(image, metadata);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

                    this.statusMessage =
                        "Upload Status: " + Math.floor(progress) + "%";

                    if (progress == 100) {
                        let title = "Uploaded successful!",
                            text = `File: ${image.name}`;
                        this.notifySuccess(title, text);

                        this.statusMessage = null;
                    }
                },
                (error) => {
                    this.notifyError(error);
                },
                () => {
                    uploadTask.snapshot.ref
                        .getDownloadURL()
                        .then((downloadUrl) => {
                            this.imageObj = {
                                imageName: image.name,
                                imageUrl: downloadUrl,
                            };

                            this.imageArray.push(this.imageObj);

                            if (this.imageArray && this.imageArray.length > 0) {
                                this.product.images = this.imageArray;
                                // console.log(this.product.images);
                            }
                        });
                }
            );
        },

        uploadImage(event) {
            // let image = event.target.files[0];
            const images = event.target.files;

            images.forEach((image) => {
                this.sendToFirebaseStorage(image);
            });
        },

        deleteImage(img, index) {
            const image = fbase.storage().refFromURL(img.imageUrl);
            console.log(image);

            this.product.images.splice(index, 1);
            this.statusMessage = `Deleting ${img.imageName}. Please wait!`;

            image
                .delete()
                .then(() => {
                    let title = `${img.imageName} was deleted!`,
                        text = null;
                    this.notifySuccess(title, text);

                    this.statusMessage = null;
                })
                .catch((error) => {
                    this.notifyError(error);
                });
        },

        addTag() {
            this.tagsArray.push(this.removeComma(this.tagInput));
            this.isTagDisplayed();

            if (this.tagsArray && this.tagsArray.length > 0) {
                this.product.tags = this.tagsArray.filter((tag) => {
                    return tag !== "";
                });
                // console.log(this.tagsArray, this.product.tags);
            }

            this.tagInput = "";
        },

        isTagDisplayed() {
            this.tagsArray.forEach((tag) => {
                if (tag == "") {
                    $(".tags").hide();
                    $(".tag-error").show();

                    this.isInValid = true;
                } else {
                    $(".tags").show();
                    $(".tag-error").hide();

                    this.isInValid = false;
                }
            });
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

tbody tr td:first-of-type {
    text-transform: capitalize;
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
    // margin-left: 0.4rem;
    margin-right: 0.5rem;
    -o-transition: 0.3s ease-in;
    -moz-transition: 0.3s ease-in;
    -webkit-transition: 0.3s ease-in;
    transition: 0.3s ease-in;

    &:hover {
        cursor: pointer;
        -o-transform: scale(1.1);
        -ms-transform: scale(1.1);
        -moz-transform: scale(1.1);
        -webkit-transform: scale(1.1);
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
    font-size: 13px;
    margin-bottom: 5px;
}

.tags {
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;

    & p {
        font-size: 13px;
        padding: 2px 6px;
        margin: 8px 2px 2px;
        background: var(--customSectionBg);
        color: var(--customText);
        border-radius: 4px;
        text-transform: lowercase;
    }
}

.tag-error {
    font-size: 13px;
}

.img-wrapper {
    display: flex;
    -ms-flex-direction: column-reverse;
    flex-direction: column-reverse;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    justify-content: start;
    width: 50%;
    margin: 0 8px 8px 0;

    .delete-img {
        background: var(--customSectionBg);
        color: var(--customText);
        width: 22px;
        height: 22px;
        line-height: 22px;
        margin-left: auto;
        border-radius: 100%;
        text-align: center;
        cursor: pointer;

        &:hover {
            background: var(--customBlueLight);
            color: #fff;
        }
    }

    & img {
        min-height: 110px;
        max-height: 125px;
        -o-object-fit: cover;
        object-fit: cover;
        -o-object-position: top;
        object-position: top;
        padding: 8px 5px 0;
        border-radius: 20px;
        cursor: -moz-zoom-out;
        cursor: -webkit-zoom-out;
        cursor: zoom-out;
    }
}
</style>
