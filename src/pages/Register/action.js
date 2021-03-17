import { registerUser } from '../../utils/fetch';

export function register(data, setResponse) {
  registerUser(data)
    .then((res) => {
      console.log(res);
      if (res.success) {
        return setResponse({ success: true, message: 'SUKSES' });
        // location.href = `/`;
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
      // dispatch(loginFailedAction(message));
      // dispatch(loadingAction(false));
    });
}
