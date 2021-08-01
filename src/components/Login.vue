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
                                Login
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

                    <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    ></button>

                    <div class="modal-body px-md-5 py-md-4">
                        <div class="tab-content" id="pills-tabContent">
                            <div
                                class="tab-pane fade show active"
                                id="pills-home"
                                role="tabpanel"
                                aria-labelledby="pills-home-tab"
                            >
                                <p>Please login to your account</p>

                                <form>
                                    <div class="mb-3">
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
                                        />
                                    </div>

                                    <div class="mb-3">
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
                                            >Remember me</label
                                        >
                                    </div>
                                    <button type="submit" class="btn">
                                        Login
                                    </button>
                                </form>
                            </div>
                            <div
                                class="tab-pane fade"
                                id="pills-profile"
                                role="tabpanel"
                                aria-labelledby="pills-profile-tab"
                            >
                                <p>Create an account</p>

                                <form>
                                    <div class="mb-3">
                                        <label
                                            for="nameInput"
                                            class="form-label"
                                            >Your name</label
                                        >
                                        <input
                                            type="text"
                                            class="form-control"
                                            id="nameInput"
                                        />
                                    </div>

                                    <div class="mb-3">
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
                                        />
                                        <div id="emailHelp" class="form-text">
                                            We'll never share your email with
                                            anyone else.
                                        </div>
                                    </div>

                                    <div class="mb-3">
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
                                    <button type="submit" class="btn">
                                        Signup
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
export default {};
</script>

<style scoped lang="scss">
.nav-pills .nav-link {
    text-transform: uppercase;
    color: var(--customBlue);

    &:not(.nav-link.active):hover {
        color: var(--customBlueLight);
        background: rgba(0, 0, 0, 0.1);
    }
}

.nav-pills .nav-link.active {
    background: var(--customBlue);
}

.modal-content {
    background: rgba(0, 0, 0, 0.7);
    color: var(--customSectionBg);
    border-top-right-radius: 0;
    font-weight: 300;

    p {
        color: var(--customSectionBg);
        font-size: 16px;
        text-shadow: 1px 0.5px 1px #f1f1f1;
        letter-spacing: 1.5px;
    }

    .form-text {
        color: var(--customParaText);
        font-style: italic;
        margin-top: 10px;
    }
}

.tab-content p {
    text-align: center;
    margin-bottom: 1.25rem;
    text-transform: capitalize;
}

.form-check-input:checked {
    background-color: var(--customYellow);
    border-color: var(--customYellow);
}

form button {
    background: transparent;
    color: var(--customBlueLight);
    border-color: var(--customBlue);
    width: 100%;

    &:hover,
    &:active,
    &:focus {
        box-shadow: none;
        background: var(--customBlue);
        color: #fff;
    }
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
