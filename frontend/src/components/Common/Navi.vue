<!-- prettier-ignore -->
<style lang="scss" scoped>
  li{list-style: none; }
  ul.category{
    margin:10px;
  }
  ul.category > li{
    &:first-child{margin-top: 0px;}
    div{
      padding: 6px 10px 6px 16px; cursor: pointer;
      span{
        display: inline-block; vertical-align: middle; padding: 0 0 0 0;
        &.name{ font-size: 14px; margin-top: -4px; padding-left: 5px; color: var(--text-color-bold)}
        &.icon{ margin-top: -5px;}
        &.icon-arrow{ float: right; cursor: pointer;}
        &.icon-revert{transform: scaleY(-1); margin-top: -4px}        
      }
      &.active{
        padding: 6px 10px 6px 14px; border-left: solid 2px var(--color-active); background-color: var(--bg-color-sub); color: var(--color-active); border-top-right-radius: 4px; border-bottom-right-radius: 4px;
        span.name{font-family: 'noto-medium'; color: var(--color-active)}
      }      
      &:hover{
        color: var(--color-active);
        span.name{font-family: 'noto-medium'; color: var(--color-active)}
      }
    }
    ul{      
      margin-bottom: 15px; max-height:500px; transition: all 0.4s ease;
      li{
        padding: 0px 0 0px 35px; font-size: 12px; color:var(--text-color-bold);
        a{ display: inline-block; width:90%; padding: 7px 0; color: inherit; text-decoration: none;}
        i{ display: inline-block; width:3px; height:3px; margin:-1px 6px 0 4px; background-color: var(--text-color-light); border-radius: 2px; vertical-align: middle;}
        svg{vertical-align: middle; }
        &.active, &:hover{
          font-family: 'noto-bold'; color: var(--color-active);
          i{background-color: var(--color-active) }
        }        
      }
      &.unfold{
        max-height: 0px; margin-bottom: 0px; overflow: hidden; transition: all 0.4s; 
      }
    }
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
  .menu-settings{
    padding: 5px 0px; text-align: right; display: flex; margin:10px; border-radius: 4px; box-shadow: 2px 4px 12px 0 var(--color-thin); border: solid 0.5px var(--color-medium); background-color: var(--color-light);
    div{      
      &:first-child{
        width:80%; padding: 3px 10px 3px 17px; text-align: left; color: var(--text-color-bold);
        svg{display: inline-block; vertical-align: middle; margin-top: -2px;}
        span{ font-family: 'poppins-medium'; font-size: 14px; margin-left: 3px;}
      }
      &:last-child{
        width:20%; padding: 0px 10px 0 10px; text-align: right;       
        span, svg{display: inline-block; vertical-align: middle; font-size: 11px; cursor: pointer;}        
        &:hover{color: var(--color-active)}
      }
    }
  }
</style>
<template>
  <template v-if="visible">
    <div class="menu-settings">
      <div>
        <icon :name="filteredMenuList.icon"></icon>
        <span>{{ filteredMenuList.menuName }}</span>
      </div>
      <div>
        <span v-if="!expand" @click="expand = true">
          <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="-6 -6 28 28"><path fill="currentColor" d="m7.688 16-1.063-1.062L10 11.562l3.375 3.376L12.312 16 10 13.688ZM10 8.438 6.625 5.062 7.688 4 10 6.312 12.312 4l1.063 1.062Z" /></svg>
        </span>
        <span v-else @click="expand = false">
          <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="-6 -6 28 28"><path fill="currentColor" d="m10 17-3.375-3.375 1.063-1.063L10 14.875l2.312-2.313 1.063 1.063ZM7.688 7.438 6.625 6.375 10 3l3.375 3.375-1.063 1.063L10 5.125Z" /></svg>
        </span>
        <!-- <span v-if="editable" @click="editable = false">
        <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="-4 -4 24 24"><path fill="currentColor" d="M3 12.75v-1.5h6v1.5Zm0-3.125v-1.5h9v1.5ZM3 6.5V5h9v1.5ZM13.396 15l-2.813-2.833 1.063-1.063 1.75 1.771 3.542-3.542L18 10.396Z" /></svg>
      </span>
      <span v-else @click="editable = true">
        <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="-6 -6 28 28"><path fill="currentColor" d="m7.125 16-1.063-1.062 1.084-1.084Q5 13.812 3.5 12.292 2 10.771 2 8.625q0-2.187 1.531-3.719Q5.062 3.375 7.25 3.375H10v1.5H7.25q-1.562 0-2.656 1.094Q3.5 7.062 3.5 8.625q0 1.521 1.052 2.604 1.052 1.083 2.552 1.125l-1.042-1.062 1.063-1.042L10 13.125ZM12 13.875v-1.5h6v1.5Zm0-4.5v-1.5h6v1.5Zm0-4.5v-1.5h6v1.5Z" /></svg>
      </span> -->
      </div>
    </div>
    <draggable v-model="filteredMenuList.children" @start="drag = true" @end="drag = false" @update="update" :disabled="!editable" :item-key="'name'" tag="ul" :class="['category', editable ? 'editable' : '']" ghost-class="ghost">
      <template #item="{ element: category }">
        <li>
          <div :class="{ active: category.active }" @click="unfold(category)">
            <span class="icon">
              <icon v-if="editable" :name="'DragHandle'" :viewBox="'-2 -2 24 24'"></icon>
              <icon v-else :name="category.icon"></icon>
            </span>
            <span class="name">{{ category.menuName }}</span>
            <span :class="['icon-arrow', category.unfold ? 'icon-revert' : '']">
              <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path fill="currentColor" d="M10 12.5 5.583 8.083l.479-.5L10 11.521l3.938-3.938.479.5Z" /></svg>
            </span>
          </div>
          <draggable v-model="category.children" @start="drag = true" @update="update" @end="drag = false" :disabled="!editable" :item-key="'name'" :animation="100" tag="ul" :class="{ unfold: category.unfold && !category.unfold2 }" ghost-class="ghost">
            <template #item="{ element: menu }">
              <li :class="{ active: menu.active }">
                <icon v-if="editable" :name="'DragHandle'" :viewBox="'-2 -2 24 24'"></icon>
                <i v-else></i>
                <template v-if="menu.menuPath.substring(0, 4) === 'http'">
                  <a :href="menu.menuPath" target="_blank">
                    {{ menu.menuName }}
                    <svg xmlns="http://www.w3.org/2000/svg" style="display: inline-block; margin-top: 0.5px; margin-left: 2px" height="18" viewBox="0 196 960 960" width="18"><path fill="currentColor" d="M248 860q-22.7 0-37.35-14.65Q196 830.7 196 808V344q0-22.7 14.65-37.35Q225.3 292 248 292h192v20H248q-12 0-22 10t-10 22v464q0 12 10 22t22 10h464q12 0 22-10t10-22V616h20v192q0 22.7-14.65 37.35Q734.7 860 712 860H248Zm141-178-15-15 355-355H576v-20h188v188h-20V327L389 682Z" /></svg>
                  </a>
                </template>
                <template v-else>
                  <router-link :to="menu.menuPath">{{ menu.menuName }}</router-link>
                </template>
              </li>
            </template>
          </draggable>
        </li>
      </template>
    </draggable>
  </template>
</template>
<script setup>
import { ref, computed, watch } from "vue";
import { storeToRefs } from "pinia";
import menuStore from "@/stores/menu";

let menu = menuStore();
let { menuList } = storeToRefs(menu);

let visible = ref(false);

watch(menuList, () => {
  visible.value = true;
});

let filteredMenuList = computed(() => menuList.value.find((entry) => entry.active));
let expand = ref(false);
let editable = ref(false);

function unfold(category) {
  category.unfold = !category.unfold;
  update();
}

function update() {
  menu.$patch({ menuList: menuList });
}

watch(expand, (currVal, oldVal) => {
  filteredMenuList.value.children.forEach((category) => {
    // category.unfold2 = expand.value;

    if (!category.active) category.unfold = expand.value;
  });
  update();
});

menu.$subscribe((mutation, state) => {
  for (const [key, value] of Object.entries(mutation.payload ? mutation.payload : {})) {
    localStorage.setItem(key, JSON.stringify(value));
  }
});
</script>
