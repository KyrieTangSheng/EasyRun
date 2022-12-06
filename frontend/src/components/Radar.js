import React from "react";
import RadarChart from "react-svg-radar-chart";
import "react-svg-radar-chart/build/css/index.css";

export default function Radar(props) {

  return (
    <div>
      <RadarChart
        captions={{
          // columns
          battery: "Battery Capacity",
          design: "Design",
          useful: "Usefulness",
          speed: "Speed",
          weight: "Weight",
        }}
        data={[
          // data
          {
            data: {
              battery: 0.7,
              design: 0.8,
              useful: 0.9,
              speed: 0.67,
              weight: 0.8,
            },
            meta: { color: "#58FCEC" },
          },
        ]}
        size={230}
      />
    </div>
  );
}
