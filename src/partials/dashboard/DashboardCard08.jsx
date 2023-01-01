import React,{useState,useEffect} from 'react';
import LineChart from '../../charts/LineChart02';
import axios from 'axios'
// Import utilities

import getTemperature, { getDates, getHumidity, getMoisture } from './Helper/Helper';
import Chart from "react-apexcharts";
function DashboardCard08({id}) {
 const  type={
    1:{
      title:"Temperature",

    },
    2:{
      title:"Moisture",
      
    },
    3:{
      title:'Humidity'
    }
  }
  function getDataBasedonTyp(id,response){
const d= {
  1:getTemperature(response.data.feeds),
  2:getMoisture(response.data.feeds),
  3:getHumidity(response.data.feeds)
}
return d[id]
  }
  const [Data, setData] = useState([])
  const [Dates, setDates] = useState([])
  const [ValuesTemperature, setValuesTemperature] = useState([])
  const [ChartDataFinal, setChartDataFinal] = useState({
      options: {
        chart: {
          id: type[id].title
        },
        xaxis: {
          categories: []
        }
      },
      series: [
        {
          name:type[id].title,
          data: []
        }
      ]
    }
  )
;
useEffect(() => {
  axios.get('https://api.thingspeak.com/channels/1995282/feeds.json')
  .then((response) => {
    console.log(response.data.feeds)
    setDates(getDates(response.data.feeds))
    setValuesTemperature(getTemperature(response.data.feeds))
    
    setChartDataFinal(Object.assign({},{
      options: {
        chart: {
          id: type[id].title
        },
        xaxis: {
          categories:getDates(response.data.feeds)
        }
      },
      series: [
        {
          name:type[id].title,
          data: getDataBasedonTyp(id,response)
        }
      ]
    }))
  }, (error) => {
    console.log(error);
  });
}, [])

  

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white shadow-lg rounded-sm border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100 flex items-center">
        <h2 className="font-semibold text-slate-800">{type[id].title}</h2>
      </header>
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      <Chart
              options={ChartDataFinal.options}
              series={ChartDataFinal.series}
              type="line"
           
              key={id}
            />
    </div>
  );
}

export default DashboardCard08;
