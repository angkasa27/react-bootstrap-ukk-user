import { getProfile, editProfile, editPassword } from '../../utils/fetch';

export function getUserProfile(setResponse) {
  getProfile()
    .then((res) => {
      if (res.success) {
        return setResponse({
          success: true,
          message: 'SUKSES',
          data: res.data,
        });
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

export function updateProfile(data, setLoading) {
  setLoading(true);
  editProfile(data)
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

export function updatePassword(data, setLoading) {
  setLoading(true);
  editPassword(data)
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
