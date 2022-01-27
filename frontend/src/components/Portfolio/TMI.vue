<style scoped>
    .tmi{width: 100%; height: 100%; position: relative; color: #000;}
    .tmi .bg{position: absolute; width:900px; height:600px; top:20%; left:10%; background: #fcfcfc; opacity: 0.8;}
    .tmi .box-01{position: absolute; width:840px; top:20%; left:10%; padding: 30px;}
    .tmi .text{font-size: 1em; padding: 5px 0; line-height: 1.5em; color: #000; }
    .tmi .title{font-size: 1.5em; color: #101010}
    .slide-fade-enter-active {transition: all .5s ease-in;}
    .slide-fade-enter, .slide-fade-leave-to{transform: translateY(50px);opacity: 0;}
p{color: #000}
</style>
<template>
  <div class="tmi">
    <div class="bg"></div>
    <div class="box-01">
      <transition name="slide-fade">
        <p class="text title" v-if="show01">Q. 무엇을 위해 일하는지</p>
      </transition>
      <!-- prettier-ignore -->
      <transition name="slide-fade">
        <p
          class="text"
          v-if="show02"
        >대부분의 사람들은 '돈'을 위해 일을 합니다. 저 역시 돈을 벌기 위해 일을 하지만 일을 하는 '이유'는 그렇게 단순한 답이 아닐거라 생각해왔습니다.</p>
      </transition>
      <transition name="slide-fade">
        <p class="text" v-if="show03">
          저자 닐 도쉬, 린지 맥그리거의 '무엇이 성과를 이끄는가'에서 그 해답을 찾을 수 있었습니다.
          일을 하는 이유에 대해 저자가 만든 개념인 '모티브 스팩트럼' 이론을 통해 일을 하는 동기를 정량화할 수 있으며 이를 하나의 측정값으로 매긴 총 동기 지수로 나타낼 수 있다고 합니다.
        </p>
      </transition>
      <transition name="slide-fade">
        <p class="text" v-if="show04">
          일반적인 기업의 직원들은 0점~20점, 저조한 실적의 기업에 다니는 직원의 경우 경우 마이너스를 보이기도 하며 총 동기 지수는 기업의 조직문화에 가장 큰 영향을 받는다고 합니다.
          저의 총 동기는 52점으로 최고의 성과를 보여준 기업의 직원들과 대등한 점수였습니다.
        </p>
      </transition>
      <transition name="slide-fade">
        <p
          class="text"
          v-if="show05"
        >제가 일을 하는 이유는 일이 즐겁고, 중요한 의미가 있고, 일을 하는 것이 목표를 성취하는데 도움이 될거라고 생각하기 때문입니다.</p>
      </transition>
      <br />
      <br />
      <transition name="slide-fade">
        <p class="text title" v-if="show06">Q. 그밖에 TMI...</p>
      </transition>
      <transition name="slide-fade">
        <p class="text" v-if="show07" style="line-height:30px">
          - 개발자임에도 디자인에 신경을 쓰는 편이며, 특히 사용자 경험을 매우 중시합니다.
          <br />- MLB 애청자이자 마이크트라웃의 열성팬이며, 세이버매트릭스를 활용한 지표를 만들어 NDC 세션에서 발표한 이력이 있습니다.
          <br />- 워라밸이 중요한가에 대해서는 개개인의 상황에 따라 다르다고 생각하며, 생산적인 라이프가 없다면 올워크가 낫다는 입장입니다.
          <br />- 자기 관리가 철저한 편입니다. 다만 이와 모순되게 술자리는 빠지지 않는 편이며 금연을 시도조차 하지 않는 인간적인 모습을 보입니다.
          <br />- 말수가 적은 편입니다. 먼저 다가가지 못하는 성격 덕분에 좁고 깊은 대인관계를 유지하고 있습니다.
          <br />- 불혹을 바라보는 나이지만 아직 미혼입니다. 독신주의자는 아니지만 결혼 계획은 없습니다.
          <br />- 스타크래프트 주 종족이 토스입니다.
        </p>
      </transition>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show01: false,
      show02: false,
      show03: false,
      show04: false,
      show05: false,
      show06: false,
      show07: false
    };
  },
  created() {
    setTimeout(() => {
      this.show01 = true;
    }, 200);
    setTimeout(() => {
      this.show02 = true;
    }, 400);
    setTimeout(() => {
      this.show03 = true;
    }, 600);
    setTimeout(() => {
      this.show04 = true;
    }, 800);
    setTimeout(() => {
      this.show05 = true;
    }, 1000);
    setTimeout(() => {
      this.show06 = true;
    }, 1200);
    setTimeout(() => {
      this.show07 = true;
    }, 1400);
  }
};
</script>
