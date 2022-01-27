<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
@font-face {font-family: 'noto-regular'; src: url('assets/fonts/notokr-regular.ttf') format('truetype');}
@font-face {font-family: 'noto-light'; src: url('assets/fonts/notokr-light.ttf') format('truetype');}
@font-face {font-family: 'noto-bold'; src: url('assets/fonts/notokr-bold.ttf') format('truetype');}
@font-face {font-family: 'noto-medium'; src: url('assets/fonts/notokr-medium.ttf') format('truetype');}
@font-face {font-family: "poppins"; src: url("assets/fonts/Poppins-Regular.ttf") format("truetype");}
@font-face {font-family: "poppins-bold"; src: url("assets/fonts/Poppins-Bold.ttf") format("truetype");}
@font-face {font-family: "poppins-right";src: url("assets/fonts/Poppins-Light.ttf") format("truetype");}

body, p, ul, ol, li, dl, dt, dd, table, th, td, form,fieldset, legend, input, textarea, button, select
{
margin: 0;padding: 0;font-family: 'noto-regular', 'nx-regular', "Nanum Gothic",'돋움',Dotum,AppleGothic,sans-serif; font-size: 14px; color: #fff
}
img, fieldset {border: 0}
ul, ol {list-style: none}
em, address {font-style: normal}
a {text-decoration: none}
a:hover, a:active, a:focus {text-decoration: none}
html, body, #app{height: 100%}
.scrollbar-track{background: #ddd}
.scrollbar-thumb{background: #fff;}
.scrollbar-track-y{left:-10px; display: none;}
@keyframes an{
  from{opacity: 0;transform: perspective(500px) translate3d(-35px, -40px, -150px) rotate3d(1, -1, 0, 35deg);}
  to{opacity: 1;transform: perspective(500px) translate3d(0, 0, 0);}
}
</style>
