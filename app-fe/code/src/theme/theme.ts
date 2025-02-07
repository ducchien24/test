import { createTheme, MantineTheme } from '@mantine/core';

export const theme = createTheme({
  colors: {
    primary: [
      '#E3F5FF',
      '#BCE7FF',
      '#95D9FF',
      '#6ECBFF',
      '#47BDFF',
      '#20AFFF',
      '#08AEEA',
      '#058BC1',
      '#036B94',
      '#024567',
    ],
  },
  primaryColor: 'primary',
  components: {
    Button: {
      defaultProps: {
        variant: 'gradient',
        gradient: { from: '#08aeea', to: '#58cb96', deg: 85.84 },
      },
      styles: (theme: MantineTheme, params: { variant: string }) => ({
        root: {
          borderRadius: theme.radius.md,
          height: '45px',
          // ...(params.variant === 'outline' && {
          //   border: '1px solid transparent',
          //   backgroundImage:
          //     'linear-gradient(white, white), linear-gradient(85.84deg, #08aeea -11.49%, #58cb96 108.4%)',
          //   backgroundOrigin: 'border-box',
          //   backgroundClip: 'padding-box, border-box',
          // }),
          ...(params.variant === 'secondary' && {
            backgroundColor: theme.colors.primary[0],
            background: 'rgba(255, 255, 255, 1)',
            border: '1px solid rgba(189, 189, 189, 1)',
            color: 'rgba(86, 86, 86, 1)',
          }),
          ...(params.variant === 'outline-2' && {
            border: '1px solid transparent',
            backgroundImage:
              'linear-gradient(white, white), linear-gradient(85.84deg, #08aeea -11.49%, #58cb96 108.4%)',
            backgroundOrigin: 'border-box',
            backgroundClip: 'padding-box, border-box',
          }),
        },
        label: {
          fontSize: '16px',
          fontWeight: 700,
          lineHeight: '21.17px',
          letterSpacing: '0.01em',
          ...(params.variant === 'outline-2' && {
            backgroundImage:
              'linear-gradient(85.84deg, #08aeea -11.49%, #58cb96 108.4%)',
            color: 'transparent',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }),
        },
      }),
    },
    Text: {
      styles: (_theme: any, params: { variant: string }) => ({
        root: {
          ...(params.variant === 'body-1' && {
            fontSize: '36px',
            fontWeight: 700,
            lineHeight: '44px',
          }),
          ...(params.variant === 'body-2' && {
            fontSize: '24px',
            fontWeight: 700,
            lineHeight: '24px',
          }),
          ...(params.variant === 'body-3' && {
            fontSize: '20px',
            fontWeight: 700,
            lineHeight: '22px',
          }),
          ...(params.variant === 'body-4' && {
            fontSize: '16px',
            fontWeight: 500,
            lineHeight: '22px',
          }),
          ...(params.variant === 'body-5' && {
            fontSize: '14px',
            fontWeight: 500,
            lineHeight: '20px',
          }),
          ...(params.variant === 'subtitle-1' && {
            fontSize: '16px',
            fontWeight: 700,
            lineHeight: '24px',
          }),
          ...(params.variant === 'subtitle-2' && {
            fontSize: '14px',
            fontWeight: 700,
            lineHeight: '18px',
          }),
          ...(params.variant === 'support-1' && {
            fontSize: '14px',
            fontWeight: 400,
            lineHeight: '24px',
            color: `rgba(111, 111, 111, 1)`,
          }),
          ...(params.variant === 'header-3' && {
            fontSize: '16px',
            fontWeight: 600,
            lineHeight: '22px',
            color: `#000`,
          }),
          ...(params.variant === 'header-2' && {
            fontSize: '18px',
            fontWeight: 600,
            lineHeight: '24px',
            color: `#000`,
          }),
          ...(params.variant === 'header-4' && {
            fontSize: '14px',
            fontWeight: 600,
            lineHeight: '20px',
          }),
        },
      }),
    },
    TextInput: {
      styles: (_theme: MantineTheme) => ({
        input: {
          height: '44px',
        },
        label: {
          marginBottom: '6px',
          fontSize: '14px',
        },
      }),
    },
    PinInput: {
      styles: (_theme: MantineTheme) => ({
        root: {
          display: 'flex',
          justifyContent: 'space-between',
          height: '44px',
          width: '100%',
        },
        input: {
          borderRadius: '10px',
          border: `1px solid rgba(210, 210, 210, 1)`,
          fontSize: '24px',
          lineHeight: '24px',
          textAlign: 'center',
          fontWeight: 500,
          height: '44px',
          width: '44px',
        },
        pinInput: {
          height: '44px',
          width: '44px',
        },
      }),
    },
    PasswordInput: {
      styles: (_theme: MantineTheme) => ({
        input: {
          height: '44px',
        },
      }),
    },
    Menu: {
      styles: {
        item: {
          '&:hover': {
            backgroundColor: 'red',
            color: 'white',
            '& svg': {
              color: 'white',
            },
          },
        },
      },
    },
  },
  fontFamily: 'Red Hat Display',
});
