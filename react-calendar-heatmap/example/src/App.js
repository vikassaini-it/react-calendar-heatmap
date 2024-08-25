import React from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/index.css";

const App = () => {
    const generateDateRangeData = () => {
        const data = [];
        const endDate = new Date(); // Today's date
        const startDate = new Date();
        startDate.setFullYear(endDate.getFullYear() - 1); // Date one year ago

        let currentDate = new Date(startDate);

        while (currentDate <= endDate) {
            // Format date as YYYY-MM-DD
            const formattedDate = currentDate.toISOString().split("T")[0];

            // Generate random count between 0 and 100
            const randomCount = Math.floor(Math.random() * 101);

            // Add object to the data array
            data.push({
                date: formattedDate,
                count: randomCount,
            });

            // Increment date by one day
            currentDate.setDate(currentDate.getDate() + 1);
        }

        return data;
    };
    return <CalendarHeatmap dataValues={generateDateRangeData()} />;
};

export default App;
