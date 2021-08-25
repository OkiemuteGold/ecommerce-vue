<template>
    <div class="page-wrapper default-theme sidebar-bg bg2 toggled">
        <div id="show-sidebar" class="btn btn-sm btn-dark" @click="openMenu">
            <i class="fas fa-bars"></i>
        </div>
        <nav id="sidebar" class="sidebar-wrapper">
            <div class="sidebar-content">
                <!-- sidebar-brand  -->
                <div class="sidebar-item sidebar-brand">
                    <router-link to="/admin/overview">VUE-STORE</router-link>
                    <div id="close-sidebar" @click="closeMenu">
                        <i class="fas fa-times"></i>
                    </div>
                </div>
                <!-- sidebar-header  -->
                <div class="sidebar-item sidebar-header d-flex flex-nowrap">
                    <div class="user-pic">
                        <img
                            class="img-responsive img-rounded"
                            src="/img/user.png"
                            alt="Admin picture"
                        />
                    </div>
                    <div class="user-info">
                        <span class="user-name">
                            <strong>Main Admin</strong>
                        </span>
                        <span class="user-role">Administrator</span>
                        <span class="user-status">
                            <i class="fa fa-circle"></i>
                            <span>Online</span>
                        </span>
                    </div>
                </div>
                <!-- sidebar-search  -->
                <div class="sidebar-item sidebar-search">
                    <div>
                        <div class="input-group">
                            <input
                                type="text"
                                class="form-control search-menu"
                                placeholder="Search..."
                            />
                            <div class="input-group-append">
                                <span class="input-group-text">
                                    <i
                                        class="fa fa-search"
                                        aria-hidden="true"
                                    ></i>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- sidebar-menu  -->

                <div class="sidebar-item sidebar-menu">
                    <ul>
                        <li class="header-menu">
                            <span>Menu</span>
                        </li>
                        <li>
                            <router-link to="/admin/overview">
                                <i class="fa fa-tachometer-alt"></i>
                                <span class="menu-text">Overview</span>
                            </router-link>
                        </li>

                        <!-- <li class="sidebar-dropdown">
                            <a href="#">
                                <i class="fa fa-book"></i>
                                <span class="menu-text">Products</span>
                            </a>
                            <div class="sidebar-submenu">
                                <ul>
                                    <li>
                                        <a href="#">Product1 </a>
                                    </li>
                                    <li>
                                        <a href="#">Product2</a>
                                    </li>
                                    <li>
                                        <a href="#">Product3</a>
                                    </li>
                                </ul>
                            </div>
                        </li> -->

                        <li>
                            <router-link to="/admin/products">
                                <i class="fa fa-book"></i>
                                <span class="menu-text">Products</span>
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/admin/orders" class="pr-4">
                                <i class="fa fa-shopping-cart"></i>
                                <span class="menu-text">Orders</span>
                                <span class="badge badge-pill badge-danger"
                                    >3</span
                                >
                            </router-link>
                        </li>
                        <li>
                            <a @click="logout">
                                <i class="fa fa-power-off"></i>
                                <span class="menu-text">Logout</span>
                            </a>
                        </li>
                    </ul>
                </div>
                <!-- sidebar-menu  -->
            </div>

            <!-- sidebar-footer  -->
            <div class="sidebar-footer">
                <div class="dropdown">
                    <router-link
                        to="/admin/settings"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >
                        <i class="fa fa-cog"></i>
                        <span class="badge-sonar"></span>
                    </router-link>
                </div>
            </div>
        </nav>

        <!-- page-content  -->
        <main class="page-content">
            <div class="px-2 px-md-4">
                <router-view />
            </div>
        </main>
    </div>
</template>

<script>
import $ from "jquery";

import { fbase } from "../../firebase";

export default {
    methods: {
        openMenu() {
            $(".page-wrapper").toggleClass("toggled");
        },

        closeMenu() {
            $(".page-wrapper").toggleClass("toggled");
        },

        logout() {
            fbase
                .auth()
                .signOut()
                .then(() => {
                    this.$router.replace("/");
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },

    mounted() {
        $(".sidebar-dropdown > a").click(function () {
            $(".sidebar-submenu").slideUp(200);

            if ($(this).parent().hasClass("active")) {
                $(".sidebar-dropdown").removeClass("active");
                $(this).parent().removeClass("active");
            } else {
                $(".sidebar-dropdown").removeClass("active");
                $(this).next(".sidebar-submenu").slideDown(200);
                $(this).parent().addClass("active");
            }
        });
    },
};
</script>

<style scoped>
#show-sidebar {
    padding: 1rem;
}

.sidebar-wrapper .sidebar-footer {
    max-width: 263px;
}
.sidebar-wrapper .sidebar-footer > div {
    padding: 0 20px;
    text-align: left;
}

.sidebar-menu ul li a,
#close-sidebar:hover,
.sidebar-footer a i:hover,
.fa-search:hover {
    cursor: pointer;
}
</style>
