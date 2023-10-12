import { ref, reactive, watch } from "vue";
import { defineStore, storeToRefs } from "pinia";
import axios from "./axios";
import config from "./config";
import uxStore from "@/stores/ux";
import { ElMessage } from "element-plus";

export default defineStore("mainStore", () => {
  const { theme } = storeToRefs(uxStore());

  let editorConfig = reactive({
    // language: "ko_KR",
    // icons: "small",
    skin: theme.value === "dark" ? "tinymce-5-dark" : "tinymce-5",
    content_style: "body { font-size: 12px; }",
    content_css: theme.value === "dark" ? "dark" : "",
    plugins: "autoresize quickbars nonbreaking lists image media code table codesample link preview emoticons lists charmap fullscreen insertdatetime",
    toolbar: "preview | bold italic underline strikethrough forecolor backcolor| numlist bullist hr indent outdent nonbreaking | link image media table mergetags | alignleft aligncenter alignright alignjustify  | align lineheight | undo redo | emoticons charmap | fullscreen code codesample insertdatetime | quickbars ",
    quickbars_selection_toolbar: "bold italic underline strikethrough forecolor backcolor | blocks | fontsize | quicklink blockquote",
    statusbar: false,
    min_height: 300,
    menubar: false,
    entity_encoding: "raw",
    quickbars_insert_toolbar: false,
    images_upload_url: `${config.apiUrl}/api/upload/file`,
    images_upload_credentials: true,
    // images_upload_base_path : "",
    // images_reuse_filename: "",
  });

  let editorApiKey = "i64xl362zdse2gly9nsior50190xu2aivhv6sc6r8c9oo7g3";

  watch(theme, () => {
    editorConfig.skin = theme.value === "dark" ? "tinymce-5-dark" : "tinymce-5";
    editorConfig.content_css = theme.value === "dark" ? "dark" : "";
  });

  let serviceGroup = ref([]);
  let metaData = reactive({});

  let metaUpdatedTime = localStorage.getItem("metaUpdatedTime");
  metaUpdatedTime = metaUpdatedTime ? JSON.parse(metaUpdatedTime) : reactive({});

  Object.keys(metaUpdatedTime).forEach((key) => {
    let local = localStorage.getItem(key);
    if (local) metaData[key] = JSON.parse(local);
  });

  // axios({
  //   url: "/api/report/meta",
  //   method: "get",
  // })
  //   .then((response) => {
  //     Object.keys(response.data).forEach((key) => {
  //       if (metaUpdatedTime[key]) {
  //         if (metaUpdatedTime[key] === response.data[key].lastUpdatedTime) {
  //           //console.log(`already : ${key} `);
  //         } else {
  //           //console.log(`update : ${key} `);
  //           localStorage.setItem(key, JSON.stringify(response.data[key].metaValues.toObject("key", "value")));
  //           metaData[key] = response.data[key].metaValues.toObject("key", "value");
  //         }
  //       } else {
  //         metaUpdatedTime[key] = response.data[key].lastUpdatedTime;
  //         //console.log(`insert : ${key} `);
  //         localStorage.setItem(key, JSON.stringify(response.data[key].metaValues.toObject("key", "value")));
  //         metaData[key] = response.data[key].metaValues.toObject("key", "value");
  //       }
  //     });

  //     localStorage.setItem("metaUpdatedTime", JSON.stringify(metaUpdatedTime));

  //     let services = response.data.serviceSeq.metaValues;

  //     let sortStrings = {
  //       PC: "1",
  //       MOBILE: "2",
  //       TOPIC: "3",
  //     };

  //     let serviceMap = (entry) => {
  //       return { key: entry.key.toString(), label: `${entry.option2} / ${entry.value} ` + (entry.option2 !== "TOPIC" ? " (" + entry.option1 + ")" : ""), sortValue: sortStrings[entry.option2] };
  //     };

  //     let group = [
  //       {
  //         label: "",
  //         options: [{ key: "", label: "게임 및 토픽 선택" }],
  //       },
  //       {
  //         label: "",
  //         options: [{ key: "-1", label: "모든 서비스" }],
  //       },
  //       {
  //         label: "라이브",
  //         options: services
  //           .filter((entry) => entry.option5 === "N" && entry.option4 === "Y")
  //           .map(serviceMap)
  //           .sortKey("sortValue"),
  //       },
  //       {
  //         label: "종료",
  //         options: services
  //           .filter((entry) => entry.option5 === "Y" && entry.option4 === "Y")
  //           .map(serviceMap)
  //           .sortKey("sortValue"),
  //       },
  //     ];

  //     serviceGroup.value = group;
  //     // option1 ~ 6 : region_name, game_type, use_yn, display_yn, closed_yn, require_confirmation_yn
  //   })
  //   .catch((err) => {
  //     if (err.response.status === 401) {
  //       localStorage.setItem("redirectUrl", location.href);
  //       location.href = `${window.config.apiUrl}/authenticate`;
  //     } else if (err.response.status === 403) {
  //       location.href = "/auth";
  //     } else {
  //       ElMessage.error(err.message + " " + err.response.data.path);
  //     }
  //   });

  return { editorConfig, editorApiKey, serviceGroup, metaData };
});
