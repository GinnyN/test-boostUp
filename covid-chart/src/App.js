import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import api from './services/api.js';
import Histogram from './charts/histogram';
import { setTotalData, setTotalDataByStates } from './global/action.js';
import './App.css';
import moment from 'moment';
import StateTable from './table/index.js';

function App() {
  const dispatch = useDispatch();
  const totalData = useSelector((state) => state.totalData);
  const totalDataByState = useSelector((state) => state.totalDataByState);
  const [histogramData, setHistogramData] = useState(false);
  const [dataByState, setDataByState] = useState([]);
  const [currentDate, setCurrentDate] = useState(new moment());

  const changeTime = (value) => {
    if(value === 'all') setHistogramData(totalData);
    else {
      const temp = {};
      temp.cases = totalData.cases.sort((a,b) => {
        if(moment(a.date).isAfter(b.date)) return 1;
        if(moment(b.date).isAfter(a.date)) return -1;
        return 0;
      }).slice(-1*value);

      temp.deaths = totalData.deaths.sort((a,b) => {
        if(moment(a.date).isAfter(b.date)) return 1;
        if(moment(b.date).isAfter(a.date)) return -1;
        return 0;
      }).slice(-1*value);

      setHistogramData(temp);
    }
  }

  const selectDay = (date) => {
    const formatted = moment(date).format('YYYY-MM-DD');
    setDataByState(totalDataByState[formatted]);
    setCurrentDate(moment(date));
  }

  useEffect(() => {
    Promise.all([ api.getDataByTime(), api.getDataByStates()]).then(([dataByTime, dataByStates]) => {
      dispatch(setTotalData(dataByTime));
      dispatch(setTotalDataByStates(dataByStates));
      setHistogramData(dataByTime);
    });
  }, [])

  
  return (
    <div className="App">
      <h1>Accumulative COVID-19 Cases in the United States</h1>
      <div className="grid">
      <div>
        { histogramData && <Histogram data={histogramData} onClick={selectDay} /> }
        <select onChange={(changed) => changeTime(changed.target.value)}>
          <option value="all"> All Time </option>
          <option value="7"> Last 7 days </option>
          <option value="30"> Last 30 days </option>
        </select>
      </div>

      <div>
        <h2>{currentDate.format('MMM Do of YYYY')}</h2>
        <StateTable data={dataByState} />
      </div>
      </div>
      <div className="credits">Ximena Contreras - Data from <a href='https://disease.sh/docs/'>https://disease.sh/docs/</a></div>
    </div>
  );
}

export default App;
