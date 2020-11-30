<template>
  <button v-if="$slots.left || $slots.text || $slots.right" class="button" v-on="$listeners">
    <div v-if="$slots.left" class="left">
      <slot name="left" />
    </div>
    <div v-if="$slots.text" class="text-button">
      <slot name="text" />
    </div>
    <div v-if="$slots.right" class="right">
      <slot name="right" />
    </div>
  </button>
</template>

<script>
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

@Component
class Button extends Vue {}
export default Button
</script>

<style lang="less" scoped>
@import '~assets/less/_variables.less';
.button {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  background-color: @blue;
  color: white;
  padding: 5px 10px;
  &:hover {
    background-color: @dark-blue;
  }
  &:active {
    box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
  }
  &:active,
  &:focus {
    outline: 2px solid;
    outline-offset: 0px;
    outline-color: #b5b8c8;
  }
  &:disabled {
    cursor: not-allowed;
    > * {
      pointer-events: none;
    }
  }

  > :not(:last-child) {
    margin-right: 5px;
  }
}

.yellow {
  background-color: @yellow;
  &:hover&:not(disabled) {
    background-color: @dark-yellow;
  }
}

.danger {
  background-color: red;
  &:hover {
    background-color: @red;
  }
}

.green {
  background-color: @green;
  &:hover {
    background-color: @dark-green;
  }
}

.white {
  background-color: white;
  color: black;
  border: thin solid @light-gray;
  &:hover {
    background-color: @light-gray-bg-btn;
  }
}

.white-blue {
  background-color: white;
  color: @blue;
  border: thin solid @blue;
  &:hover {
    background-color: @light-gray-bg-btn;
  }
}

.transparent-blue {
  background-color: transparent;
  color: @blue;
  border: thin solid @blue;
  &:hover {
    background-color: @light-gray-bg-btn;
    &:disabled {
      color: @gray;
      border: thin solid @light-gray;
    }
  }
}
@media (max-width: 767px) {
  .button.btn {
    width: 100%;
  }
}
</style>

<style lang="less" scoped>
.tw-special-mode {
  .button {
    &.special-white {
      background-color: white;
      border: 1px solid black;
      color: black;
      &:hover {
        background-color: black !important;
        outline: 1px solid white !important;
        color: white !important;
      }
    }
    &.special-black {
      background-color: black;
      border-color: white;
      color: white;
      &:hover {
        outline: 1px solid black !important;
        background-color: white !important;
        color: black !important;
      }
    }
    &.captcha-modal__button,
    &.captcha-modal__cancel-button {
      font-size: 24px;
      font-weight: 700;
    }
    &:active {
      box-shadow: none;
    }
    &:active,
    &:focus {
      outline: 2px solid;
      outline-offset: 1px;
      outline-color: black;
    }
  }
}
</style>
