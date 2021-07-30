<template>
    <div id="app">
        <div>
            <Navbar />
            <router-view />
        </div>
    </div>
</template>

<script>
import Navbar from "./components/Navbar";

export default {
    components: {
        Navbar,
    },
};
</script>

<style lang="scss">
*,
body {
    margin: 0;
    padding: 0;
}

body {
    box-sizing: border-box;
    overflow-x: hidden;
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
}

#nav {
    padding: 30px;

    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}

a.btn:active,
a.btn:focus {
    box-shadow: none !important;
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
.no-top {
    padding-top: 0;
}
.no-bot {
    padding-bottom: 0;
}
</style>
