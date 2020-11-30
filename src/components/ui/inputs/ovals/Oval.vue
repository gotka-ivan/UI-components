<template>
  <div
    v-if="$slots.left || $slots.text || $slots.right"
    :class="['oval', [color], { active: selected }]"
    @click="emitValue"
  >
    <div v-if="$slots.left" class="left">
      <slot name="left" />
    </div>
    <div v-if="$slots.text" class="oval-text">
      <slot name="text" />
    </div>
    <div v-if="$slots.right" class="right">
      <slot name="right" />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

@Component
class Oval extends Vue {
  @Prop({
    type: Object,
    default() {
      return undefined
    }
  })
  value

  @Prop({
    type: Boolean,
    default: false
  })
  selected

  @Prop({
    type: String,
    default: 'blue'
  })
  color

  emitValue() {
    this.$el.dispatchEvent(new CustomEvent('input', { bubbles: true, cancelable: true, detail: this.value }))
    this.$emit('click')
  }
}
export default Oval
</script>
<style lang="less" scoped>
@import '~assets/less/_variables.less';

.oval {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  background-color: white;
  border-radius: 16px;
  border: thin solid @light-gray;
  min-height: 32px;
  padding: 5px 10px;
  color: @dark-gray;
  font-size: 14px;
  max-width: 600px;
  cursor: pointer;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  &.active {
    background-color: @light-gray;
    color: white;
  }
  &.blue {
    border: thin solid @blue;
    &.active {
      background-color: @blue;
      color: white;
    }
  }
  .oval-text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    user-select: none;
  }
  .left {
    margin-right: 5px;
  }
  .right {
    margin-left: 5px;
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  .oval {
    max-width: 450px;
  }
}
@media (max-width: 767px) {
  .oval {
    max-width: 300px;
  }
}
</style>

<style lang="less" scoped>
.tw-special-mode {
  .oval {
    color: black;
    border: 1px solid black;
  }

  .oval.blue {
    background-color: #fff;
    border: 1px solid #000000;
  }
  .oval.blue:hover,
  .oval.blue.active {
    background-color: #000;
    border: 1px solid #000;
  }
  .oval.blue .oval-text {
    color: #000;
  }
  .oval.blue:hover .oval-text {
    color: #fff;
  }
  .oval.blue.active .oval-text {
    color: #fff;
  }
}
</style>
