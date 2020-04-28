import React, { useContext, useEffect, useState } from "react";
import { ModuleHistoryContext } from "../../contexts/ModuleHistoryContext";
import { ModuleDataContext } from "../../contexts/ModuleDataContext";
import app from "../../functions/axiosConfig";
import { Line } from "react-chartjs-2";
import moment from "moment";
import { DatePicker } from 'antd';

const ModuleHistory = () => {
  const { datas, currentModule, moduleID } = useContext(ModuleDataContext);
  const [dataForGraph, setDataForGraph] = useState();
const     {RangePicker}=DatePicker;
  const [historyDatas, setHistoryDatas] = useState([]); //give every information

  const info = {
    //set which module group to pull data from
    module_group_id: 1,
    time_begin: "1999-04-21T03:00:00Z",
    time_end: "2020-04-30T11:00:00Z",
  };

  const loadHistory = () => {
    app.post("/dashboard/history", info).then((res) => {
      const receivedData = res.data;
      const modulesJson = Object.keys(receivedData).map((key, i) => {
        return { name: key, data: receivedData[key] };
      });
      setHistoryDatas(modulesJson);
    });
  };

  //calling the data upfront.
  useEffect(() => {
    loadHistory();
  }, []);

  useEffect(() => {
    const moduleHistoryData = historyDatas.find(
      (key) => key.name === currentModule
    )?.data;
    const keys = Array.from(
      moduleHistoryData?.reduce(
        (previous, current) => new Set([...previous, ...Object.keys(current)]),
        []
      ) ?? []
    );
    const selectedKey = "grow_unit_humidity";
    const numberOfSeries = moduleHistoryData?.reduce(
      (p, c) => (c[selectedKey].length > p ? c[selectedKey].length : p),
      0
    );
    const datas = Array(numberOfSeries)
      .fill(null)
      .map((_, index) => {
        return moduleHistoryData?.map((item) => {
          return { x: moment(item.timestamp), y: item[selectedKey][index] };
        });
      });

    if (datas) {
      setDataForGraph({
        datasets:
          datas.map((data, i) => {
            return {
              label: "Nutrient Unit" + (i + 1),
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
              data, //[65, 59, 80, 81, 56, 55, 40], //array y-axis
            };
          }) ?? [],
      });
    }
  }, [currentModule]);

  const options = {
    scales: {
      xAxes: [
        {
          type: "time",
        },
      ],
    },
  };

  return (
    <div className="dataBox">
      {historyDatas ? (
        <>
          <Line data={dataForGraph} options={options} />
        
        </>
      ) : (
        <div>No Module have been select</div>
      )}
        <RangePicker  defaultValue={[moment(),moment()]}       style={{ width: 100 }} />
  
    </div>
    
  );
};
export default ModuleHistory;