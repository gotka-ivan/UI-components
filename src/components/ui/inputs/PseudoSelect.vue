<template>
  <div v-click-outside="onClickOutside" :style="[{ position: position === 'middle' ? 'static' : 'relative' }]">
    <div v-if="$slots.label" class="label-wrapper">
      <label :for="id">
        <slot name="label"></slot>
        <span v-if="true" class="star">* &nbsp;</span>
      </label>
    </div>
    <div
      :class="[
        'select-container',
        readonly && 'readonly',
        disabled && 'disabled',
        !$slots.rightIcon && 'arrow',
        isActive ? 'active' : '',
        count ? 'count' : '',
        invalid && 'error'
      ]"
      @click="
        isActive = !isActive
        $emit('update:isActiveProp', !isActiveProp)
      "
    >
      <slot v-if="$slots.leftIcon" name="leftIcon" />
      <div v-if="text" class="text">
        {{ text }}
      </div>
      <div v-if="count !== 0" class="count">
        {{ count | globalCountFilter(99) }}
      </div>
      <slot v-if="$slots.rightIcon" name="rightIcon" />
    </div>
    <div
      v-if="isActive && !readonly"
      v-overflowYHidden.mobile
      :class="[
        'pseudo-select-content',
        'custom-scroll',
        fitToInput && 'full-width',
        position,
        isScrollable && 'scrollable'
      ]"
    >
      <div v-click-outside="onClickOutside" class="mobile-wrapper" :class="{ 'hide-close-btn': !showCloseBtn }">
        <close
          class="close-icon"
          :size="27"
          fill-color="#000"
          @click="
            isActive = !isActive
            $emit('update:isActiveProp', !isActiveProp)
          "
        />
        <div v-if="searchPlaceholder" class="search-box">
          <input
            v-model="searchValue"
            class="search-input"
            type="text"
            :placeholder="searchPlaceholder"
            @input="e => $emit('changeSearchInput', e.target.value)"
          />
          <div
            class="reset"
            @click="
              $emit('reset')
              searchValue = null
            "
          >
            <span>Сбросить&nbsp;</span><i class="mdi mdi-reload" />
          </div>
        </div>
        <slot name="content"></slot>
      </div>
    </div>
    <div v-if="invalid" class="invalid-text">
      <slot name="invalid"> Проверьте правильность заполнения поля </slot>
    </div>
  </div>
</template>

<script>
import vClickOutside from 'v-click-outside'
import close from 'vue-material-design-icons/Close.vue'
import overflowYHidden from '@src/directives/overflowYHidden.js'
export default {
  name: 'PseudoSelect',
  components: {
    close
  },
  directives: {
    clickOutside: vClickOutside.directive,
    overflowYHidden: overflowYHidden
  },
  props: {
    // flag for managing dropdown contents
    isActiveProp: {
      default: false,
      type: Boolean
    },
    isScrollable: {
      default: true,
      type: Boolean
    },
    // amount selected elements
    count: {
      type: Number,
      default: 0
    },
    invalid: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },

    disabled: {
      type: Boolean,
      default: false
    },
    // default or modifiable text
    text: {
      type: String,
      default: null
    },
    // position for dropdown content
    position: {
      type: String,
      default: 'right'
    },
    fitToInput: {
      type: Boolean,
      default: true
    },
    searchPlaceholder: {
      type: String,
      default: null
    },
    showCloseBtn: {
      type: Boolean,
      default: true
    }
  },
  data: function() {
    return {
      searchValue: null,
      isActive: false
    }
  },
  watch: {
    isActiveProp: function() {
      this.isActive = this.isActiveProp
      this.$emit('update:isActive', false)
    }
  },
  methods: {
    onClickOutside() {
      this.isActive = false
      this.$emit('update:isActiveProp', false)
    }
  }
}
</script>

<style lang="less" scoped>
@import '~assets/less/_variables.less';
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
.select-container {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  height: 48px;
  padding: 5px 30px 5px 10px;
  border: 1px solid #b5b8c8;
  font-size: 16px;
  color: @dark-gray;
  position: relative;
  cursor: pointer;

  &.arrow {
    background: white url(~assets/images/chevron-down.svg) no-repeat;
    background-size: 10px;
    background-position: right 12px center;
  }

  &.active {
    background-image: url(~assets/images/chevron-up.svg);
  }

  &.error {
    border: 2px solid #cd5251;
    transition: 0.5s !important;
    outline: none;
  }

  .text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    user-select: none;
  }

  .count {
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translate(-50%, -50%);
    width: 22px;
    height: 22px;
    line-height: 22px;
    text-align: center;
    border-radius: 50%;
    background: #4788c1;
    color: #fff;
    // font-size: 14px;
    font-size: 11px;
    font-weight: 600;
  }
}

.pseudo-select-content {
  position: absolute;
  background-color: white;
  border: thin solid @light-gray;
  overflow-y: auto;
  cursor: default;
  z-index: 11;
  &.left {
    left: 0;
  }
  &.right {
    right: 0;
  }
  .search-box {
    position: sticky;
    z-index: 4;
    top: 0;
    background-color: #fff;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    padding: 10px;
    width: 100%;
    min-width: 320px;
    margin-right: 8px;
    .reset {
      display: flex;
      flex-flow: row nowrap;
      align-items: baseline;
      color: @blue;
      font-size: 16px;
      cursor: pointer;
      user-select: none;
      &:hover {
        text-decoration: underline;
        color: @dark-blue;
      }
    }
  }
  .search-input {
    display: flex;
    flex: 1;
    height: 48px;
    background-color: white;
    background-image: url(~assets/images/loupe.svg);
    background-size: 24px;
    background-repeat: no-repeat;
    background-position: left 10px center;
    padding: 5px 5px 5px 40px;
    margin-right: 20px;
    border: 1px solid #b5b8c8;
    min-width: 180px;
    width: inherit;
    &::placeholder {
      color: @gray;
    }

    &:focus {
      outline: 2px solid;
      outline-offset: 0;
      outline-color: #b5b8c8;
    }
  }
}

.select-container.active {
  outline: 2px solid;
  outline-offset: 0px;
  outline-color: #b5b8c8;
}

.select-container.selected {
  color: @blue;
}

.select-chevron {
  position: absolute;
  right: 5px;
  color: @gray;
  font-size: 26px;
}

.mobile-wrapper {
  padding-top: 30px;
  padding-bottom: 10px;
}

.close-icon {
  position: absolute;
  top: 4px;
  right: 1px;
  cursor: pointer;
}

.invalid-text {
  color: #cd5251;
  font-size: 14px;
  padding-top: 7px;
  font-weight: 600;
}

.disabled,
.readonly {
  color: @input-disabled;
  background-color: @input-bg-disabled;
  &:hover {
    color: @input-disabled;
    background-color: @input-bg-disabled;
  }
}

@media (min-width: 768px) {
  .pseudo-select-content {
    margin-top: 10px;
    &.full-width {
      min-width: 100%;
    }
    &.scrollable {
      max-height: 400px;
    }
  }
  .pseudo-select-content.middle {
    transform: translateX(-50%);
    left: 50%;
  }
  @-moz-document url-prefix() {
    .pseudo-select-content {
      padding-right: 20px;
    }
  }

  .hide-close-btn {
    padding-top: 0;

    & .close-icon {
      display: none;
    }
  }
}

@media (max-width: 767px) {
  .pseudo-select-content {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 100;
    max-height: none;
    background: rgba(0, 0, 0, 0.3);
    overflow: hidden;
    .search-box {
      min-width: 260px;
      top: -30px;
    }
  }
  .mobile-wrapper {
    position: absolute;
    z-index: 10;
    top: 50%;
    left: 50% !important;
    margin-right: -50%;
    transform: translate(-50%, -50%);
    overflow: auto;
    background: white;
    max-height: 80vh;
  }
  .close-icon {
    display: block;
    height: 30px;
  }
}
</style>

<style lang="less" scoped>
.tw-special-mode {
  .select-container {
    border: 2px solid black;
    font-weight: 600;
    &.active {
      outline: 1px solid;
      outline-color: black;
    }
    &.selected {
      color: black;
    }
    .text {
      color: black;
    }
  }
  .pseudo-select-content {
    border-color: black;
  }
  .pseudo-select-content .search-input::placeholder {
    color: black;
  }
}
</style>
