import React, { useContext, useEffect, useState } from "react";
import { ModuleHistoryContext } from "../../contexts/ModuleHistoryContext";
import { ModuleDataContext } from "../../contexts/ModuleDataContext";
import { Line } from "react-chartjs-2";

const ModuleHistory = () => {
  const { historyDatas } = useContext(ModuleHistoryContext);
  const { currentModule } = useContext(ModuleDataContext);
  const [timeArray, setTimeArray] = useState([]);
  const [objPara, setObjPara] = useState();

  console.log(
    "History Datas : ",
    historyDatas.find((key) => key.name === currentModule)
  );

  useEffect(() => {
    const x = historyDatas
      .find((key) => key.name === currentModule)
      ?.ok.map((item) => {
        return item.timestamp;
      });
    console.log("X : ", x);
    const y = arrayX.map((data, index) => {
      return data;
    });
    setTimeArray(y);
    const z = historyDatas
      .find((key) => key.name === currentModule)
      ?.ok.map((item, key) => {
        return {
          tds: item.tds,
          ph: item.ph,
          solution_temp: item.solution_temp,
        };
      });
    console.log("Z here :", z);
    setObjPara(z);
  }, [currentModule]);

  const arrayX = ["2020-04-20T04:45:10.844009Z", "2020-04-20T04:45:11.467079Z"];

  const transform = () => {
    arrayX.map((data, index) => {
      const time = data.substring(11, 19);
      const day = data.substring(8, 10);
      const month = data.substring(5, 7);
      const all1 = month.concat(day);
      const all2 = all1.concat(time);
      return time;
    });
  };

  const objY = {
    tds: [1, 1],
    ph: [1, 1],
    solution_temp: [1, 1],
  };

  const dataGraph = {
    labels: arrayX, //["January", "February", "March", "April", "May", "June", "July"], //array x-axis
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
        data: objY?.solution_temp, //[65, 59, 80, 81, 56, 55, 40], //array y-axis
      },
    ],
  };

  return (
    <div className="dataBox">
      {historyDatas ? (
        <>
          <Line data={dataGraph} />
        </>
      ) : (
        <div>No Module have been select</div>
      )}
    </div>
  );
};
export default ModuleHistory;
