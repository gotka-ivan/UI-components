<template>
  <div class="pagination-container">
    <div class="show-more">
      <Button v-show="page != pages" class="white" @click="$emit('more')">
        <div slot="text">
          Показать еще
        </div>
      </Button>
    </div>
    <div class="pagination-pages">
      <div class="left-pagination">
        <div :class="['pagination-wrapper', page == 1 && 'pagination-disabled']" @click="$emit('paginate', 1)">
          <slot name="first-button"><ChevronDoubleLeft :size="24"/></slot>
        </div>
        <paginate
          :value="page"
          :page-count="pages"
          :click-handler="page => $emit('paginate', page)"
          container-class="pagination"
          page-class="waves-effect"
          prev-text="<span class='chevron-left'></span>"
          next-text="<span class='chevron-right'></span>"
        />
        <div :class="['pagination-wrapper', page == pages && 'pagination-disabled']" @click="$emit('paginate', pages)">
          <slot name="last-button">
            <ChevronDoubleRight :size="24" />
          </slot>
        </div>
      </div>
      <div class="show-wrapper">
        <p>Показывать по:</p>
        <div
          v-for="(value, id) of limits"
          :key="id"
          :class="['show-item', value == limit && 'active']"
          @click="$emit('limit', id)"
        >
          {{ value }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from './Button.vue'
import ChevronDoubleLeft from 'vue-material-design-icons/ChevronDoubleLeft.vue'
import ChevronDoubleRight from 'vue-material-design-icons/ChevronDoubleRight.vue'
import Paginate from 'vuejs-paginate/src/components/Paginate.vue'

export default {
  components: {
    Paginate,
    Button,
    ChevronDoubleLeft,
    ChevronDoubleRight
  },
  props: {
    page: {
      type: Number,
      default: 1
    },
    pages: {
      type: Number,
      default: 1
    },
    limit: {
      type: Number,
      default: 30
    },
    limits: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
<style lang="less" scoped>
@import '~assets/less/_variables.less';

.chevron-double-left-icon,
.chevron-double-right-icon {
  display: flex;
}

/deep/.chevron-left {
  background: url('../../assets/images/chevron-left.svg') 50% center no-repeat;
  display: block;
  width: 16px;
  height: 24px;
}

/deep/.chevron-right {
  background: url('../../assets/images/chevron-right.svg') 50% center no-repeat;
  display: block;
  width: 16px;
  height: 24px;
}

// //TODO
// /deep/.default-mode {
//   /deep/ a:hover .chevron-left {
//     background: url('../../assets/images/chevron-left-blue.svg') 50% center no-repeat;
//   }

//   /deep/ a:hover .chevron-right {
//     background: url('../../assets/images/chevron-right-blue.svg') 50% center no-repeat;
//   }
// }

/deep/a:active:focus,
/deep/a:focus {
  outline: 2px solid;
  outline-offset: 0;
  outline-color: #b5b8c8;
}

/deep/.pagination > li > a:hover,
/deep/.pagination > li > a:focus {
  color: #23527c;
  background-color: #eee;
  border-color: #ddd;
}

/deep/.pagination > .active > a,
/deep/.pagination > .active > a:hover,
/deep/.pagination > .active > a:focus,
/deep/.pagination > .active > span,
/deep/.pagination > .active > span:hover,
/deep/.pagination > .active > span:focus {
  z-index: 2;
  color: #fff;
  cursor: default;
  background-color: #337ab7;
  border-color: #337ab7;
}

/deep/.pagination > .disabled > span,
/deep/.pagination > .disabled > span:hover,
/deep/.pagination > .disabled > span:focus,
/deep/.pagination > .disabled > a,
/deep/.pagination > .disabled > a:hover,
/deep/.pagination > .disabled > a:focus {
  color: #777;
  cursor: not-allowed;
  background-color: #fff;
  border-color: #ddd;
}

.pagination-wrapper {
  padding: 8px 12px;
  background: #fff;
  color: #337ab7;
  cursor: pointer;
  border: 1px solid #ddd;
}

.pagination-disabled {
  color: #777;
  cursor: not-allowed;
  background-color: #fff;
  border-color: #ddd;
}
.content-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  min-height: 55vh;
}

.button-wrapper:hover {
  color: #23527c;
  background-color: #eee;
  border-color: #ddd;
}
.show-more {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 40px;
  button {
    width: 100%;
  }
  /deep/ .text {
    font-size: 16px;
  }
}
.show-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  margin: 20px 0;

  p {
    margin: 0;
    color: @gray;
    margin-right: 10px;
  }

  .show-item {
    padding: 8px 10px;
    background-color: #fff;
    border: 1px solid #ddd;
    margin-left: 7px;
    cursor: pointer;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .show-item:hover,
  .show-item.active {
    background-color: #337ab7;
    color: #fff;
  }

  .show-item:active {
    background-color: #206096;
    border: 1 px solid #ddd;
  }
}

.pagination-container {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.pagination-pages {
  font-size: 18px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  li {
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
}
.left-pagination {
  display: flex;
  align-items: center;
  justify-content: center;
}

/deep/ul.pagination {
  padding-left: 0;
}

/deep/ .pagination > li {
  display: inline;
}

/deep/.pagination > li > a,
/deep/.pagination > li > span {
  position: relative;
  float: left;
  margin-left: -1px;
  line-height: 24px;
  color: #337ab7;
  text-decoration: none;
  background-color: #fff;
  border: 1px solid #ddd;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  padding: 8px 12px;
  z-index: 1;
}

@media (max-width: 991px) {
  .pagination-wrapper {
    display: none;
  }
}

@media (max-width: 767px) {
  .show-more {
    margin-bottom: 10px;
  }
  .pagination-pages {
    flex-direction: column;
    .left-pagination {
      margin-bottom: 10px;
    }
  }
  .show-wrapper {
    margin-top: 0px;
  }
}
</style>

<style lang="less" scoped>
.tw-special-mode .pagination-container {
  .waves-effect.active a,
  .show-item.active {
    background-color: #000 !important;
    border-color: #000 !important;
    color: #fff !important;
  }
  .show-item.active:hover {
    background-color: #000 !important;
    color: #fff !important;
  }
  .show-item:hover {
    background-color: white !important;
    color: black !important;
  }
  .show-item {
    border-color: #000 !important;
  }
  .waves-effect a,
  .show-item {
    color: #000 !important;
  }
  .show-more button {
    font-size: 16px !important;
    border: 1px solid #000;
  }
  .show-wrapper p {
    color: #000 !important;
  }
  .pagination-wrapper {
    color: black;
  }

  .pagination-wrapper {
    border-color: black;
  }

  /deep/.pagination > li > a,
  /deep/.pagination > li > a:hover,
  /deep/.pagination > li > a:focus {
    color: black;
    background-color: #fff;
    border-color: black;
  }

  /deep/.pagination > .active > a,
  /deep/.pagination > .active > a:hover,
  /deep/.pagination > .active > a:focus,
  /deep/.pagination > .active > span,
  /deep/.pagination > .active > span:hover,
  /deep/.pagination > .active > span:focus {
    z-index: 2;
    color: #fff;
    cursor: default;
    background-color: black;
    border-color: black;
  }
}
</style>
