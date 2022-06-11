<template>
    <div id="app">
        <!-- <Navbar /> -->
        <router-view />
    </div>
</template>

<script>
// import Navbar from "./components/home/Navbar.vue";
export default {
    components: {
        // Navbar,
    },
};
</script>

<style lang="scss">
// @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;500;700&display=swap');

:root {
    --customBlue: #2c84a7;
    --customBlueLight: #39aad6;
    --customYellow: #ffc107;
    --customSectionBg: #f1f1f1;
    --customParaText: #737373;
    --customText: #2c3e50;
}

*,
body {
    margin: 0;
    padding: 0;
    font-family: "Montserrat", sans-serif;
}

body,
#app {
    box-sizing: border-box;
    overflow-x: hidden;
}

#app {
    // font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: var(--customText);
}

.product .quillWrapper .ql-snow.ql-toolbar {
    display: none;
}
.product .ql-container.ql-snow {
    border: 1px solid #ccc !important;
}
.ql-editor {
    font-size: 14px !important;
}

p {
    color: var(--customParaText);
}

tbody tr td.description p {
    margin-bottom: 0;
    color: var(--customText);
}

#nav {
    // padding: 30px;

    a {
        font-weight: bold;
        color: var(--customText);

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}

.btn:active,
.btn:focus {
    box-shadow: none !important;
}

.side-content-shadow {
    border-radius: 0 20px 20% 5%;
    box-shadow: 0px 20px 0px #fafafa;
}

img {
    max-width: 100%;
    height: auto;
}

.title {
    margin-bottom: 30px;
    text-transform: capitalize;
}

.section-padd {
    padding-top: 100px;
    padding-bottom: 100px;
}

.section-padd-70 {
    padding-top: 70px;
    padding-bottom: 70px;
}

.section-padd-40 {
    padding-top: 40px;
    padding-bottom: 40px;
}

.section-padd-20 {
    padding-top: 20px;
    padding-bottom: 20px;
}

.no-top {
    padding-top: 0;
}
.no-bottom {
    padding-bottom: 0;
}

.main-form {
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
            font-size: 13px;
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
}
</style>
