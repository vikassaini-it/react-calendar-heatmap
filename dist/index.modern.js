import React, { useState, useEffect } from 'react';

const CalendarHeatmap = props => {
  const {
    dataValues
  } = props;
  const [endDate, setEndDate] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [startYear, setStartYear] = useState(2023);
  const [endYear, setEndYear] = useState(2024);
  const [calenderGrid, setCalendarGrid] = useState([]);
  const [highestValue, setHighestValue] = useState(-Infinity);
  useEffect(() => {
    calculateRange();
    calculateHighestValue();
  }, [dataValues]);
  useEffect(() => {
    calculateCalendarGrid();
    console.log("GG");
  }, [startDate, endDate]);
  const calculateCalendarGrid = () => {
    console.log("TT");
    const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
    setCalendarGrid(Array.from({
      length: days
    }, (_, i) => {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      return date.toISOString().slice(0, 10);
    }));
  };
  const calculateRange = () => {
    let edt = props.endDate ?? new Date();
    let sdt = props.startDate ?? new Date();
    sdt.setFullYear(sdt.getFullYear() - 1);
    setEndDate(edt);
    setStartDate(sdt);
    setEndYear(edt.getFullYear());
    setStartYear(sdt.getFullYear());
  };
  const calculateHighestValue = () => {
    setHighestValue(dataValues === null || dataValues === void 0 ? void 0 : dataValues.reduce((a, b) => Math.max(a, b.count), -Infinity));
  };
  const getIntensity = activityCount => {
    return highestValue !== 0 ? Number(activityCount / highestValue) * 100 : 0;
  };
  const getColor = intensity => {
    const color = props.color ?? "#D2042D";
    if (intensity !== null && intensity !== undefined) {
      if (intensity < 15) intensity = 15;
      return `${color}${intensity}`;
    } else return color;
  };
  const moveYear = direction => {
    let sdt = new Date(startDate);
    let edt = new Date(endDate);
    sdt.setFullYear(sdt.getFullYear() + direction);
    edt.setFullYear(edt.getFullYear() + direction);
    setEndDate(edt);
    setStartDate(sdt);
    setEndYear(edt.getFullYear());
    setStartYear(sdt.getFullYear());
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "20px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridAutoFlow: "column",
      gridTemplateRows: "repeat(7, minmax(0, 1fr)",
      gap: "6px"
    }
  }, calenderGrid.map((day, index) => {
    const target = dataValues.find(item => item.date === day);
    const activityCount = (target === null || target === void 0 ? void 0 : target.count) || 0;
    const data = (target === null || target === void 0 ? void 0 : target.data) || [];
    data.reverse();
    const intensity = getIntensity(activityCount);
    const color = getColor(intensity);
    return /*#__PURE__*/React.createElement("div", {
      className: "w-4 h-4 rounded cursor-pointer",
      title: `${activityCount} Posts on ${day}`,
      key: index,
      style: {
        width: "10px",
        height: "10px",
        backgroundColor: `${activityCount == 0 ? "#00000010" : String(color)}`,
        borderRadius: "100%",
        transition: "background-color 200ms linear"
      }
    });
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      margin: "15px 5px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "26px",
      color: getColor(),
      cursor: "pointer"
    },
    onClick: () => {
      moveYear(-1);
    }
  }, "\u21E6"), "\xA0", /*#__PURE__*/React.createElement("div", null, startYear)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", null, endYear), "\xA0", /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "26px",
      color: getColor(),
      cursor: "pointer"
    },
    onClick: () => {
      moveYear(1);
    }
  }, "\u21E8"))));
};

export default CalendarHeatmap;
//# sourceMappingURL=index.modern.js.map
