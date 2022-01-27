<style scoped>
    .statement{width: 100%; height: 100%; position: relative; color: #fff;}
    .statement .bg{position: absolute; width:900px; height:560px; top:30%; left:10%; background: #000; opacity: 0.5;}
    .statement .box-01{position: absolute; width:840px; top:30%; left:10%; padding: 30px; color: #fff}
    .statement .text2{font-size: 1em; padding: 5px 0; line-height: 1.5em; color: #fff; font-family: 'noto-light'}
    .statement .title{font-size: 1.5em; color: #fff}    
    .char{animation: an 1s ease-out 1 both; display: inline-block;}    
</style>
<template>
  <div class="statement">
    <div class="bg"></div>
    <div class="box-01" v-show="showsBox01">
      <p class="text2 title">Q. 지원하게 된 배경</p>
      <br />
      <br />
      <!-- prettier-ignore -->
      <p class="text2">오래전 함께 일했었던 동료인 신지윤님의 추천으로 지원하게 되었으며, 2019년 하반기에 처음 제안을 받았습니다.</p>
      <p
        class="text2"
      >그 당시 재직중인 회사에서 담당하던 프로젝트가 한참 진행중이었고, 저 또한 매우 관심있는 프로젝트였기에 완성에 대한 의지가 강했습니다. 그렇게 작년 한해 동안 매진했던 프로젝트는 성공적으로 런칭했으며, 이직을 미뤄가며 최선을 다 한 만큼 기대 이상의 만족스런 성과를 거둘 수 있었습니다. 런칭 이후에 찾아온 번아웃은 극복할 수 있는 수준이었지만, 작년에 제안을 받았던 토스팀에 흥미를 느껴 새로운 도전을 위해 지원하게 되었습니다.</p>
      <br />
      <br />
      <p class="text2 title">Q. 남들과 차별되는 나만의 강점</p>
      <br />
      <br />
      <p
        class="text2"
      >수 많은 채용공고에서 공통적으로 찾아볼 수 있는 문장은 '열정적인 개발자'입니다. 저 또한 스스로를 열정이 있다고 생각해왔는데 최근 깨달은 사실은 열정보다 그 열정을 지속할 수 있는 의지가 무엇보다 중요하다는 것이었습니다. 열정은 누구에게나 있습니다. 다만 태풍속의 촞불과 같은 나약한 의지 때문에 쉽게 포기하거나 더디게 진행되는 경우를 수없이 봐 왔습니다.</p>
      <br />
      <p
        class="text2"
      >저에게는 누구보다 강한 의지가 있습니다. 이런 의지의 원천이 무엇인지 알 수 없지만 한번 시작한 일은 어떻게든 성과를 냈으며 주변으로 부터 좋은 평가를 받아 왔습니다. 의지력을 입증하는 사례로는 작년 목표(책 50권 읽기)와 제작년 목표(최고 평가 받기)를 모두 이뤘으며 올해 목표(이직)는 현재 진행 중 입니다.</p>
      <br />
      <p
        class="text2"
      >강한 의지와 더불어 몰입력 또한 저만의 장점입니다. 사람의 주의력은 무한한 것이 아니기 때문에 정해진 주의력을 효율적으로 사용해야 몰입할 수 있는 상태를 지속할 수 있습니다. 이를 위해 저는 TV 시청이나, 게임을 하지 않으며 스마트폰 사용을 최소화 합니다. 뇌 건강을 위해 채식위주의 식단과 주기적인 근력운동, 충분한 수면 및 명상을 합니다. 인생이 피곤하다는 지적을 받기도 하지만 최고의 생산성을 위해서는 주의력 관리를 통해 몰입력을 높이는 것이 무엇보다 중요하다고 생각합니다.</p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showsBox01: false
    };
  },
  created() {
    let textAnimation = element => {
      this.showsBox01 = true;
      let p = document.getElementsByClassName(element);
      let lastIndex = 0;

      for (let i = 0; i < p.length; i++) {
        p[i].classList.add("char");
        p[i].style["animation-delay"] = i * 200 + "ms";
      }
    };
    setTimeout(() => {
      textAnimation("text2");
    }, 100);
  }
};
</script>
