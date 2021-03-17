import { loginUser } from '../../utils/fetch';
import { setToken } from '../../utils/storage';

export function login(data, setResponse) {
  loginUser(data)
    .then((res) => {
      if (res.data.accessToken) {
        setToken(res.data.accessToken);
        return setResponse({ success: true, message: 'SUKSES' });
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
