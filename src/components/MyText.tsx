import {MY_COLORS} from '@constants';
import { adjust } from '@utils';
import React, {FC} from 'react';
import {Text, TextProps, TextStyle} from 'react-native';

interface MyTextProps extends TextProps {
  h1?: boolean;
  h2?: boolean;
  h3?: boolean;
  h4?: boolean;
  p?: boolean;
  cp?: boolean;
  fp?: boolean;
  bold?: boolean;
  italic?: boolean;
  fontFamily?: 'JosefinSans' | 'Inter';
  fontType?: 'primary' | 'secondary';
  style?: TextStyle;
  color?: string;
  children: React.ReactNode;
}

const MyText: FC<MyTextProps> = ({
  h1,
  h2,
  h3,
  h4,
  p,
  cp,
  fp,
  bold,
  italic,
  fontFamily = 'JosefinSans',
  fontType,
  children,
  color = MY_COLORS.TXT_PRIMARY,
  style,
  ...rest
}) => {
  return (
    <Text
      style={[
        h1 && {fontSize: adjust(24)},
        h2 && {fontSize: adjust(20)},
        h3 && {fontSize: adjust(18)},
        h4 && {fontSize: adjust(16)},
        p && {fontSize: adjust(14)},
        cp && {fontSize: adjust(12)},
        fp && {fontSize: adjust(10)},
        bold && {fontWeight: 'bold'},
        italic && {fontStyle: 'italic'},
        {color},
        {fontFamily},
        style,
      ]}
      {...rest}>
      {children}
    </Text>
  );
};

export default MyText;