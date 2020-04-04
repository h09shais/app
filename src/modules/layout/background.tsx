import React, { memo, useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { colors } from '@shared/variables/colors';
import { Square } from './shapes/square';
import { Text } from '@shared/text';

const styles = StyleSheet.create({
  container: {
    opacity: 0.3,
    // backgroundColor: colors.blue200,
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // right: 0,
    // bottom: 0,
  },
});

export const Background = memo(() => {
  const [values, setValues] = useState({
    x: Dimensions.get('screen').width / 2,
    y: 0,
  });
  console.log(Dimensions.get('screen').width / 2);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setValues({ x: 200, y: 200 });
  //   }, 1500);
  // }, []);

  return (
    <View style={styles.container}>
      <Square x={values.x} y={values.y} type="red" />
    </View>
  );
});
