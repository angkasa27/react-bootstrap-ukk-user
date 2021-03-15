import { getProfile, getStatistic } from '../../utils/fetch';

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

export function getAllstatistic(setResponse) {
  getStatistic()
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
