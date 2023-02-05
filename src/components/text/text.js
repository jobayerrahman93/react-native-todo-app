import React from 'react';
import { StyleSheet, Text as RNText } from 'react-native';
import { presets } from './text.preset';

export default function Text({children, preset='default',style,onPress}) {

  const textStyles = StyleSheet.compose(presets[preset],style);
  return (
    
      <RNText onPress={onPress} style={textStyles}>{children}</RNText>
    
  )
}