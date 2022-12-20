import useToken from '../useToken';

import * as bookingApi from '../../services/bookingApi';
import useAsync from '../useAsync';

export default function useSaveBooking(roomId) {
  const token = useToken();

  const {
    loading: saveBookingLoading,
    error: saveBookingError,
    act: saveBooking,
  } = useAsync(() => bookingApi.postBooking(token, roomId), false);

  return {
    saveBookingLoading,
    saveBookingError,
    saveBooking,
  };
}
