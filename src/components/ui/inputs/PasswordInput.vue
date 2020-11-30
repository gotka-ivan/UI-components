<template>
  <div class="wrap">
    <TextInput
      :id="id"
      v-model="val"
      :classes="classes"
      :config="{
        ...textInputConfig,
        type: showPassword ? 'text' : 'password',
        required: required,
        reset: reset
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
        <slot name="right">
          <i
            :class="['password-icon zmdi zmdi-eye-off', showPassword && 'zmdi-eye']"
            @click="showPassword = !showPassword"
          ></i>
        </slot>
      </template>

      <template slot="invalid">
        <slot name="invalid"> </slot>
      </template>
    </TextInput>
  </div>
</template>

<script>
import TextInput, { Config as TextInputConfig } from '@src/components/ui/inputs/TextInput.vue'

export default {
  name: 'CommonPasswordInput',
  components: {
    TextInput
  },
  inheritAttrs: false,
  props: {
    value: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: 'password-input'
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
      showPassword: false,
      val: this.value
    }
  }
}
</script>

<style lang="less" scoped>
@import '~assets/less/_variables.less';

.password-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;

  font-size: 18px;

  cursor: pointer;
}

/deep/ .wrap .field .right-wrapper {
  top: 50%;
  right: 0;
  height: 100%;
  transform: translateY(-50%);
  display: flex;
}
</style>

<style lang="less" scoped>
.tw-special-mode {
  .password-icon {
    color: #000;
  }
}
</style>
