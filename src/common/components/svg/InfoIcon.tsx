import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
import { Colors } from '../../colors';

export const InfoIcon = ({ color = Colors.Black, ...rest }: SvgProps) => (
  <Svg
    // @ts-ignore
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...rest}
  >
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12 22c5.5 0 10-4.5 10-10S17.5 2 12 2 2 6.5 2 12s4.5 10 10 10ZM12 8v5"
    />
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11.995 16h.009"
    />
  </Svg>
);
