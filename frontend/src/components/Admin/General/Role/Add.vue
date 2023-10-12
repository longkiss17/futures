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
    div.checked-list{
      padding: 5px;
      ul{
        li{
          position: relative; list-style: none; padding: 4px 10px 6px 10px; margin-bottom: 4px; font-size:12px; background-color: var(--bg-color-sub);
          &:hover{ background-color: var(--el-color-primary-light-9); font-family: 'noto-medium'; color: var(--color-active); cursor: pointer}
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
<template>
  <div class="board-add">
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
      <div class="t b">
        Role 코드
        <el-popover placement="right" :width="'auto'" trigger="hover" :content="'고유 코드값으로 알파벳 대문자로만 입력할 수 있으며, 등록 후 수정할 수 없습니다.'">
          <template #reference>
            <icon :width="20" :height="20" :name="'Help'"></icon>
          </template>
        </el-popover>
      </div>
      <div class="v">
        <el-input v-model="form.roleCode.value" placeholder="EX) BOARD_WRITER" clearable :class="{ warning: !form.roleCode.isVaild && !form.roleCode.value }" />
        <span class="message" v-if="!form.roleCode.isVaild && !form.roleCode.value">{{ form.roleCode.message }}</span>
      </div>
    </div>
    <div>
      <div class="t b">사용 메뉴 설정</div>
      <div class="v">
        <div class="menu">
          <div>
            <el-tree :width="'100%'" ref="treeRef" :data="menuList" @check="checkNode" show-checkbox :default-expanded-keys="expandedKeys" :default-checked-keys="checkedKeys" node-key="menuSeq" highlight-current :props="{ label: 'menuName' }" />
          </div>
          <div class="checked-list">
            <ul>
              <li v-for="entry in checkedNodes">
                <!-- <span class="name">{{ entry ? entry.fullName : "" }}</span>
                <span class="x" @click="removeNode(entry)"><icon :name="'Close'"></icon></span> -->
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
    <div v-if="route.params.id">
      <div class="t">권한 그룹 사용자</div>
      <div class="v">
        <div class="users" v-if="users && users.data && users.data.value">
          <span v-for="entry in users.data.value">{{ metaData.asmUserKey[entry.userKey] }} ({{ entry.userKey }})</span>
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
import { ref, reactive, watch, inject, computed } from "vue";
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
const { metaData } = storeToRefs(store);

const treeRef = ref(ElTree);
let checkedKeys = ref([]);

let page = {
  name: "ASM 권한 그룹(Role)",
  actionName: "등록",
  actionEnName: "Add",
  method: "post",
  apiURL: "/api/report/asmrole",
  actionURL: "/api/report/asmrole",
  redirectRUL: "/admin/general/role",
};

if (route.params.id) {
  page.actionName = "수정";
  page.actionEnName = "Edit";
  page.method = "put";
  page.actionURL = page.apiURL + "/" + route.params.id;

  let { data, error } = fetch(page.actionURL);

  watch(data, () => {
    if (data) {
      form.roleName.value = data.value.roleName;
      form.roleDesc.value = data.value.roleDesc;
      form.roleCode.value = data.value.roleCode;
    }
  });
}

emit("title", `${page.name} ${page.actionName}`, `Help Center 공지사항에 노출하는 공지 내용을 ${page.actionName}합니다`);

let menu = fetch("/api/report/asmmenu", { size: 10000 });
let users;
let roles;

watch(menu.data, () => {
  let data = menu.data.value ? menu.data.value : [];

  function getFullName(row) {
    let parent = data.find((d) => d.menuSeq === row.parentMenuSeq);

    let svg = `<svg height="20" viewBox="0 96 960 960" width="20"><path fill="currentColor" d="m384 780-15-15 189-189-189-189 15-15 204 204-204 204Z"/></svg>`;

    if (parent) {
      return getFullName(parent) + svg + `<span class="d ${row.sectionSeq ? "s" : ""}">${row.menuName}</span>`;
    } else return `<span class="d ${row.sectionSeq ? "s" : ""}">${row.menuName}</span>`;

    // if (parent) {
    //   return getFullName(parent) + " - " + row.menuName;
    // } else return row.menuName;
  }

  function getPriority(row) {
    let parent = data.find((d) => d.menuSeq === row.parentMenuSeq);

    if (parent) {
      return getPriority(parent) + (row.sortNo + 1) * (row.depth === 2 ? 100 : 10);
    } else return (row.sortNo + 1) * (row.depth === 1 ? 1000 : 100);
  }

  data.forEach((entry) => {
    entry.fullName = getFullName(entry);
    entry.priority = getPriority(entry);
  });

  data.sortKey("priority", 1);
});

let expandedKeys = [26];

let menuList = computed(() => {
  let data = menu.data.value ? menu.data.value : [];

  if (data.length > 0 && route.params.id) {
    roles = fetch("/api/report/asmrolemenu/" + route.params.id);
    users = fetch(`/api/report/asmroleuser/${route.params.id}`);

    watch(roles.data, () => {
      let arr = [];
      roles.data.value.forEach((entry) => {
        let c = data.find((d) => d.menuSeq === entry.menuSeq);

        checkedNodes.value.push(c);

        if (c.depth > 2) arr.push(entry.menuSeq);
        else {
          if (!data.find((d) => d.parentMenuSeq === c.menuSeq)) arr.push(entry.menuSeq);
        }
      });
      checkedKeys.value = arr;

      checkedNodes.value.sortKey("priority", 1);
    });
  }

  let arr = [
    {
      menuSeq: 0,
      menuName: "전체",
      children: [],
      parentMenuSeq: null,
    },
  ];

  arr[0].children = data.filter((entry) => entry.depth === 1);

  arr[0].children.forEach((d1) => {
    d1.children = data.filter((d2) => d2.parentMenuSeq === d1.menuSeq);
    d1.children.forEach((d2) => {
      d2.children = data.filter((d3) => d3.parentMenuSeq === d2.menuSeq);
    });
  });
  return arr;
});

let checkedNodes = ref([]);

function checkNode() {
  checkedNodes.value = treeRef.value.getCheckedNodes(false, true).filter((entry) => entry.menuSeq > 0);
}

function removeNode(entry) {
  treeRef.value.setChecked(entry.menuSeq);
  checkedNodes.value.splice(
    checkedNodes.value.findIndex((n) => n.menuSeq === entry.menuSeq),
    1
  );
}

let form = reactive({
  roleName: { value: "", isVaild: true, message: "Role 이름을 입력해주세요." },
  roleDesc: { value: "", isVaild: true, message: "Role 설명을 입력해주세요." },
  roleCode: { value: "", isVaild: true, message: "Role 코드를 입력해주세요." },
});

function action() {
  form.roleName.isVaild = form.roleName.value ? true : false;
  form.roleDesc.isVaild = form.roleDesc.value ? true : false;
  form.roleCode.isVaild = form.roleCode.value ? true : false;

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
            roleName: form.roleName.value,
            roleDesc: form.roleDesc.value,
            roleCode: form.roleCode.value,
          };

          if (page.method === "put") postData.roleSeq = parseInt(route.params.id);

          await fetchAsync(page.actionURL, {}, postData, page.method);

          let all = checkedNodes.value
            .filter((v) => v.menuSeq > 0)
            .map((v) => {
              return { menuSeq: v.menuSeq, roleCode: form.roleCode.value };
            });

          await fetchAsync("/api/report/asmrolemenus/" + form.roleCode.value, {}, all, "put");

          // await fetchAsync("/api/report/asmrolemenu/" + form.roleCode.value, {}, {}, "delete");
          // await fetchAsync("/api/report/asmrolemenus", {}, all, "post");

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
