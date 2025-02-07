import { SwitchProps } from '@mantine/core';
import { createStyles } from '@mantine/emotion';
import React from 'react';

// Tạo style tùy chỉnh
const useStyles = createStyles((_theme) => ({
  root: {
    border: '1px solid #E1E1E1',
    borderRadius: '4px',
    padding: '4px',
    width: 'fit-content',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 4,
    // width: '0px',
  },
  input: {
    display: 'none',
  },
  track: {
    backgroundColor: 'transparent',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    border: 'none',
  },
  thumb: {
    display: 'none', // Ẩn thumb gốc
  },
  label: {
    flexGrow: 1,
    textAlign: 'center',
    padding: '5px 10px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    lineHeight: '17px',
    transition: 'all 0.3s ease', // Hiệu ứng chuyển đổi mượt mà
  },

  labelActive: {
    backgroundColor: '#41BBE8',
    color: 'white',
  },
  labelInactive: {
    color: 'black',
  },
}));

interface CustomSwitchProps extends Omit<SwitchProps, 'onChange'> {
  labelOn: string;
  labelOff: string;
  onChange?: (checked: boolean) => void;
}

const CustomSwitch: React.FC<CustomSwitchProps> = ({
  labelOn,
  labelOff,
  checked,
  onChange,
}) => {
  const { classes, cx } = useStyles();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.currentTarget.checked);
    }
  };

  return (
    <div className={classes.root}>
      <span
        role="button"
        tabIndex={0}
        className={cx(
          classes.label,
          checked ? classes.labelActive : classes.labelInactive
        )}
        onClick={() =>
          handleChange({
            currentTarget: { checked: true },
          } as React.ChangeEvent<HTMLInputElement>)
        }
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleChange({
              currentTarget: { checked: true },
            } as React.ChangeEvent<HTMLInputElement>);
          }
        }}
      >
        {labelOn}
      </span>

      <span
        role="button"
        tabIndex={0}
        className={cx(
          classes.label,
          !checked ? classes.labelActive : classes.labelInactive
        )}
        onClick={() =>
          handleChange({
            currentTarget: { checked: false },
          } as React.ChangeEvent<HTMLInputElement>)
        }
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleChange({
              currentTarget: { checked: false },
            } as React.ChangeEvent<HTMLInputElement>);
          }
        }}
      >
        {labelOff}
      </span>
    </div>
  );
};

export default CustomSwitch;
