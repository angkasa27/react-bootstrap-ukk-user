// App.js bisa dibilang sebagai pipa utama
// Fungsi yang sifatmnya global dan style yang sifatnya global
// Biasanya di taruh disini

import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useLocation, useHistory } from 'react-router-dom';

// Import semua halaman yang mau dipake biar bisa dipanggil
import Login from './pages/Login';
import Home from './pages/Home';
import Pengaduan from './pages/Pengaduan';
import Pengguna from './pages/Pengguna';
import Petugas from './pages/Petugas';

//Import function getToken buat nge cek tokennya
import { getToken } from './utils/storage';

export default function App() {
  const location = useLocation();
  const history = useHistory();

  // Berisi Route yang tidak memerlukan token
  const noAuthRoutes = ['/login', '/Login'];
  // Cek jika lokasi sekarang sama dengan lokasi yang ada di noAuthRoutes
  const noAuth = noAuthRoutes.some((r) => location.pathname.match(r));

  //UseEffect Hanya berjalan jika ada isi parameter yang berubah
  //Disini kondisinya jiga location.pathname ada perubahan
  useEffect(() => {
    if (!getToken() && !noAuth) {
      //cek jika tidak ada token dan berada di route yang butuh token
      //maka di arahkan ke login
      history.push('/login');
    } else if (getToken() && noAuth) {
      // kalau ada token dan berada di halaman yang tidak butuh token
      // maka diarahkan ke dashboard
      history.push('/statistik');
    }
  }, [location.pathname]);

  return (
    <div className="">
      {/* Untuk membuat branch nya atau jalur pipa nya */}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/statistik" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/pengaduan" component={Pengaduan} />
        <Route path="/pengguna" component={Pengguna} />
        <Route path="/petugas" component={Petugas} />
      </Switch>
    </div>
  );
}
