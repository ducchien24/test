import { Image } from '@mantine/core';
import closeEyes from '@/icons/closeEyes.svg';
import openEyes from '@/icons/openEyes.svg';

export interface PasswordToggleIconProps {
  reveal: boolean;
}

export type PasswordInputVisibilityToggleIcon = React.FC<PasswordToggleIconProps>;

export const PasswordToggleIcon: PasswordInputVisibilityToggleIcon = ({
  reveal,
}: PasswordToggleIconProps) => {
  return (
    <>
      {!reveal ? (
        <Image h="auto" w="auto" fit="contain" src={openEyes} />
      ) : (
        <Image h="auto" w="auto" fit="contain" src={closeEyes} />
      )}
    </>
  );
};
