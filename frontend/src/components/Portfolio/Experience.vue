<style scoped>
.experience {
  width: 100%;
  height: 100%;
  position: relative;
  color: #000;
}
.experience .bg {
  position: absolute;
  width: 900px;
  height: 600px;
  top: 30%;
  left: 10%;
  background: #fcfcfc;
  opacity: 0.8;
}
.experience .box-01 {
  position: absolute;
  width: 840px;
  top: 30%;
  left: 10%;
  padding: 30px;
}
.experience .box-02 {
  position: absolute;
  top: 32%;
  right: 10%;
  padding: 30px;
}

@media screen and (min-width: 900px) and (max-width: 1400px) {
  .box-02{display: none;}
}
.experience .box-02 ul {
  justify-content: space-around;
}
.experience .box-02 li {
  color: #000;
  padding: 50px 20px 30px 20px;
  border-left-style: dashed;
  border-left: dashed 2px #000;
}
.experience .box-02 li:first-child {
  padding-top: 0;
}
.experience .box-02 li:last-child {
  padding-bottom: 0;
}
.experience .box-02 li span {
  position: absolute;
  left: 30px;
  margin-top: 4px;
  margin-left: -3px;
  display: block;
  width: 6px;
  height: 6px;
  background: #fff;
  border-radius: 50%;
  border: 1px solid #000;
}
.experience .box-02 li span.end {
  width: 10px;
  height: 10px;
  margin-top: -10px;
  margin-left: -6px;
  border: 2px solid #000;
}
.experience .box-02 li span.current {
  background: #000;
}
.experience .box-02 li h3 {
  font-weight: normal;
  margin: 0;
}
.experience .box-02 li h5 {
  font-weight: normal;
  margin: 0;
}
.experience .text {
  font-size: 1em;
  padding: 5px 0;
  line-height: 1.5em;
  color: #000;
}
.experience .title {
  font-size: 1.5em;
  color: #101010;
}
.char {
  animation: an 1s ease-out 1 both;
  display: inline-block;
}

.slide-fade-enter-active {
  transition: all 2s ease;
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateY(-400px);
  opacity: 0;
}
</style>
<template>
  <div class="experience">
    <div class="bg"></div>
    <transition name="slide-fade">
      <div class="box-02" v-if="showsBox02">
        <ul>
          <li>
            <span class="end"></span>
          </li>
          <li>
            <span class="current"></span>
            <h3>NEXON KOREA</h3>
            <h5>Nov 2011 ~ Present</h5>
          </li>
          <li>
            <span></span>
            <h3>DISITAL PLAY</h3>
            <h5>Sep 2010 ~ Oct 2011</h5>
          </li>
          <li>
            <span></span>
            <h3>HORIZON TECHNOLOGY</h3>
            <h5>Oct 2007 ~ Aug 2010</h5>
          </li>
          <li>
            <span class="end"></span>
          </li>
        </ul>
      </div>
    </transition>
    <div class="box-01" v-show="showsBox01">
      <p class="text title">Q. 경력을 요약해본다면</p>
      <!-- prettier-ignore -->
      <p
        class="text"
      >중소 기업과 스타트업에서 3년 10개월, 넥슨코리아에서 8년 3개월동안 개발자로 근무했습니다. 총 경력은 12년 가까이 되지만, 누구나 다 그렇듯이 경력에 비례할 만큼 깊이 있는 개발자인가에 대해서는 스스로에게 의문을 갖고 있습니다.</p>
      <p class="text">
        다만 오랜 경력만큼 축적된 경험과 노하우, 수많은 조직에 몸 담으며
        체험했던 조직문화를 통해 숙련된 개발자로 성장해왔습니다.주니어 시절 .net
        기반의 웹 어플리케이션을 개발을 시작으로 mssql 기반의 웹 로그 시스템
        구축, html parsing & openAPI를 통한 데이터 크롤링, highcharts & D3.js를
        사용한 데이터시각화, AWS ECS(Docker) + fluentd 기반 로그 리시버 인프라
        구축 등 수 많은 프로젝트를 담당해왔으며, 현재는 javascript 기반의
        node.js & vue.js을 사용해 frontend/backend를 개발하고 있습니다.
      </p>
      <p class="text">
        경험해보지 못한 언어 및 플랫폼에 대한 거부감은 상대적으로 적은 편이며, 프로젝트를 시작함에 있어 언어와 플랫폼 자체는 크게 중요하지 않다고 생각합니다.
        '무엇으로(language or framework) 만들 것인가' 보다 '무엇(product)을 만들것인가'가 훨씬 더 중요하다고 생각하기 때문입니다.
      </p>
      <br />
      <br />
      <p class="text title">Q. 단 하나의 언어만 사용한다면</p>
      <p class="text">
        이력서 빈칸을 채우기 위해 자신이 경험해 본 언어를 의미없이 나열하는 것은 바람직하지 못하다고 생각합니다. 깊이를 알 수 없을 뿐더러 언어마다 사용하는 방식이 대부분 유사하기 때문입니다.
        객체지향 언어(C#, Java)와 함수형 언어(js, pathon) 중 어느 쪽을 선호하는지, 자신있는 언어는 무엇이며 얼만큼 깊이 있게 알고 있는지가 중요하다고 생각합니다.
      </p>
      <p class="text">
        위 질문에 대한 저의 답변은 javascript입니다. 거의 대부분의 플랫폼 구축(웹, 모바일앱, 데스크탑앱)이 가능할 뿐만 아니라
        prototype 기반 특성상 javascript에서 다른 언어의 방식(예를 들면 class, Inheritance)을 흉내내는 것은 쉬운 일이지만, 그 반대는 훨씬 더 어렵기 때문에 매우 흥미로운 언어라고 생각합니다.
      </p>
      <p class="text">
        저는 스스로를 중상위권의 javascript 개발자로 평가합니다. 그 이유는 많은
        개발자들이 js만의 특성(async, callback, prototype, closure)을 제대로 이해하지
        못하고 있으며, 브라우저 성능에만 의존해 효율적인 코드를 만들어내지
        못하고 있다는 사실을 잘 알고 있기 때문입니다. 얼마전 동료 개발자분만
        해도 typescript 스터디를 하고 싶다고 말씀해주신적이 있었는데,
        typescript는 js의 superset이라 우선 js 개념을 공부하는 것이 무엇보다
        중요하다고 말씀을 드렸지만 그 이유를 알지는 못하셨습니다. (물론
        typescript는 훌륭한 언어입니다.)
      </p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showsBox01: false,
      showsBox02: false
    };
  },
  created() {
    let textAnimation = element => {
      this.showsBox01 = true;
      this.showsBox02 = true;
      let p = document.getElementsByClassName(element);
      let lastIndex = 0;

      for (let i = 0; i < p.length; i++) {
        p[i].classList.add("char");
        p[i].style["animation-delay"] = i * 200 + "ms";
      }

      //   for (let i = 0; i < text.length; i++) {
      //     var newDom = "";
      //     for (let j = 0; j < text[i].innerText.length; j++) {
      //       newDom +=
      //         '<span class="char">' +
      //         (text[i].innerText[j] == " " ? "&nbsp;" : text[i].innerText[j]) +
      //         "</span>";
      //     }

      //     text[i].innerHTML = newDom;

      //     var length = text[i].children.length;

      //     for (let j = 0; j < length; j++) {
      //       text[i].children[j].style["animation-delay"] =
      //         (i + 1) * (j + 1) + lastIndex + "ms";

      //       if (j === length - 1) {
      //         lastIndex = (i + 1) * (j + 1) + lastIndex;
      //       }
      //     }
      //   }
    };
    setTimeout(() => {
      textAnimation("text");
      //textAnimation("text2");
    }, 100);
  }
};
</script>
