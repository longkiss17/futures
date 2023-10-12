import { ref, reactive, computed } from "vue";
import { defineStore } from "pinia";
import axios from "./axios";
import config from "./config";

export default defineStore("menuStore", () => {
  let history = reactive({
    data: [],
  });

  let localHistory = localStorage.getItem("history");
  history.data = localHistory ? JSON.parse(localHistory).groupObjectBy("menuPath").sortKey("createdDate", -1) : [];

  let menuList = ref([]);
  let menuListOrigin = ref([]);

  let redirectMenu = ref();

  axios({
    url: "/api/report/user/menu",
    method: "get",
  })
    .then((response) => {
      let data = response.data;
      data.sortKey("sortNo", 1);

      menuListOrigin.value = data;

      let arr = [];

      data.forEach((entry) => {
        entry.enable = true;
        entry.unfold = false;
        entry.icon = entry.icon ? entry.icon : "Default";
      });

      redirectMenu.value = data.find((entry) => entry.depth === 3);

      arr = data.filter((entry) => entry.depth === 1);

      arr.forEach((d1) => {
        d1.children = data.filter((d2) => d2.parentMenuSeq === d1.menuSeq);
        d1.children.forEach((d2) => {
          d2.children = data.filter((d3) => d3.parentMenuSeq === d2.menuSeq);
        });
      });

      arr.forEach((d1) => {
        d1.active = location.href.indexOf(d1.menuPath) < 0 ? false : true;
        d1.children.forEach((d2) => {
          d2.active = location.href.indexOf(d2.menuPath) < 0 ? false : true;
          d2.children.forEach((d3) => {
            d3.active = location.href.indexOf(d3.menuPath) < 0 ? false : true;
          });
        });
      });

      menuList.value = arr;
    })
    .catch((err) => {
      //location.href = `${config.apiUrl}/authenticate`;
    });

  // let localMenuList = localStorage.getItem("menuList");
  // if (localMenuList) menuList.value = reactive(JSON.parse(localMenuList));

  let pageHeader = reactive({ data: [] });

  function update(route) {
    let paths = ["/" + route.path.split("/")[1], route.params.category, route.params.menu];
    let activeMenus = [];
    function onEntry(row, index) {
      if (row.children) {
        for (let entry of row.children) onEntry(entry, index + 1);
      }
      row.active = row.menuPath === paths.slice(0, index).join("/");
      if (row.active) activeMenus.push(row);
    }
    menuList.value.forEach((entry) => {
      onEntry(entry, 1);
    });
    let history = localStorage.getItem("history");
    history = history ? JSON.parse(history) : [];
    history.push({
      menuPath: activeMenus.first().menuPath,
      menuName: activeMenus.first().menuName,
      createdDate: "".toDate(),
    });
    let recents = history.groupObjectBy("menuPath").sortKey("createdDate", -1);
    this.$patch({ history: { data: recents } });
    localStorage.setItem("history", JSON.stringify(history.sortKey("createdDate", -1).slice(0, history.length > 100 ? 100 : history.length)));
    this.$patch({ pageHeader: { data: activeMenus.reverse() } });
  }

  function currentMenu(route) {
    function getEntry(row, menuPath) {
      if (row.children) {
        for (let entry of row.children) {
          let menu = getEntry(entry, menuPath);
          if (menu) return menu;
        }
      } else if (menuPath.indexOf(row.menuPath) >= 0) return row;
    }

    return getEntry(menuList[0], route.menuPath);
  }

  return {
    menuList,
    menuListOrigin,
    redirectMenu,
    pageHeader,
    history,
    currentMenu,
    update,
  };
});
