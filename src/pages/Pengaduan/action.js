import {
  getAllPengaduan,
  getDetailPengaduan,
  putStatusPengaduan,
  getDokumenPengaduan,
  addTanggapanPengaduan,
  deletePengaduan,
} from '../../utils/fetch';

export function getAll(page, setResponse) {
  getAllPengaduan(page)
    .then((res) => {
      if (res.success) {
        return setResponse({
          success: true,
          message: 'SUKSES',
          data: res.data,
          meta: res.meta,
        });
      } else {
        console.log(res.message);
        return setResponse({ success: false, message: res.message });
      }
    })
    .catch((err) => {
      console.log(err);
      console.log('tes');
      return setResponse({
        success: false,
        message: 'Silahkan Hubungi Developer',
      });
    });
}

export function getDetail(id, setResponse) {
  getDetailPengaduan(id)
    .then((res) => {
      if (res.success) {
        return setResponse({
          success: true,
          message: 'SUKSES',
          data: res.data,
        });
      } else {
        console.log(res.message);
        return setResponse({ success: false, message: res.message });
      }
    })
    .catch((err) => {
      console.log(err);
      return setResponse({
        success: false,
        message: 'Silahkan Hubungi Developer',
      });
    });
}

export function updateStatus(id, data, setLoading) {
  setLoading(true);
  putStatusPengaduan(id, data)
    .then((res) => {
      if (res.success) {
        setLoading(false);
      } else {
        console.log(res.message);
        setLoading(false);
      }
    })
    .catch((err) => {
      console.log(err);
      setLoading(false);
    });
}

export function getDokumen(setResponse) {
  getDokumenPengaduan()
    .then((res) => {
      if (res) {
        return setResponse(res);
      } else {
        console.log(res.message);
        return setResponse({ success: false, message: res.message });
      }
    })
    .catch((err) => {
      console.log(err);
      return setResponse({
        success: false,
        message: 'Silahkan Hubungi Developer',
      });
    });
}

export function sendTanggapan(id, data, setLoading) {
  setLoading(true);
  addTanggapanPengaduan(id, data)
    .then((res) => {
      if (res.success) {
        setLoading(false);
      } else {
        console.log(res.message);
        setLoading(false);
      }
    })
    .catch((err) => {
      console.log(err);
      setLoading(false);
    });
}

export function deleteOne(id, setLoading) {
  setLoading(true);
  deletePengaduan(id)
    .then((res) => {
      if (res.success) {
        setLoading(false);
      } else {
        console.log(res.message);
        setLoading(false);
      }
    })
    .catch((err) => {
      console.log(err);
      setLoading(false);
    });
}
