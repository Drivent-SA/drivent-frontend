import useAsync from '../useAsync';
import useToken from '../useToken';
import * as paymentsApi from '../../services/paymentsApi';

export default function useSavePayment() {
  const token = useToken();

  const {
    loading: savePaymentLoading,
    error: savePaymentError,
    act: savePayment
  } = useAsync((data) => paymentsApi.savePayments(data, token), false);

  return {
    savePaymentLoading,
    savePaymentError,
    savePayment
  };
}
