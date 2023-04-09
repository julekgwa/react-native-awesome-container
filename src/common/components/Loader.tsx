// import { Colors } from '../colors';
import { Colors } from '../colors';
import { SPINNERS } from '../constants';
import React from 'react';
import type { ViewStyle } from 'react-native';
import { StyleSheet, View } from 'react-native';
import {
  CircleFade,
  Plane,
  Chase,
  Bounce,
  Wave,
  Pulse,
  Flow,
  Swing,
  Circle,
  Grid,
  Fold,
  Wander,
} from 'react-native-animated-spinkit';
import { scale } from 'react-native-size-matters';

interface Props {
  style?: ViewStyle;
  color?: string;
  spinner?: string;
}

const getLoader = (type: string) => {
  switch (true) {
    case type === SPINNERS.Plane:
      return Plane;
    case type === SPINNERS.Chase:
      return Chase;
    case type === SPINNERS.Bounce:
      return Bounce;
    case type === SPINNERS.Wave:
      return Wave;
    case type === SPINNERS.Pulse:
      return Pulse;
    case type === SPINNERS.Flow:
      return Flow;
    case type === SPINNERS.Swing:
      return Swing;
    case type === SPINNERS.Circle:
      return Circle;
    case type === SPINNERS.Grid:
      return Grid;
    case type === SPINNERS.Fold:
      return Fold;
    case type === SPINNERS.Wander:
      return Wander;
    default:
      return CircleFade;
  }
};

export const Loader = (props: Props) => {
  const Spinner = getLoader(props.spinner || SPINNERS.CircleFade);
  return (
    <View style={[styles.main, props.style]}>
      <Spinner size={scale(50)} color={props.color || Colors.Black} />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Colors.Transparent,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
