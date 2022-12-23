import useAsync from '../useAsync';
import useToken from '../useToken';

import * as activitiesApi from '../../services/activitiesApi';

export default function useEnrollInActivity(activityId) {
  const token = useToken();

  const {
    data: activity,
    loading: activityLoading,
    error: activityError,
    act: postEnrollInActivity,
  } = useAsync(() => activitiesApi.postEnrollInActivity({ activityId, token }), false);

  return {
    activity,
    activityLoading,
    activityError,
    postEnrollInActivity,
  };
};
