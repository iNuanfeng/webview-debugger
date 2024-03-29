import { createNamespace } from '../../utils';
import { setScrollTop } from '../../utils/dom/scroll';
import { t, bem, compareDay, ROW_HEIGHT, getPrevDay, getNextDay, formatMonthTitle } from '../utils';
import { getMonthEndDay } from '../../datetime-picker/utils';

var _createNamespace = createNamespace('calendar-month'),
    createComponent = _createNamespace[0];

export default createComponent({
  props: {
    date: Date,
    type: String,
    color: String,
    minDate: Date,
    maxDate: Date,
    showMark: Boolean,
    rowHeight: [Number, String],
    formatter: Function,
    lazyRender: Boolean,
    currentDate: [Date, Array],
    allowSameDay: Boolean,
    showSubtitle: Boolean,
    showMonthTitle: Boolean,
    firstDayOfWeek: Number
  },
  data: function data() {
    return {
      visible: false
    };
  },
  computed: {
    title: function title() {
      return formatMonthTitle(this.date);
    },
    offset: function offset() {
      var firstDayOfWeek = this.firstDayOfWeek;
      var realDay = this.date.getDay();

      if (!firstDayOfWeek) {
        return realDay;
      }

      return (realDay + 7 - this.firstDayOfWeek) % 7;
    },
    totalDay: function totalDay() {
      return getMonthEndDay(this.date.getFullYear(), this.date.getMonth() + 1);
    },
    shouldRender: function shouldRender() {
      return this.visible || !this.lazyRender;
    },
    monthStyle: function monthStyle() {
      if (!this.shouldRender) {
        var padding = Math.ceil((this.totalDay + this.offset) / 7) * this.rowHeight;
        return {
          paddingBottom: padding + "px"
        };
      }
    },
    days: function days() {
      var days = [];
      var year = this.date.getFullYear();
      var month = this.date.getMonth();

      for (var day = 1; day <= this.totalDay; day++) {
        var date = new Date(year, month, day);
        var type = this.getDayType(date);
        var config = {
          date: date,
          type: type,
          text: day,
          bottomInfo: this.getBottomInfo(type)
        };

        if (this.formatter) {
          config = this.formatter(config);
        }

        days.push(config);
      }

      return days;
    }
  },
  methods: {
    getHeight: function getHeight() {
      if (!this.height) {
        this.height = this.$el.getBoundingClientRect().height;
      }

      return this.height;
    },
    scrollIntoView: function scrollIntoView(body) {
      var _this$$refs = this.$refs,
          days = _this$$refs.days,
          month = _this$$refs.month;
      var el = this.showSubtitle ? days : month;
      var scrollTop = el.getBoundingClientRect().top - body.getBoundingClientRect().top + body.scrollTop;
      setScrollTop(body, scrollTop);
    },
    getMultipleDayType: function getMultipleDayType(day) {
      var _this = this;

      var isSelected = function isSelected(date) {
        return _this.currentDate.some(function (item) {
          return compareDay(item, date) === 0;
        });
      };

      if (isSelected(day)) {
        var prevDay = getPrevDay(day);
        var nextDay = getNextDay(day);
        var prevSelected = isSelected(prevDay);
        var nextSelected = isSelected(nextDay);

        if (prevSelected && nextSelected) {
          return 'multiple-middle';
        }

        if (prevSelected) {
          return 'end';
        }

        return nextSelected ? 'start' : 'multiple-selected';
      }

      return '';
    },
    getRangeDayType: function getRangeDayType(day) {
      var _this$currentDate = this.currentDate,
          startDay = _this$currentDate[0],
          endDay = _this$currentDate[1];

      if (!startDay) {
        return '';
      }

      var compareToStart = compareDay(day, startDay);

      if (!endDay) {
        return compareToStart === 0 ? 'start' : '';
      }

      var compareToEnd = compareDay(day, endDay);

      if (compareToStart === 0 && compareToEnd === 0 && this.allowSameDay) {
        return 'start-end';
      }

      if (compareToStart === 0) {
        return 'start';
      }

      if (compareToEnd === 0) {
        return 'end';
      }

      if (compareToStart > 0 && compareToEnd < 0) {
        return 'middle';
      }
    },
    getDayType: function getDayType(day) {
      var type = this.type,
          minDate = this.minDate,
          maxDate = this.maxDate,
          currentDate = this.currentDate;

      if (compareDay(day, minDate) < 0 || compareDay(day, maxDate) > 0) {
        return 'disabled';
      }

      if (type === 'single') {
        return compareDay(day, currentDate) === 0 ? 'selected' : '';
      }

      if (type === 'multiple') {
        return this.getMultipleDayType(day);
      }
      /* istanbul ignore else */


      if (type === 'range') {
        return this.getRangeDayType(day);
      }
    },
    getBottomInfo: function getBottomInfo(type) {
      if (this.type === 'range') {
        if (type === 'start' || type === 'end') {
          return t(type);
        }

        if (type === 'start-end') {
          return t('startEnd');
        }
      }
    },
    getDayStyle: function getDayStyle(type, index) {
      var style = {};

      if (index === 0) {
        style.marginLeft = 100 * this.offset / 7 + "%";
      }

      if (this.rowHeight !== ROW_HEIGHT) {
        style.height = this.rowHeight + "px";
      }

      if (this.color) {
        if (type === 'start' || type === 'end' || type === 'start-end' || type === 'multiple-selected' || type === 'multiple-middle') {
          style.background = this.color;
        } else if (type === 'middle') {
          style.color = this.color;
        }
      }

      return style;
    },
    genTitle: function genTitle() {
      var h = this.$createElement;

      if (this.showMonthTitle) {
        return h("div", {
          "class": bem('month-title')
        }, [this.title]);
      }
    },
    genMark: function genMark() {
      var h = this.$createElement;

      if (this.showMark) {
        return h("div", {
          "class": bem('month-mark')
        }, [this.date.getMonth() + 1]);
      }
    },
    genDays: function genDays() {
      var h = this.$createElement;

      if (this.shouldRender) {
        return h("div", {
          "ref": "days",
          "attrs": {
            "role": "grid"
          },
          "class": bem('days')
        }, [this.genMark(), this.days.map(this.genDay)]);
      }

      return h("div", {
        "ref": "days"
      });
    },
    genDay: function genDay(item, index) {
      var _this2 = this;

      var h = this.$createElement;
      var type = item.type,
          topInfo = item.topInfo,
          bottomInfo = item.bottomInfo;
      var style = this.getDayStyle(type, index);
      var disabled = type === 'disabled';

      var onClick = function onClick() {
        if (!disabled) {
          _this2.$emit('click', item);
        }
      };

      var TopInfo = topInfo && h("div", {
        "class": bem('top-info')
      }, [topInfo]);
      var BottomInfo = bottomInfo && h("div", {
        "class": bem('bottom-info')
      }, [bottomInfo]);

      if (type === 'selected') {
        return h("div", {
          "attrs": {
            "role": "gridcell",
            "tabindex": -1
          },
          "style": style,
          "class": [bem('day'), item.className],
          "on": {
            "click": onClick
          }
        }, [h("div", {
          "class": bem('selected-day'),
          "style": {
            background: this.color
          }
        }, [TopInfo, item.text, BottomInfo])]);
      }

      return h("div", {
        "attrs": {
          "role": "gridcell",
          "tabindex": disabled ? null : -1
        },
        "style": style,
        "class": [bem('day', type), item.className],
        "on": {
          "click": onClick
        }
      }, [TopInfo, item.text, BottomInfo]);
    }
  },
  render: function render() {
    var h = arguments[0];
    return h("div", {
      "class": bem('month'),
      "ref": "month",
      "style": this.monthStyle
    }, [this.genTitle(), this.genDays()]);
  }
});