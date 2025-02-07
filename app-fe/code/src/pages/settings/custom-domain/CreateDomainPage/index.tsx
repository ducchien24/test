// import { CustomStepper } from '@/common/CustomStep';
import { CustomStep } from '@/common/CustomStep';
import { ActionIcon, Flex, Text } from '@mantine/core';
import { useState } from 'react';
import { DomainCreate } from '../type';
import { StepOne } from './StepOne';
import { StepTwo } from './StepTwo';
import { DomainVerificationInProgress } from './DomainVerificationInProgress';
import { IconChevronLeft } from '@tabler/icons-react';
interface CreateDomainPageProps {
  fetchListDomain: () => void;
}
export const CreateDomainPage = ({
  fetchListDomain,
}: CreateDomainPageProps) => {
  const [step, setStep] = useState(0);
  const [domainDetail, setDomainDetail] = useState<DomainCreate>();
  const [isDomainVerificationInProgress, setIsDomainVerificationInProgress] =
    useState<boolean>(false);
  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <Flex
      direction="column"
      w="100%"
      gap={10}
      bg={{ base: '#fff', lg: 'transparent' }}
      p={{ base: 16, lg: 0 }}
    >
      <Flex align="center" gap={4}>
        <ActionIcon variant="transparent" c="#6F6F6F">
          <IconChevronLeft size={20} onClick={fetchListDomain} />
        </ActionIcon>
        <Text
          style={{
            fontSize: 12,
            lineHeight: '16px',
            fontWeight: 400,
          }}
          c="#6F6F6F"
        >
          Custom Domain
        </Text>
      </Flex>
      {!isDomainVerificationInProgress ? (
        <Flex direction="column" w="100%" gap={24}>
          <Text variant="body-2" style={{ fontSize: 18 }}>
            Custom Domains
          </Text>
          <CustomStep
            activeStep={step} // Bước hiện tại
            steps={[{ label: 'Enter Domain' }, { label: 'Configure DNS' }]}
          />
          {step === 0 && (
            <StepOne nextStep={nextStep} setDomainDetail={setDomainDetail} />
          )}
          {step === 1 && (
            <StepTwo
              domainDetail={domainDetail}
              prevStep={prevStep}
              onGoToVerifyDomain={() => {
                setIsDomainVerificationInProgress(true);
              }}
            />
          )}
        </Flex>
      ) : (
        <DomainVerificationInProgress onViewYourDomain={fetchListDomain} />
      )}
    </Flex>
  );
};
