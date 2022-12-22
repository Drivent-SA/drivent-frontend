import useToken from '../useToken';

import * as roomsApi from '../../services/hotelsApi';
import useAsync from '../useAsync';

export default function useRooms(hotelId) {
  const token = useToken();

  const {
    data: rooms,
    loading: roomsLoading,
    error: roomsError,
    act: getRooms,
  } = useAsync(() => roomsApi.getRooms(token, hotelId), false);

  return {
    rooms,
    roomsLoading,
    roomsError,
    getRooms,
  };
}
