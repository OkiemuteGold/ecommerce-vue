<template>
    <div class="page-wrapper default-theme sidebar-bg bg2 toggled">
        <nav
            id="sidebar"
            class="sidebar-wrapper"
            @mouseover="viewSidebarOnHover()"
            @mouseout="hideSidebarOnHover()"
        >
            <div class="sidebar-content">
                <!-- sidebar-brand  -->
                <div class="sidebar-item sidebar-brand">
                    <router-link to="/admin">VUE-STORE</router-link>

                    <!-- <div id="close-sidebar" @click="closeMenu">
                        <i class="fas fa-times"></i>
                    </div> -->
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
                <div class="settings">
                    <router-link to="/admin/settings">
                        <i class="fa fa-cog"></i>
                        <span class="badge-sonar"></span>
                    </router-link>
                </div>
            </div>
        </nav>

        <!-- page-content  -->
        <main class="page-content">
            <div id="show-sidebar" class="sidebar-toggler">
                <button
                    aria-roledescription="toggle sidebar menu"
                    @click="openMenu"
                >
                    <i class="fas fa-bars"></i>
                </button>
            </div>

            <div class="content-wrapper">
                <router-view />
            </div>
        </main>
    </div>
</template>

<script>
import $ from "jquery";
import "@/mixins";

export default {
    methods: {
        openMenu() {
            if ($(".page-wrapper").hasClass("pinned")) {
                $(".page-wrapper").removeClass("pinned sidebar-hovered");

                $("#pin-sidebar.custom-control-input").prop("checked", false);
            }

            $(".page-wrapper").toggleClass("toggled");
        },

        viewSidebarOnHover() {
            if ($(".page-wrapper").hasClass("pinned")) {
                $(".page-wrapper").removeClass("toggled");
                $(".page-wrapper").addClass("sidebar-hovered");
            }
        },

        hideSidebarOnHover() {
            if ($(".page-wrapper").hasClass("pinned")) {
                $(".page-wrapper").addClass("toggled");
                $(".page-wrapper").removeClass("sidebar-hovered");
            }
        },

        // closeMenu() {
        //     $(".page-wrapper").toggleClass("toggled");
        // },
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

<style scoped lang="scss">
.page-wrapper {
    display: flex;
    align-items: center;

    .sidebar-wrapper {
        position: relative;
        left: 0;
        width: 265px;
        min-width: 230px;
        -o-transition: width 0.5s ease, min-width 0.5s ease;
        -moz-transition: width 0.5s ease, min-width 0.5s ease;
        -webkit-transition: width 0.5s ease, min-width 0.5s ease;
        transition: width 0.5s ease, min-width 0.5s ease;

        .sidebar-content {
            overflow-y: auto;
            overflow-x: hidden;
        }

        .sidebar-footer {
            position: absolute;
            width: 100%;
            bottom: 0;
            display: flex;
            align-items: center;
            padding: 0.125rem 0 0.125rem 0.5rem;
            overflow-x: auto;

            & > div {
                flex-grow: 0;
                margin: 0 0.75rem;
                padding: 2px;
            }

            .badge-sonar {
                height: 7px;
                width: 7px;
                top: 4px;
                background-color: #dc3545;
            }
        }
    }

    .page-content {
        height: 100%;
        width: calc(100% - 230px);
        min-width: calc(100% - 70px);
        display: flex;
        flex-direction: column;
        padding-left: 0;

        .content-wrapper {
            flex-grow: 1;
            padding: 6rem 3rem;

            @media screen and (max-width: 769px) {
                padding: 6rem 1rem 6rem 0.5rem;
            }

            & > div {
                max-width: 100%;
            }
        }
    }

    &.toggled .sidebar-wrapper {
        width: 70px;
        min-width: 70px;
    }

    &.toggled .page-content,
    &.toggled.pinned .page-content {
        padding-left: initial;
    }
}

.sidebar-toggler {
    position: fixed;
    top: 0;
    display: flex;
    align-items: center;
    height: 55px;
    min-height: 55px;
    width: 100%;
    padding: 1rem 0.5rem;
    box-shadow: 1px 1px 4px #9aa0b9;
    backdrop-filter: blur(10px);
    z-index: 999;

    button {
        background: none;
        border: none;
        font-size: 1.5rem;

        &:active i {
            color: #dc3545;
        }
    }
}

.sidebar-menu ul li a,
#close-sidebar:hover,
.sidebar-footer a i:hover,
.fa-search:hover {
    cursor: pointer;
}
</style>
