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

p {
    color: var(--customParaText);
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

.no-top {
    padding-top: 0;
}
.no-bottom {
    padding-bottom: 0;
}
</style>
