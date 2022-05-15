<template>
    <div class="login main-form">
        <div
            class="modal fade"
            id="loginModal"
            tabindex="-1"
            aria-labelledby="loginModalLabel"
            aria-hidden="true"
        >
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content pt-4 pb-3">
                    <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    ></button>

                    <ul
                        class="
                            nav nav-tabs nav-pills nav-justified
                            p-2
                            px-md-5
                            py-md-3
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
                                <span v-else>Forgot</span>
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
                                        :disabled="!isValid"
                                        @click.prevent="
                                            login(form.email, form.password)
                                        "
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
                                            v-if="!form.email"
                                        >
                                            <!-- Sorry, {{ form.email }} has not been registered. -->
                                            Please input the email you used to
                                            signup
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        class="btn"
                                        :disabled="!form.email"
                                        @click.prevent="
                                            recoverPassword(form.email)
                                        "
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
                                            v-model="form.fullName"
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
                                            v-model="hasAgreedToTerms"
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
                                        :disabled="
                                            !isValid ||
                                            !form.fullName ||
                                            !hasAgreedToTerms
                                        "
                                        @click.prevent="
                                            registerUser(
                                                form.email,
                                                form.password
                                            )
                                        "
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
import "@/mixins";

export default {
    data() {
        return {
            form: {
                fullName: "",
                email: "",
                password: "",
            },

            isForgotPassword: false,
            hasAgreedToTerms: false,
        };
    },
};
</script>

<style scoped lang="scss">
.tab-content p {
    text-align: center;
    text-transform: capitalize;
    margin-top: 1rem;
    margin-bottom: 1.5rem;
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

    @media screen and (max-width: 600px) {
        & {
            width: 89%;
            margin: 0 10px 0 0;
        }
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
