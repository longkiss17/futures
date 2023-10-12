<!-- prettier-ignore -->
<style lang="scss" scoped>
  .board-add{
    &>div{
      display: flex; padding: 10px 0; border-bottom: solid 1px var(--border-color);    
      &:last-child{border:none}
      div.t{
        position: relative; width:200px; padding: 5px 10px 5px 30px; font-size: 13px; font-family: 'noto-medium';
        .badge{ position: absolute; left:25px; top: 5px;; display: inline-block; width:4px; height:4px; border-radius: 50px; background-color:var(--text-color-red)}
        svg{display: inline-block; vertical-align: middle; margin-top: -2px;}
      }
      div.v{
        width:calc(100% - 200px);
        div.editor{
          border: solid 1px var(--border-color); border-radius: 4px; padding: 2px; 
        }
        div.editor-warning{
          border: solid 1px var(--text-color-red);
        }
      }
      div.button{
        width:100%; text-align: right;
      }
    }
    div.step{
      padding:10px 10px 10px 10px; margin-top: 50px; font-family: 'noto-medium'; font-size: 12px; color:var(--text-color-bold); border-bottom: solid 1px var(--border-color-light); border-left: solid 1px var(--border-color); background-color: var(--bg-color-sub);
    }
    div.step:first-child{
      margin-top: 0px;
    }
    .message{
      display: inline-block; color:var(--text-color-red); font-size: 12px; padding: 3px 0;
    }
  }
</style>
<template>
  <div class="board-add">
    <div class="step no-bb">기본 정보</div>
    <div>
      <div class="t">
        서비스 카테고리
        <span class="badge"></span>
        <el-popover placement="right" :width="'auto'" trigger="hover" :content="'게임/토픽 여부를 선택해주세요'">
          <template #reference>
            <icon :width="20" :height="20" style="margin-top: -4px" :name="'Help'"></icon>
          </template>
        </el-popover>
      </div>
      <div class="v">
        <el-radio-group v-model="form.gameType.value" class="ml-4">
          <el-radio :label="item.value" v-for="item in gameTypeList">{{ item.label }}</el-radio>
        </el-radio-group>
      </div>
    </div>
    <div>
      <div class="t">
        게임/토픽명
        <span class="badge"></span>
        <el-popover placement="right" :width="'auto'" trigger="hover" :content="'한국어 기준으로 노출될 이름입니다.'">
          <template #reference>
            <icon :width="20" :height="20" style="margin-top: -4px" :name="'Help'"></icon>
          </template>
        </el-popover>
      </div>
      <div class="v">
        <el-input v-model="form.gameName.value" placeholder="제목" clearable :class="{ warning: !form.gameName.isVaild && !form.gameName.value }" />
        <span class="message" v-if="!form.gameName.isVaild && !form.gameName.value">{{ form.gameName.message }}</span>
      </div>
    </div>
    <div>
      <div class="t">
        지역
        <span class="badge"></span>
        <el-popover placement="right" :width="'auto'" trigger="hover">
          <span>
            게임의 경우 서비스 지역을 선택해주세요.
            <br />
            토픽일 경우 대한민국으로 기본 설정됩니다.
          </span>
          <template #reference>
            <icon :width="20" :height="20" style="margin-top: -4px" :name="'Help'"></icon>
          </template>
        </el-popover>
      </div>
      <div class="v">
        <el-select v-model="form.regionId.value" filterable placeholder="서비스 or 카테고리에만 해당" :disabled="form.regionId.disabled">
          <el-option v-for="item in regionIdList" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </div>
    </div>
    <div>
      <div class="t">
        지원 플랫폼
        <el-popover placement="right" :width="'auto'" trigger="hover">
          <span>
            등록 게임이 지원하는 플랫폼 입니다.
            <br />
            복수로 선택할 수 있으며, Front에서 게임별 지원현황 표기 시 사용됩니다.
          </span>
          <template #reference>
            <icon :width="20" :height="20" style="margin-top: -4px" :name="'Help'"></icon>
          </template>
        </el-popover>
      </div>
      <div class="v">
        <el-checkbox-group v-model="form.gamePlatform.value">
          <el-checkbox :label="item.label" :value="item.value" v-for="item in gamePlatformList" />
        </el-checkbox-group>
      </div>
    </div>
    <div class="no-bb">
      <div class="t">
        대표 이미지
        <span class="badge"></span>
        <el-popover placement="right" :width="'auto'" trigger="hover" :content="'리포트 각 페이지에서 게임/토픽을 아이콘으로 특정할 때 사용됩니다.'">
          <template #reference>
            <icon :width="20" :height="20" style="margin-top: -4px" :name="'Help'"></icon>
          </template>
        </el-popover>
      </div>
      <div class="v">
        <template v-if="form.logoImage.value.length > 0">
          <img :src="form.logoImage.value[0].response.location" alt="" width="70" height="70" style="vertical-align: middle" />
          <icon :name="'Close'" @click="form.logoImage.value = []" style="vertical-align: middle; cursor: pointer"></icon>
        </template>
        <template v-else>
          <el-upload v-model:file-list="form.logoImage.value" class="upload-demo" :action="uploadUrl" :with-credentials="true" :limit="1">
            <el-button :type="!form.logoImage.isVaild && !form.logoImage.value.length ? 'danger' : ''" class="button-new-tag ml-1" size="small">파일 첨부</el-button>
            <template #tip>
              <div class="el-upload__tip">1개 파일 jpg, png 만 허용, 파일 용량 200KB이하, 권장 사이즈 70 X 70</div>
            </template>
          </el-upload>
        </template>
        <span class="message" v-if="!form.logoImage.isVaild && !form.logoImage.value.length">{{ form.logoImage.message }}</span>
      </div>
    </div>
    <div class="step no-bb">사용 코드 정보</div>
    <div>
      <div class="t">
        고유번호
        <span class="badge"></span>
      </div>
      <div class="v">
        <el-input v-model="form.serviceSeq.value" placeholder="제목" clearable :class="{ warning: !form.serviceSeq.isVaild && !form.serviceSeq.value }" />
        <span class="message" v-if="!form.serviceSeq.isVaild && !form.serviceSeq.value">{{ form.serviceSeq.message }}</span>
      </div>
    </div>
    <div>
      <div class="t">
        GameCodeID
        <span class="badge"></span>
      </div>
      <div class="v">
        <el-input v-model="form.gameCodeId.value" placeholder="제목" clearable :class="{ warning: !form.gameCodeId.isVaild && !form.gameCodeId.value }" />
        <span class="message" v-if="!form.gameCodeId.isVaild && !form.gameCodeId.value">{{ form.gameCodeId.message }}</span>
      </div>
    </div>
    <div class="no-bb">
      <div class="t">
        ServiceID
        <span class="badge"></span>
      </div>
      <div class="v">
        <el-input v-model="form.serviceId.value" placeholder="제목" clearable :class="{ warning: !form.serviceId.isVaild && !form.serviceId.value }" />
        <span class="message" v-if="!form.serviceId.isVaild && !form.serviceId.value">{{ form.serviceId.message }}</span>
      </div>
    </div>
    <div class="step no-bb">리포트 속성</div>
    <div>
      <div class="t">
        권한 승인 유형
        <span class="badge"></span>
        <el-popover placement="right" :width="'auto'" trigger="hover">
          <span>
            일반 승인의 경우 기존 권한 프로세스에 함께 적용
            <br />
            별도 승인의 경우 권한 프로세스가 분리되어 운영
          </span>
          <template #reference>
            <icon :width="20" :height="20" style="margin-top: -4px" :name="'Help'"></icon>
          </template>
        </el-popover>
      </div>
      <div class="v">
        <el-radio-group v-model="form.requireConfirmationYn.value" class="ml-4">
          <el-radio :label="item.value" v-for="item in requireConfirmationYnList">{{ item.label }}</el-radio>
        </el-radio-group>
      </div>
    </div>
    <div>
      <div class="t">
        Home 유형
        <span class="badge"></span>
        <el-popover placement="right" :width="'auto'" trigger="hover" :content="'우측 번호는 리포트 번호 이며, 선택 유형에 따라 Home에서 제공되는 지표가 설정 됩니다.'">
          <template #reference>
            <icon :width="20" :height="20" style="margin-top: -4px" :name="'Help'"></icon>
          </template>
        </el-popover>
      </div>
      <div class="v">
        <el-radio-group v-model="form.gameHome.value" class="ml-4">
          <el-radio :label="item.value" v-for="item in gameHomeList">{{ item.label }}</el-radio>
        </el-radio-group>
      </div>
    </div>
    <div>
      <div class="t">
        URL (중복불가)
        <span class="badge"></span>
      </div>
      <div class="v">
        <el-input v-model="form.gamePath.value" placeholder="제목" clearable :class="{ warning: !form.gamePath.isVaild }" @change="blurURL()" />
        <span class="message" v-if="!form.gamePath.isVaild">{{ form.gamePath.message }}</span>
        <!-- && !form.gamePath.value -->
      </div>
    </div>
    <div>
      <div class="t">
        사용 회원 Key
        <span class="badge"></span>
        <el-popover placement="right" :width="'auto'" trigger="hover">
          <span>
            등록 게임이 지원하는 회원 Key를 선택합니다.
            <br />
            회원Key와 관계없는 리포트(Topic 등)의 경우 미사용을 선택해주세요.
          </span>
          <template #reference>
            <icon :width="20" :height="20" style="margin-top: -4px" :name="'Help'"></icon>
          </template>
        </el-popover>
      </div>
      <div class="v">
        <el-radio-group v-model="form.nxlogUserkey.value" class="ml-4">
          <el-radio :label="item.value" v-for="item in nxlogUserkeyList">{{ item.label }}</el-radio>
        </el-radio-group>
      </div>
    </div>
    <div class="no-bb">
      <div class="t">
        유저/캐릭터 기반 여부
        <span class="badge"></span>
      </div>
      <div class="v">
        <el-radio-group v-model="form.nxlogAccountType.value" class="ml-4">
          <el-radio :label="item.value" v-for="item in nxlogAccountTypeList">{{ item.label }}</el-radio>
        </el-radio-group>
      </div>
    </div>
    <div class="step">상태 관리</div>
    <div>
      <div class="t">
        사용 여부
        <span class="badge"></span>
      </div>
      <div class="v">
        <el-radio-group v-model="form.useYn.value" class="ml-4">
          <el-radio :label="item.value" v-for="item in useYnList">{{ item.label }}</el-radio>
        </el-radio-group>
      </div>
    </div>
    <div>
      <div class="t">
        서비스 상태
        <span class="badge"></span>
      </div>
      <div class="v">
        <el-radio-group v-model="form.closedYn.value" class="ml-4">
          <el-radio :label="item.value" v-for="item in closedYnList">{{ item.label }}</el-radio>
        </el-radio-group>
      </div>
    </div>
    <div>
      <div class="t">
        노출 여부
        <span class="badge"></span>
      </div>
      <div class="v">
        <el-radio-group v-model="form.displayYn.value" class="ml-4">
          <el-radio :label="item.value" v-for="item in displayYnList">{{ item.label }}</el-radio>
        </el-radio-group>
      </div>
    </div>
    <div style="padding-bottom: 100px">
      <div class="button">
        <el-button @click="cancel">취소</el-button>
        <el-button type="primary" @click="action">{{ page.actionName }}</el-button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive, watch, inject } from "vue";
import { useRouter, useRoute } from "vue-router";
import { ElMessageBox, ElMessage } from "element-plus";
import { storeToRefs } from "pinia";
import uxStore from "@/stores/ux";
import message from "@/stores/message";

const emit = defineEmits(["title"]);
const router = useRouter();
const route = useRoute();
const store = inject("store");
const fetch = inject("fetch");
const ux = uxStore();
const { serviceGroup, metaData } = storeToRefs(store);

const uploadUrl = window.config.uploadUrl;

let page = {
  name: "게임 및 토픽",
  actionName: "등록",
  actionEnName: "Add",
  method: "post",
  apiURL: "/api/report/game",
  actionURL: "/api/report/game",
  redirectRUL: "/nxlogreport/settings/game",
};

emit("title", `${page.name} ${page.actionName}`, `NXLog리포트에서 제공할 게임/토픽 공간을 ${page.actionName}할 수 있습니다.`);

let gameList = fetch("/api/report/game", { size: 10000, sort: "serviceSeq,desc" });

if (route.params.id) {
  page.actionName = "수정";
  page.actionEnName = "Edit";
  page.method = "put";
  page.actionURL = page.apiURL + "/" + route.params.id;

  let { data, error } = fetch(page.actionURL);

  watch(data, () => {
    if (data) {
      let result = data.value[0];

      form.serviceSeq.value = result.serviceSeq;
      form.gameType.value = result.gameType;
      form.gameName.value = result.gameName;
      form.regionId.value = result.regionId;
      form.gamePlatform.value = result.gamePlatform ? result.gamePlatform.split("|") : [];
      form.logoImage.value = [{ name: result.logoImage, response: { location: result.logoImage } }];
      form.serviceSeq.value = result.serviceSeq;
      form.gameCodeId.value = result.gameCodeId;
      form.serviceId.value = result.serviceId;
      form.requireConfirmationYn.value = result.requireConfirmationYn;
      form.gamePath.value = result.gamePath;
      form.nxlogUserkey.value = result.nxlogUserkey;
      form.nxlogAccountType.value = result.nxlogAccountType;
      form.useYn.value = result.useYn;
      form.closedYn.value = result.closedYn;
      form.displayYn.value = result.displayYn;
      form.gameHome.value = result.reportSeq.toString();
    }
  });
}

let gameTypeList = Object.keys(metaData.value.gameType)
  .map((key) => {
    return { value: key, label: metaData.value.gameType[key], sortNo: key === "PC" ? 1 : key === "MOBILE" ? 2 : 3 };
  })
  .sortKey("sortNo", 1);

let regionIdList = Object.keys(metaData.value.regionId).map((key) => {
  return { value: key, label: metaData.value.regionId[key] };
});

let gamePlatformList = Object.keys(metaData.value.gamePlatform).map((key) => {
  return { value: key, label: metaData.value.gamePlatform[key] };
});

let requireConfirmationYnList = Object.keys(metaData.value.gameRequireConfirmationYn)
  .map((key) => {
    return { value: key, label: metaData.value.gameRequireConfirmationYn[key] };
  })
  .sortKey("value", 1);

let gameHomeList = Object.keys(metaData.value.gameHome)
  .map((key) => {
    return { value: key, label: metaData.value.gameHome[key] };
  })
  .sortKey("value", -1);

let nxlogUserkeyList = Object.keys(metaData.value.nxlogUserkey)
  .map((key) => {
    return { value: key, label: metaData.value.nxlogUserkey[key], sortNo: key === "nexonsn" ? 1 : key === "npsn" ? 2 : 3 };
  })
  .sortKey("sortNo", 1);

let nxlogAccountTypeList = Object.keys(metaData.value.gameNXLogAccountType).map((key) => {
  return { value: key, label: metaData.value.gameNXLogAccountType[key] };
});

let useYnList = Object.keys(metaData.value.gameUseYn).map((key) => {
  return { value: key, label: metaData.value.gameUseYn[key] };
});

let displayYnList = Object.keys(metaData.value.gameUseYn).map((key) => {
  return { value: key, label: metaData.value.gameUseYn[key] };
});

let closedYnList = Object.keys(metaData.value.gameClosedYn)
  .map((key) => {
    return { value: key, label: metaData.value.gameClosedYn[key] };
  })
  .sortKey("value", 1);

let form = reactive({
  gameType: { value: "PC" },
  gameName: { value: "", isVaild: true, message: "게임/토픽명을 입력해주세요." },
  regionId: { value: "KOR" },
  gamePlatform: { value: [] },
  logoImage: { value: [], isVaild: true, message: "대표 이미지를 업로드해주세요." },
  serviceSeq: { value: "", isVaild: true, message: "고유번호를 입력해주세요." },
  serviceId: { value: "", isVaild: true, message: "ServiceID를 입력해주세요." },
  gameCodeId: { value: "", isVaild: true, message: "GameCodeID를 입력해주세요." },
  requireConfirmationYn: { value: "N" },
  gameHome: { value: "4221" },
  gamePath: { value: "", isVaild: true, message: "URL을 입력해주세요." },
  nxlogUserkey: { value: "nexonsn" },
  nxlogAccountType: { value: "user" },
  useYn: { value: "Y" },
  closedYn: { value: "N" },
  displayYn: { value: "Y" },
});

watch(
  () => form.gameType.value,
  () => {
    if (form.gameType.value === "TOPIC") {
      form.regionId.value = "KOR";
      form.regionId.disabled = true;
    } else {
      form.regionId.disabled = false;
    }
  }
);

function blurURL() {}

watch(
  () => form.gamePath.value,
  () => {
    if (
      gameList.data.value &&
      gameList.data.value
        .filter((entry) => {
          if (route.params.id) return entry.serviceSeq.toString() !== route.params.id;
          else return true;
        })
        .some((entry) => entry.gamePath === form.gamePath.value)
    ) {
      form.gamePath.message = "이미 사용중인 URL입니다.";
      form.gamePath.isVaild = false;
    } else {
      form.gamePath.message = "URL을 입력해주세요.";
      form.gamePath.isVaild = true;
    }
  }
);

watch(gameList.data, () => {
  if (!route.params.id) {
    form.serviceSeq.value = gameList.data.value[0].serviceSeq + 1;
  }
});

function action() {
  form.gameName.isVaild = form.gameName.value ? true : false;
  form.logoImage.isVaild = form.logoImage.value.length ? true : false;
  form.serviceSeq.isVaild = form.serviceSeq.value ? true : false;
  form.serviceId.isVaild = form.serviceId.value ? true : false;
  form.gameCodeId.isVaild = form.gameCodeId.value ? true : false;
  form.gamePath.isVaild = form.gamePath.value ? true : false;

  let cnt = Object.keys(form).filter((key) => form[key].isVaild !== undefined && form[key].isVaild === false).length;

  if (cnt === 0) {
    ElMessageBox({
      title: `${page.name} ${page.actionName}`,
      message: `작성한 정보로 ${page.actionName}하시겠습니까?`,
      showCancelButton: true,
      confirmButtonText: "네",
      cancelButtonText: "아니요",
      beforeClose: async (action, instance, done) => {
        if (action === "confirm") {
          instance.confirmButtonLoading = true;
          instance.confirmButtonText = "Loading...";

          let postData = {
            gameType: form.gameType.value,
            gameName: form.gameName.value,
            regionId: form.regionId.value,
            gamePlatform: form.gamePlatform.value.join("|"),
            logoImage: form.logoImage.value[0].response.location,
            serviceSeq: form.serviceSeq.value,
            serviceId: form.serviceId.value,
            gameCodeId: form.gameCodeId.value,
            requireConfirmationYn: form.requireConfirmationYn.value,
            reportSeq: form.gameHome.value,
            gamePath: form.gamePath.value,
            nxlogUserkey: form.nxlogUserkey.value,
            nxlogAccountType: form.nxlogAccountType.value,
            useYn: form.useYn.value,
            closedYn: form.closedYn.value,
            displayYn: form.displayYn.value,
            reportSeq: form.gameHome.value,
          };

          if (page.method === "put") postData.serviceSeq = parseInt(route.params.id);

          let { data, error } = fetch(page.actionURL, {}, postData, page.method);

          watch(data, () => {
            if (data) {
              setTimeout(() => {
                done();
                setTimeout(() => {
                  instance.confirmButtonLoading = false;
                }, 300);
              }, 600);
            }
          });
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
