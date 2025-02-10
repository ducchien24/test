
import { TextInputCustom } from '@/common/atoms/TextInputCustom';
import { Button, Flex, Radio, Text } from '@mantine/core';
import { DomainCreate } from '../../type';
import { showCustomNotification } from '@/utils/commonFunc/func';
import { RootState } from '@/utils/redux/rootReducers';
import { useForm, useWatch,Controller } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { postCreateDomain } from '../../services';

interface StepOneCreateDomainForm {
  domain: string;
  isPublished: boolean;
  subdomain: string;
}
interface StepOneProps {
  nextStep: () => void;
  setDomainDetail: (data: DomainCreate) => void;
}

const Step1 = ( props: StepOneProps ) => {
   const {nextStep,setDomainDetail}=props
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
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex direction="column" gap={24}>
        <Controller
          name="domain"
          control={control}
          rules={{
            required: 'Domain is required',
            pattern: {
              value:
                /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
              message: 'Invalid domain format',
            },
          }}
          render={({ field, fieldState }) => (
            <TextInputCustom
              label="Custom Domain"
              placeholder="Enter your custom domain"
              {...field}
              error={fieldState.error?.message}
              variant="default"
            />
          )}
        />

        <Controller
          name="isPublished"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <Radio.Group
              value={field.value.toString()}
              onChange={(value) => {
                field.onChange(value === 'true');
              }}
              label="Is there any content currently published at this domain?"
              error={error?.message}
              styles={{
                label: {
                  fontSize: 16,
                  lineHeight: '22px',
                  fontWeight: 500,
                  marginBottom: 12,
                },
              }}
            >
              <Flex direction="column" gap={8}>
                <Radio
                  value="false"
                  label="No, this is an unused domain"
                  style={{
                    fontSize: 14,
                    lineHeight: '22px',
                    fontWeight: 500,
                  }}
                />
                <Radio
                  value="true"
                  label="Yes, I use this for my website, blog etc.."
                  style={{
                    fontSize: 14,
                    lineHeight: '22px',
                    fontWeight: 500,
                  }}
                />
              </Flex>
            </Radio.Group>
          )}
        />
        {isPublished && (
          <Flex
            style={{
              border: '1px solid #E1E1E1',
              borderRadius: 8,
              padding: 16,
            }}
            direction="column"
            gap={16}
          >
            <Text
              variant="support-1"
              c="#000"
              bg="#EDFAFF"
              p={10}
              style={{ borderRadius: 6, lineHeight: '20px' }}
            >
              A domain cannot point to two places at once. If you configure your
              domain to point to roo to shorten links, the domain will no longer
              be connected to it's current website. Any existing content will be
              inaccessible.
            </Text>
            <Text
              variant="support-1"
              c="#6F6F6F"
              style={{ lineHeight: '22px' }}
              ta="justify"
            >
              If you want to connect this domain and not lose your site, you'll
              need to use a subdomain other than 'www'. For example, if you have
              a site published to www.yourbrand.com, use a custom subdomain
              like: go.yourbrand.com for roo. If you enter a subdomain below, we
              will provide instructions to configure it in the next step.
            </Text>
            <Flex gap={4} align="flex-end">
              <Controller
                name="subdomain"
                control={control}
                rules={{ required: 'Sub-domain is required' }}
                render={({ field, fieldState }) => (
                  <TextInputCustom
                    label="Sub-domain"
                    placeholder="Enter sub-domain"
                    {...field}
                    error={fieldState.error?.message}
                    variant="default"
                    miw={320}
                  />
                )}
              />
              <Text
                style={{
                  fontSize: 16,
                  lineHeight: '22px',
                  fontWeight: 400,
                }}
              >
                .designbabu.biz
              </Text>
            </Flex>
          </Flex>
        )}

        <Button
          variant="filled"
          w="fit-content"
          style={{ alignSelf: 'flex-end' }}
          type="submit"
          loading={isSubmitting}
        >
          Next
        </Button>
      </Flex>
    </form>
  )
}

export default Step1