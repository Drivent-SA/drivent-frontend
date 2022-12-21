import * as bookingApi from '../../services/bookingApi';
import useAsync from '../useAsync';
import useToken from '../useToken';

export default function useUpdateBooking(bookingId, roomId) {
  const token = useToken();

  const {
    loading: updateBookingLoading,
    error: updateBookingError,
    act: updateBooking
  } = useAsync( () => bookingApi.updateBooking({ token, bookingId, roomId }), false);

  return {
    updateBookingLoading,
    updateBookingError,
    updateBooking
  };
}
