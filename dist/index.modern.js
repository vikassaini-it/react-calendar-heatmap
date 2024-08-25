import React, { useState, useEffect } from 'react';

const CalendarHeatmap = props => {
  const {
    dataValues
  } = props;
  let endDate = new Date();
  let startDate = new Date();
  startDate.setFullYear(startDate.getFullYear() - 1);
  let startYear = startDate.getFullYear();
  let endYear = endDate.getFullYear();
  const [calenderGrid, setCalendarGrid] = useState([]);
  useEffect(() => {
    calculateCalendarGrid();
  }, [dataValues]);
  const calculateCalendarGrid = () => {
    const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
    setCalendarGrid(Array.from({
      length: days
    }, (_, i) => {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      return date.toISOString().slice(0, 10);
    }));
  };
  const highestValue = dataValues === null || dataValues === void 0 ? void 0 : dataValues.reduce((a, b) => Math.max(a, b.count), -Infinity);
  const getIntensity = activityCount => {
    return highestValue !== 0 ? Number(activityCount / highestValue) : 0;
  };
  const getColorFromIntensity = intensity => {
    const colorCodes = ["#FFEEEE", "#FFCCCC", "#FFAAAA", "#FF8888", "#FF6666", "#FF4444"];
    const colorIndex = Math.min(Math.floor(intensity * colorCodes.length), colorCodes.length - 1);
    return colorCodes[colorIndex];
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "p-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gap-2",
    style: {
      display: "grid",
      gridAutoFlow: "column",
      gridTemplateRows: "repeat(7, minmax(0, 1fr)"
    }
  }, calenderGrid.map((day, index) => {
    const target = dataValues.find(item => item.date === day);
    const activityCount = (target === null || target === void 0 ? void 0 : target.count) || 0;
    const data = (target === null || target === void 0 ? void 0 : target.data) || [];
    data.reverse();
    const intensity = getIntensity(activityCount);
    const color = getColorFromIntensity(intensity);
    return /*#__PURE__*/React.createElement("div", {
      className: "w-4 h-4 rounded cursor-pointer",
      title: `${activityCount} Posts on ${day}`,
      style: {
        width: "10px",
        height: "10px",
        backgroundColor: `${activityCount == 0 ? "#00000010" : String(color)}`
      }
    });
  })), /*#__PURE__*/React.createElement("div", {
    className: "w-100 d-flex justify-content-between pt-2"
  }, /*#__PURE__*/React.createElement("div", null, startYear), /*#__PURE__*/React.createElement("div", null, endYear)));
};

export default CalendarHeatmap;
//# sourceMappingURL=index.modern.js.map
