<template>
  <div id="app">
    <nav class="navbar has-shadow">
      <div class="container">
        <div class="navbar-brand">
          <a class="navbar-item" href="../">
            <img
              src="http://bulma.io/images/bulma-logo.png"
              alt="Bulma: a modern CSS framework based on Flexbox"
            />
          </a>

          <div class="navbar-burger burger" data-target="navMenu">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div class="navbar-end">
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">
              Account
            </a>
            <div class="navbar-dropdown">
              <a class="navbar-item">
                Dashboard
              </a>
              <a class="navbar-item">
                Profile
              </a>
              <a class="navbar-item">
                Settings
              </a>
              <hr class="navbar-divider" />
              <a class="navbar-item">
                Logout
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <Welcome />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Welcome from "./components/Welcome.vue";

@Component({
  components: {
    Welcome
  }
})
export default class App extends Vue {}
</script>

<style>
html,
body {
  height: 100%;
  background-color: #2c3e50 !important;
}

nav {
  background-color: #2c3e50;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  height: 100%;
  /* margin-top: 60px; */
}
</style>
