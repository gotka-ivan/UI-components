<template>
  <div class="wrap">
    <TextInput
      :id="id"
      v-model="val"
      :classes="classes"
      :config="{
        ...textInputConfig,
        required: required,
        reset: reset,
        type: 'tel',
        mask: mask
      }"
      v-bind="$attrs"
    >
      <template slot="label">
        <slot name="label"> </slot>
      </template>

      <template slot="left">
        <slot name="left"> </slot>
      </template>

      <template slot="right">
        <slot name="right"> </slot>
      </template>

      <template slot="invalid">
        <slot name="invalid"> </slot>
      </template>
    </TextInput>
  </div>
</template>

<script>
import TextInput, { Config as TextInputConfig } from '@src/components/lib/inputs/TextInput.vue'

export default {
  name: 'CommonPhoneInput',
  components: {
    TextInput
  },
  inheritAttrs: false,
  props: {
    mask: {
      type: String,
      default: '+7(###)###-##-##'
    },
    value: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: 'phone-input'
    },
    classes: {
      type: Array,
      default: () => []
    },
    required: {
      type: Boolean,
      default: false
    },
    reset: {
      type: Boolean,
      default: false
    }
  },

  data: function() {
    return {
      textInputConfig: new TextInputConfig(),
      val: this.value
    }
  }
}
</script>

<style lang="less" scoped>
@import '~assets/less/_variables.less';
</style>
