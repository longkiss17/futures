<!-- prettier-ignore -->
<style lang="scss" scoped>
#wrap{
  width: 1200px; height:100%; margin:0 auto; transition: .5s ease-in-out;
  header{
    width:100%; height: 50px; 
  }
  .container{
    display: flex; min-height:calc(100% - 60px);

    .login{
      position: absolute; width:600px; height: 400px; top:calc(50% - 300px); left:calc(50% - 300px); 
      .logo{
        padding: 20px; font-size: 24px; font-family: 'lato-bold'; color: var(--color-active);
      }
      .form{
        display: flex; padding: 20px 20px 0 20px; font-family: 'poppins-medium'; font-size: 12px;
        &>div{
          div{
            padding: 5px 0;
          }          
          input{width:calc(100% - 30px); border:solid 1px var(--border-color-bold); border-radius: 5px; padding: 10px; font-size: 16px; font-family: 'poppins-medium'; color: var(--text-color-medium); }
          button{
            width:100%; padding: 55px 0; font-size: 20px; margin-top: 32px; border:none; border-radius: 5px; background-color: var(--color-active); color: var(--bg-color); cursor: pointer;
            &:hover{
              background-color: var(--color-bold);
            }
          }
          &:nth-child(1){width:70%}
          &:nth-child(2){width:30%}
        }
      }
      
      .auth{
        padding: 0 20px; text-align: right; color: var(--text-color-light); font-size: 12px;
        &:hover{
          color: var(--text-color-link);
        }
        a, svg{
          display: inline-block; vertical-align: middle; text-decoration: none; color: inherit;
        }
      }
    }
  }
}
</style>
<template>
  <div id="wrap">
    <header>
      <header1></header1>
    </header>
    <div class="container">
      <div class="login">
        <div class="logo">Analytics Service Management LogIn</div>
        <div class="form">
          <div>
            <div>Weboffice ID</div>
            <div>
              <input type="text" />
            </div>
            <div>Password</div>
            <div>
              <input type="text" />
            </div>
          </div>
          <div>
            <router-link :to="'/nxlogreport/helpcenter/notice'"><button>LogIn</button></router-link>
          </div>
        </div>
        <div class="auth">
          <a href="#">접근 권한 신청</a>
          <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 22 22" fill="currentColor"><path d="m8 14.417-.479-.479L11.458 10 7.521 6.062 8 5.583 12.417 10Z" /></svg>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import header1 from "./Common/Header.vue";
import menuStore from "@/stores/menu";
let menu = menuStore();

if (menu.history.data.length > 0) {
  location.href = menu.history.data.first().href;
} else {
  location.href = "/nxlogreport/helpcenter/notice";
}
</script>
