import React, { useEffect, useState } from 'react';
import Navbar from '../../component/fragment/Navbar';
import CountCard from '../../component/fragment/CountCard';
import { getUserProfile, getAllstatistic } from './action';

export default function Home() {
  const [response, setResponse] = useState({});
  const [statistic, setStatistic] = useState({
    data: { submitted: 0, onProgress: 0, responded: 0, done: 0 },
  });

  useEffect(() => {
    getUserProfile(setResponse);
    getAllstatistic(setStatistic);
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container mt-2">
        <h3 className="my-2">
          <strong>
            Welcome back, {response.data ? response.data.name : ''}
          </strong>
        </h3>
        <div className="row">
          <CountCard
            name="Diterima"
            bg="danger"
            value={statistic.data.submitted}
          />
          <CountCard
            name="Diproses"
            bg="warning"
            value={statistic.data.onProgress}
          />
          <CountCard
            name="Ditanggapi"
            bg="info"
            value={statistic.data.responded}
          />
          <CountCard name="Selesai" bg="success" value={statistic.data.done} />
        </div>
      </div>
    </div>
  );
}
