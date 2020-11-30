<template>
  <div v-show="show" class="plain-modal">
    <div class="pm-wrapper">
      <div :class="['pm-container', 'pm-size-' + size]">
        <div class="pm-header">
          <div v-if="isClose" class="pm-close" @click="$emit('update:show', false)">
            <close />
          </div>
          <slot name="title" />
        </div>
        <div class="pm-body">
          <slot name="body" />
        </div>
        <div class="pm-footer">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Close from 'vue-material-design-icons/Close.vue'
export default {
  name: 'PlainModal',
  components: {
    Close
  },
  inheritAttrs: false,
  props: {
    show: {
      type: Boolean,
      required: true,
      default: false
    },
    size: {
      type: String,
      default: 'default'
    },
    isClose: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="less" scoped>
@import '~assets/less/_variables.less';
.plain-modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  outline: 0;
  z-index: 10000;
  background: rgba(102, 102, 102, 0.85);
  -webkit-overflow-scrolling: touch;

  .pm-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;

    .pm-container {
      position: relative;
      padding: 20px;
      background: #fff;
      border: 1px solid #b5b8c8;

      &.pm-size-sm {
        width: 300px;
      }
      &.pm-size-default {
        max-width: 500px;
      }
      &.pm-size-lg {
        width: 500px;
      }
      &.pm-size-xl {
        max-width: 1140px;
      }

      .pm-header {
        margin-bottom: 10px;
        text-align: center;
        font-size: 28px;
        font-weight: bold;

        .pm-close {
          position: absolute;
          right: 5px;
          top: 5px;
          cursor: pointer;
          color: @gray;
          &:hover {
            color: @dark-gray;
          }
        }
      }
    }

    .pm-body,
    .pm-footer {
      font-size: 18px;
      .button.btn {
        margin-top: 10px;
        min-height: 45px;
        padding: 5px 15px;
      }
    }
  }
}

@media (max-width: 600px) {
  .plain-modal .pm-wrapper .pm-container {
    &.pm-size-lg {
      width: 100%;
    }
  }
}
</style>
