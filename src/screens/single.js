import React from 'react';
import { StyleSheet, View } from 'react-native';
import PageHeader from '../components/page-header/page-header';
import Text from '../components/text/text';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';

export default function Single({route}) {

    const {item}= route.params;


  return (
    <View>

<PageHeader backBtn={true}  title=' Single Task'/>

        <View style={styles.container}>

        <View style={styles.inputWrapper}>

        <Text preset='h3'>{item.title}</Text>
        <Text style={styles.description} preset='small'>{item.description}</Text>

        </View>


        </View>

       
    </View>
  )
}





const styles = StyleSheet.create({
    container: {
        paddingHorizontal:spacing[5],
        marginTop:spacing[6],
    
       
       },

      inputWrapper:{
        padding:spacing[6],
        backgroundColor:colors.darkBlue,
        borderRadius:8,
        marginTop:spacing[14],
      },
      description:{
        lineHeight:22,
        color:colors.gray
      }
  
})