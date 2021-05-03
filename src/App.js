import './App.css';
import { useEffect, useRef, useState } from 'react';
import DataTable from './DataTable';

const updatedList = (old, newList) => {
  const remaining = [...newList];
  const delta = old.map((city) => {
    const appleIndex = remaining.findIndex((apple) => apple.city === city.city);
    if (appleIndex >= 0) {
      const [apple] = remaining.splice(appleIndex, 1);
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

function App() {
  const ws = useRef(null);
  const [fetchedData, setFD] = useState([]);

  const handleMessage = (e) => {
    const apples = JSON.parse(e.data);
    setFD((prev) => updatedList(prev, apples));
  };

  useEffect(() => {
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
    </div>
  );
}

export default App;
