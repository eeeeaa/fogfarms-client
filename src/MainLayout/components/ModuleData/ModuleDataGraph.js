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

  //   const formatTimestamp = (timestamp) => {
  //     const x = timestamp.substring(0, 16);
  //     const y = "-0000";
  //     return x.concat(y);
  //   };

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

  return (
    <div className="nutrientBox">
      {sensorModule ? (
        sensorModule.tds.map((data, index) => {
          return (
            <React.Fragment key={index}>
              <div className="nutrientTitle">
                <p>Nutrient{index + 1}</p>
              </div>
              <div className="nutrientTime"></div>
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
              {/* <Line data={dataGraph} /> */}
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
