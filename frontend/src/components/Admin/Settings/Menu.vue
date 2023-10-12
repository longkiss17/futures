<!-- prettier-ignore -->
<style lang="scss" scoped>
  .board-add{
    div.menu{
      display: flex;
      &>div{
        width:calc(40% - 10px); height: 700px; overflow: auto; border:solid 1px var(--border-color); border-radius: 4px;
        &:first-child{
          margin-right: 20px; 
          .service{
            padding: 10px 0px; text-align: right; display: flex; border-radius: 4px; 
            &.active{background-color: var(--color-light);}
            div{      
              &:first-child{
                width:80%; padding: 3px 10px 3px 10px; text-align: left; color: var(--text-color-bold);
                svg{display: inline-block; vertical-align: middle; margin-top: -2px;}
                span{ 
                  font-family: 'poppins-medium'; font-size: 14px; margin-left: 3px; cursor:pointer;
                  &:hover{color:var(--color-active)}
                }
              }
              &:last-child{
                width:20%; padding: 0px 10px 0 10px; text-align: right;       
                span, svg{display: inline-block; vertical-align: middle; font-size: 11px; cursor: pointer;}        
                &:hover{color: var(--color-active)}
              }
            }
          }
          div.add{
            margin-bottom: 10px; padding:10px 30px;         
            &>span{
               font-family: 'noto-medium'; cursor: pointer;
              span, svg{display: inline-block; vertical-align: middle;}              
              span{font-size: 11px}
            }
            &.active{ background-color: var(--color-light); color:var(--color-active); }  
          }
          li{list-style: none;}
          ul.category > li{          
            position: relative;            
            &:first-child{margin-top: 0px;}
            div{
              padding: 6px 20px 6px 30px; cursor: pointer;
              span{
                display: inline-block; vertical-align: middle; padding: 0 0 0 0;
                &.name{ font-size: 14px; margin-top: -4px; padding-left: 5px; color: var(--text-color-bold)}
                &.icon{ margin-top: -5px;}
                &.icon-arrow{ cursor: pointer; float:right}
                &.icon-revert{transform: scaleY(-1); margin-top: -4px}        
                
              }
              &.active{
                background-color: var(--color-light); color: var(--color-active); border-top-right-radius: 4px; border-bottom-right-radius: 4px;
                span.name{font-family: 'noto-medium'; color: var(--color-active)}
              }      
              &:hover{
                color: var(--color-active);
                span.name{font-family: 'noto-medium'; color: var(--color-active)}
              }
            }
            div.add{
              margin-bottom: 20px; padding-left: 45px;
              &>span{
                 font-family: 'noto-medium';
                span, svg{display: inline-block; vertical-align: middle;}                
                span{font-size: 11px}
              }    
              &.active{ background-color: var(--color-light); color:var(--color-active);}    
            }             
            ul{      
              max-height:500px; transition: all 0.4s ease;
              li{
                padding: 0px 0 0px 45px; font-size: 12px;
                span{ display: inline-block; width:90%; padding: 7px 0; color: inherit; cursor: pointer;}
                i{ display: inline-block; width:3px; height:3px; margin:-2px 6px 0 8px; background-color: var(--text-color-light); border-radius: 2px; vertical-align: middle;}
                svg{vertical-align: middle; }
                &:hover{
                  font-family: 'noto-bold'; color: var(--color-active);
                  i{background-color: var(--color-active) }
                }
                &.active{
                  font-family: 'noto-bold'; background-color: var(--color-light); color: var(--color-active);
                  i{background-color: var(--color-active) }
                }
              }
              &.unfold{
                max-height: 0px; margin-bottom: 0px; overflow: hidden; transition: all 0.2s; 
              }
            }
          }
        }
        &:last-child{
          width:calc(60% - 30px); height: 680px; padding: 10px;
          div.n{ font-family: "noto-medium"; font-size: 18px; margin-left: 3px}
          &>div{
            display: flex; padding: 10px 0;  border-bottom: solid 1px var(--border-color);   
            div.t{
              position: relative; width:150px; padding: 5px 10px; font-size: 13px; font-family: 'noto-medium';
              .badge{ position: absolute; left:5px; top: 5px;; display: inline-block; width:4px; height:4px; border-radius: 50px; background-color:var(--text-color-red)}
              svg{display: inline-block; vertical-align: middle; margin-top: -2px;}
            }
            div.v{
              width:calc(100% - 150px);         
              svg{display: inline-block; vertical-align: middle;}
            }
          }
          div.button{ display: block; text-align: right; border-bottom: none}
        }
      }
    }
    .message{display: inline-block; color:var(--text-color-red); font-size: 12px; padding: 3px 0}
  }

  ul.editable{    
    span, li, a{cursor: move}
    &>li{
      margin-bottom: 10px;
      box-shadow: var(--color-regular) 0px 0px 10px, var(--color-regular) 0px 0px 5px, var(--color-regular) 0px 0px 10px;
      div.active{border-left: none; background-color: inherit;}
      ul{
        li{
          box-shadow: var(--color-regular) 0px 0px 2px, var(--color-regular) 0px 0px 0px, var(--color-regular) 0px 0px 0px;          
        }
      }
    }
  }
  .ghost{
    opacity: 0.5; background: var(--color-regular);
  }
</style>
<template>
  <div class="board-add">
    <div>
      <div class="t">서비스별 메뉴 목록</div>
      <div class="v">
        <el-select v-model="selectedMenuSeq" filterable placeholder="대상 게임 및 토픽 선택">
          <el-option v-for="item in menuList" :key="item.menuSeq" :label="item.menuName" :value="item.menuSeq" />
        </el-select>
        &nbsp;
        <el-button type="primary" @click="add()">서비스 등록</el-button>
      </div>
    </div>
    <div class="menu">
      <div v-if="menuList.length > 0">
        <div :class="{ service: true, active: form.menuSeq === filteredMenuList.menuSeq }">
          <div>
            <icon :name="filteredMenuList.icon"></icon>
            <span @click="edit(filteredMenuList)">{{ (filteredMenuList.label === "ADMIN" ? "ASM " : "") + filteredMenuList.menuName }}</span>
          </div>
          <div>
            <span v-if="editable" @click="editable = false">
              <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="-4 -4 24 24"><path fill="currentColor" d="M3 12.75v-1.5h6v1.5Zm0-3.125v-1.5h9v1.5ZM3 6.5V5h9v1.5ZM13.396 15l-2.813-2.833 1.063-1.063 1.75 1.771 3.542-3.542L18 10.396Z" /></svg>
            </span>
            <span v-else @click="editable = true">
              <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="-6 -6 28 28"><path fill="currentColor" d="m7.125 16-1.063-1.062 1.084-1.084Q5 13.812 3.5 12.292 2 10.771 2 8.625q0-2.187 1.531-3.719Q5.062 3.375 7.25 3.375H10v1.5H7.25q-1.562 0-2.656 1.094Q3.5 7.062 3.5 8.625q0 1.521 1.052 2.604 1.052 1.083 2.552 1.125l-1.042-1.062 1.063-1.042L10 13.125ZM12 13.875v-1.5h6v1.5Zm0-4.5v-1.5h6v1.5Zm0-4.5v-1.5h6v1.5Z" /></svg>
            </span>
          </div>
        </div>
        <div v-if="!editable" :class="{ add: true, active: form.parentMenuSeq.value === filteredMenuList.menuSeq && !form.menuSeq }" @click="add(filteredMenuList)">
          <span>
            <icon :name="'Add'"></icon>
            <span>카테고리 추가</span>
          </span>
        </div>
        <draggable v-model="filteredMenuList.children" item-key="menuSeq" @update="update(filteredMenuList.children)" :disabled="!editable" tag="ul" :class="['category', editable ? 'editable' : '']" ghost-class="ghost">
          <template #item="{ element: category }">
            <li>
              <div :class="{ active: category.active }" @click="edit(category)">
                <span class="icon">
                  <icon v-if="editable" :name="'DragHandle'" :viewBox="'-2 -2 24 24'"></icon>
                  <icon v-else :name="category.icon"></icon>
                </span>
                <span class="name">{{ category.menuName }}</span>
                <span :class="['icon-arrow', category.unfold ? 'icon-revert' : '']" @click="unfold(category)">
                  <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path fill="currentColor" d="M10 12.5 5.583 8.083l.479-.5L10 11.521l3.938-3.938.479.5Z" /></svg>
                </span>
              </div>
              <!-- @start="drag = true" @update="update(category.children)" @end="drag = false"  -->
              <draggable v-model="category.children" item-key="menuSeq" @update="update(category.children)" :disabled="!editable" tag="ul" :class="{ unfold: category.unfold && !category.unfold2 }" ghost-class="ghost">
                <template #item="{ element: menu }">
                  <li :class="{ active: menu.active }">
                    <icon v-if="editable" :name="'DragHandle'" :viewBox="'-2 -2 24 24'"></icon>
                    <i v-else></i>
                    <span @click="edit(menu)">{{ menu.menuName }}</span>
                  </li>
                </template>
              </draggable>
              <div v-if="!editable" :class="{ add: true, active: form.parentMenuSeq.value === category.menuSeq && !form.menuSeq }" @click="add(category)">
                <span>
                  <icon :name="'Add'"></icon>
                  <span>메뉴 추가</span>
                </span>
              </div>
            </li>
          </template>
        </draggable>
      </div>
      <div>
        <div class="n">{{ form.depth.value === 2 ? "카테고리" : form.depth.value === 3 ? "메뉴" : "서비스" }} {{ form.menuSeq ? "수정" : "등록" }}</div>
        <div v-if="form.depth.value === 3">
          <div class="t">카테고리</div>
          <div class="v">
            <el-select v-model="form.parentMenuSeq.value" filterable placeholder="서비스 or 카테고리에만 해당">
              <el-option v-for="item in filteredMenuList.children" :key="item.menuSeq" :label="item.menuName" :value="item.menuSeq" />
            </el-select>
          </div>
        </div>
        <div>
          <div class="t">
            이름
            <span class="badge"></span>
          </div>
          <div class="v">
            <el-input v-model="form.menuName.value" ref="menuName" placeholder="제목" clearable :class="{ warning: !form.menuName.isVaild && !form.menuName.value }" />
            <span class="message" v-if="!form.menuName.isVaild && !form.menuName.value">{{ form.menuName.message }}</span>
          </div>
        </div>
        <div>
          <div class="t">
            URL
            <span class="badge"></span>
          </div>
          <div class="v">
            <el-input v-model="form.menuPath.value" placeholder="제목" clearable :class="{ warning: !form.menuName.isVaild && !form.menuName.value }" />
            <span class="message" v-if="!form.menuName.isVaild && !form.menuName.value">{{ form.menuName.message }}</span>
          </div>
        </div>
        <div v-if="form.depth.value === 3">
          <div class="t">
            API
            <span class="badge"></span>
          </div>
          <div class="v">
            <template v-for="(entry, i) in apiPathList">
              <el-input v-model="entry.apiPath" placeholder="API Path" clearable style="width: calc(100% - 30px); margin-bottom: 5px" />
              <icon style="margin-left: 5px; cursor: pointer" :name="'Delete'" @click="deleteAPI(i)"></icon>
            </template>
            <el-button size="small" @click="addAPI()">추가</el-button>
          </div>
        </div>
        <!-- <div>
          <div class="t">타입</div>
          <div class="v">
            <el-radio-group v-model="form.depth.value" class="ml-4">
              <el-radio :label="item.value" v-for="item in depthList">{{ item.label }}</el-radio>
            </el-radio-group>
          </div>
        </div> -->
        <div v-if="form.depth.value < 3">
          <div class="t">아이콘</div>
          <div class="v">
            <el-select v-model="form.icon.value" filterable placeholder="서비스 or 카테고리에만 해당">
              <el-option v-for="item in iconList" :key="item.name" :label="item.name" :value="item.name">
                <icon style="display: inline-block; vertical-align: middle; margin-right: 3px" :name="item.name"></icon>
                <span style="display: inline-block; vertical-align: middle">{{ item.name }}</span>
              </el-option>
            </el-select>
            <icon style="margin-left: 10px" :name="form.icon.value"></icon>
          </div>
        </div>
        <div>
          <div class="t">사용여부</div>
          <div class="v">
            <el-radio-group v-model="form.useYn.value" class="ml-4">
              <el-radio :label="item.value" v-for="item in useYnList">{{ item.label }}</el-radio>
            </el-radio-group>
          </div>
        </div>
        <div>
          <div class="t">노출 순서</div>
          <div class="v">
            <el-input v-model="form.sortNo.value" clearable />
          </div>
        </div>
        <div class="button">
          <template v-if="form.menuSeq">
            <el-button type="info" @click="del(form.menuSeq)" style="float: left">삭제</el-button>
            <el-button type="primary" @click="action('edit')">수정</el-button>
          </template>
          <template v-else>
            <el-button @click="action('add')" type="primary">등록</el-button>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, watch, inject, computed } from "vue";
import { ElMessage, ElMessageBox, getPositionDataWithUnit } from "element-plus";
import { storeToRefs } from "pinia";
import uxStore from "@/stores/ux";

import icons from "@/components/Common/ICon.json";

const emit = defineEmits(["title"]);
const store = inject("store");
const fetch = inject("fetch");
const fetchAsync = inject("fetchAsync");
const ux = uxStore();

emit("title", `서비스 및 메뉴 관리`, `분석 서비스 관리를 사용하는 서비스와 하위 메뉴를 등록 관리할 수 있습니다.`);

let depthList = [
  { value: 3, label: "메뉴" },
  { value: 2, label: "카테고리" },
];

let useYnList = [
  { value: "Y", label: "사용" },
  { value: "N", label: "사용안함" },
];

let iconList = Object.keys(icons).map((entry) => {
  return { name: entry, d: icons[entry].d };
});

let editable = ref(false);

let apiPathList = ref([]);

let init = {
  menuSeq: null,
  menuName: { value: null, isVaild: true, message: "입력값이 없습니다." },
  menuPath: { value: null, isVaild: true, message: "입력값이 없습니다." },
  icon: { value: "Default" },
  parentMenuSeq: { value: "" },
  parentMenuName: "",
  depth: { value: 2 },
  useYn: { value: "Y" },
  sortNo: { value: 0 },
};

let menuName = ref(null);
let selectedMenuSeq = ref(0);
let form = reactive(JSON.parse(JSON.stringify(init)));
let menu = fetch("/api/report/asmmenu", { size: 10000 });
let menuList = ref([]);

watch(
  () => form.menuSeq,
  async () => {
    if (form.depth.value === 3) {
      if (form.menuSeq) {
        let data = await fetchAsync("/api/report/asmmenuapipath/" + form.menuSeq);
        apiPathList.value = data.data.value;
      } else {
        apiPathList.value = [];
      }
    }
  }
);

watch(menu.data, () => {
  let data = menu.data.value ? menu.data : ref([]);
  data.value.sortKey("sortNo");

  if (data.value.length === 0) return data;
  let arr = data.value.filter((entry) => entry.depth === 1);
  arr.forEach((d1) => {
    d1.children = data.value.filter((d2) => d2.parentMenuSeq === d1.menuSeq);
    d1.children.forEach((d2) => {
      d2.children = data.value.filter((d3) => d3.parentMenuSeq === d2.menuSeq);
    });
  });

  if (!selectedMenuSeq.value) selectedMenuSeq.value = arr[0].menuSeq;

  menuList.value = arr;
});

let filteredMenuList = computed(() => menuList.value.find((entry) => entry.menuSeq === selectedMenuSeq.value));

watch(selectedMenuSeq, () => {
  edit(filteredMenuList.value);
});

function update(children) {
  let postData = [];

  children.forEach((entry, i) => {
    entry.sortNo = i + 1;
    postData.push({
      menuSeq: entry.menuSeq,
      sortNo: entry.sortNo,
    });
  });

  fetch("/api/report/asmmenu/sort", {}, postData, "put");
}

function unfold(category) {
  category.unfold = !category.unfold;
}

function add(entry) {
  form.menuSeq = init.menuSeq;
  form.menuName.value = init.menuName.value;
  form.menuPath.value = entry ? entry.menuPath : init.menuPath.value;
  form.icon.value = init.icon.value;
  if (entry) {
    form.parentMenuSeq.value = entry.menuSeq ? entry.menuSeq : init.parentMenuSeq.value;
    form.depth.value = entry.depth + 1;
  } else {
    form.parentMenuSeq.value = 0;
    form.depth.value = 1;
    form.sortNo.value = 0;
  }

  form.useYn.value = init.useYn.value;

  inactive();
  menuName.value.focus();
}

function edit(entry) {
  form.menuSeq = entry.menuSeq;
  form.menuName.value = entry.menuName;
  form.menuPath.value = entry.menuPath;
  form.icon.value = entry.icon;
  form.parentMenuSeq.value = entry.parentMenuSeq;
  form.depth.value = entry.depth;
  form.useYn.value = entry.useYn;
  form.sortNo.value = entry.sortNo;

  inactive();
  entry.active = true;
  menuName.value.focus();
}

function inactive() {
  menuList.value.forEach((d1) => {
    d1.active = false;
    d1.children.forEach((d2) => {
      d2.active = false;
      d2.children.forEach((d3) => {
        d3.active = false;
      });
    });
  });
}

function action(act) {
  form.menuName.isVaild = form.menuName.value ? true : false;
  form.menuPath.isVaild = form.menuPath.value ? true : false;

  let cnt = (form.menuName.isVaild ? 0 : 1) + (form.menuPath.isVaild ? 0 : 1);

  let page = {
    name: "서비스 및 메뉴 관리",
    actionName: act === "edit" ? "수정" : "등록",
    method: act === "edit" ? "put" : "post",
    actionURL: "/api/report/asmmenu",
    redirectRUL: "/admin/settings/menu",
  };

  if (cnt === 0) {
    ElMessageBox({
      title: `${page.name}`,
      message: `작성한 정보로 ${page.actionName}하시겠습니까?`,
      showCancelButton: true,
      confirmButtonText: "네",
      cancelButtonText: "아니요",
      beforeClose: async (action, instance, done) => {
        if (action === "confirm") {
          instance.confirmButtonLoading = true;
          instance.confirmButtonText = "Loading...";

          let postData = {
            menuName: form.menuName.value,
            menuPath: form.menuPath.value,
            icon: form.icon.value,
            parentMenuSeq: form.parentMenuSeq.value,
            depth: form.depth.value,
            useYn: form.useYn.value,
            sortNo: form.sortNo.value,
          };

          if (page.method === "put") {
            postData.menuSeq = form.menuSeq;
            page.actionURL = page.actionURL + "/" + form.menuSeq;
          }

          let { data, error } = await fetchAsync(page.actionURL, {}, postData, page.method);

          if (act === "edit") {
            let target = menu.data.value.find((entry) => entry.menuSeq === form.menuSeq);

            target.menuName = data.value.menuName;
            target.menuPath = data.value.menuPath;
            target.parentMenuSeq = data.value.parentMenuSeq;
            target.icon = data.value.icon;
            target.useYn = data.value.useYn;
            target.sortNo = data.value.sortNo;
          } else {
            menu.data.value.push(data.value);
          }

          apiPathList.value.forEach((path) => {
            path.menuSeq = data.value.menuSeq;
          });

          await fetchAsync("/api/report/asmmenuapipath/" + form.menuSeq, {}, {}, "delete");
          await fetchAsync("/api/report/asmmenuapipath", {}, apiPathList.value, "post");

          setTimeout(() => {
            done();
            // setTimeout(() => { instance.confirmButtonLoading = false;}, 300);
          }, 100);
        } else {
          done();
        }
      },
    }).then((action) => {
      ElMessage({
        type: "info",
        message: `${page.name}이 ${page.actionName}되었습니다.`,
        duration: 1200,
        "on-close": () => {},
      });
    });
  }
}

function del(menuSeq) {
  let type = form.depth.value === 1 ? "서비스" : form.depth.value === 2 ? "카테고리" : "메뉴";
  ElMessageBox.confirm(`"${form.menuName.value}"을 삭제하시겠습니까?`, type + "삭제", {
    confirmButtonText: "OK",
    cancelButtonText: "Cancel",
    type: "info",
  }).then(() => {
    let { data } = fetch("/api/report/asmmenu/" + menuSeq, {}, {}, "delete");

    watch(data, () => {
      if (data) {
        if (form.depth.value === 1) selectedMenuSeq.value = null;

        menu.data.value.splice(
          menu.data.value.findIndex((entry) => entry.menuSeq === menuSeq),
          1
        );

        ElMessage({
          type: "info",
          message: `${type} "${form.menuName.value}"이(가) 삭제되었습니다.`,
        });
      }
    });
  });
}

function addAPI() {
  apiPathList.value.push({
    menuSeq: form.menuSeq,
    apiPath: "",
  });
}
function deleteAPI(index) {
  apiPathList.value.splice(index, 1);
}
</script>
