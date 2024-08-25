function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);

var CalendarHeatmap = function CalendarHeatmap(props) {
  var dataValues = props.dataValues;
  var endDate = new Date();
  var startDate = new Date();
  startDate.setFullYear(startDate.getFullYear() - 1);
  var startYear = startDate.getFullYear();
  var endYear = endDate.getFullYear();
  var _useState = React.useState([]),
    calenderGrid = _useState[0],
    setCalendarGrid = _useState[1];
  React.useEffect(function () {
    calculateCalendarGrid();
  }, [dataValues]);
  var calculateCalendarGrid = function calculateCalendarGrid() {
    var days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
    setCalendarGrid(Array.from({
      length: days
    }, function (_, i) {
      var date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      return date.toISOString().slice(0, 10);
    }));
  };
  var highestValue = dataValues === null || dataValues === void 0 ? void 0 : dataValues.reduce(function (a, b) {
    return Math.max(a, b.count);
  }, -Infinity);
  var getIntensity = function getIntensity(activityCount) {
    return highestValue !== 0 ? Number(activityCount / highestValue) : 0;
  };
  var getColorFromIntensity = function getColorFromIntensity(intensity) {
    var colorCodes = ["#FFEEEE", "#FFCCCC", "#FFAAAA", "#FF8888", "#FF6666", "#FF4444"];
    var colorIndex = Math.min(Math.floor(intensity * colorCodes.length), colorCodes.length - 1);
    return colorCodes[colorIndex];
  };
  return /*#__PURE__*/React__default.createElement("div", {
    className: "p-2"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "gap-2",
    style: {
      display: "grid",
      gridAutoFlow: "column",
      gridTemplateRows: "repeat(7, minmax(0, 1fr)"
    }
  }, calenderGrid.map(function (day, index) {
    var target = dataValues.find(function (item) {
      return item.date === day;
    });
    var activityCount = (target === null || target === void 0 ? void 0 : target.count) || 0;
    var data = (target === null || target === void 0 ? void 0 : target.data) || [];
    data.reverse();
    var intensity = getIntensity(activityCount);
    var color = getColorFromIntensity(intensity);
    return /*#__PURE__*/React__default.createElement("div", {
      className: "w-4 h-4 rounded cursor-pointer",
      title: activityCount + " Posts on " + day,
      style: {
        width: "10px",
        height: "10px",
        backgroundColor: "" + (activityCount == 0 ? "#00000010" : String(color))
      }
    });
  })), /*#__PURE__*/React__default.createElement("div", {
    className: "w-100 d-flex justify-content-between pt-2"
  }, /*#__PURE__*/React__default.createElement("div", null, startYear), /*#__PURE__*/React__default.createElement("div", null, endYear)));
};

module.exports = CalendarHeatmap;
//# sourceMappingURL=index.js.map
