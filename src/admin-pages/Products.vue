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
                    <tbody v-else>
                        <div class="mt-3">
                            <h4 class="mb-0">No product available!</h4>
                            <p class="mb-0">
                                You have not uploaded any product yet. Please
                                upload some products.
                            </p>
                        </div>
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
                            <div class="col-lg-7 col-xl-8">
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
                            <div class="col-lg-5 col-xl-4">
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
                                        product.images.length > 0
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
import { Swal, Toast } from "sweetalert2";

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

            $(".tags").show("slow");
            $(".tag-error").hide("slow");
        },

        addProduct() {
            this.$firestore.products.add(this.product);

            const payload = {
                icon: "success",
                title: `${this.product.name} added sucessfully!`,
                text: null,
            };

            this.notificationToast(payload);
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
                    let statusMessage;
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

                    // console.log("Upload is " + progress + "% done");
                    // statusMessage = "Upload is " + progress + "% done";

                    Toast.fire({
                        icon: "success",
                        title: statusMessage,
                        text: "Upload is " + progress + "% done",
                        position: "top-end",
                        showConfirmButton: true,
                        showDenyButton: true,
                        confirmButtonText: "Pause",
                        denyButtonText: `Resume`,
                        timer: progress,
                        timerProgressBar: true,
                    }).then((result) => {
                        if (result.isConfirmed) {
                            snapshot.state = "paused";
                        } else if (result.isDenied) {
                            snapshot.state = "running";
                        }

                        switch (snapshot.state) {
                            case "paused":
                                // console.log("Upload is paused");
                                statusMessage = "Upload is paused";
                                break;
                            case "running":
                                // console.log("Upload is running");
                                statusMessage = "Upload is running";
                                break;
                        }
                    });
                },
                (error) => {
                    // console.log(error);

                    const payload = {
                        icon: "error",
                        title: "Image Upload Failed!",
                        text: error.message,
                    };
                    this.notificationToast(payload);
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

        // deleteImage() {},

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
    font-size: 13px;
    margin-bottom: 5px;
}

.tags {
    display: flex;
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
    flex-direction: column-reverse;
    flex-wrap: wrap;
    justify-content: start;
    width: 100%;
    margin: 0 8px 0 0;

    .delete-img {
        background: var(--customSectionBg);
        color: var(--customText);
        width: 22px;
        height: 22px;
        line-height: 22px;
        margin-left: auto;
        border-radius: 100%;
        text-align: center;
    }

    & img {
        max-height: 160px;
        -o-object-fit: cover;
        object-fit: cover;
        -o-object-position: top;
        object-position: top;
        padding: 5px 8px 0;
    }
}
</style>
