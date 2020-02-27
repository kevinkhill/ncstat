"use strict";

require("@mdi/font/css/materialdesignicons.css");

var _vue = _interopRequireDefault(require("vue"));

var _App = _interopRequireDefault(require("./App.vue"));

var _vuetify = _interopRequireDefault(require("./plugins/vuetify"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

_vue.default.config.productionTip = false;
new _vue.default({
  vuetify: _vuetify.default,
  render: h => h(_App.default)
}).$mount("#app");
