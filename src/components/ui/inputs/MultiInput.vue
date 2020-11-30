<template>
  <div :class="parentClass">
    <span class="form_caption">{{ title }}</span>
    <div :class="['ekpinput-reset', disabled ? 'hide' : hasResetListener ? '' : 'hide']" @click="reset">
      <i class="zmdi zmdi-close"></i>
      <br />
    </div>
    <i
      v-if="info"
      class="zmdi zmdi-help-outline"
      data-animation="true"
      data-placement="bottom"
      data-trigger="hover"
      data-toggle="popover"
      :data-content="info && info !== true ? info : 'Отсканированная копия Вашего документа'"
      data-original-title
      title
    ></i>
    <span v-if="req && type != 'checkbox-line'" class="star"> *</span>
    <div v-if="type == 'text'" class="form">
      <!-- <button class="form_reset hide" type="reset"><i class="zmdi zmdi-close"></i></button> -->
      <div class="field">
        <input
          v-if="mask"
          :id="inputId"
          v-mask="mask"
          :class="['information', inputClass, errorClass]"
          :name="name"
          :disabled="disabled"
          type="text"
          :placeholder="placeholder"
          :maxlength="maxLength"
          :value="value"
          :tabindex="tabindex"
          :readonly="readonly"
          :title="attrTitle"
          @input="updateValue"
        />
        <input
          v-else
          :id="inputId"
          :class="['information', inputClass, errorClass]"
          :name="name"
          :disabled="disabled"
          type="text"
          :placeholder="placeholder"
          :maxlength="maxLength"
          :value="value"
          :tabindex="tabindex"
          :readonly="readonly"
          :title="attrTitle"
          @input="updateValue"
        />
      </div>
    </div>

    <div v-if="type == 'date'" class="date_wrap">
      <div class="field col-xs-4 col-sm-4 col-md-4">
        <input
          :id="inputId"
          v-mask="'##'"
          :class="['information ', inputClass, errorClass]"
          :name="name"
          :style="[{ marginTop: '0px', marginBottom: '0px' }]"
          type="text"
          :disabled="disabled"
          placeholder="ДД"
          :value="day"
          :tabindex="tabindex"
          :readonly="readonly"
          :title="attrTitle"
          @input="updateDate"
        />
      </div>
      <div class="field col-xs-4 col-sm-4 col-md-4">
        <input
          :id="inputId"
          v-mask="'##'"
          :class="['information ', inputClass, errorClass]"
          :name="name"
          :style="[{ marginTop: '0px', marginBottom: '0px' }]"
          type="text"
          :disabled="disabled"
          placeholder="ММ"
          :value="month"
          :tabindex="tabindex"
          :readonly="readonly"
          :title="attrTitle"
          @input="updateDate"
        />
      </div>
      <div class="field col-xs-4 col-sm-4 col-md-4">
        <input
          :id="inputId"
          v-mask="'####'"
          :class="['information ', inputClass, errorClass]"
          :name="name"
          :style="[{ marginTop: '0px', marginBottom: '0px' }]"
          type="text"
          :disabled="disabled"
          placeholder="ГГГГ"
          :value="year"
          :tabindex="tabindex"
          :readonly="readonly"
          :title="attrTitle"
          @input="updateDate"
        />
      </div>
    </div>

    <div v-else-if="type == 'phone'">
      <!-- <button class="form_reset hide" type="reset"><i class="zmdi zmdi-close"></i></button> -->
      <div class="field">
        <input
          :id="inputId"
          v-mask="phoneMask"
          :name="name"
          type="text"
          :class="['information ', inputClass, errorClass]"
          :placeholder="placeholder"
          :value="value"
          :tabindex="tabindex"
          :disabled="disabled"
          :readonly="readonly"
          :title="attrTitle"
          @input="updateValue"
        />
      </div>
    </div>

    <div v-if="type == 'select'" class="field">
      <select :id="inputId" :class="inputClass" @change="updateSelected">
        <option v-for="(item, idx) in select" :key="item.v" :value="idx">{{ item.v }}</option>
      </select>
    </div>

    <div v-if="type == 'checkbox-line'" :class="['field', 'checkbox-line', errorClass + '-checkbox']">
      <input
        :id="inputId"
        v-model="valueForCheckbox"
        type="checkbox"
        :class="[inputClass]"
        :name="name"
        :tabindex="tabindex"
        :readonly="readonly"
        :title="attrTitle"
        @change="e => updateValue(eventHandler(e, 'checked'))"
      />
      <label :for="inputId">
        {{ label }}
        <span v-if="req" class="star">* &nbsp;</span>
      </label>
    </div>

    <div v-if="type == 'radio-line'" :class="['field', 'radio_line', errorClass + '-radio']">
      <input
        :id="inputId"
        type="radio"
        :class="[inputClass]"
        :name="name"
        :tabindex="tabindex"
        :readonly="readonly"
        :title="attrTitle"
        @change="e => updateValue(eventHandler(e, 'checked'))"
      />
      <label :for="inputId">{{ label }}</label>
    </div>

    <div v-if="type == 'textarea'" class="field">
      <textarea
        :id="inputId"
        :class="[inputClass, errorClass]"
        type="text"
        :maxlength="maxLength"
        :value="value"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :title="attrTitle"
        @input="e => updateValue(eventHandler(e, 'value'))"
      ></textarea>
    </div>

    <div v-if="type == 'file'" class="field">
      <div class="file_form">
        <label class="file-label" :for="inputId">{{
          fileLocal && fileLocal.name ? fileLocal.name : 'Файл не выбран'
        }}</label>
        <div class="choose_btn button btn">Обзор</div>
        <input
          :id="inputId"
          class="file_upload"
          type="file"
          :accept="accept"
          name="upload"
          :tabindex="tabindex"
          :readonly="readonly"
          :disabled="readonly"
          :title="attrTitle"
          @change="onFileChange"
        />
      </div>
    </div>

    <div v-if="type == 'file_button'">
      <div :class="['button load-btn whiteBtn btn form hidden-xs', inputClass]">
        <label>
          <input
            :id="inputId"
            type="file"
            :accept="accept"
            multiple
            name="upload"
            :tabindex="tabindex"
            :readonly="readonly"
            :title="attrTitle"
            @change="onFilesChange"
          />
          <span>{{ placeholder }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import { mask } from 'vue-the-mask'

export default {
  name: 'CommonMultiInput',
  directives: { mask },
  props: {
    inputId: {
      type: String,
      default: ''
    },
    inputClass: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: 'field'
    },
    title: {
      type: String,
      default: ''
    },
    attrTitle: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    value: {
      type: [String, Boolean],
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: 'Не указано'
    },
    maxLength: {
      type: String,
      default: ''
    },
    tabindex: {
      type: String,
      default: ''
    },
    mask: {
      type: String,
      default: ''
    },
    file: {
      type: Object,
      default: () => ({})
    },
    accept: {
      type: String,
      default: 'image/*, application/*'
    },
    parentClass: {
      type: String,
      default: 'filled col-sm-4 col-md-4'
    },
    label: {
      type: String,
      default: ''
    },
    info: {
      type: Boolean,
      default: false
    },
    req: {
      type: Boolean,
      default: false
    },
    phoneMask: {
      type: String,
      default: '+7(###)###-##-##'
    },
    select: {
      type: [Object, Array],
      default: () => {}
    },
    invalid: {
      type: Boolean,
      default: false
    }
  },
  data: function() {
    return {
      fileLocal: this.file,
      valueForCheckbox: this.value,
      errorClass: '',
      checked: {},
      day: '',
      month: '',
      year: ''
    }
  },
  computed: {
    hasResetListener() {
      return this.$listeners && this.$listeners.reset
    }
  },
  watch: {
    value: function(val) {
      this.chValue(val)
    },
    invalid: function(v) {
      this.errorClass = v ? 'error' : ''
    }
  },
  mounted: function() {
    if (this.value) this.chValue(this.value)
  },
  methods: {
    eventHandler: function(e, objName) {
      var targ = {}
      if (e.target) targ = e.target
      else if (e.srcElement) targ = e.srcElement
      return targ[objName]
    },
    updateValue: function(v) {
      if (v.target) {
        this.$emit('input', v.target.value)
      } else {
        this.$emit('input', v)
      }
    },
    updateDate: function() {
      this.$emit('input', `${this.day}.${this.month}.${this.year}`)
    },
    updateSelected: function(e) {
      this.$emit('update:selected', this.select[this.eventHandler(e, 'value')])
    },
    chValue: function(val) {
      if (this.type === 'checkbox-line') {
        this.valueForCheckbox = this.value
      }

      if (this.type === 'date') {
        this.date = val.split('.')
        this.day = this.date[0]
        this.month = this.date[1]
        this.year = this.date[2]
      }
    },
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      this.fileLocal = files[0]
      this.$emit('load', files[0])
      e.target.value = ''
      console.log('uploaded file ', files[0])
    },
    onFilesChange(e) {
      console.log(e.target.files)
      var files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      this.$emit('load', files)
      e.target.value = ''
      console.log('uploaded files ', files)
    },
    reset: function(val) {
      this.$emit('reset', val)
      //this.$emit("changed-value", "");
    }
  }
}
</script>

<style lang="less" scoped>
@import '~assets/less/_variables.less';

.error,
error-checkbox label:before {
  transition: 0.5s !important;
}

.error {
  box-shadow: 0px 0px 2px 0px #ff0000 !important;
}

.error-checkbox label:before {
  box-shadow: 0px 0px 4px 0px #ff0000 !important;
}

.ekpinput-reset {
  height: 20px;
  border: 0px;
  position: absolute;
  top: 2px;
  right: 0;
  padding: 0;
  margin: 0px;
  font-size: inherit;
  line-height: inherit;
  border: none;
  background-color: transparent;
  cursor: pointer;
}

input,
select,
textarea {
  width: 100%;
  font-size: 16px;
  height: 50px;
  color: @dark-gray;
  padding: 5px 10px;
  letter-spacing: 1.1px;
  background-color: @input-bg;
  border: 1px solid @light-gray;
  &:hover {
    background-color: @input-bg-hover;
  }
}
select {
  padding-right: 40px;
}
input:disabled,
input:read-only {
  color: @input-disabled;
  background-color: @input-bg-disabled;
  &:hover {
    color: @input-disabled;
    background-color: @input-bg-disabled;
  }
}
textarea {
  height: 54px;
  resize: vertical;
  &:focus {
    outline: 2px solid;
    outline-offset: 0px;
    outline-color: #b5b8c8;
  }
}
.cursor-text textarea:hover {
  cursor: text;
}
.file_form {
  position: relative;
  float: left;
  overflow: hidden;
  width: 100%;
  height: 50px;
  margin: 9px 8px 0 0;
  padding-left: 16px;
  cursor: pointer;
  line-height: 50px;
  text-align: left;
  /* color: #8f96a4; */
  color: #878787;
  border: 1px solid #c7c9d5;
  background-color: #edf0f1;
  .choose_btn {
    float: right;
    overflow: hidden;
    width: 124px;
    height: 50px;
    margin-left: -4px;
    padding: 0 6px;
    font-size: 1.1em;
    line-height: 50px;
    text-align: center;
    color: #4d5056;
    border-left: 2px solid #c7c9d5;
    background-color: #ecf0f1;
  }
  .file_upload {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 20;
    width: 100%;
    height: 50px;
    cursor: pointer;
    /* font-size: 150px; */
    opacity: 0;
    filter: alpha(opacity=0);
    -moz-opacity: 0;
  }
  @media (max-width: 380px) {
    padding-left: 10px;
    .file-label {
      width: 60%;
      font-size: 0.95em;
    }
    .choose_btn {
      width: 90px;
      font-size: 0.95em;
      padding: 0;
    }
  }

  .file-label {
    max-width: 78%;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}
.choose_doc:first-of-type {
  padding-left: 0;
}
.popover {
  font-family: @lk-font !important;
  font-size: 0.9em !important;
}

.load-btn {
  input[type='file'] {
    display: none;
  }
  label {
    display: block;
    position: relative;
    text-align: center;
    cursor: pointer;
  }
  line-height: 2.8em !important;
  padding: 0 !important;
  margin: 0 !important;
  height: 50px !important;
}

@media (min-width: 320px) and (max-width: 767px) {
  #feedbackModal .modal_body > .row > div:nth-of-type(3) {
    display: none;
  }
}

@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
  input[type='checkbox']:checked + label:after,
  input[type='checkbox']:not(:checked) + label:after {
    width: 12px !important;
    height: 8px !important;
  }
}
</style>
