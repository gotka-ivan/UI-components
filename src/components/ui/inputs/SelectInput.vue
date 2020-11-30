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
      <!--TODO разобраться нужен ли input и change в исключениях событий  -->
      <select
        v-if="config.markGroup"
        :id="id"
        v-model="optionModel"
        v-bind="$attrs"
        type="text"
        :class="[classes, invalid && 'error', $slots.left && 'left-padding']"
        v-on="{ ...$listeners, input: () => {}, change: () => {} }"
      >
        <option v-if="$slots.default" :value="undefined" selected>
          <slot name="default"></slot>
        </option>
        <optgroup v-for="(group, gIdx) in options" :key="gIdx" :label="group[config.markGroupName]">
          <option v-for="item in group[config.markGroup]" :key="item.id" :selected="value === item" :value="item">{{
            item[mark] || item
          }}</option>
        </optgroup>
      </select>
      <!--TODO разобраться нужен ли input и change в исключениях событий  -->
      <select
        v-else
        :id="id"
        v-model="optionModel"
        v-bind="$attrs"
        type="text"
        :class="[classes, invalid && 'error', $slots.left && 'left-padding']"
        v-on="{ ...$listeners, input: () => {}, change: () => {} }"
      >
        <option v-if="$slots.default" :value="undefined" selected>
          <slot name="default"></slot>
        </option>
        <option
          v-for="(item, idx) in options"
          :key="idx"
          :selected="value === item"
          :value="markValue === 'default' ? item : item[markValue]"
          >{{ item[mark] || item }}</option
        >
      </select>
      <div
        v-if="config.reset"
        :class="['close-container', $slots.right && 'right', !value.length && 'hide']"
        @click="this.$emit('input', undefined)"
      >
        <div class="close"></div>
      </div>
      <div v-if="$slots.right" class="right-wrapper">
        <slot name="right"></slot>
      </div>
    </div>
    <div v-if="invalid" class="invalid-text">
      <slot name="invalid">
        Выберите значение
      </slot>
    </div>
  </div>
</template>

<script>
export class Config {
  required
  markGroup
  markGroupName
  constructor(required = false, markGroup = false, markGroupName = 'name') {
    this.required = required
    this.markGroup = markGroup
    this.markGroupName = markGroupName
  }
}
export default {
  name: 'SelectInput',
  inheritAttrs: false,
  props: {
    options: {
      type: Array,
      default: () => []
    },
    value: {
      type: Object,
      default: () => ({})
    },
    id: {
      type: [String, Number],
      default: 'text-input'
    },
    mark: {
      type: String,
      default: 'name'
    },
    markValue: {
      type: String,
      default: 'default'
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
      type: Config,
      default: () => new Config()
    }
  },
  computed: {
    optionModel: {
      get() {
        return this.value
      },

      set(value) {
        this.$emit('input', value)
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

    select {
      width: 100%;
      min-height: 48px;
      font-size: 16px;
      color: @dark-gray;
      padding: 5px 32px 5px 10px;
      background-color: #fff;
      border: 1px solid @light-gray;
      background: white url(../../../assets/images/chevron-down.svg) no-repeat;
      background-size: 10px;
      background-position: right 12px center;
      font-size: 16px;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      border-radius: 0;
      &.left-padding {
        padding-left: 35px;
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
      &:disabled {
        outline: none;
        color: @input-disabled;
        background-color: @input-bg-disabled;
        &:hover {
          color: @input-disabled;
          background-color: @input-bg-disabled;
        }
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
  .wrap .field select {
    border: 2px solid #000000;
    color: #000000;
    font-weight: 600;
  }
  &::placeholder {
    color: #000000;
  }

  .wrap .field select:focus {
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

  .wrap .field select.error {
    border: 2px solid #000000;
  }
}
</style>
