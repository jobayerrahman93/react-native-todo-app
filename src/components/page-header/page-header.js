import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import Text from '../text/text';

export default function PageHeader({backBtn, title="Todo App"}) {
    const navigation = useNavigation();
  return (
    <View style={styles.container}>
        {
            backBtn && <Pressable onPress={()=>{
                navigation.goBack();
            }}>
            <AntDesign style={{marginRight:10}} name="arrowleft" size={24} color="white" />
                
            </Pressable>
        }
      <Text preset='h2' style={{textTransform:'uppercase'}}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        padding: spacing[4],
        borderBottomWidth: 0.3,
        borderBottomColor: colors.white,
        flexDirection:'row',
        alignItems:'center'
    
    }
})