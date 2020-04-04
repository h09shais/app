import React, { memo, useRef, FC, useEffect } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import { colors } from '@shared/variables/colors';
import { Animations } from '@utils/animations';

const styles = StyleSheet.create({
  container: {
    width: 27,
    height: 27,
    borderRadius: 27,
    position: 'absolute',
    // top: 40,
    // left: 40,
  },
  blue: {
    backgroundColor: colors.blue200,
  },
  red: {
    backgroundColor: colors.red200,
  },
});

interface SquareProps {
  x: number;
  y: number;
  type: 'blue' | 'red';
}

export const Square: FC<SquareProps> = memo(({ x, y, type }) => {
  const initialPosition = useRef({ top: y, left: x });
  const translateX = useRef(new Animated.Value(0));
  const translateY = useRef(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(translateX.current, {
      useNativeDriver: true,
      toValue: x + initialPosition.current.left,
      easing: Animations.Easing.standard,
    }).start();
    Animated.timing(translateY.current, {
      useNativeDriver: true,
      toValue: y + initialPosition.current.top,
      easing: Animations.Easing.standard,
    }).start();
  }, [x, y]);

  return (
    <Animated.View
      style={[
        styles.container,
        initialPosition,
        type === 'blue' ? styles.blue : styles.red,
        {
          transform: [
            { translateY: translateY.current },
            { translateX: translateX.current },
          ],
        },
      ]}
    />
  );
});
