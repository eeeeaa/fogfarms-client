import React, { useContext, useEffect, useState } from "react";
import { ModuleHistoryContext } from "../../contexts/ModuleHistoryContext";
import { ModuleDataContext } from "../../contexts/ModuleDataContext";
import app from "../../functions/axiosConfig";
import { Line } from "react-chartjs-2";
import moment from "moment";
import {DatePicker} from "antd";
import Dropdown from 'react-bootstrap/Dropdown';

const ModuleHistory = () => {
  const { datas, currentModule, moduleID,groupName } = useContext(ModuleDataContext);
  const [dataForGraph, setDataForGraph] = useState();
  const {RangePicker}=DatePicker;
  const [historyDatas, setHistoryDatas] = useState([]); //give every information
  const[startDate , setStartDate]=useState(moment());
  const[endDate , setEndDate]=useState(moment());
  const[selectedValueKey,setSelectedValueKey]=useState("grow_unit_humidity");
  const[valueOptions,setValueOptions]=useState(["tds", "ph", "solution_temp", "grow_unit_lux", "grow_unit_humidity", "grow_unit_temp"]);
  const info = {
    //set which module group to pull data from
    module_group_id: groupName,
    time_begin: startDate.toDate().toISOString( ),
    time_end: endDate.toDate().toISOString( ),
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
    console.log("this is current info",info);
    loadHistory();
  }, [startDate,endDate]);

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

    console.log("these are keys",keys);
    const selectedKey = selectedValueKey;
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
    console.log("called historydatas",historyDatas)
  }, [currentModule,historyDatas,selectedValueKey]);

  const options = {
    scales: {
      xAxes: [
        {
          type: "time",
        },
      ],
    },
    title:{
      display:true,
      text:selectedValueKey
    },

  };

  const onChange=(dates,dateStrings)=>{
    
    //console.log("Before select date",startDate?.toDate().toISOString( ));
   if(dates!=undefined){
    setStartDate(dates[0]);
    setEndDate(dates[1]);
    console.log("After select date",startDate?.toDate().toISOString( ));
    console.log("Actual date",dates[0]);
    console.log("Actual date",dates[1]);
   }
  };

  const selectOption=(value)=>{
    setSelectedValueKey(value);
    console.log(value);
  };
  return (
    <div className="dataBox">
      {historyDatas ? (
        <>
          <Line data={dataForGraph} options={options} />
        
        </>
      ) : (
        <div>Error, cnnot load graph</div>
      )}
       <RangePicker  defaultValue={[moment(),moment()]}   onChange={onChange} showTime /> 
       
       <Dropdown>
  <Dropdown.Toggle variant="success" id="dropdown-basic">
    Data Options
  </Dropdown.Toggle>

  <Dropdown.Menu>
    {valueOptions.map((value,index)=>{
      return <Dropdown.Item onClick={() => selectOption(value)}>{value}</Dropdown.Item>
    })}
  </Dropdown.Menu>
</Dropdown>
      </div>  
        );
};
export default ModuleHistory;