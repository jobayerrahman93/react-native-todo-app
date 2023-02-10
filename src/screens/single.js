import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { deleteDoc, doc } from 'firebase/firestore';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import PageHeader from '../components/page-header/page-header';
import Text from '../components/text/text';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { db } from '../utils/config';

export default function Single({route,navigation}) {

    const {item}= route.params;

    console.log(item.id)

    const handleDelete=async(id)=>{

        try {
          await deleteDoc(doc(db, "task", id));
          showMessage({
            message: "Successfully task created",
            type: "success",
          });

          navigation.navigate('home');
          
        } catch (err) {
    
          showMessage({
           message: `${err.message}`,
           type: "info",
         });
          
        }
      }

  return (
    <>

<PageHeader backBtn={true}  title='Single Task'/>

       <ScrollView>
       <View style={styles.container}>

<View style={styles.inputWrapper}>

<View
style={
styles.box

}>
<View style={{flex:8}}>
    <Text color={{color:colors.white,}} preset="h3" >{item.title}</Text>
</View>
<View style={{flex:2}}>
    <View style={styles.iconBox}>
  <View>
  <FontAwesome onPress={()=>navigation.navigate('edit',{item})} style={{marginBottom:9}} name="edit" size={20} color="white" />
  </View>

      <View>
      <MaterialIcons onPress={()=>handleDelete(item.id)}  name="delete" size={20} color="white" />
      </View>
    </View>
</View>

</View>
<Text style={styles.description} preset='small'>{item.description}</Text>



</View>
</View>
       </ScrollView>

       
    </>
  )
}


const styles = StyleSheet.create({
    container: {
        paddingHorizontal:spacing[5],
   
       },
       box: {
         flexDirection: 'row',
         alignItems:'center'
     
      },
      iconBox:{
        flexDirection:'row',
        justifyContent:'space-between',
        minHeight:'10%'
      },

      inputWrapper:{
        padding:spacing[6],
        backgroundColor:colors.darkBlue,
        borderRadius:8,
        marginTop:spacing[14],
        width:'100%',
        minHeight:'50%'
     
    
      },
      description:{
        lineHeight:22,
        color:colors.gray,
        marginTop:spacing[4]
      },
   
  
})


