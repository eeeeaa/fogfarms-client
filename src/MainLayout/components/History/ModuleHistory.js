import React, { useContext, useEffect, useState } from "react";
import { ModuleHistoryContext } from "../../contexts/ModuleHistoryContext";
import { ModuleDataContext } from "../../contexts/ModuleDataContext";
import { Line } from "react-chartjs-2";
import moment from "moment";

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
        return {x:moment(item.timestamp),y:item.tds[0]};
      });
  
    setObjPara(x);
    console.log(x);
  }, [currentModule]);

  const arrayX = ["2020-04-20T04:45:10.844009Z", "2020-04-20T04:45:11.467079Z"];

  
  const dataGraph = {
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
        data: objPara, //[65, 59, 80, 81, 56, 55, 40], //array y-axis
      },
    ],
  };
  var options = {
   
    scales: {
        xAxes: [{
            type: 'time',
        }]
    }
}

  return (
    <div className="dataBox">
      {historyDatas ? (
        <>
          <Line data={dataGraph} options={options} />
        </>
      ) : (
        <div>No Module have been select</div>
      )}
    </div>
  );
};
export default ModuleHistory;
