import React from "react";
import '../../sass/savings.scss';
import "react-circular-progressbar/dist/styles.css";
import CircularProgressbar from "react-circular-progressbar";

const ProgressCircle = props => {

  console.log(props)
  // If Vacation mode is activated, reverse the display of the progress circle percentage
  const percentage =
    props.vacationMode ?
    (100 - (props.total_saved / props.goalTotal_cents) * 100).toFixed(1) :
      ((props.total_saved / props.goalTotal_cents) * 100).toFixed(1);

  return (
    <div>
      <div className='circle' style={{ width: "80%" }}>
        <CircularProgressbar
          key='Circle'
          percentage={percentage}
          text={`${percentage}%`}
          styles={{
            path: {
              stroke: "rgb(238,177,39)",
              transition: 'stroke-dashoffset 0.5s ease 0s'
            },
            trail: {
              stroke: 'rgba(126, 126, 126, 0.5)'
            },
            text: {
              fill: "rgb(238,177,39)"
            }
          }}
        />
      </div>
    </div>
  )
};

export default ProgressCircle
