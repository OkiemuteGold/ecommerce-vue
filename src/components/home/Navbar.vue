<template>
    <div class="container">
        <nav class="navbar navbar-expand-lg navbar-light">
            <div class="container-fluid">
                <a class="navbar-brand" href="#"
                    ><span>Vue</span>-<span>Store</span></a
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
                            align-items-start
                        "
                    >
                        <input
                            class="form-control me-2"
                            type="search"
                            placeholder="Search"
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
        display: block;
    }
}

.nav-link:after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    bottom: 0;
    width: 60%;
    height: 3.2px;
    border-radius: 50px 50px 0 0;
    background: rgba(0, 0, 0, 0.55);
    display: none;
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

input:hover,
input:focus {
    box-shadow: none;
    border-color: #198754;
}
</style>
