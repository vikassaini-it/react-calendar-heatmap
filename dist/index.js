function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);

var CalendarHeatmap = function CalendarHeatmap(props) {
  var dataValues = props.dataValues;
  var _useState = React.useState(new Date()),
    endDate = _useState[0],
    setEndDate = _useState[1];
  var _useState2 = React.useState(new Date()),
    startDate = _useState2[0],
    setStartDate = _useState2[1];
  var _useState3 = React.useState(2023),
    startYear = _useState3[0],
    setStartYear = _useState3[1];
  var _useState4 = React.useState(2024),
    endYear = _useState4[0],
    setEndYear = _useState4[1];
  var _useState5 = React.useState([]),
    calenderGrid = _useState5[0],
    setCalendarGrid = _useState5[1];
  var _useState6 = React.useState(-Infinity),
    highestValue = _useState6[0],
    setHighestValue = _useState6[1];
  React.useEffect(function () {
    calculateRange();
    calculateHighestValue();
  }, [dataValues]);
  React.useEffect(function () {
    calculateCalendarGrid();
    console.log("GG");
  }, [startDate, endDate]);
  var calculateCalendarGrid = function calculateCalendarGrid() {
    console.log("TT");
    var days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
    setCalendarGrid(Array.from({
      length: days
    }, function (_, i) {
      var date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      return date.toISOString().slice(0, 10);
    }));
  };
  var calculateRange = function calculateRange() {
    var _props$endDate, _props$startDate;
    var edt = (_props$endDate = props.endDate) != null ? _props$endDate : new Date();
    var sdt = (_props$startDate = props.startDate) != null ? _props$startDate : new Date();
    sdt.setFullYear(sdt.getFullYear() - 1);
    setEndDate(edt);
    setStartDate(sdt);
    setEndYear(edt.getFullYear());
    setStartYear(sdt.getFullYear());
  };
  var calculateHighestValue = function calculateHighestValue() {
    setHighestValue(dataValues === null || dataValues === void 0 ? void 0 : dataValues.reduce(function (a, b) {
      return Math.max(a, b.count);
    }, -Infinity));
  };
  var getIntensity = function getIntensity(activityCount) {
    return highestValue !== 0 ? Number(activityCount / highestValue) * 100 : 0;
  };
  var getColor = function getColor(intensity) {
    var _props$color;
    var color = (_props$color = props.color) != null ? _props$color : "#D2042D";
    if (intensity !== null && intensity !== undefined) {
      if (intensity < 15) intensity = 15;
      return "" + color + intensity;
    } else return color;
  };
  var moveYear = function moveYear(direction) {
    var sdt = new Date(startDate);
    var edt = new Date(endDate);
    sdt.setFullYear(sdt.getFullYear() + direction);
    edt.setFullYear(edt.getFullYear() + direction);
    setEndDate(edt);
    setStartDate(sdt);
    setEndYear(edt.getFullYear());
    setStartYear(sdt.getFullYear());
  };
  return /*#__PURE__*/React__default.createElement("div", {
    style: {
      padding: "20px"
    }
  }, /*#__PURE__*/React__default.createElement("div", {
    style: {
      display: "grid",
      gridAutoFlow: "column",
      gridTemplateRows: "repeat(7, minmax(0, 1fr)",
      gap: "6px"
    }
  }, calenderGrid.map(function (day, index) {
    var target = dataValues.find(function (item) {
      return item.date === day;
    });
    var activityCount = (target === null || target === void 0 ? void 0 : target.count) || 0;
    var data = (target === null || target === void 0 ? void 0 : target.data) || [];
    data.reverse();
    var intensity = getIntensity(activityCount);
    var color = getColor(intensity);
    return /*#__PURE__*/React__default.createElement("div", {
      className: "w-4 h-4 rounded cursor-pointer",
      title: activityCount + " Posts on " + day,
      key: index,
      style: {
        width: "10px",
        height: "10px",
        backgroundColor: "" + (activityCount == 0 ? "#00000010" : String(color)),
        borderRadius: "100%",
        transition: "background-color 200ms linear"
      }
    });
  })), /*#__PURE__*/React__default.createElement("div", {
    style: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      margin: "15px 5px"
    }
  }, /*#__PURE__*/React__default.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center"
    }
  }, /*#__PURE__*/React__default.createElement("div", {
    style: {
      fontSize: "26px",
      color: getColor(),
      cursor: "pointer"
    },
    onClick: function onClick() {
      moveYear(-1);
    }
  }, "\u21E6"), "\xA0", /*#__PURE__*/React__default.createElement("div", null, startYear)), /*#__PURE__*/React__default.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center"
    }
  }, /*#__PURE__*/React__default.createElement("div", null, endYear), "\xA0", /*#__PURE__*/React__default.createElement("div", {
    style: {
      fontSize: "26px",
      color: getColor(),
      cursor: "pointer"
    },
    onClick: function onClick() {
      moveYear(1);
    }
  }, "\u21E8"))));
};

module.exports = CalendarHeatmap;
//# sourceMappingURL=index.js.map
