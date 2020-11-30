<template>
  <div>
    <input
      :id="id"
      v-model="val"
      v-bind="$attrs"
      type="checkbox"
      :class="[classes, invalid && 'invalid']"
      v-on="{ ...$listeners, input: () => {} }"
    />
    <label :for="id" class="field-label">
      <slot name="label"></slot>
      <span v-if="config.required" class="star">* &nbsp;</span>
    </label>
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
  name: 'CommonCheckbox',
  inheritAttrs: false,
  props: {
    id: {
      type: String,
      default: ''
    },
    classes: {
      type: String,
      default: ''
    },
    invalid: {
      type: Boolean,
      default: false
    },
    value: {
      type: [Boolean, String],
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

      set(value) {
        this.$emit('input', value)
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '~assets/less/_variables.less';

input[type='checkbox'] {
  display: none;
}

.field-label {
  position: relative;
  padding-left: 28px;
  line-height: 20px;
  font-size: 14px;
  font-weight: 400;
  cursor: pointer;
  display: flex !important;
  .star {
    color: red;
    padding-left: 4px;
  }

  &::before {
    content: '';
    position: absolute;
    left: 0px;
    top: 0px;
    width: 18px;
    height: 18px;
    border: 1px solid #b5b8c8;
    background-color: #ffffff;
    border-radius: 2px;
    box-sizing: unset;
  }

  &::after {
    content: '';
    position: absolute;
    transition: all 0.2s ease;
    left: 3px;
    top: 4px;
    width: 10px;
    height: 5px;
    border-radius: 1px;
    border-left: 4px solid #7e8796;
    border-bottom: 4px solid #7e8796;
    transform: rotate(-45deg);
    opacity: 0;
    box-sizing: unset;
  }
}

input[type='checkbox']:checked + .field-label::after {
  opacity: 1;
}

.invalid + .field-label:before {
  box-shadow: 0px 0px 4px 0px @red !important;
}

@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
  input[type='checkbox']:checked + label:after,
  input[type='checkbox']:not(:checked) + label:after {
    width: 12px !important;
    height: 8px !important;
  }
}
</style>

<style lang="less" scoped>
.tw-special-mode {
  .field-label {
    font-weight: 700 !important;
    font-size: 20px;

    color: #000;
    outline: none;
  }

  .field-label::before,
  .field-label::after {
    border-color: #000 !important;
  }

  .field-label:hover::before {
    outline: 2px solid;
    outline-offset: 0;
    outline-color: #000;
  }

  .invalid + .field-label:before {
    box-shadow: 0 0 4px 2px #000 !important;
  }

  .star {
    color: #000;
  }
}
</style>
