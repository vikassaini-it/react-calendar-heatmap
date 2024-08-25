import React, { useEffect, useState } from "react";

// import styles from "./Calendar.heatmap.css";

const CalendarHeatmap = (props) => {
    // return <div className={styles["techo-wrap"]}>Helloo</div>;

    const { dataValues } = props;

    // Date Range Shown
    const [endDate, setEndDate] = useState(new Date());
    const [startDate, setStartDate] = useState(new Date());

    // Year based on date range
    const [startYear, setStartYear] = useState(2023);
    const [endYear, setEndYear] = useState(2024);

    // Grid calculated based on date range
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
        const days =
            Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
        setCalendarGrid(
            Array.from({ length: days }, (_, i) => {
                const date = new Date(startDate);
                date.setDate(startDate.getDate() + i);
                return date.toISOString().slice(0, 10);
            })
        );
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
        setHighestValue(
            dataValues?.reduce((a, b) => Math.max(a, b.count), -Infinity)
        );
    };

    const getIntensity = (activityCount) => {
        return highestValue !== 0
            ? Number(activityCount / highestValue) * 100
            : 0;
    };

    const getColor = (intensity) => {
        const color = props.color ?? "#D2042D";
        if (intensity !== null && intensity !== undefined) {
            if (intensity < 15) intensity = 15;
            return `${color}${intensity}`;
        } else return color;
    };

    const moveYear = (direction) => {
        let sdt = new Date(startDate);
        let edt = new Date(endDate);
        sdt.setFullYear(sdt.getFullYear() + direction);
        edt.setFullYear(edt.getFullYear() + direction);
        setEndDate(edt);
        setStartDate(sdt);
        setEndYear(edt.getFullYear());
        setStartYear(sdt.getFullYear());
    };

    return (
        <div style={{ padding: "20px" }}>
            <div
                style={{
                    display: "grid",
                    gridAutoFlow: "column",
                    gridTemplateRows: "repeat(7, minmax(0, 1fr)",
                    gap: "6px",
                }}
            >
                {calenderGrid.map((day, index) => {
                    const target = dataValues.find((item) => item.date === day);
                    const activityCount = target?.count || 0;
                    const data = target?.data || [];
                    data.reverse();
                    const intensity = getIntensity(activityCount);
                    const color = getColor(intensity);
                    return (
                        <div
                            className="w-4 h-4 rounded cursor-pointer"
                            title={`${activityCount} Posts on ${day}`}
                            key={index}
                            style={{
                                width: "10px",
                                height: "10px",
                                backgroundColor: `${
                                    activityCount == 0
                                        ? "#00000010"
                                        : String(color)
                                }`,
                                borderRadius: "100%",
                                transition: "background-color 200ms linear",
                            }}
                        ></div>
                    );
                })}
            </div>
            <div
                style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    margin: "15px 5px",
                }}
            >
                <div style={{ display: "flex", alignItems: "center" }}>
                    <div
                        style={{
                            fontSize: "26px",
                            color: getColor(),
                            cursor: "pointer",
                        }}
                        onClick={() => {
                            moveYear(-1);
                        }}
                    >
                        ⇦
                    </div>
                    &nbsp;
                    <div>{startYear}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <div>{endYear}</div>
                    &nbsp;
                    <div
                        style={{
                            fontSize: "26px",
                            color: getColor(),
                            cursor: "pointer",
                        }}
                        onClick={() => {
                            moveYear(1);
                        }}
                    >
                        ⇨
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CalendarHeatmap;
