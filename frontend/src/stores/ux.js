import { ref, reactive } from "vue";
import { defineStore } from "pinia";

export default defineStore("themeStore", () => {
  let theme = ref("");
  let color = ref("55, 136, 255");
  let screen = ref("wide");

  function setTheme() {
    let html = document.querySelector("html");

    let localTheme = localStorage.getItem("theme");
    if (!localTheme) localTheme = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

    if (localTheme === "dark") {
      color.value = "150, 200, 255";
      document.querySelector("html").style.setProperty("--el-color-white", "rgba(30, 30, 30, 1)");
    }

    theme.value = localTheme;
    html.className = localTheme;

    if (window.matchMedia) {
      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (event) => {
        html.classList.remove("light", "dark");
      });
    }

    let localColor = localStorage.getItem("color");
    if (localColor) color.value = localColor;

    html.style.setProperty("--default-color", color.value);

    let localScreen = localStorage.getItem("screen");
    if (localScreen) screen.value = localScreen;

    if (localScreen === "wide") {
      window.onload = function () {
        if (document.querySelector(".wrap")) {
          document.querySelector(".wrap").classList.remove("normal", "wide");
          document.querySelector(".wrap").classList.toggle("wide");
        }
      };
    }
  }

  return {
    theme,
    color,
    screen,
    setTheme,
  };
});
