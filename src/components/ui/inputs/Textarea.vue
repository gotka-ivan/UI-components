<template>
  <div class="wrapper">
    <div v-if="$slots.label" class="label-wrapper">
      <label class="field_label" :for="id">
        <slot name="label"></slot>
        <span v-if="config.required" class="star">* </span>
      </label>
    </div>
    <textarea
      :id="id"
      v-model="val"
      v-bind="$attrs"
      :class="['textarea', classes, invalid && 'error']"
      v-on="{ ...$listeners, input: () => {} }"
    ></textarea>
    <p v-if="invalid" class="error-message">
      <slot name="error">Проверьте правильность заполнения поля</slot>
    </p>
  </div>
</template>

<script>
export class Config {
  required
  constructor(required = false) {
    this.required = required
  }
}

export default {
  name: 'Textarea',
  inheritAttrs: false,
  props: {
    classes: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    invalid: {
      type: Boolean,
      default: false
    },
    config: {
      type: Config,
      default: () => new Config()
    }
  },
  computed: {
    val: {
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

<style scoped lang="less">
@import '~assets/less/_variables.less';

.wrapper {
  .label-wrapper {
    padding-bottom: 12px;
    label {
      display: flex;

      .star {
        color: red;
        padding-left: 4px;
      }
    }
  }

  .textarea {
    width: 100%;
    height: 100%;
    padding: 5px 10px;
    letter-spacing: 1.1px;
    border: 1px solid @light-gray;

    font-family: 'Open Sans', sans-serif, Roboto;
    font-size: 16px;
    color: @dark-gray;
    resize: vertical;
    font-weight: 500;
    overflow: hidden;

    &:focus {
      outline: 2px solid @light-gray;
    }

    &:hover {
      background-color: @almost-white;
    }

    &.error {
      border: 2px solid @red;
    }

    &:disabled,
    &:read-only {
      color: @input-disabled;
      background-color: @input-bg-disabled;

      &:hover {
        color: @input-disabled;
        background-color: @input-bg-disabled;
      }
    }
    &::-webkit-input-placeholder {
      color: @dark-gray;
    }
    &::-ms-input-placeholder {
      color: @dark-gray;
    }
    &::-ms-input-placeholder {
      color: @dark-gray;
    }
    &::placeholder {
      color: @dark-gray;
    }
  }
  .field_label {
    font-size: 14px;
    color: @dark-gray;
    font-weight: 500;
  }

  .error-message {
    color: @red;
    margin: 6px 0 0 0;
    font-size: 14px;
  }
}
</style>

<style lang="less" scoped>
.tw-special-mode {
  .wrapper {
    .label-wrapper {
      padding-bottom: 12px;
      .star {
        color: #000;
        font-size: 20px;
        font-weight: 700;
      }
    }

    .textarea {
      border: 2px solid #000;
      background-color: #fff;
      color: #000 !important;
      font-weight: 700;

      &:focus {
        outline: 1px solid;
        outline-offset: 0px;
        outline-color: #000000;
      }

      &:hover {
        background-color: #fff;
      }

      &.error {
        border: 1px solid #000;
        box-shadow: 0 0 4px 2px #000 !important;
      }

      &:disabled,
      &:read-only {
        color: #000;
        background-color: #fff;

        &:hover {
          color: #000;
          background-color: #fff;
        }
      }
    }

    textarea::placeholder {
      color: #000;
    }

    .field_label {
      font-size: 20px;
      color: #000;
      font-weight: 700;
    }

    .error-message {
      color: #000;
    }
  }
}
</style>
