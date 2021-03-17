import {
  getAllPengaduan,
  getDetailPengaduan,
  putStatusPengaduan,
  addPengaduan,
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

export function submitPengaduan(data, setLoading, handleResponse) {
  setLoading(true);
  addPengaduan(data)
    .then((res) => {
      if (res.success) {
        setLoading(false);
        handleResponse(true);
      } else {
        console.log(res.message);
        handleResponse(false);
        setLoading(false);
      }
    })
    .catch((err) => {
      console.log(err);
      handleResponse(false);
      setLoading(false);
    });
}
