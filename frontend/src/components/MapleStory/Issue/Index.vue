<!-- prettier-ignore -->
<style lang="scss" scoped>
  $colWidth: 120px;
  .issue{
    display: flex; height:100%; min-width: 1000px;
    .contents{
      width:calc(100% - 2px); border:solid 1px var(--border-color-bold); border-top:none; border-left: none;
      &>.filter{
        position:absolute; width:200px; height:calc(100% - 102px); top:100px; border:solid 1px var(--border-color-bold); border-bottom:none; border-top:none; border-left:none; background-color:var(--bg-color-sub); 
        transition:height .5s ease-in-out; transition:transform .5s ease-in-out; z-index:100;
        .f{
          padding:10px 25px; 
          .name{
            padding:8px 0 12px 0; font-family:'noto-medium'; font-size:15px; color:var(--text-color-bold); 
            span.fold{
              position:absolute; right:10px; display:inline-block; width:16px; height:16px; color:var(--icon-color);
              &:hover{color:var(--color-active); cursor:pointer; }             
            }
            span.drag{
              display: none; position: absolute; cursor: pointer; top: 18px; right:90px;               
              width: 16px; height: 16px; margin-right: 0px; color: var(--icon-color); background-color:var(--bg-color-black); border-radius:3px; padding:3px;              
              &:hover{color: var(--color-active);}
            }   
          }
           
          .all{ position: relative; color: var(--text-color-light)}
          .sort{ font-size: 14px; padding: 8px 0 }
          ul{
            overflow:hidden; transition:all .5s ease-in-out;
            li{
              position: relative; width:calc(100% - 30px); padding:2px 15px 2px 0px; list-style: none;  border-bottom: none;;
              &:nth-child(1){padding-top:0px;}
              &.drag{
                cursor: move; width:calc(100% - 14px); padding:1.35px 14px 1.35px 0px; border: dashed 1px var(--border-color-black); border-bottom:none; border-left: none; border-right: none;
                &:hover{background-color: var(--bg-color); }
                // &:last-child{border-bottom: dashed 1px var(--border-color-black)}
                span.move{
                  position: absolute; width:20px; height:20px; top:6px; right:0px; 
                  // color:var(--text-color-light)
                }
              }            
            }
          }
          &:hover{
            span.drag{ display:inline-block}
          }
        }
        .line{ width:calc(100% - 20px); margin-left: 10px; border-bottom:solid 1px var(--border-color-bold)}            
        .hide{
          position:absolute; width:16px; height:36px; top:calc(50% - 50px); right:-17px; background-color:var(--bg-color-sub); border: solid 1px var(--border-color-bold); border-left:none;
          border-top-right-radius : 4px; border-bottom-right-radius : 4px; z-index:200; color:var(--icon-color);
          &:hover{border-color:var(--color-active); color:var(--color-active); cursor:pointer;}
          svg{ display:inline-block; margin-top:10px; transition:all .5s ease-in-out}
        }
      }
      
      .gantt-head{
        display: flex; height:49px; border-bottom:solid 1px var(--border-color-bold);
        &>div{          
          &.title{ 
            width:200px; padding:8px 20px; font-size: 16px; font-family: 'noto-bold';
            span, svg{display:inline-block; vertical-align:middle; margin-right:5px}
          }
          &.search{width:calc(100% - 200px); padding:8px 15px;  text-align: right }
        }        
      }
      .gantt{
        width:calc(100% - 200px); height:calc(100% - 50px); margin-left:200px; position: relative; overflow: auto;  transition:all .5s ease-in-out;
        .guide{
          position:fixed; width:200px; height:50px; bottom:10px; left:calc(50% - 0px); z-index:50; color:var(--color-active);
          svg{
            position:absolute;
            &:nth-child(1){ 
              margin-top:-5px; margin-left:10px; transform:rotate(270deg); opacity:1; animation: show-up 1.5s infinite ease-in-out;
              @keyframes show-up{ from { opacity:0; margin-left:10px;} 50%{opacity:1;} to { opacity:0.5; margin-left:0px;}}
            }                
            &:nth-child(2){
              margin-top:-5px; margin-left:166px; transform:rotate(90deg); opacity:1; animation: show-down 1.5s infinite ease-in-out;
              @keyframes show-down{ from { opacity:0; margin-left:166px;} 50%{opacity:1;} to { opacity:0.5; margin-left:176px;}}
            }
          }
          span{ position:absolute; margin-top:0px; margin-left:40px; font-family:'roboto-medium'; color:var(--color-active)}        
        }
        .guide-hide{opacity:0; background:transparent; 
          transition:all 1s ease-in-out
        }
        .issueList{ margin-top: 50px}
        .row{
          display: flex; height:40px; 
          transition:height .3s ease-in-out;
          .col{
            position: relative; width:calc(var(--gantt-width));
            .title{
              position: absolute; top:20%; display: inline-block; width: max-content; z-index: 99; font-size: 12px; font-family: 'noto-medium'; line-height:110%; 
              // color: var(--text-color-bold); 
              text-align: left; border-radius:5px; opacity: 1;
              span{ font-family: 'noto-medium';} 
              span.arrow{
                width:0px; vertical-align:middle; text-align:center; color:var(--icon-color); transition: all .3s;
                &:hover{color:var(--color-active)}
              }
              span.t{
                width:calc(100% - 20px); max-width:100%; padding:0px 10px 0px 10px;                 
                span.n{
                  width:100%; padding:6px 0;
                  &:hover{font-family: 'noto-bold'; color:var(--color-active); cursor: pointer}
                  span.nt{width:calc(100% - 0px); text-overflow:ellipsis; overflow:hidden; white-space:nowrap;}                  
                }
              }                    
              svg{ margin-top:-3px; vertical-align:middle; cursor: pointer }      
              b{vertical-align:middle;}        
              &:hover{
                span.arrow{ width:16px; height:16px; vertical-align:middle; transition: all .3s;}
              }
            }                    
            .drag{               
               span.t{cursor: move }
            }

            @for $i from 1 through 7 {
              .color-#{$i} { 
                background-color: rgba(var(--color-0#{$i}), .15);  transition: background-color .5s;
                &:hover{ background-color: rgba(var(--color-0#{$i}), .3) !important }
              }
            }

            @for $i from 1 through 7 {
              .color-added-#{$i} { background-color: rgba(var(--color-0#{$i}), .8) !important;   transition: background-color .7s}
            }

            @for $i from 1 through 7 {
              .color-active-#{$i} { background-color: rgba(var(--color-0#{$i}), .4) ;   transition: background-color 1s }
            }

            @for $i from 1 through 7 {
              .color-disabled-#{$i} { background-color: rgba(var(--color-0#{$i}), .08);   transition: background-color 1s;
                span{
                  font-family: 'noto-regular'; color: var(--text-color-thin) !important
                } 
              }
            }
          }
          .col-head{ height:40px }
          .hide{ visibility: hidden }                    
        }    
        .small{          
          .col{
            .title{
              font-size: 11px;
              span.t{ span.n{ padding:.2vh 0}}
            }
          }
        }
        .tiny{          
          .col{
            .title{
              font-size: 10px;
              span.t{ span.n{ padding:0 0}}
            }
          }
        }

        .line{
          position: absolute; display: flex;  height: calc(100% - 50px); resize: both;
          .col{
            width:calc(var(--gantt-width) - 1px); height: 100%; border-right:solid 1px var(--border-color); 
            .date{
              position:relative; width:calc(var(--gantt-width) - 1px); height:39px; padding:5px 0; font-family: 'noto-medium'; color:var(--text-color-demiilight); text-align: center; user-select: none;
              border-bottom:solid 1px var(--border-color-bold); background-color: var(--bg-color-sub);
                  
              .sat{color: rgba(var(--text-color-blue), 1)}
              .sun{color:rgba(var(--text-color-red), 1)}
              .custom{color:rgba(var(--default-color), 1)}
              p{                
                &:nth-child(1){
                  span.day{ height:16px; font-size: 13px; font-family:"poppins-medium"; }
                  span.name{height:16px; font-size: 12px;  }
                  @media screen and (min-width: 0px) and (max-width: 1000px){ span.name{display: none} }                  
                }
                &:nth-child(2){ 
                  &>span{
                    &:nth-child(1){font-size: 11px;  color:var(--text-color-light)}
                    &:nth-child(2){
                      display:none; width:100%;
                      text-align:center;
                      .count{ vertical-align:middle; height:16px; font-size: 11px; }
                      .ico{ vertical-align:middle; margin-left:-2px; width:16px; height:16px; transform:rotate(180deg); }
                    }
                  }
                }
              }  
              &:hover{ cursor: pointer;}        
              // width:var(--gantt-width);
              .eventday{ position:absolute; display:inline-block; width:calc(var(--gantt-width) * 2); left:calc(var(--gantt-width) * .5 * -1); margin-top:-62px; margin-left:0; font-family:'noto-bold'; font-size:11px; text-align: center; text-overflow:ellipsis; overflow:hidden; white-space:nowrap;}       
              .holiday{color:rgba(var(--text-color-red), .8)}
              .custom{color:rgba(var(--default-color), .8)}

            }
            &:hover{
              background-color: var(--color-light); 
              .date{ 
                background-color: var(--color-thin);  font-family: 'noto-bold';
                p{                
                  &:nth-child(1){
                    span.day{font-family:"poppins-semibold"}
                  }
                  &:nth-child(2){ 
                    &>span{
                      &:nth-child(1){display:none;}
                      &:nth-child(2){
                        display:inline-block;
                        .name-en-s{
                          font-size: 10px;
                        }
                      }
                    }
                  }
                }
              }
            }
          }    
          .sat{
            background-color:rgba(var(--text-color-blue), .001);
            .date{
              color: rgba(var(--text-color-blue), 1);
              p{
                &:nth-child(2){ color: rgba(var(--text-color-blue), 1)}
              }
            }
          }    
          .sun{
            background-color:rgba(var(--text-color-red), .001);
            .date{
              color:rgba(var(--text-color-red), 1);
              p{
                &:nth-child(2){ color: rgba(var(--text-color-red), 1)}
              }
            }
          } 
          .custom{
            background-color:rgba(var(--default-color), .001);             
            .date{
              color:var(--text-color-demiilight); 
              // border-top:solid 1px rgba(var(--default-color), .8); height:38px;
              p{
                &:nth-child(2){ color: var(--text-color-demiilight)}
              }
            }            
          } 
          .today{
            background-color: var(--bg-color-sub);
            .date{
              background-color: var(--bg-color-sub);
              p{
                span.today{
                  position: absolute; left:calc(50% - 20px); width:5px; height:5px; border-radius: 10px; background-color: var(--color-active);
                }
              }
            }
          }
          .active{
            background-color: var(--color-medium);
            .date{ background-color: var(--color-medium);}
            &:hover{
              background-color: var(--color-medium); cursor: pointer;
              .date{ background-color: var(--color-medium);}
            }
          }
          .last{ border-right:solid 1px var(--border-color-black) }
        }

        .month{
          width:100%; display:flex; border-bottom:solid 1px var(--border-color-bold); background-color: var(--bg-color-sub);
          .m{ 
            position:relative; height:49px; font-size:14px; font-family: 'noto-bold'; color:var(--text-color-light);
            text-align:center; border-right:solid 1px var(--border-color-black);
            div{
              position:absolute; display:inline-block;  top:12px; text-align:center;
              span{ font-family:"poppins-semibold";}
            }
          }
        }
      }  
    }    

    .issue-drawer{
      display:block;
      .header{        
        span{
          display:inline-block; vertical-align:middle;
          &.h{max-width:360px; font-size:18px; font-family: 'noto-bold'; color:var(--text-color-medium); text-overflow:ellipsis; overflow:hidden; white-space:nowrap;}
          &.cal{width: 24px; height: 24px; margin-right:3px; }       
          &.ico{
            width: 16px; height: 16px; background-color:var(--bg-color-sub); border-radius:3px; padding:3px;  color: var(--icon-color); cursor:pointer; 
            &:hover{color: var(--color-active);}
          }   
          &.modify{ margin-left:10px; }
          &.delete{ margin-left:4px; }
        }
      }
      .back{
        padding:5px 0;
        span{
          display:inline-block; vertical-align:middle; cursor:pointer;
          .date{font-size: 14px; font-family: 'noto-bold'; color: var(--text-color-light)}
          .arrow{width:24px; height:24px; margin-left:-10px; color:var(--icon-color)}

          &:hover{
            span{color: var(--color-active)}
          }
        }
      }
    }
  }

  .gantt-search-filter{
    .search-filter{
      &>ul{
        &>li{
          display:flex; padding:5px 0;
          &>div{            
            &:nth-child(1){               
              width:25%; 
              span{display:inline-block; vertical-align:middle; padding-top:8px}
            }
            &:nth-child(2){ width:75%; }
          }
        }
      }
    }
  }

  .lds-facebook { display: inline-block; position: relative; width: 80px; height: 80px}
  .lds-facebook div { display: inline-block; position: absolute; left: 8px; width: 16px; background: #fff; animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite }
  .lds-facebook div:nth-child(1) { left: 8px; animation-delay: -0.24s }
  .lds-facebook div:nth-child(2) { left: 32px; animation-delay: -0.12s }
  .lds-facebook div:nth-child(3) { left: 56px; animation-delay: 0 }

  @keyframes lds-facebook {
    0% { top: 8px; height: 64px }
    50%, 100% { top: 24px; height: 32px }
  }

  $opacity : .02;

  .shape-fill{ fill: var(--color-active); opacity: $opacity}
  .shape-fill-bg{ height: 10%; background-color: var(--color-active); opacity: $opacity}
  .blob{ fill: var(--color-active); opacity: $opacity}
  
</style>
<!-- prettier-ignore -->
<style lang="scss">
.issue{
  .filter{
    @for $i from 1 through 7 {  
      .color-#{$i} { 
        .el-checkbox__input.is-checked .el-checkbox__inner { background-color: rgba(var(--color-0#{$i}), 1); border-color: rgba(var(--color-0#{$i}), 1); }
        .el-checkbox__input.is-checked+.el-checkbox__label{color : rgba(var(--color-0#{$i}), 1); font-family:'noto-medium'}
      }  
    }
    .el-checkbox__input.is-checked+.el-checkbox__label{font-family:'noto-medium'}
    .el-radio__input.is-checked+.el-radio__label{font-family:'noto-medium'}
  }
  
  .el-drawer__header{ margin-bottom: 10px}
  .el-radio.el-radio--large{ height: 24px }
  .ghost{ opacity: 0.7; background: var(--color-medium)}  
  .modal-transparent{ background-color: transparent }
  .el-input__suffix-inner>:first-child { margin-left: 3px;}
  .el-input__prefix-inner>:last-child{ margin-right: 8px;}
}
</style>
<template>
  <div class="issue bg-color-1">
    <div class="contents">
      <div class="filter" :style="{ transform: 'translate(' + (uiOptions.hide ? -200 : 0) + 'px,0)' }">
        <div class="hide" @click="uiOptions.hide = !uiOptions.hide">
          <svg viewBox="0 0 24 24" fill="none" :style="{ transform: 'rotate(' + (uiOptions.hide ? 180 : 0) + 'deg)' }">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.934 12l3.89 3.89-1.769 1.767L8.398 12l1.768-1.768 3.89-3.889 1.767 1.768-3.889 3.89z" fill="currentColor"></path>
          </svg>
        </div>
        <div class="f" @mouseleave="categoryDrag = false">
          <!-- <div class="f"> -->
          <div class="name">
            카테고리
            <span class="fold" @click="uiOptions.category = !uiOptions.category">
              <svg viewBox="0 0 24 24" fill="none" :style="{ transform: 'rotate(' + (uiOptions.category ? 0 : 180) + 'deg)' }"><path fill-rule="evenodd" clip-rule="evenodd" d="M12.11 11.824l-3.888 3.889-1.768-1.768 5.657-5.657 1.768 1.768 3.889 3.89L16 15.712l-3.89-3.89z" fill="currentColor"></path></svg>
            </span>
            <!-- <template v-if="!categoryDrag"> -->
            <template v-if="true">
              <el-tooltip class="box-item" effect="light" :content="categoryDrag ? '드래그하여 순서 변경' : '카테고리 순서 변경'" :hide-after="0" placement="right">
                <!-- prettier-ignore -->
                <span class="drag" @click="categoryDrag = true; uiOptions.category = true;">
                  <svg viewBox="0 0 26 26" fill="none" class="css-19ss7aa">
                    <path fill="currentColor" d="M21 6h-7.79a4.001 4.001 0 00-7.42 0H3v3h2.79a4.001 4.001 0 007.42 0H21V6zm-10.21 9H3v3h7.79a4.001 4.001 0 007.42 0H21v-3h-2.79a4.001 4.001 0 00-7.42 0z"></path>
                  </svg>
                  <!-- <svg height="100%" viewBox="0 -960 960 960" width="100%">
                    <path fill="currentColor" d="M466.001-154.001v-219.998h51.998v84h288v51.998h-288v84h-51.998Zm-312-84v-51.998h219.998v51.998H154.001Zm144-132v-84h-144v-51.998h144v-84h51.998v219.998h-51.998Zm144-84v-51.998h363.998v51.998H442.001Zm144-132v-219.998h51.998v84h168v51.998h-168v84h-51.998Zm-432-84v-51.998h363.998v51.998H154.001Z" />
                  </svg> -->
                </span>
              </el-tooltip>
            </template>
          </div>
          <div class="all" v-if="false">
            <el-checkbox v-model="category" label="전체" size="default" style="margin-top: -1px" />
          </div>
          <ul :style="{ maxHeight: uiOptions.category ? '500px' : '0px' }">
            <draggable v-model="categoryList" group="people" @start="drag = true" @end="drag = false" item-key="key" @update="updateCategory" ghost-class="ghost">
              <template #item="{ element }">
                <li :class="{ drag: categoryDrag }" style="color: var(--border-color-black)">
                  <!-- <el-checkbox v-model="element.checked" :label="element.label" size="default" :class="'color-' + element.key" /> -->
                  <el-checkbox v-model="element.checked" :label="element.label" :disabled="categoryDrag" size="default" :class="'color-' + element.key" />
                  <span class="move" v-if="categoryDrag">
                    <svg height="20" viewBox="0 -960 960 960" width="20"><path fill="currentColor" d="M232-380v-32h496v32H232Zm0-168v-32h496v32H232Z" /></svg>
                  </span>
                </li>
              </template>
            </draggable>
          </ul>
        </div>
        <div class="line"></div>
        <div class="f">
          <div class="name">
            상태
            <span class="fold" @click="uiOptions.status = !uiOptions.status">
              <svg viewBox="0 0 24 24" fill="none" :style="{ transform: 'rotate(' + (uiOptions.status ? 0 : 180) + 'deg)' }"><path fill-rule="evenodd" clip-rule="evenodd" d="M12.11 11.824l-3.888 3.889-1.768-1.768 5.657-5.657 1.768 1.768 3.889 3.89L16 15.712l-3.89-3.89z" fill="currentColor"></path></svg>
            </span>
          </div>
          <div class="all" v-if="false">
            <el-checkbox v-model="status" label="상태" size="default" />
            <!-- <svg class="drag" height="24" viewBox="0 -960 960 960" width="24"><path fill="currentColor" d="M200-380v-40h560v40H200Zm0-160v-40h560v40H200Z" /></svg> -->
          </div>
          <ul :style="{ maxHeight: uiOptions.status ? '300px' : '0px' }">
            <li v-for="entry in statusList">
              <el-checkbox v-model="entry.checked" :label="entry.label" size="default" />
            </li>
          </ul>
        </div>
        <div class="line"></div>
        <div class="f">
          <div class="name">
            정렬
            <span class="fold" @click="uiOptions.sort = !uiOptions.sort">
              <svg viewBox="0 0 24 24" fill="none" :style="{ transform: 'rotate(' + (uiOptions.sort ? 0 : 180) + 'deg)' }"><path fill-rule="evenodd" clip-rule="evenodd" d="M12.11 11.824l-3.888 3.889-1.768-1.768 5.657-5.657 1.768 1.768 3.889 3.89L16 15.712l-3.89-3.89z" fill="currentColor"></path></svg>
            </span>
          </div>
          <el-radio-group v-model="sort" class="ml-4">
            <ul :style="{ maxHeight: uiOptions.sort ? '500px' : '0px' }">
              <li v-for="entry in sortList">
                <el-radio :label="entry.key" :size="'large'">
                  <template v-if="entry.key === 'custom'">
                    <el-tooltip class="box-item" effect="light" content="이슈를 드래그해서 위치를 변경하실 수 있습니다." placement="right">
                      {{ entry.label }}
                    </el-tooltip>
                  </template>
                  <template v-else>
                    {{ entry.label }}
                  </template>
                </el-radio>
              </li>
            </ul>
          </el-radio-group>
        </div>
      </div>
      <div class="gantt-head">
        <div class="title">
          <svg height="24" viewBox="0 -960 960 960" width="24"><path fill="currentColor" d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Zm80 240v-80h400v80H280Zm0 160v-80h280v80H280Z" /></svg>
          <span>이슈 대시보드</span>
        </div>
        <div class="search">
          <el-popover :width="300" :trigger="'click'" :show-arrow="false" popper-class="gantt-search-filter" popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;">
            <template #reference>
              <el-input v-model="searchKey" style="width: 300px" size="default" placeholder="이슈 제목이나 내용을 입력해주세요." :prefix-icon="Search" />
            </template>
            <template #default>
              <div class="search-filter" style="display: flex; gap: 16px; flex-direction: column">
                <ul>
                  <li>
                    <div>
                      <span>기간</span>
                    </div>
                    <div>
                      <el-date-picker style="width: calc(100% - 14px)" :teleported="false" v-model="searchFilter.period" type="daterange" format="YYYY-MM-DD" size="small" :range-separator="searchFilter.period.length ? '~' : ''" start-placeholder="전체기간" end-placeholder="" />
                    </div>
                  </li>
                  <li>
                    <div>
                      <span>카테고리</span>
                    </div>
                    <div>
                      <el-select :teleported="false" style="width: 100%" v-model="searchFilter.category" placeholder="카테고리 선택">
                        <el-option v-for="entry in categoryList" :key="entry.key" :label="entry.label" :value="entry.key" />
                      </el-select>
                    </div>
                  </li>
                  <li>
                    <div>
                      <span>태그</span>
                    </div>
                    <div>
                      <el-select :teleported="false" style="width: 100%" v-model="searchFilter.category" placeholder="태그 선택">
                        <el-option v-for="entry in categoryList" :key="entry.key" :label="entry.label" :value="entry.key" />
                      </el-select>
                    </div>
                  </li>
                </ul>
              </div>
            </template>
          </el-popover>
          &nbsp;
          <el-button size="default" :icon="Search">검색하기</el-button>
          <el-button size="default" @click="moveToday()" style="margin-left: 8px">
            <svg height="20" viewBox="0 -960 960 960" width="20">
              <path
                fill="currentColor"
                d="M384.225-299.384q-33.302 0-57.071-23.544t-23.769-56.847q0-33.302 23.543-57.071 23.544-23.769 56.847-23.769 33.302 0 57.071 23.544 23.769 23.543 23.769 56.846 0 33.302-23.543 57.071-23.544 23.77-56.847 23.77ZM240.615-136q-24.315 0-40.465-16.5Q184-169 184-192.615v-478.77Q184-695 200.15-711.5 216.3-728 240.615-728h102.769v-105.231h35.077V-728h206.154v-105.231h32.001V-728h102.769q24.315 0 40.465 16.5Q776-695 776-671.385v478.77Q776-169 759.85-152.5 743.7-136 719.385-136h-478.77Zm0-32h478.77q9.23 0 16.923-7.692Q744-183.385 744-192.615v-310.77H216v310.77q0 9.23 7.692 16.923Q231.385-168 240.615-168ZM216-535.385h528v-136q0-9.23-7.692-16.923Q728.615-696 719.385-696h-478.77q-9.23 0-16.923 7.692Q216-680.615 216-671.385v136Zm0 0V-696v160.615Z"
              />
            </svg>
            오늘
          </el-button>
          &nbsp;
          <el-select v-model="uiOptions.viewWeek" placeholder="Select" size="default" style="width: 69px" :suffix-icon="null">
            <template #prefix>
              <span style="line-height: 16px">
                <svg height="20" viewBox="0 -960 960 960" width="20" style="vertical-align: middle">
                  <path
                    fill="currentColor"
                    d="M192.615-264h162.308v-432H192.615q-10.769 0-17.692 6.923T168-671.385v382.77q0 10.769 6.923 17.692T192.615-264Zm194.308 0h186.154v-432H386.923v432Zm218.154 0h162.308q10.769 0 17.692-6.923T792-288.615v-382.77q0-10.769-6.923-17.692T767.385-696H605.077v432Zm-412.462 32Q169-232 152.5-248.5 136-265 136-288.615v-382.77Q136-695 152.5-711.5 169-728 192.615-728h574.77q24.315 0 40.465 16.5Q824-695 824-671.385v382.77Q824-265 807.85-248.5 791.7-232 767.385-232h-574.77Z"
                  />
                </svg>
                <span style="font-size: 12px; vertical-align: middle; margin-left: 2px; color: var(--text-color-medium)">{{ uiOptions.viewWeek }}주</span>
              </span>
            </template>
            <el-option v-for="entry in viewWeekList" :key="entry.key" :label="entry.label" :value="entry.key"></el-option>
          </el-select>
          &nbsp;
          <el-button size="default" @click="showIssue()" type="primary">
            <svg height="18" viewBox="0 -960 960 960" width="18">
              <path
                fill="currentColor"
                d="M694.001-106.001v-108h-108v-51.998h108v-108h51.998v108h108v51.998h-108v108h-51.998Zm-465.692-106q-26.308 1-45.308-18.5t-19-45.808v-407.382q0-27.008 19-45.658 19-18.65 45.308-18.65h63.385v-100.615h53.537v100.615h175.076v-100.615h51.999v100.615h63.385q26.308 0 45.808 18.5t18.5 45.808v208.307q-13 1.154-26 4.154-12.999 3-25.999 7.846v-52.307H216v239.382q0 4.616 3.846 8.463 3.847 3.846 8.463 3.846H487.77q-2 12-2.654 24.999-.654 13 .269 27H228.309ZM216-567.69h432v-116.001q0-4.616-3.846-8.463-3.847-3.846-8.463-3.846H228.309q-4.616 0-8.463 3.846-3.846 3.847-3.846 8.463v116.001Zm0 0V-696v128.31Z"
              />
            </svg>
            이슈 등록하기
          </el-button>
        </div>
      </div>
      <!-- <div class="" v-if="showsLoading" style="height: 100%; opacity: 0.8; position: absolute; z-index: 200"><div style="border-bottom: solid 1px var(--border-color)"></div></skeleton> -->
      <div id="gantt" class="gantt" :style="{ width: 'calc(100% - ' + (uiOptions.hide ? 0 : 200) + 'px)', marginLeft: (uiOptions.hide ? 0 : 200) + 'px' }">
        <div class="guide" :class="{ 'guide-hide': !showsGuide }">
          <svg height="24" viewBox="0 -960 960 960" width="24"><path fill="currentColor" d="M296-237.847 253.847-280 480-506.153 706.153-280 664-237.847 480-421.232 296-237.847Zm0-240L253.847-520 480-746.153 706.153-520 664-477.847 480-661.232 296-477.847Z" /></svg>
          <svg height="24" viewBox="0 -960 960 960" width="24"><path fill="currentColor" d="M296-237.847 253.847-280 480-506.153 706.153-280 664-237.847 480-421.232 296-237.847Zm0-240L253.847-520 480-746.153 706.153-520 664-477.847 480-661.232 296-477.847Z" /></svg>
          <span>SCROLL UP & DOWN</span>
        </div>
        <div v-if="false" style="height: 50%; position: fixed; width: 100%; bottom: 10px; transform: rotate(180deg)">
          <div class="shape-fill-bg"></div>
          <svg data-name="Layer 1" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" class="shape-fill"></path>
          </svg>
        </div>
        <div v-if="false" v-for="entry in blobList" style="position: fixed" :style="{ top: entry.top + '%', left: entry.left + '%' }">
          <svg viewBox="300 150 600 600" width="600" height="600" version="1.1">
            <g class="blob" transform="translate(407.44316168198327 284.4651459665494)"><path :d="entry.path" /></g>
          </svg>
        </div>
        <div class="month" :style="{ width: dateList.length * width + 'px' }">
          <!-- prettier-ignore -->
          <div class="m" v-for="entry in monthList" :style="{ width: entry.width + 'px' }">
            <div 
              v-if="entry.x + entry.width >= scrollLeft"              
              :style="{ width: entry.sw + 'px', left : entry.sl + 'px'}"
            >
              <template v-if="entry.sw > 80">
                <span>{{ entry.yyyy }}</span>년 <span>{{ entry.mm }}</span>월
              </template>
            </div>
          </div>
        </div>
        <div class="line" :style="{ width: dateList.length * width + 'px' }">
          <div class="col" v-for="entry in dateList" :class="{ today: entry.isToday, active: entry.active, last: entry.last, sun: entry.color === 'sun', sat: entry.color === 'sat', custom: entry.color === 'custom' }">
            <router-link :to="'?date=' + entry.full.substring(0, 10)" custom v-slot="{ href, navigate }">
              <!-- @click="showIssueList(entry)" -->
              <!-- @mouseover="mouseoverDate(entry)" @mouseleave="mouseleaveDate(entry)" -->
              <div class="date" @click="navigate" @mouseenter="mouseoverDate(entry)" @mouseleave="mouseleaveDate(entry)">
                <p>
                  <span class="today" v-if="entry.isToday"></span>
                  <span class="day">{{ entry.short }}</span>
                  <span class="name" v-if="width > 30">일</span>
                </p>
                <p>
                  <span class="name-en">
                    <template v-if="width > 30">{{ entry.name }}</template>
                    <template v-else>{{ entry.shortName }}</template>
                  </span>
                  <span class="issue-count">
                    <template v-if="width >= 32">
                      <span class="count">
                        <template v-if="width > 56">이슈({{ entry.issue }})</template>
                        <template v-else>{{ entry.issue }}</template>
                      </span>
                      <span class="ico">
                        <svg viewBox="0 5 24 24" fill="none" data-v-c531d3c8="" style="vertical-align: bottom; transform: rotate(0deg)"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.934 12l3.89 3.89-1.769 1.767L8.398 12l1.768-1.768 3.89-3.889 1.767 1.768-3.889 3.89z" fill="currentColor" data-v-c531d3c8=""></path></svg>
                      </span>
                    </template>
                    <template v-else>
                      <span class="name-en-s">{{ entry.shortName }}</span>
                      <span class="ico" v-if="width >= 28">
                        <svg viewBox="0 5 24 24" fill="none" data-v-c531d3c8="" style="vertical-align: bottom; transform: rotate(0deg)"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.934 12l3.89 3.89-1.769 1.767L8.398 12l1.768-1.768 3.89-3.889 1.767 1.768-3.889 3.89z" fill="currentColor" data-v-c531d3c8=""></path></svg>
                      </span>
                    </template>
                  </span>
                </p>
                <span :class="['eventday', entry.holiday.type]" v-if="entry.holiday">
                  {{ entry.holiday.label }}
                </span>
              </div>
            </router-link>
          </div>
        </div>

        <!-- prettier-ignore -->
        <draggable v-model="issueList" group="people" :sort="sort === 'custom'" @start="startDrag($event); drag = true" @end="endDrag($event); drag = false" @update="update" item-key="id" class="issueList" ghost-class="ghost">
          <template #item="{ element }">
            <div class="row" :size="screenHeight / displayedIssue" :style="{ 
              width: dateList.length * width + 'px', 
              height: !element.display ? '0px' : (screenHeight / displayedIssue < 40 ? parseInt(screenHeight / displayedIssue - .3) : 40) + 'px' }" 
              :class="{ 
                tiny: screenHeight / displayedIssue <= 20,
                small: screenHeight / displayedIssue > 20 && screenHeight / displayedIssue < 40,
                hide : !element.display 
              }"
              :name="element.title"
              >
              <!-- v-if="element.display" -->
              <div class="col" v-for="(entry, j) in dateList" :class="{ hide: (entry.full.substring(0, 10) >= element.start.substring(0, 10) && entry.full.substring(0, 10) <= element.end.substring(0, 10)) === false}">                
                <div                                
                  v-if="entry.full.substring(0, 10) === element.start.substring(0, 10)"
                  :class="['title', 'color-' + element.category, sort === 'custom' ? 'drag' : '', element.added ? 'color-added-' + element.category : '', element.active ? 'color-active-'+ element.category : (element.disabled ? 'color-disabled-'+ element.category : '')]"
                  :style="{ width: getWidth(element, j) + 'px', left: getLeft(element, j) + 'px', borderTopLeftRadius : getWidth(element, j) < (width * (element.duration)) ? '0px' : '5px', borderBottomLeftRadius : getWidth(element, j) < (width * (element.duration)) ? '0px' : '5px' }"
                > 
                  <span class="t" :class="{s : getWidth(element, j), hover : element.hover}" >                       
                    <router-link :to="'?issue=' + element.issueID" custom v-slot="{ href, navigate }">
                      <span class="n" @click="navigate"  @mouseover="element.hover = true" @mouseleave="element.hover = false">                          
                        <template v-if="getWidth(element, j) < 160">
                          <el-tooltip :persistent="false" class="box-item" effect="light" :content="element.title" :hide-after="0" placement="right" :offset="17" :trigger="'hover'">
                            <span class="nt" >
                              <span class="arrow" v-if="scrollLeft > element.scrollStart && getWidth(element, j) > 80">
                                <svg viewBox="0 -2 24 24" fill="none" @click.prevent="scrollTo(j * width - width)">
                                <!-- <svg viewBox="0 0 24 24" fill="none" @click="scrollToIssue(element)"> -->
                                  <path fill-rule="evenodd" clip-rule="evenodd" d="M2.999 11.999l7.071-7.072 1.768 1.768-4.055 4.055H21v2.5H7.785l4.053 4.053-1.768 1.768L3 12v-.001z" fill="currentColor"></path>
                                </svg>
                              </span>                          
                              <b >{{ element.title  }}</b>
                              <span class="arrow" v-if="scrollLeft + screenWidth < element.scrollEnd">
                                <svg viewBox="0 2 24 24" fill="none" @click.prevent="scrollTo(element.scrollEnd - width)" style="transform: rotate(180deg)">
                                  <path fill-rule="evenodd" clip-rule="evenodd" d="M2.999 11.999l7.071-7.072 1.768 1.768-4.055 4.055H21v2.5H7.785l4.053 4.053-1.768 1.768L3 12v-.001z" fill="currentColor"></path>
                                </svg>
                              </span>
                            </span>  
                          </el-tooltip>
                        </template>
                        <template v-else>
                          <span class="nt" >
                            <span class="arrow" v-if="scrollLeft > element.scrollStart && getWidth(element, j) > 80">
                              <svg viewBox="0 -2 24 24" fill="none" @click.prevent="scrollTo(j * width - width)">
                              <!-- <svg viewBox="0 0 24 24" fill="none" @click="scrollToIssue(element)"> -->
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M2.999 11.999l7.071-7.072 1.768 1.768-4.055 4.055H21v2.5H7.785l4.053 4.053-1.768 1.768L3 12v-.001z" fill="currentColor"></path>
                              </svg>
                            </span>                          
                            <b >{{ element.title  }}</b>                          
                            <span class="arrow" v-if="scrollLeft + screenWidth < element.scrollEnd">
                              <svg viewBox="0 2 24 24" fill="none" @click.prevent="scrollTo(element.scrollEnd - (width * 2))" style="transform: rotate(180deg)">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M2.999 11.999l7.071-7.072 1.768 1.768-4.055 4.055H21v2.5H7.785l4.053 4.053-1.768 1.768L3 12v-.001z" fill="currentColor"></path>
                              </svg>
                            </span>
                          </span>  
                        </template>                                   
                      </span>
                    </router-link>
                  </span>                          
                </div>
              </div>
            </div>
          </template>
        </draggable>
      </div>
    </div>
    <!--    -->
    <el-drawer v-model="showsIssueList" @close="back('list')" class="issue-drawer" :append-to-body="false" :destroy-on-close="true" :size="'500px'" :z-index="200">
      <template #header>
        <div class="header">
          <span class="h">이슈 목록 보기</span>
        </div>
      </template>
      <template #default>
        <list :day="selectedDay" :issue-list="selectedDayIssueList" @showIssue="showIssue"></list>
      </template>
    </el-drawer>
    <el-drawer v-model="showsIssue" @close="back('view')" class="issue-drawer" :append-to-body="false" :destroy-on-close="true" :size="'500px'" :modal-class="showsIssueList ? 'modal-transparent' : ''" :z-index="201">
      <template #header>
        <div class="header">
          <div v-if="route.query.date" class="back" @click="showsIssue = false">
            <span>
              <span class="arrow">
                <svg viewBox="0 0 24 24" fill="none" data-v-c531d3c8="" style="transform: rotate(0deg)"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.934 12l3.89 3.89-1.769 1.767L8.398 12l1.768-1.768 3.89-3.889 1.767 1.768-3.889 3.89z" fill="currentColor" data-v-c531d3c8=""></path></svg>
              </span>
              <span class="date">이슈 목록 보기</span>
            </span>
          </div>
          <span class="h">{{ selectedIssue.title }}</span>
          <span class="ico modify" @click="modifyIssue">
            <svg viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M17.879 3.293l2.828 2.828-2.12 2.121-2.83-2.828 2.122-2.121zm-3.183 3.182l2.829 2.829-4.667 4.666H10.03v-2.828l4.666-4.667zM7 4h4v3H7v10h10v-4h3v7H4V4h3z" fill="currentColor"></path></svg>
          </span>
          <span class="ico delete" @click="deleteIssue">
            <svg class="bn-svg h-6 w-6 ml-6 cursor-pointer text-[--color-textDisabled] mr-0 sm:mr-3" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path fill="currentColor" d="M3 4h18v3H3z"></path>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M15 2H9v2h6V2zm4 5H5v14h14V7zm-8.5 2H8v9h2.5V9zm3 0H16v9h-2.5V9z" fill="currentColor"></path>
            </svg>
          </span>
        </div>
      </template>
      <template #default>
        <issue-view :issue="selectedIssue" :category-list="categoryList" :status-list="statusList" @modifyIssue="modifyIssue" @deleteIssue="deleteIssue"></issue-view>
      </template>
    </el-drawer>
    <el-drawer v-model="showsIssueAdd" @close="closeIssueAdd()" class="issue-drawer" direction="rtl" :append-to-body="false" :destroy-on-close="true" :size="'500px'" :modal-class="'modal-transparent'" :z-index="202">
      <!-- :before-close="handleClose" -->
      <template #header>
        <div class="header">
          <template v-if="selectedIssue.type === 'add'">
            <span class="h">이슈 등록하기</span>
          </template>
          <template v-else>
            <div class="back" @click="showsIssueAdd = false">
              <span>
                <span class="arrow">
                  <svg viewBox="0 0 24 24" fill="none" data-v-c531d3c8="" style="transform: rotate(0deg)"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.934 12l3.89 3.89-1.769 1.767L8.398 12l1.768-1.768 3.89-3.889 1.767 1.768-3.889 3.89z" fill="currentColor" data-v-c531d3c8=""></path></svg>
                </span>
                <span class="date">{{ selectedIssue.title }}</span>
              </span>
            </div>
            <span class="h">이슈 수정하기</span>
          </template>
        </div>
      </template>
      <template #default>
        <issue-add :issue="selectedIssue" :issue-list="issueList" :category-list="categoryList" :status-list="statusList" @init="init" @closeIssue="closeIssueAdd" @updateIssue="updateIssue" @scrollToIssue="scrollToIssue"></issue-add>
      </template>
      <template #footer>
        <div style="flex: auto"></div>
      </template>
    </el-drawer>
  </div>
</template>
<script setup>
import { ref, reactive, computed, watch, inject, onMounted, nextTick } from "vue";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import list from "@/components/MapleStory/Issue/List.vue";
import issueAdd from "@/components/MapleStory/Issue/Add.vue";
import issueView from "@/components/MapleStory/Issue/View.vue";
import uxStore from "@/stores/ux";
import gsap from "gsap";
import lodash from "lodash";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";
import { Search, DocumentAdd, Edit, ArrowDown } from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox, ElLoading } from "element-plus";

import data from "./data.json";

import * as hangul from "hangul-js";
import * as blobs2 from "blobs/v2";
import * as blobs2Animate from "blobs/v2/animate";

const route = useRoute();
const router = useRouter();
const ux = uxStore();
const store = inject("store");
const moment = inject("moment");
gsap.registerPlugin(ScrollToPlugin);

let blobList = ref([]);

for (let i = 0; i < 4; i++) {
  blobList.value.push({
    top: parseInt((Math.random() * 100) % 30) + 10,
    left: parseInt(i * 25 + 8),
    path: blobs2.svgPath({
      seed: Math.random(),
      extraPoints: 5,
      randomness: 6,
      size: 400,
    }),
  });
}

let categoryList = ref(data.categoryList);
let statusList = ref(data.statusList);
let sortList = ref(data.sortList);
let issueList = ref(data.issueList);
let viewWeekList = ref(data.viewWeekList);

let colors = data.colors;
let holidayList = data.holidayList;

let width = 80;
let issueListOrigin = [];
let dateList = ref([]);
let monthList = ref([]);

let category = ref(true);
let status = ref(true);
let categoryDrag = ref(false);
let statusDrag = ref(false);

let sort = ref("");
let searchKey = ref("");
let showsIssue = ref(false);
let showsIssueAdd = ref(false);
let showsIssueList = ref(false);
let showsGuide = ref(true);
let showsLoading = ref(false);
let selectedIssue = ref({});
let selectedDayIssueList = ref([]);
let selectedDay = ref({});
let displayedIssue = ref(0);
let displayCurrentDate = reactive({});

let uiOptionsLocal = localStorage.getItem("issue-ui-options");
let uiOptionsDefault = {
  category: true,
  categorySort: [],
  status: true,
  sort: true,
  viewWeek: 3,
  hide: false,
};

if (uiOptionsLocal) {
  uiOptionsDefault = Object.assign(uiOptionsDefault, JSON.parse(uiOptionsLocal));
}

let filters = localStorage.getItem("issue-filters");

if (filters) filters = JSON.parse(filters);
else {
  filters = {
    sort: "category",
    custom: [],
  };
}

sort.value = filters.sort;

let uiOptions = reactive(uiOptionsDefault);

if (uiOptions.categorySort.length > 0) {
  categoryList.value.forEach((entry) => {
    let category = uiOptions.categorySort.find((c) => c.key === entry.key);
    if (category) entry.sortNo = category.sortNo;
  });
}

categoryList.value.sortKey("sortNo");

issueList.value.forEach((entry) => {
  let category = categoryList.value.find((c) => c.key === entry.category);
  entry.defaultSortNo = category.sortNo;
});

// issueList.value.forEach((entry) => {
//   let category = categoryList.value.find((c) => c.key === entry.category);
//   entry.defaultSortNo = category.sortNo;
// });

// issueList.value.sortKey("defaultSortNo");

let searchFilter = ref({
  period: [],
  category: null,
  status: null,
});

let today = moment().format("YYYY-MM-DD");

let scrollLeft = ref(0);
let screenWidth = 0;
let screenHeight = document.body.clientHeight - 200;
let totalWidth = dateList.value.length * width;

let mouse = ref({
  moved: false,
  x: 0,
  y: 0,
});

let gantt = null;

onMounted(() => {
  gantt = document.querySelector("#gantt");

  gantt.addEventListener("wheel", (evt) => {
    evt.preventDefault();

    if (showsGuide.value) showsGuide.value = false;

    if (gantt.scrollLeft + evt.deltaY >= totalWidth) gantt.scrollLeft = totalWidth;
    else gantt.scrollLeft += evt.deltaY;

    scrollLeft.value = gantt.scrollLeft;
  });

  gantt.addEventListener("scroll", (evt) => {
    if (evt.target.scrollLeft < totalWidth) scrollLeft.value = evt.target.scrollLeft;
  });

  gantt.addEventListener("mousedown", (event) => {
    //event.preventDefault();
    mouse.moved = true;
    mouse.x = event.clientX + gantt.scrollLeft;
    mouse.startX = event.clientX;
    mouse.time = new Date().getTime();
  });

  gantt.addEventListener("mouseup", (event) => {
    //event.preventDefault();
    mouse.moved = false;
    let t = new Date().getTime() - mouse.time;
    let x = mouse.startX - event.clientX;
    if (t < 300 && (x > 50 || x < -50)) scrollTo(gantt.scrollLeft + x * (t < 200 ? 2 : 1));
  });

  gantt.addEventListener("mousemove", (event) => {
    //event.preventDefault();
    if (mouse.moved) {
      let left = mouse.x - event.clientX;
      gantt.scrollLeft = left;
      scrollLeft.value = left;
    }
  });

  addEventListener("resize", (event) => {
    function resize(w, h) {
      //
      if (event.target.outerWidth === w && event.target.outerHeight === h) {
        screenWidth = gantt.offsetWidth;
        screenHeight = document.body.clientHeight - 200;

        const loading = ElLoading.service({ lock: true, text: "", background: "rgba(var(--default-bg-color), 0.7)" });

        setTimeout(() => {
          init();
          let x = dateList.value.findIndex((entry) => entry.isToday) * width - screenWidth / 2 + width / 2;
          gsap.to(document.querySelector("#gantt"), { duration: 0, scrollTo: { x: x } });
          setTimeout(loading.close, 500);
        }, 200);
      }
    }

    setTimeout(resize, 1000, event.target.outerWidth, event.target.outerHeight);
  });

  nextTick(() => {
    screenWidth = gantt.offsetWidth;
    let index = dateList.value.findIndex((entry) => entry.isToday);
    let left = index * width - screenWidth / 2 + width / 2;

    scrollLeft.value = left;
    gantt.scrollLeft = left;

    issueListOrigin = JSON.parse(JSON.stringify(issueList.value));

    if (route.query.date) {
      let date = dateList.value.find((entry) => entry.full.substring(0, 10) === route.query.date);
      if (date) showIssueList(date);
    }

    if (route.query.issue) {
      let issue = issueList.value.find((entry) => entry.issueID == route.query.issue);
      if (issue) showIssue(issue);
    }
  });
});

watch(category, () => {
  let total = categoryList.value.length;
  let filtered = categoryList.value.filter((entry) => entry.checked).length;
  if (total === filtered || filtered === 0) {
    categoryList.value.forEach((entry) => {
      entry.checked = category.value;
    });
  }
});

watch(status, () => {
  let total = statusList.value.length;
  let filtered = statusList.value.filter((entry) => entry.checked).length;
  if (total === filtered || filtered === 0) {
    statusList.value.forEach((entry) => {
      entry.checked = status.value;
    });
  }
});

watch(sort, () => {
  if (sort.value === "custom") sortCustom();
  else sortIssue();

  filters.sort = sort.value;
  localStorage.setItem("issue-filters", JSON.stringify(filters));

  // filters.sort = sort.value;
  // if (sort.value === "custom") {
  //   filters.custom = true;

  // } else {
  //   uiOptions.custom = false;
  // }
});

watch(searchKey, filteredData);

watch(
  categoryList,
  () => {
    category.value = categoryList.value.filter((entry) => !entry.checked).length > 0 ? false : true;
    filteredData();
  },
  { deep: true }
);

watch(
  statusList,
  () => {
    status.value = statusList.value.filter((entry) => !entry.checked).length > 0 ? false : true;
    filteredData();
  },
  { deep: true }
);

watch(
  () => uiOptions.viewWeek,
  () => {
    dateList.value.forEach((entry, i) => {
      if (i * width <= scrollLeft.value + screenWidth / 2 && (i + 1) * width > scrollLeft.value + screenWidth / 2) {
        displayCurrentDate.value = entry;
      }
    });

    const loading = ElLoading.service({ lock: true, text: "", background: "rgba(var(--default-bg-color), 0.7)" });

    setTimeout(() => {
      init();
      //let x = dateList.value.findIndex((entry) => entry.isToday) * width - screenWidth / 2 + width / 2;
      let x = dateList.value.findIndex((entry) => entry.index === displayCurrentDate.value.index) * width - screenWidth / 2 + width / 2;

      gsap.to(document.querySelector("#gantt"), { duration: 0, scrollTo: { x: x } });
      setTimeout(loading.close, 500);
    }, 500);
  }
);

watch(
  uiOptions,
  () => {
    localStorage.setItem("issue-ui-options", JSON.stringify(uiOptions));

    setTimeout(() => {
      screenWidth = gantt.offsetWidth;
    }, 1000);
  },
  { deep: true }
);

watch(scrollLeft, () => {
  if (!mouse.moved) {
    checkDisplay(issueList.value);
  }
});

watch(
  () => route.query.date,
  (curr, prev) => {
    if (curr) {
      let date = dateList.value.find((entry) => entry.full.substring(0, 10) === curr);
      showIssueList(date);
    } else {
      if (prev) {
        showsIssueList.value = false;
        selectedDay.active = false;
        updateBarColor(null);
      }
    }
  }
);

watch(
  () => route.query.issue,
  (curr, prev) => {
    if (curr) {
      let issue = issueList.value.find((entry) => entry.issueID == curr);
      showIssue(issue);
    } else {
      if (prev) {
        showsIssue.value = false;

        if (showsIssueList.value) updateBarColor(selectedDay);
        else updateBarColor(null);
      }
    }
  }
);

function init() {
  console.log("init");
  width = parseInt((document.body.clientWidth - 200) / (uiOptions.viewWeek * 7));
  document.body.style.setProperty("--gantt-width", width + "px");

  issueList.value.forEach((entry) => {
    if (moment(entry.end).diff(moment(entry.start), "hour") < 24) {
      entry.start = entry.start.substring(0, 10);
      entry.end = entry.start.substring(0, 10);
    }
  });

  issueList.value.forEach((entry, i) => {
    entry.sortNo = i;
    entry.duration = moment(entry.end.substring(0, 10)).diff(moment(entry.start.substring(0, 10)), "days");
    let category = categoryList.value.find((category) => category.key === entry.category);
    entry.categoryLabel = category.label;
    entry.defaultSortNo = entry.defaultSortNo ? entry.defaultSortNo : category.sortNo;
    entry.color = category.color;

    entry.marginLeft = (width / 24) * moment(entry.start).diff(moment(entry.start.substring(0, 10)), "hour");
    entry.marginRight = (width / 24) * moment(entry.end).diff(moment(entry.end.substring(0, 10)), "hour");
  });

  if (sort.value === "custom") sortCustom();
  else sortIssue();

  let tempArr = issueList.value.map((entry) => entry);
  // let start = moment(tempArr.sortKey("start").first().start);
  // let end = moment(tempArr.sortKey("end", -1).first().end);
  // start = start.add("days", -2).format("YYYY-MM-DD");
  // end = end.add("days", 2).format("YYYY-MM-DD");

  // console.log(start, end);

  let start = moment().add("days", -120);
  let end = moment().add("days", 120);

  dateList.value = [];

  let index = 0;

  while (start <= end) {
    let color = colors.find((c) => c.key === start.format("ddd"));
    let holiday = holidayList.find((h) => h.date === start.format("YYYY-MM-DD"));
    if (color) color = color.value;
    if (holiday) {
      if (holiday.type === "holiday") color = "sun";
      else if (holiday.type === "custom") color = "custom";
    }

    dateList.value.push({
      index: index,
      origin: start,
      full: start.format("YYYY-MM-DD HH:mm:ss"),
      short: start.format("D"),
      name: start.format("ddd"),
      shortName: start.format("dd"),
      color: color ? color : "",
      active: false,
      isToday: start.format("YYYY-MM-DD") === today ? true : false,
      holiday: holiday,
    });
    start = start.add("days", 1);
    index++;
  }

  dateList.value.forEach((entry, i) => {
    if (i + 1 < dateList.value.length) {
      if (entry.full.substring(0, 7) !== dateList.value[i + 1].full.substring(0, 7)) entry.last = true;
    }

    entry.issue = issueList.value.filter((s) => {
      return entry.full.substring(0, 10) >= s.start.substring(0, 10) && entry.full.substring(0, 10) <= s.end.substring(0, 10);
    }).length;
  });

  let x = 0;

  monthList.value = lodash.uniq(dateList.value.map((entry) => entry.full.substring(0, 7))).map((entry) => {
    let w = width * dateList.value.filter((d) => d.full.substring(0, 7) === entry).length;
    x += w;
    return {
      month: entry,
      width: w,
      x: x - w,
      label: moment(entry).format("YYYY년 MM월"),
      yyyy: moment(entry).format("YYYY"),
      mm: moment(entry).format("MM"),
    };
  });

  issueList.value.forEach((entry) => {
    let startIndex = dateList.value.findIndex((date) => date.full.substring(0, 10) === entry.start.substring(0, 10));
    let endIndex = dateList.value.findIndex((date) => date.full.substring(0, 10) === entry.end.substring(0, 10));

    entry.scrollStart = startIndex * width;
    entry.scrollEnd = endIndex * width;
  });

  totalWidth = dateList.value.length * width;

  checkDisplay(issueList.value);
}

init();

function checkDisplay(data) {
  let start = scrollLeft.value;
  let end = scrollLeft.value + screenWidth;

  data.forEach((entry) => {
    entry.display = entry.scrollEnd + width < start || entry.scrollStart > end ? false : true;
  });

  monthList.value.forEach((entry) => {
    let w = entry.width - (scrollLeft.value - entry.x);
    let l = entry.width - w;

    entry.w = w;
    entry.l = l;

    entry.sw = entry.w > screenWidth ? screenWidth + l : entry.w;
    entry.sl = l < 0 ? 0 : l;

    if (entry.sw > screenWidth) entry.sw = screenWidth;
    if (entry.sw > entry.width) entry.sw = entry.width;
  });

  displayedIssue.value = data.filter((entry) => entry.display).length;
}

function sortCustom() {
  let filter = localStorage.getItem("issue-filters");

  if (filter) {
    filter = JSON.parse(filter);
    let sortNoList = filter.custom;
    issueList.value.forEach((entry) => {
      let item = sortNoList.find((sort) => sort.issueID === entry.issueID);
      if (item) entry.sortNo = item.sortNo;
    });

    issueList.value.sortKey("sortNo");
  }
}

function sortIssue() {
  issueList.value.sort((a, b) => {
    if (sort.value === "category") {
      a = a["defaultSortNo"].toString();
      b = b["defaultSortNo"].toString();
    } else {
      a = (sort.value ? a[sort.value].toString() : "") + "_" + a["defaultSortNo"].toString();
      b = (sort.value ? b[sort.value].toString() : "") + "_" + b["defaultSortNo"].toString();
    }
    return (a === b ? 0 : a > b ? 1 : -1) * 1;
  });
}

function scrollTo(x) {
  let size = scrollLeft.value - x;
  let duration = (size / screenWidth) * 0.5;
  if (size < 0) duration = duration * -1;
  if (duration < 0.5) duration = 0.5;
  if (duration > 1) duration = 0.5;

  duration = 0;

  gsap.to(document.querySelector("#gantt"), { duration: duration, scrollTo: { x: x } });
}

function scrollToIssue(entry) {
  entry.added = true;
  setTimeout(() => {
    entry.added = false;
  }, 1500);
  //gsap.to(document.querySelector("#gantt"), { duration: 1, scrollTo: { x: entry.scrollStart } });
}

function getWidth(el, index) {
  // let w = (el.duration + 1) * width - (scrollLeft.value > index * width && scrollLeft.value < index * width + el.duration * width ? scrollLeft.value - index * width : 0);
  // return w - el.marginLeft - (el.marginRight > 0 ? width - el.marginRight : 0);

  let w = (el.duration + 1) * width;

  if (scrollLeft.value > index * width && scrollLeft.value < index * width + el.duration * width + width) {
    w = w - (scrollLeft.value - index * width);
  } else {
    w = w - el.marginLeft;
  }

  return w - (el.marginRight > 0 ? width - el.marginRight : 0);
}

function getLeft(el, index) {
  let left = 0;

  if (scrollLeft.value > index * width + el.marginLeft && scrollLeft.value < index * width + el.duration * width + width) left = scrollLeft.value - index * width;
  else left = left + el.marginLeft;

  return left;
}

function showIssue(entry) {
  if (entry) {
    showsIssue.value = true;
    updateBarColor(entry);

    selectedIssue.value = {
      type: "modify",
      period: [moment(entry.start).toDate(), moment(entry.end).toDate()],
      issueID: entry.issueID,
      title: entry.title,
      category: entry.category,
      status: entry.status,
      start: entry.start,
      end: entry.end,
    };
  } else {
    showsIssueAdd.value = true;
    selectedIssue.value = {
      type: "add",
      period: [],
      title: null,
      category: null,
      status: null,
      start: null,
      end: null,
    };
  }
}

function showIssueList(entry) {
  dateList.value.forEach((s, i) => {
    if (s.full === entry.full) {
      entry.active = !entry.active;
      scrollTo(i * width - screenWidth / 2 + width / 2);
    }
  });

  showsIssueList.value = entry.active;

  if (entry.active) {
    selectedDayIssueList.value = issueList.value.filter((s) => entry.full.substring(0, 10) >= s.start.substring(0, 10) && entry.full.substring(0, 10) <= s.end.substring(0, 10));
    selectedDay = entry;
  }
}

function filteredData() {
  let data = issueListOrigin.filter((entry) => {
    if (searchKey.value) {
      return hangul.disassemble(entry.title.toLowerCase()).join("").includes(hangul.disassemble(searchKey.value.toLowerCase()).join(""));
    } else return true;
  });

  data = data.filter((entry) => {
    return categoryList.value.find((c) => c.key === entry.category).checked && statusList.value.find((c) => c.key === entry.status).checked;
  });

  checkDisplay(data);

  issueList.value = data;

  init();
}

function update() {
  issueList.value.forEach((entry, i) => {
    entry.sortNo = i;
  });

  issueList.value.sortKey("sortNo");

  issueListOrigin.forEach((entry) => {
    let target = issueList.value.find((s) => s.title === entry.title);
    if (target) entry.sortNo = target.sortNo;
  });

  issueListOrigin.sortKey("sortNo");
}

function updateIssue() {
  selectedIssue.value = Object.assign(
    selectedIssue.value,
    issueList.value.find((entry) => entry.issueID === selectedIssue.value.issueID)
  );
}

function moveToday() {
  let index = dateList.value.findIndex((entry) => entry.isToday);
  scrollTo(index * width - screenWidth / 2 + width / 2);
}

function back(ref) {
  if (router.options.history.state.back) router.back();
  else {
    if (ref === "list") router.replace({});
    if (ref === "view") router.replace({ query: route.query.date ? { date: route.query.date } : {} });
  }
}

function closeIssueAdd() {
  showsIssueAdd.value = false;
  selectedDay.active = false;
}

function modifyIssue() {
  showsIssueAdd.value = true;
}

function deleteIssue() {
  ElMessageBox.confirm(`'${selectedIssue.value.title}' 삭제하겠습니까?`, "이슈 삭제", {
    autofocus: false,
    confirmButtonText: "확인",
    cancelButtonText: "취소",
    type: "",
  })
    .then(() => {
      showsIssue.value = false;
      let index = issueList.value.findIndex((entry) => entry.issueID === selectedIssue.value.issueID);
      issueList.value.splice(index, 1);

      index = selectedDayIssueList.value.findIndex((entry) => entry.issueID === selectedIssue.value.issueID);
      selectedDayIssueList.value.splice(index, 1);

      ElMessage({
        type: "info",
        message: "삭제되었습니다.",
      });
    })
    .catch(() => {});
}

function startDrag(event) {
  event.preventDefault();
}

function endDrag(event) {
  event.preventDefault();
  mouse.moved = false;
  issueList.value.forEach((entry, i) => {
    entry.sortNo = i;
  });

  filters.custom = issueList.value.map((entry) => {
    return {
      issueID: entry.issueID,
      sortNo: entry.sortNo,
    };
  });

  localStorage.setItem("issue-filters", JSON.stringify(filters));
}

function updateCategory() {
  nextTick(() => {
    let list = lodash.cloneDeep(categoryList.value);

    list.forEach((entry, i) => {
      entry.sortNo = i;
    });

    issueList.value.forEach((entry) => {
      let category = list.find((c) => c.key === entry.category);
      entry.defaultSortNo = category.sortNo;
    });

    // categoryList.value.forEach((entry, i) => {
    //   entry.sortNo = i;
    // });

    uiOptions.categorySort = list.map((entry) => {
      return {
        key: entry.key,
        sortNo: entry.sortNo,
      };
    });

    sortIssue();
  });
}

let target = "";

function mouseoverDate(entry) {
  function activeIssueList(full) {
    if (entry.full === target) {
      updateBarColor(entry);
    }
  }
  target = entry.full;
  setTimeout(activeIssueList, 50, target);
}

function mouseleaveDate(entry) {
  target = "";
  if (!showsIssueList.value && !showsIssue.value) {
    updateBarColor(null);
  }
}

function updateBarColor(entry) {
  issueList.value.forEach((s) => {
    if (entry === null) {
      s.active = false;
      s.disabled = false;
    } else {
      if (entry.full) {
        if (entry.full.substring(0, 10) >= s.start.substring(0, 10) && entry.full.substring(0, 10) <= s.end.substring(0, 10)) s.active = true;
        else {
          s.active = false;
          s.disabled = true;
        }
      } else if (entry.issueID) {
        if (s.issueID === entry.issueID) s.active = true;
        else {
          s.active = false;
          s.disabled = true;
        }
      }
    }
  });
}
</script>
