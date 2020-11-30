<template>
  <div class="categories-oval-container" @input.stop="changeValue">
    <div :class="['oval-container', { full: isShowAllOvals }]">
      <slot name="ovals" v-bind="{ value }" />
    </div>
    <div v-if="isShowAllOvals" class="hide-ovals" @click="isShowAllOvals = false">
      <slot name="hide">
        Свернуть
      </slot>
    </div>
    <div v-if="!isShowAllOvals" class="show-ovals" @click="isShowAllOvals = true">
      <slot name="show">
        Показать&nbsp;все
      </slot>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

@Component
class OvalContainer extends Vue {
  isShowAllOvals = false

  @Prop({
    type: Array,
    default() {
      return []
    }
  })
  value

  changeValue(event) {
    if (event.detail) {
      let x = [...this.value]
      if (x.includes(event.detail)) {
        x.splice(x.indexOf(event.detail), 1)
      } else {
        x.push(event.detail)
      }
      this.$emit('input', x)
    }
  }
}
export default OvalContainer
</script>

<style lang="less" scoped>
@import '~assets/less/_variables.less';
.categories-oval-container {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  position: relative;
  background-color: white;
}
.oval-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  height: 52px;
  overflow: hidden;
  padding-top: 10px;
  padding-left: 5px;
  flex: 1;
  &.full {
    overflow: auto;
    height: auto;
  }
  > * {
    margin: 0 5px 10px 5px;
  }
}

.show-ovals,
.hide-ovals {
  font-size: 14px;
  color: @blue;
  cursor: pointer;
  padding: 10px;
  background-color: white;
  padding-top: 15px;
  &:hover {
    text-decoration: underline;
  }
}

@media (max-width: 767px) {
  .mobile-filters {
    position: fixed;
    z-index: 1000;
    overflow: auto !important;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    color: #3c3f45;
    background-color: #fff;
  }
  .categories-oval-container {
    flex-direction: column;
    .show-ovals,
    .hide-ovals {
      text-align: center;
      padding-top: 0px;
    }
  }
}
</style>

<style lang="less" scoped>
.tw-special-mode {
  .show-ovals,
  .hide-ovals {
    color: black;
  }
}
</style>
