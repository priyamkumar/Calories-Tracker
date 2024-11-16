import React from 'react'
import StatisticsHeading from './StatisticsHeader'
import StatisticsBarChart from './StatisticsBarChart'

export default function Statistics({dataArr}) {
  return (
    <div className="stats"> 
    <StatisticsHeading/>
    <StatisticsBarChart dataArr={dataArr}/>
    </div>
  )
}
