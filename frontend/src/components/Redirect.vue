<!-- prettier-ignore -->
<style lang="scss" scoped>
#wrap{
  width: 1200px; height:100%; margin:0 auto; transition: .5s ease-in-out;
  header{
    width:100%; height: 50px; 
  }
  .container{
    display: flex; min-height:calc(100% - 60px);

    .lds-ellipsis { display: inline-block; position: absolute; width: 80px; height: 80px; top:calc(50% - 40px); left:calc(50% - 40px) }
    .lds-ellipsis div { position: absolute; top: 33px; width: 13px; height: 13px; border-radius: 50%; background: var(--color-active); animation-timing-function: cubic-bezier(0, 1, 1, 0); }
    .lds-ellipsis div:nth-child(1) { left: 8px; animation: lds-ellipsis1 0.6s infinite; }
    .lds-ellipsis div:nth-child(2) { left: 8px; animation: lds-ellipsis2 0.6s infinite;}
    .lds-ellipsis div:nth-child(3) { left: 32px; animation: lds-ellipsis2 0.6s infinite;}
    .lds-ellipsis div:nth-child(4) { left: 56px; animation: lds-ellipsis3 0.6s infinite;}
    @keyframes lds-ellipsis1 { 0% { transform: scale(0);} 100% { transform: scale(1);}}
    @keyframes lds-ellipsis3 { 0% { transform: scale(1); } 100% { transform: scale(0);}}
    @keyframes lds-ellipsis2 { 0% { transform: translate(0, 0); } 100% { transform: translate(24px, 0);}}
  }

  
}
</style>
<template>
  <div id="wrap">
    <header>
      <header1></header1>
    </header>
    <div class="container">
      <div class="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { watch } from "vue";
import { storeToRefs } from "pinia";
import header1 from "./Common/Header.vue";
import menuStore from "@/stores/menu";

let { redirectMenu } = storeToRefs(menuStore());

watch(redirectMenu, () => {
  setTimeout(() => {
    let redirectUrl = localStorage.getItem("redirectUrl");

    if (redirectUrl) {
      location.href = redirectUrl;
      localStorage.removeItem("redirectUrl");
    } else {
      location.href = redirectMenu.value.menuPath;
    }
  }, 300);
});
</script>
