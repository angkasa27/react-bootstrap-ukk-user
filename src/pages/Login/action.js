//Berisi Action yang akan dijalankan
import { loginAdmin } from '../../utils/fetch';
import { setToken, setRole } from '../../utils/storage';

export function login(data, setResponse) {
  loginAdmin(data)
    .then((res) => {
      if (res.data.accessToken) {
        setToken(res.data.accessToken);
        setRole(res.data.level);
        return setResponse({ success: true, message: 'SUKSES' });
        // location.href = `/`;
      } else if (res.code === 404)
        return setResponse({
          success: false,
          message: 'Akun tidak dapat ditemukan',
        });
      else {
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
