import {
  __BaseInputProps,
  __InputStylesNames,
  BoxProps,
  ElementProps,
  factory,
  Factory,
  InputBase,
  StylesApiProps,
  useProps,
} from '@mantine/core';
import classes from './TextInputCustom.module.css';

export interface TextInputProps
  extends BoxProps,
    __BaseInputProps,
    StylesApiProps<TextInputFactory>,
    ElementProps<'input', 'size'> {}

export type TextInputFactory = Factory<{
  props: TextInputProps;
  ref: HTMLInputElement;
  stylesNames: __InputStylesNames;
}>;

const defaultProps: Partial<TextInputProps> = {};

export const TextInputCustom = factory<TextInputFactory>((props, ref) => {
  const _props = useProps('TextInput', defaultProps, props);

  return (
    <InputBase
      component="input"
      ref={ref}
      {..._props}
      __staticSelector="TextInput"
      classNames={classes}
    />
  );
});

TextInputCustom.classes = InputBase.classes;
TextInputCustom.displayName = '@mantine/core/TextInput';
