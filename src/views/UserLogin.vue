<template>
    <div class="user-login main-form">
        <main>
            <div class="header">
                <router-link to="/" class="nav-link">Home </router-link>
            </div>

            <div class="welcome-text">
                <h1>Welcome to <span>Vue</span> <span>Store</span></h1>
                <hr />
                <p>Login or Signup to continue</p>
            </div>

            <ul
                class="nav nav-tabs nav-pills nav-justified pb-3"
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

            <div class="tab-content" id="pills-tabContent">
                <div
                    class="tab-pane fade show active"
                    id="pills-home"
                    role="tabpanel"
                    aria-labelledby="pills-home-tab"
                >
                    <form v-if="!isForgotPassword">
                        <div class="form-group mb-3">
                            <label for="loginEmail" class="form-label"
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
                            <label for="loginPassword" class="form-label"
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
                            <div id="passwordHelp" class="form-text">
                                Password must be 8-20 characters long, and must
                                contain letters and numbers.
                            </div>
                        </div>

                        <div class="mb-3 form-check">
                            <input
                                type="checkbox"
                                class="form-check-input"
                                id="rememberCheck"
                            />
                            <label class="form-check-label" for="rememberCheck"
                                >Keep me signed in</label
                            >
                        </div>

                        <button
                            type="submit"
                            class="btn"
                            :disabled="!isValid"
                            @click.prevent="login(form.email, form.password)"
                        >
                            Login
                        </button>

                        <button
                            class="btn border-0 text-decoration-underline mt-3"
                            @click.prevent="isForgotPassword = true"
                        >
                            Forgot password?
                        </button>
                    </form>

                    <form v-if="isForgotPassword">
                        <div class="form-group mb-3">
                            <label for="loginEmail" class="form-label"
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
                                Please input the email you used to signup
                            </div>
                        </div>

                        <button
                            type="submit"
                            class="btn"
                            :disabled="!form.email"
                            @click.prevent="recoverPassword(form.email)"
                        >
                            Recover Password
                        </button>

                        <button
                            class="btn border-0 text-decoration-underline mt-3"
                            @click.prevent="isForgotPassword = false"
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
                    <form>
                        <div class="form-group mb-3">
                            <label for="nameInput" class="form-label"
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
                            <label for="signupEmail" class="form-label"
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
                                We'll never share your email with anyone else.
                            </div>
                        </div>

                        <div class="form-group mb-3">
                            <label for="signupPassword" class="form-label"
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
                            <div id="passwordHelp" class="form-text">
                                Password must be 8-20 characters long, and must
                                contain letters and numbers.
                            </div>
                        </div>

                        <div class="mb-3 form-check">
                            <input
                                type="checkbox"
                                class="form-check-input"
                                id="agreeCheck"
                                v-model="hasAgreedToTerms"
                            />
                            <label class="form-check-label" for="agreeCheck"
                                >Agree to terms and conditions</label
                            >
                        </div>

                        <button
                            type="submit"
                            class="btn"
                            :disabled="
                                !isValid || !form.fullName || !hasAgreedToTerms
                            "
                            @click.prevent="
                                registerUser(form.email, form.password)
                            "
                        >
                            Signup
                        </button>
                    </form>
                </div>
            </div>
        </main>
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
.user-login {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;
    background: rgba(0, 0, 0, 0.75);
}

main {
    max-width: 700px;
    max-height: 630px;
    height: 100%;
    overflow-y: auto;
    padding: 50px 60px;
    background: rgba(0, 0, 0, 0.25);
    color: #fff;
    border-radius: 3px;
    position: relative;
}

.header {
    position: absolute;
    top: 0;
    left: 0;

    a {
        border-radius: 3px 0 3px 0;
        background: #fff;
        color: var(--customBlue);
    }
}

.welcome-text {
    padding-bottom: 1.5rem;
    text-align: center;

    h1 {
        font-size: 35px;
        margin-bottom: 1.5rem;
        text-shadow: 0.5px 0.5px 1px var(--customParaText);
        letter-spacing: 0.5px;
    }

    p {
        color: #fff;
        font-size: 16px;
    }
}

.tab-content {
    margin-top: 1.75rem;
}

@media screen and (min-width: 1092px) {
    main {
        max-height: 700px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
}

@media screen and (max-width: 426px) {
    main {
        padding: 50px 20px;
    }

    .header {
        a {
            padding: 0.25rem 0.5rem;
        }
    }

    .welcome-text {
        h1 {
            font-size: 24px;
        }
        p {
            font-size: 13px;
        }
    }

    label {
        font-size: 13px !important;
    }
}
</style>
