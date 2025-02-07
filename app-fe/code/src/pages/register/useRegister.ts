import loginService from '@/services/loginService';
import { showCustomNotification } from '@/utils/commonFunc/func';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

interface RegisterForm {
  Username: string;
  Password: string;
  Email: string;
}

const registerFormDefault = {
  Username: '',
  Password: '',
  Email: '',
};

export const useRegister = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<RegisterForm>({
    defaultValues: registerFormDefault,
  });
  const navigate = useNavigate();

  const onSubmit = async (values: any) => {
    try {
      const { success, data, error } = await loginService.register(
        values.Username,
        values.Password,
        values.Email
      );
      if (success && data?.user) {
        navigate(`/verify/${values.Email}`);
      } else {
        showCustomNotification(error?.toString() || '', 'Error', 'error');
      }
    } catch (e: any) {
      showCustomNotification(e.message, 'Error', 'error');
    }
  };
  return { control, handleSubmit, isSubmitting, navigate, onSubmit } as const;
};
