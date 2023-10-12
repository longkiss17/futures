<!-- prettier-ignore -->
<style lang="scss" scoped>
  .board-add{
    div.menu{
      display: flex; 
      &>div{
        width:calc(40% - 10px); height: 500px; overflow: auto; border:solid 1px var(--border-color); border-radius: 4px;
        &:first-child{ margin-right: 20px}
        &:last-child{ width:calc(60% - 10px)}
      }
    }
    div.no-data{
      padding: 10px; color: var(--text-color-thin);
    }
    div.checked-list{
      padding: 5px;
      ul{
        li{
          position: relative; list-style: none; padding: 4px 10px 6px 10px; margin-bottom: 4px; font-size:12px; background-color: var(--bg-color-sub);
          &:hover{ background-color: var(--el-color-primary-light-9); color: var(--color-active); cursor: pointer }
          span.name{
            display: inline-block; vertical-align: middle; line-height: 20px;
            &>span{ display: inline-block}
            span.x{ position: absolute; right:0px}
          }
        }
      }          
    }
    div.users{
      span{
        display: inline-block;  width:calc(25% - 30px); margin: 5px; padding: 5px 10px; font-size: 12px; background-color: var(--bg-color-sub);
      }
    }    
  }
</style>
<!-- prettier-ignore -->
<style lang="scss">
.el-tree-node__content { color: var(--text-color-bold)}
.section > .el-tree-node__content { color: rgba(var(--default-color), .6)}
.el-tree-node.is-expanded.section > .el-tree-node__children {
  display: flex;
  flex-direction: row;
}
.section > .el-tree-node__children > div { width: 25%}

.tree-item {
  span { display: inline-block; vertical-align: middle}
  svg{ display: inline-block; vertical-align: middle}
  .d { color: var(--text-color-bold)}
  .s { color: rgba(var(--default-color), .6)}
}
</style>
<template>
  <div class="board-add">
    <div>
      <div class="t b">
        Role 유형
        <el-popover placement="right" :width="'auto'" trigger="hover" :content="'Exclude : 선택한 메뉴만 조회되고, 나머지는 모두 미노출<br>Private : Private으로 설정한 메뉴는 다른 사용자에게 미노출, P Role 보유자에게만 노출'">
          <template #reference>
            <icon :width="20" :height="20" :name="'Help'"></icon>
          </template>
        </el-popover>
      </div>
      <div class="v">
        <el-radio-group v-model="form.roleType.value" class="ml-4">
          <el-radio :label="item.value" v-for="item in roleTypeList">{{ item.label }}</el-radio>
        </el-radio-group>
      </div>
    </div>
    <div>
      <div class="t b">대상 게임 및 토픽</div>
      <div class="v">
        <el-select v-model="form.serviceSeq.value" filterable placeholder="대상 게임 및 토픽 선택" style="width: 260px" :class="{ warning: !form.serviceSeq.isVaild && !form.serviceSeq.value }" :disabled="route.query.s ? true : false">
          <el-option-group v-for="group in serviceGroup.filter((entry, i) => i > 0)" :key="group.label" :label="group.label">
            <el-option v-for="item in group.options" :key="item.key" :label="item.label" :value="item.key" />
          </el-option-group>
        </el-select>
        <br />
        <span class="message" v-if="!form.serviceSeq.isVaild && !form.serviceSeq.value">{{ form.serviceSeq.message }}</span>
      </div>
    </div>
    <div>
      <div class="t b">Role 이름</div>
      <div class="v">
        <el-input v-model="form.roleName.value" placeholder="EX) 000 관리자" clearable :class="{ warning: !form.roleName.isVaild && !form.roleName.value }" />
        <span class="message" v-if="!form.roleName.isVaild && !form.roleName.value">{{ form.roleName.message }}</span>
      </div>
    </div>
    <div>
      <div class="t b">
        Role 설명
        <el-popover placement="right" :width="'auto'" trigger="hover" :content="'Role 지급 시 참고할 수 있도록 설명란을 꼭 기입해주세요.'">
          <template #reference>
            <icon :width="20" :height="20" :name="'Help'"></icon>
          </template>
        </el-popover>
      </div>
      <div class="v">
        <el-input v-model="form.roleDesc.value" placeholder="EX) 000 메뉴 접근 가능" clearable :class="{ warning: !form.roleDesc.isVaild && !form.roleDesc.value }" />
        <span class="message" v-if="!form.roleDesc.isVaild && !form.roleDesc.value">{{ form.roleDesc.message }}</span>
      </div>
    </div>
    <div>
      <div class="t b">사용 메뉴 설정</div>
      <div class="v">
        <div class="menu">
          <div v-if="menuList.length">
            <el-tree :width="'100%'" ref="treeRef" :data="menuList" @check="checkNode" show-checkbox :default-expanded-keys="expandedKeys" :default-checked-keys="checkedKeys" node-key="menuKey" highlight-current :props="{ label: 'menuName', class: customNodeClass }" />
          </div>
          <div v-else>
            <skeleton v-if="route.params.id" :count="1" :style="{ width: '100%', height: '100%' }"></skeleton>
            <div class="no-data" v-else>대상 게임 및 토픽 선택</div>
          </div>
          <div class="checked-list">
            <ul>
              <li v-for="entry in checkedNodes">
                <span class="name">
                  <span class="tree-item" v-html="entry ? entry.fullName : ''"></span>
                  <span class="x" @click="removeNode(entry)" style="margin-top: 0px"><icon :name="'Close'"></icon></span>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div v-if="route.params.id && users && users.data && users.data.value && users.data.value.length">
      <div class="t">권한 그룹 사용자</div>
      <div class="v">
        <div class="users">
          <span v-for="entry in users.data.value">{{ userKey[entry.userKey] }} ({{ entry.userKey }})</span>
        </div>
      </div>
    </div>
    <div>
      <div class="button">
        <el-button @click="cancel">취소</el-button>
        <el-button type="primary" @click="action">{{ page.actionName }}</el-button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, watch, inject, nextTick } from "vue";
import { useRouter, useRoute } from "vue-router";
import { ElMessageBox } from "element-plus";
import { storeToRefs } from "pinia";
import { ElTree } from "element-plus";
import message from "@/stores/message";

const emit = defineEmits(["title"]);
const router = useRouter();
const route = useRoute();
const store = inject("store");
const fetch = inject("fetch");
const fetchAsync = inject("fetchAsync");
const { serviceGroup, metaData } = storeToRefs(store);

const treeRef = ref(ElTree);
let checkedKeys = ref([]);

let page = {
  name: "리포트 권한 그룹(Role)",
  actionName: "등록",
  actionEnName: "Add",
  method: "post",
  apiURL: "/api/report/role",
  actionURL: "/api/report/role",
  redirectRUL: "/nxlogreport/permission/role",
};

if (route.params.id) {
  page.actionName = "수정";
  page.actionEnName = "Edit";
  page.method = "put";
  page.actionURL = page.apiURL + "/" + route.params.id;

  let { data, error } = fetch(page.actionURL);

  watch(data, () => {
    if (data) {
      form.serviceSeq.value = data.value.serviceSeq.toString();
      form.roleName.value = data.value.roleName;
      form.roleDesc.value = data.value.roleDesc;
      form.roleType.value = data.value.roleType;
    }
  });
}

emit("title", `${page.name} ${page.actionName}`, `Help Center 공지사항에 노출하는 공지 내용을 ${page.actionName}합니다`);

let form = reactive({
  serviceSeq: { value: null, isVaild: true, message: "대상 게임 및 토픽을 선택해주세요." },
  roleName: { value: "", isVaild: true, message: "Role 이름을 입력해주세요." },
  roleDesc: { value: "", isVaild: true, message: "Role 설명을 입력해주세요." },
  roleType: { value: "E", isVaild: true, message: "Role 코드를 입력해주세요." },
});

let roleTypeList = Object.keys(metaData.value.roleType)
  .map((key) => {
    return { value: key, label: metaData.value.roleType[key] };
  })
  .sortKey("value", 1);

let menu = reactive({});
let users;
let roles;
let expandedKeys = [0];
let menuList = ref([]);
let checkedNodes = ref([]);
let userKeys = reactive({});
let userKey = reactive({});

if (route.query.s) {
  menu = fetch("/api/report/roleservicereports/" + route.query.s, { size: 10000 });
  userKeys = fetch("/api/report/meta/userKey", { size: 10000 });
}

watch(form.serviceSeq, async () => {
  if (!route.query.s) {
    menu = await fetchAsync("/api/report/roleservicereports/" + form.serviceSeq.value, { size: 10000 });
    createMenuList();
  }
});

watch(menu.data, () => {
  createMenuList();
});

watch(userKeys.data, () => {
  userKeys.data.value.userKey.metaValues.forEach((entry) => {
    userKey[entry.key] = entry.value;
  });
});

function customNodeClass(data, Node) {
  if (data.sectionSeq) {
    return "section";
  }
  return null;
}

function createMenuList() {
  let data = menu.data.value ? menu.data.value : [];

  function getFullName(row) {
    let parent = data.find((d) => d.menuSeq === row.parentMenuSeq);
    // if (row.depth === 4) {
    //   parent = data.find((d) => d.menuSeq === row.menuSeq && d.parentMenuSeq === row.parentMenuSeq && d.depth === 3);
    // }

    parent = data.find((d) => d.menuSeq === row.parentMenuSeq);

    let svg = `<svg height="20" viewBox="0 96 960 960" width="20"><path fill="currentColor" d="m384 780-15-15 189-189-189-189 15-15 204 204-204 204Z"/></svg>`;

    if (parent) {
      return getFullName(parent) + svg + `<span class="d ${row.sectionSeq ? "s" : ""}">${row.menuName}</span>`;
    } else return `<span class="d ${row.sectionSeq ? "s" : ""}">${row.menuName}</span>`;
  }

  function getPriority(row) {
    let parent = data.find((d) => d.menuSeq === row.parentMenuSeq);

    if (parent) {
      return getPriority(parent) + (row.sortNo + 1) * (row.depth === 2 ? 1000 : 10);
    } else return (row.sortNo + 1) * (row.depth === 1 ? 10000 : 1000);
  }

  data.forEach((entry) => {
    entry.menuKey = entry.menuKey;
    entry.menuName = entry.menuName.toHtmlEncode();
    entry.fullName = getFullName(entry).toHtmlEncode();
    entry.priority = getPriority(entry);
  });

  data.sortKey("priority", 1);

  if (data.length > 0 && route.params.id) {
    roles = fetch("/api/report/rolemenu/" + route.params.id);
    users = fetch(`/api/report/roleuser/${route.params.id}`);

    watch(roles.data, () => {
      let arr = [];
      let arr2 = [];
      roles.data.value.forEach((entry) => {
        entry.menuKey = entry.menuSeq + "_" + entry.sectionSeq;

        let c = data.find((d) => d.menuKey === entry.menuKey);

        if (!c) console.log(entry);

        //checkedNodes.value.push(c);

        if (c.depth > 2) {
          arr.push(entry.menuKey);
          arr2.push(entry);
        } else {
          if (!data.find((d) => d.parentMenuSeq === c.menuSeq)) {
            arr.push(entry.menuKey);
            arr2.push(entry);
          }
        }
      });
      checkedKeys.value = arr;

      console.log("arr", arr);
      console.log("arr2", arr2);

      //checkedNodes.value.sortKey("priority", 1);
    });
  }

  let arr = [
    {
      menuKey: 0,
      menuSeq: 0,
      menuName: "전체",
      children: [],
      parentMenuSeq: null,
    },
  ];

  arr[0].children = data.filter((entry) => entry.depth === 1);

  // arr[0].children.forEach((d1) => {
  //   d1.children = data.filter((d2) => d2.parentMenuSeq === d1.menuSeq);
  //   d1.children.forEach((d2) => {
  //     d2.children = data.filter((d3) => d3.parentMenuSeq === d2.menuSeq);
  //   });
  // });

  // arr[0].children.forEach((d1) => {
  //   d1.children = data.filter((d2) => d2.parentMenuSeq === d1.menuSeq && d2.depth === 2);
  //   d1.children.forEach((d2) => {
  //     d2.children = data.filter((d3) => d3.parentMenuSeq === d2.menuSeq && d3.sectionSeq === 0 && d3.depth === 3);
  //     d2.children.forEach((d3) => {
  //       d3.children = data.filter((d4) => d4.parentMenuSeq === d3.parentMenuSeq && d4.menuSeq === d3.menuSeq && d4.depth === 4);
  //     });
  //   });
  // });

  arr[0].children.forEach((d1) => {
    d1.children = data.filter((d2) => d2.parentMenuSeq === d1.menuSeq && d2.depth === 2);
    d1.children.forEach((d2) => {
      d2.children = data.filter((d3) => d3.parentMenuSeq === d2.menuSeq && d3.depth === 3);
      d2.children.forEach((d3) => {
        d3.children = data.filter((d4) => d4.parentMenuSeq === d3.menuSeq && d4.depth === 4);
      });
    });
  });

  console.log(arr);

  menuList.value = arr;

  nextTick(() => {
    setTimeout(() => {
      checkedNodes.value = treeRef.value.getCheckedNodes(true, true).filter((entry) => entry.menuSeq > 0);
    }, 100);
  });
}

function checkNode() {
  checkedNodes.value = treeRef.value.getCheckedNodes(true, true).filter((entry) => entry.menuSeq > 0);
}

function removeNode(entry) {
  treeRef.value.setChecked(entry.menuSeq);

  checkedNodes.value.splice(
    checkedNodes.value.findIndex((n) => n.menuSeq === entry.menuSeq),
    1
  );
}

function action() {
  form.roleName.isVaild = form.roleName.value ? true : false;
  form.roleDesc.isVaild = form.roleDesc.value ? true : false;
  form.roleType.isVaild = form.roleType.value ? true : false;

  let cnt = Object.keys(form).filter((key) => form[key].isVaild !== undefined && form[key].isVaild === false).length;

  if (cnt === 0) {
    ElMessageBox({
      title: `${page.name} ${page.actionName}`,
      // message: h("p", null, [h("span", null, "Message can be "), h("i", { style: "color: teal" }, "VNode")]),
      message: `작성한 정보로 ${page.actionName}하시겠습니까?`,
      showCancelButton: true,
      confirmButtonText: "네",
      cancelButtonText: "아니요",
      beforeClose: async (action, instance, done) => {
        if (action === "confirm") {
          instance.confirmButtonLoading = true;
          instance.confirmButtonText = "Loading...";

          let postData = {
            serviceSeq: form.serviceSeq.value,
            roleName: form.roleName.value,
            roleDesc: form.roleDesc.value,
            roleType: form.roleType.value,
          };

          if (page.method === "put") postData.roleSeq = parseInt(route.params.id);

          let { data, error } = await fetchAsync(page.actionURL, {}, postData, page.method);
          await fetchAsync("/api/report/rolemenu/" + data.value.roleSeq, {}, {}, "delete");
          let all = checkedNodes.value
            .filter((v) => v.menuSeq > 0)
            .map((v) => {
              return { menuSeq: v.menuSeq, roleSeq: data.value.roleSeq, detailSeq: 0, useYn: "Y", reportSeq: v.reportSeq, sectionSeq: v.sectionSeq };
            });
          await fetchAsync("/api/report/rolemenus", {}, all, "post");

          setTimeout(() => {
            done();
            setTimeout(() => {
              instance.confirmButtonLoading = false;
            }, 300);
          }, 500);
        } else {
          done();
        }
      },
    }).then((action) => {
      router.push({ path: page.redirectRUL });
      message("success", `${page.name}이 ${page.actionName}되었습니다.`);
    });
  }
}

function cancel() {
  let cnt = Object.keys(form).filter((key) => form[key].isVaild && form[key].value).length;

  if (!route.params.id && cnt > 0) {
    message("cancel", page.actionName, router.back);
  } else {
    router.back();
  }
}
</script>
