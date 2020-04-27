import React, { useContext, useState, useEffect } from "react";
import { ModuleDataContext } from "../../contexts/ModuleDataContext";
// import app from '../../functions/axiosConfig';
import { Progress } from "antd";
import { Line } from "react-chartjs-2";
import Moment from "react-moment";

const ModuleDataGraph = () => {
  const { sensorModule, groupName, timestamp, currentModule } = useContext(
    ModuleDataContext
  );
  const [para, setPara] = useState("tds");
  const [time, setTime] = useState("");
  const [history, SetHistory] = useState([]);

  const infoHis = {
    //fake data for the requesting the graph
    module_group_id: groupName,
    time_begin: "1999-04-21T03:00:00Z",
    time_end: "2020-04-21T11:00:00Z",
  };

  //   const formatTimestamp = (timestamp) => {
  //     const x = timestamp.substring(0, 16);
  //     const y = "-0000";
  //     return x.concat(y);
  //   };
  const dateToFormat = "1976-04-19T12:59-0500";

  // For fetching History (The data is not very cool, atm)
  // useEffect(() => {
  // 	loadDataHistory()
  // }, [para]);

  //   useEffect(() => {
  //     setTime(formatTimestamp(timestamp));
  //   }, [currentModule]);

  // const loadDataHistory = () => {
  // 	app.post("/dashboard/history", infoHis).then((res) => {
  // 	  const receivedData = res.data;
  // 	  const modulesJson = Object.keys(receivedData).map((key, i) => {
  // 		return { ...receivedData[key], name: key };
  // 	  });
  // 	});
  // };

  const x_axis = ["hi"];

  const dataGraph = {
    labels: ["January", "February", "March", "April", "May", "June", "July"], //array x-axis
    datasets: [
      {
        label: "My First dataset",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [65, 59, 80, 81, 56, 55, 40], //array y-axis
      },
    ],
  };

  return (
    <div className="nutrientBox">
      {sensorModule ? (
        sensorModule.tds.map((data, index) => {
          return (
            <React.Fragment key={index}>
              <div className="nutrientTitle">
                <p>Nutrient{index + 1}</p>
              </div>
              <div className="nutrientTime">
                <Moment>Total Time:{dateToFormat}</Moment>
              </div>
              <div>
                <Progress
                  type="circle"
                  percent={sensorModule.tds}
                  format={(percent) => `TDS ${percent}%`}
                />
                <Progress
                  type="circle"
                  percent={(sensorModule.ph * 100) / 14}
                  format={(percent) => `PH ${(percent * 14) / 100}`}
                />
                <Progress
                  type="circle"
                  percent={sensorModule.solution_temp}
                  format={(percent) => `Solution temparature ${percent}`}
                />
              </div>
              <Line data={dataGraph} />
            </React.Fragment>
          );
        })
      ) : (
        <p>No Nutrient has been selected at the moment</p>
      )}
    </div>
  );
};

export default ModuleDataGraph;
