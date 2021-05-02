import Vue from "vue";
import ElementUI from "element-ui";
import App from "./App.jsx";
import router from "./router";
import store from "./store";
import "element-ui/lib/theme-chalk/index.css";
import "handsontable/dist/handsontable.full.css";
import "@/assets/main.css";

Vue.use(ElementUI);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
