<template>
    <div class="settings-container">
        <div class="container">
            <div class="row">
                <div class="my-3">
                    <h2>Settings</h2>
                </div>

                <div class="form-group col-md-12">
                    <div class="custom-control custom-switch">
                        <input
                            type="checkbox"
                            class="custom-control-input"
                            id="pin-sidebar"
                            @click="pinSidebar"
                        />
                        <label class="custom-control-label" for="pin-sidebar"
                            >Pin sidebar</label
                        >
                    </div>

                    <div class="custom-control custom-switch">
                        <input
                            type="checkbox"
                            class="custom-control-input"
                            id="toggle-border-radius"
                            @click="addBorderRadius"
                        />
                        <label
                            class="custom-control-label"
                            for="toggle-border-radius"
                            >Add Border Radius</label
                        >
                    </div>
                </div>

                <div class="form-group col-md-12">
                    <h4>Background</h4>
                    <p>You can also use background image</p>

                    <div class="custom-control custom-switch">
                        <input
                            type="checkbox"
                            class="custom-control-input"
                            id="toggle-bg"
                            checked
                            @click="addBackgroundImage"
                        />
                        <label class="custom-control-label" for="toggle-bg"
                            >Change Sidebar Background</label
                        >
                    </div>

                    <div
                        data-bg="bg1"
                        class="theme theme-bg selected"
                        @click.prevent="changeSideBackground($event)"
                    ></div>
                    <div
                        data-bg="bg2"
                        class="theme theme-bg"
                        @click.prevent="changeSideBackground($event)"
                    ></div>
                    <div
                        data-bg="bg3"
                        class="theme theme-bg"
                        @click.prevent="changeSideBackground($event)"
                    ></div>
                    <div
                        data-bg="bg4"
                        class="theme theme-bg"
                        @click.prevent="changeSideBackground($event)"
                    ></div>
                </div>

                <div class="form-group col-md-12">
                    <h4>Themes</h4>
                    <p>Click on any theme to apply it to the sidebar</p>

                    <div
                        data-theme="default-theme"
                        class="theme default-theme selected"
                        @click.prevent="changeTheme($event)"
                    ></div>
                    <div
                        data-theme="chiller-theme"
                        class="theme chiller-theme"
                        @click.prevent="changeTheme($event)"
                    ></div>
                    <div
                        data-theme="legacy-theme"
                        class="theme legacy-theme"
                        @click.prevent="changeTheme($event)"
                    ></div>
                    <div
                        data-theme="ice-theme"
                        class="theme ice-theme"
                        @click.prevent="changeTheme($event)"
                    ></div>
                    <div
                        data-theme="cool-theme"
                        class="theme cool-theme"
                        @click.prevent="changeTheme($event)"
                    ></div>
                    <div
                        data-theme="light-theme"
                        class="theme light-theme"
                        @click.prevent="changeSideBackground($event)"
                    ></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import $ from "jquery";

export default {
    methods: {
        changeSideBackground(event) {
            let activeBg = event.target;
            let bgs = "bg1 bg2 bg3 bg4";

            $("[data-bg]").removeClass("selected");
            $(activeBg).addClass("selected");

            $(".page-wrapper").removeClass(bgs);
            $(".page-wrapper").addClass($(activeBg).attr("data-bg"));
        },

        changeTheme(event) {
            let activeTheme = event.target;
            let themes =
                "default-theme legacy-theme chiller-theme ice-theme cool-theme light-theme";

            $("[data-theme]").removeClass("selected");
            $(activeTheme).addClass("selected");

            $(".page-wrapper").removeClass(themes);
            $(".page-wrapper").addClass($(activeTheme).attr("data-theme"));
        },

        addBackgroundImage() {
            $(".page-wrapper").toggleClass("sidebar-bg");
        },

        addBorderRadius() {
            $(".page-wrapper").toggleClass("border-radius-on");
        },

        pinSidebar() {
            if ($(".page-wrapper").hasClass("pinned")) {
                $(".page-wrapper").removeClass("pinned");
                $("#sidebar").unbind("hover");
            } else {
                $(".page-wrapper").addClass("pinned");
                $("#sidebar").hover(
                    function () {
                        console.log("mouseenter");
                        $(".page-wrapper").addClass("sidebar-hovered");
                    },
                    function () {
                        console.log("mouseout");
                        $(".page-wrapper").removeClass("sidebar-hovered");
                    }
                );
            }
        },
    },
};
</script>

<style scoped>
.form-group {
    margin-bottom: 2rem;
}
.custom-control {
    margin-bottom: 1rem;
}
</style>
