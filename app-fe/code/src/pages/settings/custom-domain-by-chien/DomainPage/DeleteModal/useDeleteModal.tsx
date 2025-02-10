import { showCustomNotification } from '@/utils/commonFunc/func';
import { RemoveDomain } from '../services';
import { RootState } from '@/utils/redux/rootReducers';
import { useSelector } from 'react-redux';
import { useDisclosure } from '@mantine/hooks';

export const useDeleteModal = ({
  IdDomain,
  closeModal,
  goBackToDomainList,
}: {
  IdDomain: string;
  closeModal: () => void;
  goBackToDomainList?: () => void;
}) => {
  const user = useSelector((state: RootState) => state.system.user);
  const [visible, { close, open }] = useDisclosure(false);
  const DeleteModalFunct = async () => {
    open();
    try {
      const result: any = await RemoveDomain(user?.apiKey || '', IdDomain);
      if ('error' in result) {
        showCustomNotification(result.error || '', 'Errors', 'error');
      } else {
        showCustomNotification(
          'Domain removed successfully!',
          undefined,
          'success'
        );
      }
    } catch (error) {
      showCustomNotification(
        (error as Error).message || 'An error occurred',
        'Errors',
        'error'
      );
    } finally {
      close();
      closeModal();
      goBackToDomainList && goBackToDomainList();
    }
  };
  return {
    visible,
    DeleteModalFunct,
  };
};
