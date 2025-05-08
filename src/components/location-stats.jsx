import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
  } from "recharts";
  
  export default function Location({ stats }) {
    const cityCount = stats.reduce((acc, item) => {
      acc[item.city] = (acc[item.city] || 0) + 1;
      return acc;
    }, {});
  
    const cities = Object.entries(cityCount).map(([city, count]) => ({
      city,
      count,
    }));
  
    return (
      <div className="w-full h-[230px] sm:h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={cities.slice(0, 5)} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <XAxis dataKey="city" />
            <YAxis allowDecimals={false} />
            <Tooltip labelStyle={{ color: "green" }} />
            <Legend />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#dcb14c"
              strokeWidth={2}
              strokeOpacity={0.8}
              dot={{ r: 5 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
  