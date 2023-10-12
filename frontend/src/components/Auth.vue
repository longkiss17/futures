<!-- prettier-ignore -->
<style lang="scss" scoped>
#wrap{
  width: 1200px; height:100%; margin:0 auto; transition: .5s ease-in-out;
  header{
    width:100%; height: 50px; 
  }
  .container{
    display: flex; min-height:calc(100% - 60px);

    .box{
      position: absolute; width:660px; height: 300px; top:calc(50% - 150px); left:calc(50% - 330px);  font-family: 'noto-medium';
      .msg{
        padding: 20px; font-size: 50px;  color: var(--color-active); text-align: right;
      }
      .desc{
        text-align: right; padding: 0 26px; font-size: 16px;
      }
      
      .link{
        padding: 10px 20px; text-align: right; color: var(--text-color-light); font-size: 14px; text-align: right; 
        a, svg{
          display: inline-block; margin-left: 10px; vertical-align: middle; text-decoration: none; color: inherit; text-decoration: underline;
          &:hover{
            color: var(--text-color-link);
          }
          svg{margin-top: -5px;}
        }
      }
    }
  }
}
</style>
<template>
  <div id="wrap">
    <div class="container">
      <div class="box">
        <div class="msg">페이지 접근 권한이 없습니다.</div>
        <div class="desc">권한이 필요하신 경우 분석서비스개발팀(da_service_dev)으로 문의해주세요.</div>
        <div class="link">
          <a href="mailto: da_service_dev@nexon.co.kr">권한 문의</a>
          <a href="/">홈으로 이동</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup></script>
