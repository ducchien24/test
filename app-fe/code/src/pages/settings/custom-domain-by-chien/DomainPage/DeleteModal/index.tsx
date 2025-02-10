import CustomModal from '@/common/CustomModal';
import { Text } from '@mantine/core';
import { useDeleteModal } from './useDeleteModal';
interface DeleteModalProps {
  opened: boolean;
  close: () => void;
  IdDomain: string;
  goBackToDomainList: () => void;
}
export const DeleteModal = ({
  opened,
  close,
  IdDomain,
  goBackToDomainList,
}: DeleteModalProps) => {
  const { DeleteModalFunct, visible } = useDeleteModal({
    IdDomain,
    closeModal: close,
    goBackToDomainList,
  });
  return (
    <CustomModal
      onClose={close}
      opened={opened}
      title="Remove Domain"
      rightButton={{
        label: 'Remove',
        onClick: () => {
          DeleteModalFunct();
        },
        loading: visible,
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: 600,
          lineHeight: '26px',
        }}
        c="#8F8F8F"
      >
        Once you remove this domain, you will no longer be able to edit
        shortlinks associated with it. <br /> <br />
        Are you sure you want to remove this domain?
      </Text>
    </CustomModal>
  );
};
