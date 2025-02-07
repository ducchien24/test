import React from 'react';
import { Modal, Button, Text, Flex, ActionIcon, Divider } from '@mantine/core';
import { IconX } from '@tabler/icons-react';
interface CustomModalProps {
  opened: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  rightButton?: {
    label: string;
    onClick: () => void;
    loading?: boolean;
  };
}

const CustomModal: React.FC<CustomModalProps> = ({
  opened,
  onClose,
  title,
  children,
  rightButton,
}) => {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      withCloseButton={false}
      styles={{
        body: { padding: 0 },
      }}
      size={548}
      centered
    >
      <Modal.Header
        styles={{
          header: {
            padding: '16px 24px',
          },
        }}
      >
        <Flex align="center" justify="space-between" w="100%">
          <Text variant="body-2">{title}</Text>
          <ActionIcon onClick={onClose} variant="transparent" c="black">
            <IconX size="30px" />
          </ActionIcon>
        </Flex>
      </Modal.Header>
      <Divider />
      <Flex w="100%" p={24} direction="column" gap={32}>
        <Flex w="100%">{children}</Flex>
        <Flex w="100%" align="center" justify="center" gap={32}>
          <Button onClick={onClose} variant="outline" miw={196} mih={46}>
            Cancel
          </Button>
          {rightButton && (
            <Button
              onClick={() => {
                rightButton.onClick ? rightButton.onClick() : onClose();
              }}
              bg="#41BBE8"
              miw={196}
              mih={46}
              loading={rightButton?.loading}
            >
              {rightButton?.label}
            </Button>
          )}
        </Flex>
      </Flex>
    </Modal>
  );
};

export default CustomModal;
