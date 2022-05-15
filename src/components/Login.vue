<template>
    <div class="login">
        <div
            class="modal fade"
            id="loginModal"
            tabindex="-1"
            aria-labelledby="loginModalLabel"
            aria-hidden="true"
        >
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content py-2">
                    <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    ></button>

                    <ul
                        class="
                            nav nav-tabs nav-pills nav-justified
                            px-md-5
                            py-md-4
                        "
                        id="pills-tab"
                        role="tablist"
                    >
                        <li class="nav-item" role="presentation">
                            <button
                                class="nav-link active"
                                id="pills-home-tab"
                                data-bs-toggle="pill"
                                data-bs-target="#pills-home"
                                type="button"
                                role="tab"
                                aria-controls="pills-home"
                                aria-selected="true"
                            >
                                <span v-if="!isForgotPassword">Login</span>
                                <span v-else>Forgot Password</span>
                            </button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button
                                class="nav-link"
                                id="pills-profile-tab"
                                data-bs-toggle="pill"
                                data-bs-target="#pills-profile"
                                type="button"
                                role="tab"
                                aria-controls="pills-profile"
                                aria-selected="false"
                            >
                                Signup
                            </button>
                        </li>
                    </ul>

                    <div class="modal-body px-md-5 py-md-4">
                        <div class="tab-content" id="pills-tabContent">
                            <div
                                class="tab-pane fade show active"
                                id="pills-home"
                                role="tabpanel"
                                aria-labelledby="pills-home-tab"
                            >
                                <p v-if="!isForgotPassword">Please login</p>
                                <p v-else>Recover Password</p>

                                <form v-if="!isForgotPassword">
                                    <div class="form-group mb-3">
                                        <label
                                            for="loginEmail"
                                            class="form-label"
                                            >Email address</label
                                        >
                                        <input
                                            type="email"
                                            class="form-control"
                                            id="loginEmail"
                                            aria-describedby="emailHelp"
                                            placeholder="Enter your email"
                                            v-model="form.email"
                                        />
                                    </div>

                                    <div class="form-group mb-3">
                                        <label
                                            for="loginPassword"
                                            class="form-label"
                                            >Password</label
                                        >
                                        <input
                                            type="password"
                                            class="form-control"
                                            id="loginPassword"
                                            aria-describedby="passwordHelp"
                                            placeholder="Enter your password"
                                            v-model="form.password"
                                        />
                                        <div
                                            id="passwordHelp"
                                            class="form-text"
                                        >
                                            Password must be 8-20 characters
                                            long, and must contain letters and
                                            numbers.
                                        </div>
                                    </div>

                                    <div class="mb-3 form-check">
                                        <input
                                            type="checkbox"
                                            class="form-check-input"
                                            id="rememberCheck"
                                        />
                                        <label
                                            class="form-check-label"
                                            for="rememberCheck"
                                            >Keep me signed in</label
                                        >
                                    </div>
                                    <button
                                        type="submit"
                                        class="btn"
                                        @click.prevent="login"
                                    >
                                        Login
                                    </button>

                                    <button
                                        class="
                                            btn
                                            border-0
                                            text-decoration-underline
                                            mt-3
                                        "
                                        @click.prevent="isForgotPassword = true"
                                    >
                                        Forgot password?
                                    </button>
                                </form>

                                <form v-if="isForgotPassword">
                                    <div class="form-group mb-3">
                                        <label
                                            for="loginEmail"
                                            class="form-label"
                                            >Email address</label
                                        >
                                        <input
                                            type="email"
                                            class="form-control"
                                            id="loginEmail"
                                            aria-describedby="emailHelp"
                                            placeholder="Enter email address"
                                            v-model="form.email"
                                        />

                                        <div
                                            id="passwordHelp"
                                            class="form-text"
                                        >
                                            Sorry, {{ form.email }} has not been
                                            registered.
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        class="btn"
                                        @click.prevent="recoverPassword"
                                    >
                                        Recover Password
                                    </button>

                                    <button
                                        class="
                                            btn
                                            border-0
                                            text-decoration-underline
                                            mt-3
                                        "
                                        @click.prevent="
                                            isForgotPassword = false
                                        "
                                    >
                                        Back to Login
                                    </button>
                                </form>
                            </div>
                            <div
                                class="tab-pane fade"
                                id="pills-profile"
                                role="tabpanel"
                                aria-labelledby="pills-profile-tab"
                            >
                                <p>Create a new account</p>

                                <form>
                                    <div class="form-group mb-3">
                                        <label
                                            for="nameInput"
                                            class="form-label"
                                            >Your name</label
                                        >
                                        <input
                                            type="text"
                                            class="form-control"
                                            id="nameInput"
                                            placeholder="Enter your full name"
                                            v-model="form.fullname"
                                        />
                                    </div>

                                    <div class="form-group mb-3">
                                        <label
                                            for="signupEmail"
                                            class="form-label"
                                            >Email address</label
                                        >
                                        <input
                                            type="email"
                                            class="form-control"
                                            id="signupEmail"
                                            aria-describedby="emailHelp"
                                            placeholder="Enter your email"
                                            v-model="form.email"
                                        />
                                        <div id="emailHelp" class="form-text">
                                            We'll never share your email with
                                            anyone else.
                                        </div>
                                    </div>

                                    <div class="form-group mb-3">
                                        <label
                                            for="signupPassword"
                                            class="form-label"
                                            >Password</label
                                        >
                                        <input
                                            type="password"
                                            class="form-control"
                                            id="signupPassword"
                                            aria-describedby="passwordHelp"
                                            placeholder="Enter your password"
                                            v-model="form.password"
                                        />
                                        <div
                                            id="passwordHelp"
                                            class="form-text"
                                        >
                                            Password must be 8-20 characters
                                            long, and must contain letters and
                                            numbers.
                                        </div>
                                    </div>

                                    <div class="mb-3 form-check">
                                        <input
                                            type="checkbox"
                                            class="form-check-input"
                                            id="agreeCheck"
                                        />
                                        <label
                                            class="form-check-label"
                                            for="agreeCheck"
                                            >Agree to terms and
                                            conditions</label
                                        >
                                    </div>
                                    <button
                                        type="submit"
                                        class="btn"
                                        @click.prevent="registerUser"
                                    >
                                        Signup
                                        <!-- <span
                                            class="spinner spinner-border"
                                        ></span> -->
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import $ from "jquery";
import "@/mixins";
import { fbase } from "../firebase";

export default {
    data() {
        return {
            form: {
                fullname: null,
                email: null,
                password: null,
            },

            isForgotPassword: false,
        };
    },

    // computed: {
    //     isInvalid() {
    //         return (
    //             this.form.fullname == null ||
    //             this.form.email == null ||
    //             this.form.password == null
    //         );
    //     },
    // },

    methods: {
        login() {
            fbase
                .auth()
                .signInWithEmailAndPassword(this.form.email, this.form.password)
                .then(() => {
                    $("#loginModal").modal("hide");
                    this.$router.replace("/admin");
                })
                .catch(function (error) {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    if (errorCode === "auth/wrong-password") {
                        alert("Wrong password.");
                    } else {
                        alert(errorMessage);
                    }
                    console.log(error);
                });
        },

        registerUser() {
            fbase
                .auth()
                .createUserWithEmailAndPassword(
                    this.form.email,
                    this.form.password
                )
                .then(() => {
                    $("#loginModal").modal("hide");
                    // clear field only when its successful
                    this.resetFormData();
                    this.$router.replace("admin");
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    if (errorCode == "auth/weak-password") {
                        alert("The password is too weak.");
                    } else {
                        alert(errorMessage);
                    }
                    console.log(error);
                });

            // this.form = {
            //     fullname: null,
            //     email: null,
            //     password: null,
            // };
        },

        recoverPassword() {
            fbase
                .auth()
                .sendPasswordResetEmail(this.form.email)
                .then(() => {
                    alert("Password reset email sent!");
                    console.log(this.form.email);
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;

                    console.log(errorCode, errorMessage);
                });
        },
    },
};
</script>

<style scoped lang="scss">
.nav-pills .nav-link {
    text-transform: uppercase;
    color: var(--customBlue);

    &:not(.nav-link.active):hover {
        color: var(--customBlueLight);
        background: rgba(0, 0, 0, 0.125);
    }
}

.nav-pills .nav-link.active {
    background: var(--customBlue);
}

.tab-content p {
    text-align: center;
    text-transform: capitalize;
    margin-bottom: 1.25rem;
}

.modal-content {
    background: rgba(0, 0, 0, 0.75);
    color: #fff;
    border-top-right-radius: 0;

    p {
        color: #fff;
        font-size: 18px;
        text-shadow: 0.5px 0.5px 1px var(--customParaText);
        letter-spacing: 1px;
    }
}

form {
    label {
        font-size: 15px;
    }

    input,
    input::placeholder {
        font-size: 13px;
    }

    .form-text {
        color: var(--customParaText);
        font-style: italic;
        font-size: 12px;
        margin-top: 10px;
    }
}

.form-check-input:checked {
    background-color: var(--customBlue);
    border-color: var(--customBlue);
}

form button {
    margin-top: 10px;
    background: transparent;
    color: var(--customBlueLight);
    border-color: var(--customBlue);
    width: 100%;

    &.text-decoration-underline {
        padding: 2px;
    }

    &:not(.text-decoration-underline):hover,
    &:not(.text-decoration-underline):active,
    &:not(.text-decoration-underline):focus {
        box-shadow: none;
        background: var(--customBlue);
        color: #fff;
    }

    &.text-decoration-underline:hover {
        color: var(--customBlueLight);
        text-decoration: none !important;
    }

    &.disabled {
        opacity: 0.5;
    }
}

.spinner {
    width: 15px;
    height: 15px;
    margin-left: 8px;
}

.btn-close {
    // margin: 0 0 1rem auto;
    position: absolute;
    right: -2.35rem;
    top: -1px;
    border: 2px solid var(--customText);
    border-left: none;
    border-radius: 0 20px 20px 0;
    // right: -2.5rem;
    // top: -1.5rem;
    // border: 1px solid var(--customText);
    // border-radius: 50%;
    padding: 10px 15px 10px 5px;
}
</style>
