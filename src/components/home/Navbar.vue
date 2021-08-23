<template>
    <div class="container">
        <nav class="navbar navbar-expand-lg navbar-light">
            <div class="container-fluid">
                <router-link to="/" class="navbar-brand"
                    ><span>Vue</span>-<span>Store</span></router-link
                >

                <button
                    class="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div
                    class="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <router-link to="/" class="nav-link"
                                >Home
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/about" class="nav-link"
                                >About
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/about" class="nav-link"
                                >Products
                            </router-link>
                        </li>
                    </ul>
                    <form
                        class="
                            form-inline
                            d-flex
                            flex-column flex-lg-row
                            align-items-start align-items-lg-center
                        "
                    >
                        <!-- <span>&#128269;</span> -->
                        <input
                            class="form-control me-2"
                            type="search"
                            placeholder="Search products..."
                            aria-label="Search"
                        />
                        <a
                            class="btn btn-success mt-3 mt-lg-0"
                            data-bs-toggle="modal"
                            data-bs-target="#loginModal"
                        >
                            Get Started
                        </a>
                    </form>

                    <Login />
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
import Login from "../Login.vue";
export default {
    components: { Login },
};
</script>

<style scoped lang="scss">
.navbar {
    padding-top: 1rem;
    padding-bottom: 1rem;
}

.header-sticky {
    background: var(--customSectionBg);
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.075);
}

.nav-item {
    position: relative;

    &:hover > .nav-link:after {
        width: 60%;
    }
}

.nav-link:after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    bottom: 0;
    width: 0%;
    height: 3.2px;
    // border-radius: 50px 0 50px 0;
    border-radius: 0 0 50px 50px;
    background: rgba(0, 0, 0, 0.55);
    transition: 0.5s ease;
}

.btn {
    color: #fff !important;

    &:hover {
        background: transparent;
        border-color: #198754;
        color: #198754 !important;
    }
}

form span {
    position: absolute;
    padding: 10px 10px 10px 8px;
    font-size: 13px;

    &:hover {
        cursor: pointer;
    }
}

input {
    min-width: 250px;
    // padding-left: 1rem;
    font-size: 15px;

    &:hover,
    &:focus {
        box-shadow: none;
        border-color: #198754;
    }
}

@media screen and (max-width: 993px) {
    .navbar-light .navbar-toggler {
        height: 40px;
        width: 40px;
        border-radius: 50%;
        transition: 0.4s ease-in;

        &:focus {
            border-color: transparent;
            box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.175);
        }
    }
    .navbar-toggler-icon {
        margin-left: -8px;
    }

    .navbar-collapse {
        background: #eaeaea;
        padding: 25px 25px 35px;
        margin: 10px;
        border-radius: 5px;
    }

    .nav-item {
        padding-left: 5px;

        &:hover > .nav-link:after {
            height: 60% !important;
        }
    }

    .nav-link:after {
        left: -100%;
        top: 0;
        width: 3.2px !important;
        height: 0% !important;
        border-radius: 50px 0 0 50px;
    }
}

@media screen and (max-width: 376px) {
    .navbar-collapse {
        padding: 20px 15px 30px;
        margin: 10px 0;
    }

    input {
        min-width: 200px;
    }
}
</style>
