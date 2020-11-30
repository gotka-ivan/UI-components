<template>
  <div class="flatpicker-overflow">
    <div class="flatpickr">
      <div class="flatpickr-close" @click="$emit('update:isActiveProp', false)">
        <i class="mdi mdi-close"></i>
      </div>

      <flatPickr :value="valueModel" :config="extendedConfig" v-on="$listeners" />
      <div class="flatpickr-settings">
        <slot name="range-buttons">
          <div class="range-container">
            <p :class="{ active: valueModel === weekDates }" @click="valueModel = weekDates">На этой неделе</p>
            <p :class="{ active: valueModel === weekendDates }" @click="valueModel = weekendDates">
              На этих выходных
            </p>
          </div>
        </slot>
        <slot name="time-pick"></slot>
        <slot name="date-buttons"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import flatPickrComponent from 'vue-flatpickr-component'
import flatpicker from 'flatpickr'
import 'flatpickr/dist/flatpickr.css'
import { Russian } from 'flatpickr/dist/l10n/ru.js'

import { dayOfThisWeek } from '@src/tools/date'

export class Config {
  mode
  dateFormat
  minDate

  static datesSeparator = ' — '

  constructor(mode = 'single', dateFormat = 'd.m.y', minDate = '') {
    this.mode = mode
    this.dateFormat = dateFormat
    this.minDate = minDate
  }
}

export default {
  name: 'DateInput',
  components: {
    flatPickr: flatPickrComponent
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    config: {
      type: Config,
      default: () => new Config()
    }
  },
  data: () => ({ valueModel: '' }),
  computed: {
    extendedConfig: function() {
      return {
        altInput: true,
        locale: Russian,
        inline: true,
        ...this.config
      }
    },
    weekDates: function() {
      const firstDate = !this.config.minDate ? 1 : new Date().getDay()

      return `${flatpicker.formatDate(dayOfThisWeek(firstDate), this.extendedConfig.dateFormat)}${
        Config.datesSeparator
      }${flatpicker.formatDate(dayOfThisWeek(7), this.extendedConfig.dateFormat)}`
    },
    weekendDates: function() {
      const firstDate = new Date().getDay() < 6 ? 6 : 7

      return `${flatpicker.formatDate(dayOfThisWeek(firstDate), this.extendedConfig.dateFormat)}${
        Config.datesSeparator
      }${flatpicker.formatDate(dayOfThisWeek(7), this.extendedConfig.dateFormat)}`
    }
  },
  watch: {
    value(val) {
      this.valueModel = val
    }
  },
  mounted() {
    this.valueModel = this.value
  }
}
</script>

<style lang="less" scoped>
@import '~assets/less/_variables.less';

/deep/ .flatpickr-calendar::before {
  content: none;
}

.flatpicker-overflow {
  padding: 10px 10px 0 10px;
}

.flatpickr {
  width: 310px;
  z-index: 1;
}

.flatpickr-settings {
  padding: 0 14px;
}

/deep/ .flatpickr .input {
  display: none;
}

.flatpickr-close {
  font-size: 1.333em;
  color: #6d6d6d;
  display: none;
  cursor: pointer;
  width: 30px;
  text-align: center;
  margin: 0 0 0 auto;
  &:hover {
    color: #3c3b3b;
  }
  &:active {
    color: #000;
  }
}

.flatpickr /deep/ .flatpickr-calendar {
  box-shadow: none;
  z-index: 1;
}

/deep/ .flatpickr-day.today {
  border-radius: 50%;
  border-color: #f4be11;
  background: #fff;
  color: #191919;
  font-weight: 600;

  &:focus {
    background-color: #f4be11;
  }
}

/deep/ .flatpickr-day.today.startRange {
  border-radius: 50px 0 0 50px;
}

/deep/ .flatpickr-day.today.startRange.endRange {
  border-radius: 50%;
}

/deep/ .flatpickr-day.today:hover,
/deep/ .flatpickr-day.today:focus {
  border-color: #f4be11;
  background: #fff;
  color: #191919;
}

/deep/ .flatpickr-innerContainer {
  padding-top: 10px;
}

/deep/ .flatpickr-day.selected,
/deep/ .flatpickr-day.startRange,
/deep/ .flatpickr-day.endRange,
/deep/ .flatpickr-day.selected.inRange,
/deep/ .flatpickr-day.startRange.inRange,
/deep/ .flatpickr-day.endRange.inRange,
/deep/ .flatpickr-day.selected:focus,
/deep/ .flatpickr-day.startRange:focus,
/deep/ .flatpickr-day.endRange:focus,
/deep/ .flatpickr-day.selected:hover,
/deep/ .flatpickr-day.startRange:hover,
/deep/ .flatpickr-day.endRange:hover,
/deep/ .flatpickr-day.selected.prevMonthDay,
/deep/ .flatpickr-day.startRange.prevMonthDay,
/deep/ .flatpickr-day.endRange.prevMonthDay,
/deep/ .flatpickr-day.selected.nextMonthDay,
/deep/ .flatpickr-day.startRange.nextMonthDay,
/deep/ .flatpickr-day.endRange.nextMonthDay {
  background: #f4be11;
  -webkit-box-shadow: none;
  box-shadow: none;
  color: #000;
  border-color: #f4be11;
}

/deep/ .flatpickr-day.selected.startRange + .endRange:not(:nth-child(7n + 1)),
/deep/ .flatpickr-day.startRange.startRange + .endRange:not(:nth-child(7n + 1)),
/deep/ .flatpickr-day.endRange.startRange + .endRange:not(:nth-child(7n + 1)) {
  -webkit-box-shadow: -10px 0 0 #f4be11;
  box-shadow: -10px 0 0 #f4be11;
  color: #000;
}

/deep/ .flatpickr-months .flatpickr-month,
/deep/ .flatpickr-prev-month,
/deep/ .flatpickr-next-month,
/deep/ .flatpickr-months .flatpickr-prev-month.flatpickr-next-month,
/deep/ .flatpickr-months .flatpickr-next-month.flatpickr-next-month,
/deep/ .flatpickr-months .flatpickr-prev-month,
/deep/ .flatpickr-months .flatpickr-next-month {
  color: #3f7fbc;
  fill: #3f7fbc;
}

/deep/ .flatpickr-prev-month,
/deep/ .flatpickr-next-month {
  top: -3px;
}

/deep/ .flatpickr-current-month {
  padding-top: 3px;
}

/deep/ .flatpickr-current-month .flatpickr-monthDropdown-months {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  font-weight: 400;
  line-height: 30px;
}

/deep/ .flatpickr-current-month input.cur-year {
  font-weight: 400;
  height: 30px;
}

/deep/ span.flatpickr-weekday {
  text-transform: uppercase;
}

/deep/ .flatpickr-day.inRange,
/deep/ .flatpickr-day.prevMonthDay.inRange,
/deep/ .flatpickr-day.nextMonthDay.inRange,
/deep/ .flatpickr-day.today.inRange,
/deep/ .flatpickr-day.prevMonthDay.today.inRange,
/deep/ .flatpickr-day.nextMonthDay.today.inRange,
/deep/ .flatpickr-day:hover,
/deep/ .flatpickr-day.prevMonthDay:hover,
/deep/ .flatpickr-day.nextMonthDay:hover,
/deep/ .flatpickr-day:focus,
/deep/ .flatpickr-day.prevMonthDay:focus,
/deep/ .flatpickr-day.nextMonthDay:focus {
  background: #fbf1db;
  border-color: #fbf1db;
}

/deep/ .flatpickr-day.inRange {
  -webkit-box-shadow: -5px 0 0 #fbf1db, 5px 0 0 #fbf1db;
  box-shadow: -5px 0 0 #fbf1db, 5px 0 0 #fbf1db;
}

.range-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 0;
}

.range-container > p {
  padding: 7px 10px;
  margin: 0;
  border: 1px solid #3f7fbc;
  cursor: pointer;
  border-radius: 15px;
  box-shadow: 0 0 black;
  font-size: 14px;
  color: #757575;
}

.range-container > p.active,
.range-container > p:hover,
.range-container > p.active {
  border: 1px solid #ecbe43;
  background: #ecbe43;
  color: #000;
}

.range-container > p:active {
  box-shadow: 0 0 0 2px #b5b8c8;
}

@media (max-width: 330px) {
  .flatpicker-overflow {
    padding: 5px 3px 0 3px;
  }
}
</style>
