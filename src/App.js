import './App.css';
import { useEffect, useRef, useState } from 'react';
import DataTable from './DataTable';
import ChartWrapper from './ChartWrapper';

function App() {
  const ws = useRef(null);
  const [fetchedData, setFD] = useState([]);
  const [individualAqi, setIndividual] = useState([]);
  const [individualCity, setCityName] = useState('');

  const updatedList = (old, newList) => {
    const remaining = [...newList];
    const delta = old.map((city, ctIndex) => {
      const appleIndex = remaining.findIndex((apple) => apple.city === city.city);
      if (appleIndex >= 0) {
        const [apple] = remaining.splice(appleIndex, 1);
        if (ctIndex === appleIndex) {
          setIndividual((p) => [...p, apple.aqi]);
          setCityName(city.city);
        }
        return {
          ...city,
          aqi: apple.aqi,
          timestamp: parseInt(new Date().getTime() / 1000),
        };
      }
      return { ...city, timestamp: parseInt(new Date().getTime() / 1000) };
    });
    return delta.concat(remaining);
  };

  useEffect(() => {
    const handleMessage = (e) => {
      const apples = JSON.parse(e.data);
      setFD((prev) => updatedList(prev, apples));
    };
    
    ws.current = new WebSocket(`ws://city-ws.herokuapp.com/`);
    ws.current.onopen = () => console.log('ws opened');
    ws.current.onmessage = handleMessage;
    ws.current.onclose = () => console.log('ws closed');

    return () => ws.current.close();
  }, []);

  return (
    <div className='App'>
      <h2>Air Quality Index app</h2>
      <DataTable data={fetchedData} />
      <ChartWrapper individualCity={individualCity} aqiData={individualAqi} />
    </div>
  );
}

export default App;
