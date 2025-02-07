import { Box } from '@mantine/core';
import { createStyles } from '@mantine/emotion';
import React from 'react';
// import { createStyles } from '@mantine/core';

const useStyles = createStyles(() => ({
  stepContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  step: {
    display: 'flex',
    alignItems: 'center',
  },
  number: {
    width: '24px',
    height: '24px',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    lineHeight: '16px',
    color: 'white',
    fontWeight: 500,
    backgroundColor: '#3EE096', // Màu xanh lá cây cho bước active
  },
  numberInactive: {
    backgroundColor: '#ccc', // Màu xám nhạt cho bước inactive
  },
  label: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#3EE096', // Màu chữ xanh lá cây cho bước active
  },
  labelInactive: {
    color: '#9e9e9e', // Màu chữ xám nhạt cho bước inactive
  },
  separator: {
    width: '25px',
    height: '1px',
    backgroundColor: '#ccc',
  },
}));

interface StepProps {
  stepNumber: number;
  label: string;
  isActive: boolean;
}

const Step = ({ stepNumber, label, isActive }: StepProps) => {
  const { classes, cx } = useStyles();

  return (
    <Box className={classes.stepContainer}>
      <Box
        className={cx(classes.number, {
          [classes.numberInactive]: !isActive,
        })}
      >
        {stepNumber}
      </Box>
      <span
        className={cx(classes.label, {
          [classes.labelInactive]: !isActive,
        })}
      >
        {label}
      </span>
    </Box>
  );
};

interface StepperProps {
  steps: { label: string }[];
  activeStep: number;
}

export const CustomStep = ({ steps, activeStep }: StepperProps) => {
  const { classes } = useStyles();

  return (
    <Box style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <Step
            stepNumber={index + 1}
            label={step.label}
            isActive={index <= activeStep}
          />
          {index < steps.length - 1 && <div className={classes.separator} />}
        </React.Fragment>
      ))}
    </Box>
  );
};
