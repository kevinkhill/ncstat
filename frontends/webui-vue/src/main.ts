import "@mdi/font/css/materialdesignicons.css";
import 'vue-class-component/hooks'
import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;

new Vue({
  vuetify,
  render: h => h(App)
}).$mount("#app");
