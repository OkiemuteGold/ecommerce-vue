<template>
    <div id="app">
        <div>
            <router-view />
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
// @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;500;700&display=swap');

*,
body {
    margin: 0;
    padding: 0;
    font-family: "Montserrat", sans-serif;
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

.btn:active,
.btn:focus {
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

.section-padd-70 {
    padding-top: 70px;
    padding-bottom: 70px;
}

.section-padd-50 {
    padding-top: 50px;
    padding-bottom: 50px;
}

.no-top {
    padding-top: 0;
}
.no-bot {
    padding-bottom: 0;
}
</style>
