<template>
  <div>
    <input :id="id" type="file" :multiple="multiple" v-bind="$attrs" v-on="inputListeners" />
    <label :class="['field-wrap', classes]" :for="id">
      <div v-if="!multiple" class="file-name">
        <span>{{ fileName }}</span>
      </div>
      <div class="select-btn button">
        <slot name="text">Обзор</slot>
      </div>
    </label>
  </div>
</template>

<script>
export default {
  name: 'CommonFileInput',
  inheritAttrs: false,
  props: {
    multiple: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: 'file-input'
    },
    classes: {
      type: String,
      default: ''
    }
  },

  data: function() {
    return {
      fileName: 'Файл не выбран'
    }
  },

  computed: {
    inputListeners: function() {
      return Object.assign({}, this.$listeners, {
        change: event => {
          const files = event.target.files || event.dataTransfer.files
          if (!files.length) return

          const loadedFiles = this.multiple ? files : files[0]

          this.$emit('load', loadedFiles)
          this.fileName = files[0].name
          event.target.value = ''
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import '~assets/less/_variables.less';

input[type='file'] {
  display: none;
}

input[type='file']:disabled + label {
  pointer-events: none;
}

.field-wrap {
  height: 50px;
  max-width: 100%;
  display: inline-flex;
  margin-bottom: 0;
  font-size: 14px;
  cursor: pointer;
  padding-right: 0;
  border: 1px solid @light-gray;
  background-color: @input-bg;
  color: @input;
  text-align: left;
  line-height: 50px;
}

.file-name {
  overflow: hidden;
  text-overflow: ellipsis;

  padding-right: 16px;
  padding-left: 16px;

  white-space: nowrap;

  border-right: 1px solid @light-gray;
}

.select-btn {
  height: 50px;
  padding: 0 40px;
  font-size: 14px;
  line-height: 50px;
  text-align: center;
  color: @dark-gray;

  &:active {
    outline: none;
  }
}

@media (max-width: 767px) {
  .field-wrap {
    display: block;
    height: auto;
  }

  .file-name {
    border-right: none;
    border-bottom: 1px solid @light-gray;
  }

  .select-btn {
    width: 100%;
  }
}
</style>

<style lang="less" scoped>
.tw-special-mode {
  .field-wrap {
    font-size: 18px;
    background-color: #fff;
    border: 2px solid #000;
    color: #000;
  }

  .file-name {
    border-color: #000;
  }

  .select-btn {
    padding: 0 40px;
    font-size: 18px;
    color: #000;
    font-weight: 700;
  }
}
</style>
