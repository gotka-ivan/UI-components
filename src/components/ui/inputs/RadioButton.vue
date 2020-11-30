<template>
  <div>
    <input
      :id="id"
      v-model="val"
      v-bind="$attrs"
      type="radio"
      :class="[classes, invalid && 'invalid']"
      v-on="inputListeners"
    />
    <label :for="id" class="field-label">
      <slot name="label"></slot>
    </label>
  </div>
</template>

<script>
export default {
  name: 'CommonRadioButton',
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
    }
  },

  data: function() {
    return {
      val: this.value
    }
  },

  computed: {
    inputListeners: function() {
      return Object.assign({}, this.$listeners, {
        input: event => {
          this.$emit('input', event.target.value)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import '~assets/less/_variables.less';

input[type='radio'] {
  display: none;
}

.field-label {
  margin-bottom: 5px;
  font-size: 14px;
  cursor: pointer;
}

.field-label:before {
  font: normal normal normal 14px/1 'Material-Design-Iconic-Font';
  color: #7e8796;
  font-size: 25px;
  margin-right: 5px;
  vertical-align: bottom;
  display: inline-flex;
  padding: 0 2px;
  border-radius: 50%;
}

input[type='radio']:checked + label:before {
  content: '\f26f';
}

input[type='radio']:focus + .field-label:before {
  outline: none;
}

.invalid + .field-label:before {
  box-shadow: 0px 0px 4px 0px @red !important;
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

  .field-label::before {
    color: #000 !important;
  }

  .field-label:hover::before {
    outline: 2px solid;
    outline-offset: 0;
    outline-color: #000;
  }

  .invalid + .field-label:before {
    box-shadow: 0 0 4px 2px #000 !important;
  }
}
</style>
