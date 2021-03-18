import React, { useEffect, useState } from 'react';
import Navbar from '../../component/fragment/Navbar';
import CountCard from '../../component/fragment/CountCard';
import { getUserProfile, getAllstatistic } from './action';
import { useHistory } from 'react-router-dom';

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
          <AddCard
            name="Buat Laporan"
            bg="danger"
            value={statistic.data.done}
          />
          <CountCard
            name="DiProses"
            bg="warning"
            value={statistic.data && statistic.data.onProgress}
          />
          <CountCard
            name="DiTanggapi"
            bg="info"
            value={statistic.data && statistic.data.responded}
          />
          <CountCard
            name="Selesai"
            bg="success"
            value={statistic.data.responded}
          />
        </div>
      </div>
    </div>
  );
}

export function AddCard({ name, bg }) {
  const history = useHistory();
  return (
    <div className="col-lg 4 col-md-6 col-sm-12 mt-2">
      <div onClick={() => history.push('/pengaduan?add=true')} className="card">
        <div className={'card-body  shadow rounded-3 border-0 bg-' + bg}>
          <h4 className="text-dark">
            <strong>{name}</strong>
          </h4>
          <h1 className="text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="35"
              height="35"
              fill="currentColor"
              className="bi bi-file-earmark-plus"
              viewBox="0 0 16 16"
            >
              <path d="M8 6.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 .5-.5z" />
              <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z" />
            </svg>
          </h1>
        </div>
      </div>
    </div>
  );
}
