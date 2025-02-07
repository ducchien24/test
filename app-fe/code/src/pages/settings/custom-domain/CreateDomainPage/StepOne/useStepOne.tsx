import { showCustomNotification } from '@/utils/commonFunc/func';
import { RootState } from '@/utils/redux/rootReducers';
import { useForm, useWatch } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { postCreateDomain } from '../../services';
import { DomainCreate } from '../../type';
interface StepOneCreateDomainForm {
  domain: string;
  isPublished: boolean;
  subdomain: string;
}
interface StepOneProps {
  nextStep: () => void;
  setDomainDetail: (data: DomainCreate) => void;
}

export const useStepOne = ({ nextStep, setDomainDetail }: StepOneProps) => {
  const user = useSelector((state: RootState) => state.system.user);
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<StepOneCreateDomainForm>({
    defaultValues: {
      domain: undefined,
      isPublished: false,
      subdomain: undefined,
    },
    mode: 'all',
  });

  const onSubmit = async (data: StepOneCreateDomainForm) => {
    try {
      const result = await postCreateDomain(user?.apiKey || '', data);
      if ('error' in result) {
        showCustomNotification(result.error, undefined, 'error');
      } else {
        showCustomNotification(
          'Create domain successfully!',
          undefined,
          'success'
        );
        setDomainDetail(result);
        nextStep();
      }
    } catch (error) {
      showCustomNotification(error?.toString() || '', undefined, 'error');
    }
  };
  const isPublished = useWatch({ control, name: 'isPublished' });
  return { onSubmit, handleSubmit, isPublished, control, isSubmitting };
};
