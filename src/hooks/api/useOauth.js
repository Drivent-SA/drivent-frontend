import useAsync from '../useAsync';

import * as authApi from '../../services/authApi';

export default function useOauth() {
  const {
    loading: oAuthLoading,
    error: oAuthError,
    act: logInWithOauth
  } = useAsync(authApi.logInWithOauth, false);

  return {
    oAuthLoading,
    oAuthError,
    logInWithOauth
  };
}
