import React from "react";
import RadarChart from "react-svg-radar-chart";
import "react-svg-radar-chart/build/css/index.css";
import { Tooltip } from "./tooltip";

export default function Radar(props) {
  const [tooltipLeft, setTooltipLeft] = React.useState(null);
  const [tooltipTop, setTooltipTop] = React.useState(null);
  const [tooltipCri, setTooltipCri] = React.useState(null);
  const [tooltipRate, setTooltipRate] = React.useState(null);
  const object = props.object;

  const captions = {
    // columns
    avgScore1: "Service Quality",
    avgScore2: "Attitude",
    avgScore3: "Interaction",
    avgScore4: "Instruction",
    avgScore5: "Price",
    avgScore6: "Satisfaction",
  };

  return (
    <div>
      <RadarChart
        captions={captions}
        data={[
          // data
          {
            data: {
              avgScore1: object.avgScore1 / 5,
              avgScore2: object.avgScore2 / 5,
              avgScore3: object.avgScore3 / 5,
              avgScore4: object.avgScore4 / 5,
              avgScore5: object.avgScore5 / 5,
              avgScore6: object.avgScore6 / 5,
            },
            meta: { color: "#58FCEC" },
          },
        ]}
        size={230}
        options={{
          scales: 5,
          dots: true,
          zoomDistance: 1.2,
          dotProps: () => ({
            className: "dot",
            mouseEnter: (dot) => {
              setTooltipCri(captions[dot.key]);
              setTooltipRate(dot.value * 5);
              setTooltipLeft(140);
              setTooltipTop(160);
            },
            mouseLeave: (dot) => {
              setTooltipCri(null);
              setTooltipRate(null);
              setTooltipLeft(null);
              setTooltipTop(null);
            },
          }),
        }}
      />
      <Tooltip
        left={tooltipLeft}
        top={tooltipTop}
        rating={tooltipRate}
        criteria={tooltipCri}
      ></Tooltip>
    </div>
  );
}
