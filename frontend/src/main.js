import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import store from "./stores/index.js";
import router from "./routes/index.js";

import moment from "moment";
import fetch from "./stores/fetch.js";
import fetchAsync from "./stores/fetchAsync.js";
import board from "./stores/board.js";
import { VueEcharts } from "vue3-echarts";
import ElementPlus from "element-plus";
import Icon from "./components/Common/ICon.vue";
import Sort from "./components/Common/Sort.vue";
import DropdownFilter from "./components/Common/DropdownFilter.vue";
import RevisionHistory from "./components/Common/RevisionHistory.vue";
import Skeleton from "./components/Common/Skeleton.vue";
import SkeletonBoard from "./components/Common/SkeletonBoard.vue";
import "./stores/prototype";
import config from "./stores/config";
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/dark/css-vars.css";
import ko from "element-plus/dist/locale/ko.mjs";
import Editor from "@tinymce/tinymce-vue";
import JsonViewer from "vue-json-viewer";
import draggable from "vuedraggable";
import Ajv from "ajv";

import "./style.scss";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(ElementPlus, { zIndex: 3000, locale: ko });
// app.use(ElementPlus, { zIndex: 3000 });
app.use(JsonViewer);

app.component("vue-echarts", VueEcharts);
app.component("icon", Icon);
app.component("sort", Sort);
app.component("dropdown-filter", DropdownFilter);
app.component("revision-history", RevisionHistory);
app.component("skeleton", Skeleton);
app.component("skeleton-board", SkeletonBoard);
app.component("editor", Editor);
app.component("draggable", draggable);

app.provide("store", store());
app.provide("fetch", fetch);
app.provide("fetchAsync", fetchAsync);
app.provide("board", board);
app.provide("moment", moment);
app.provide("ajv", new Ajv({ allErrors: true }));

window.config = config;

app.mount("#app");
