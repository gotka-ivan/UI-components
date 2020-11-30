<template>
  <div class="wrap">
    <div v-if="$slots.label" class="label-wrapper">
      <label :for="id">
        <slot name="label"></slot>
        <span v-if="config.required" class="star">* &nbsp;</span>
      </label>
    </div>
    <div class="field">
      <div v-if="$slots.left" class="left-wrapper">
        <slot name="left"></slot>
      </div>
      <input
        v-if="config.mask !== null"
        :id="id"
        v-model="valueModel"
        v-mask="config.mask"
        v-bind="$attrs"
        :type="config.type"
        :class="[
          classes,
          invalid && 'error',
          $slots.left && 'left-padding',
          ($slots.right || config.reset) && 'right-padding',
          $slots.right && config.reset && 'two-icons-padding'
        ]"
        v-on="{ ...$listeners, input: () => {} }"
      />
      <input
        v-else
        :id="id"
        v-model="valueModel"
        v-bind="$attrs"
        :type="config.type"
        :class="[
          classes,
          invalid && 'error',
          $slots.left && 'left-padding',
          ($slots.right || config.reset) && 'right-padding',
          $slots.right && config.reset && 'two-icons-padding'
        ]"
        v-on="{ ...$listeners, input: () => {} }"
      />
      <div
        v-if="config.reset"
        :class="['close-container', $slots.right && 'right', !valueModel && 'hide']"
        @click="valueModel = ''"
      >
        <div class="close"></div>
      </div>
      <div v-if="$slots.right" class="right-wrapper">
        <slot name="right"></slot>
      </div>
    </div>
    <div v-if="invalid" class="invalid-text">
      <slot name="invalid"> Проверьте правильность заполнения поля </slot>
    </div>
  </div>
</template>

<script>
import { mask } from 'vue-the-mask'

export class Config {
  required
  reset
  required
  type
  mask
  constructor(required = false, mask = null, type = 'text', reset = false) {
    this.required = required
    this.type = type
    this.reset = reset
    this.mask = mask
  }
}

export default {
  name: 'TextInput',
  directives: { mask },
  inheritAttrs: false,
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    id: {
      type: [String, Number],
      default: 'text-input'
    },
    invalid: {
      type: Boolean,
      default: false
    },
    classes: {
      type: Array,
      default: () => []
    },
    config: {
      type: Object,
      default: () => new Config()
    }
  },
  computed: {
    valueModel: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '~assets/less/_variables.less';
.wrap {
  width: 100%;
  height: 100%;
  .label-wrapper {
    padding-bottom: 12px;
    font-size: 14px;
    color: #3c3f45;
    label {
      display: flex;
      .star {
        color: red;
        padding-left: 4px;
      }
    }
  }
  .field {
    position: relative;
    .hide {
      display: none !important;
    }
    width: 100%;
    .left-wrapper {
      position: absolute;
      left: 8px;
      top: 25%;
      color: @light-gray;
    }
    .right-wrapper {
      position: absolute;
      right: 8px;
      top: 25%;
      color: @light-gray;
    }

    .close-container {
      position: absolute;
      right: 0;
      height: 100%;
      width: 35px;
      top: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      &.right {
        right: 30px;
      }
      .close {
        background: url('~assets/images/ic_close_black.svg') no-repeat center center;
        height: 20px;
        width: 20px;
        color: @light-gray;
        cursor: pointer;
      }
    }

    input {
      width: 100%;
      min-height: 48px;
      font-size: 16px;
      color: @dark-gray;
      padding: 5px 10px;
      background-color: #fff;
      border: 1px solid @light-gray;
      font-size: 14px;

      &[type='number'] {
        -moz-appearance: textfield;
      }

      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
      }

      &.right-padding {
        padding-right: 35px;
      }

      &.left-padding {
        padding-left: 35px;
      }
      &.two-icons-padding {
        padding-right: 70px;
      }
      &:active,
      &:focus {
        outline: 2px solid;
        outline-offset: 0px;
        outline-color: #b5b8c8;
      }
      &.error {
        border: 2px solid #cd5251;
        transition: 0.5s !important;
        outline: none;
      }
    }

    input:disabled,
    input:read-only {
      color: @input-disabled;
      background-color: @input-bg-disabled;
      &:hover {
        color: @input-disabled;
        background-color: @input-bg-disabled;
      }
    }
  }
  .invalid-text {
    color: #cd5251;
    font-size: 14px;
    padding-top: 7px;
    font-weight: 600;
  }
}
</style>

<style lang="less" scoped>
.tw-special-mode {
  .wrap .field input {
    border: 2px solid #000000;
    color: #000000;
    font-weight: 700;
  }
  &::placeholder {
    color: #000000;
  }

  .wrap .field input:focus {
    outline: 1px solid;
    outline-offset: 0px;
    outline-color: #000000;
  }

  .wrap .field .left-wrapper {
    color: #000000;
  }

  .wrap .label-wrapper {
    font-size: 20px;
    color: #000;
    font-weight: 700;
  }

  .wrap .label-wrapper label .star {
    color: #000000;
  }

  .wrap .invalid-text {
    color: #000000;
  }

  .wrap .field input.error {
    border: 2px solid #000000;
    box-shadow: 0 0 4px 2px #000 !important;
  }
  .wrap .field input::placeholder {
    color: black;
  }
}
</style>
