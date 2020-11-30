<template>
  <div v-if="alert.isShow" :class="['ekp-alert', alert.title && 'ekp-alert-title-container']">
    <CheckCircle v-if="alert.type === alert.types.success" fill-color="#49AE61" :size="28" title="" />
    <CloseCircle v-else-if="alert.type === alert.types.error" fill-color="red" :size="28" title="" />
    <div class="alert-container">
      <p v-if="alert.title" class="alert-title">{{ alert.title }}</p>
      <span class="alert-message" v-html="alert.message"></span>
    </div>
  </div>
</template>

<script>
import CheckCircle from 'vue-material-design-icons/CheckCircle.vue'
import CloseCircle from 'vue-material-design-icons/CloseCircle.vue'

export default {
  name: 'GlobalAlert',
  components: {
    CheckCircle,
    CloseCircle
  },
  props: {
    alert: {
      required: true,
      type: Object,
      default: () => ({
        type: 'success',
        message: '',
        title: false
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import '~assets/less/_variables.less';

.ekp-alert {
  position: fixed;
  right: 10px;
  bottom: 10px;
  z-index: 10;
  display: flex;
  align-items: flex-start;
  max-width: 100%;
  padding-left: 20px;
  padding-top: 15px;
  padding-bottom: 15px;
  padding-right: 20px;
  font-size: 20px;
  line-height: 28px;
  box-shadow: @shadow;
  background-color: #fff;
  pointer-events: none;
  animation: fadein 0.3s;

  .alert-message {
    font-weight: 600;
  }

  &.ekp-alert-title-container {
    .alert-title {
      font-weight: 600;
    }

    .alert-message {
      font-weight: 400;
      color: @dark-gray;
      font-size: 18px;
    }
  }
}

.alert-container {
  margin-left: 10px;
}

@keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@media (max-width: 767px) {
  .ekp-alert {
    right: 0;
    bottom: 0;

    width: 100%;
    justify-content: center;
    padding-left: 10px;
    padding-right: 10px;

    font-size: 15px;
    line-height: 25px;
    white-space: normal;
  }
}
</style>
