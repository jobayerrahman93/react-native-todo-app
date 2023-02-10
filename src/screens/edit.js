import { doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import PageHeader from '../components/page-header/page-header';
import Text from '../components/text/text';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { db } from '../utils/config';
import { LoadingBtn } from '../utils/loadingBtn';

const Edit = ({route,navigation}) => {

    const {item}= route.params

    // console.log({user})

    const [title,setTitle]= useState(item.title);
    const [description,setDescription]= useState(item.description);
    const [isLoading,setIsLoading] = useState(false);
    const [itemId,setItemId]= useState(item.id);

    const handleSubmit =async()=>{
      console.log('press')

      setIsLoading(true);
      
      try {


        const taskRef = doc(db, "task", itemId);


            await updateDoc(taskRef, {
                title,
                description,
                updated_at: serverTimestamp()
            });

          showMessage({
            message: "Successfully task updated",
            type: "success",
          });


          setTitle('');
          setDescription('');

          navigation.navigate('home');

          setIsLoading(false)
        
    } catch (err) {

        console.log(err);
        setIsLoading(false);
        showMessage({
         message: `${err.message}`,
         type: "info",
       });
    //    setTitle('');
    //     setDescription('');
        
    }

    }

    return (
        <>
          <PageHeader backBtn={true}  title=' Edit Task'/>
         
       <ScrollView>
       <View style={styles.container}>
        <View style={styles.inputWrapper}>
            
            <View >

             <TextInput value={title} onChangeText={(text)=>setTitle(text)} placeholderTextColor={colors.gray} style={styles.input} placeholder='Enter title'/>

             <TextInput value={description} onChangeText={(text)=>setDescription(text)} placeholderTextColor={colors.gray} multiline={true} style={styles.input} placeholder='Enter Description'/>
            </View>

            <View style={{alignItems:'center'}}>


            {  !isLoading ? <Pressable onPress={handleSubmit} style={styles.submitBtn} >
                  <Text style={{fontWeight:'bold'}}>Update</Text>
            </Pressable>
            :
            <LoadingBtn btnColor={colors.blue} title='Update'/>
            }

            </View>

            </View>
            
        </View>
       </ScrollView>


            </>
    );
};

export default Edit;


const styles = StyleSheet.create({
    container: {
        paddingHorizontal:spacing[5],
        marginTop:spacing[6],
        flex:1,
    
       
       },
    input:{
        color:colors.white,
        borderBottomWidth:1,
        borderBottomColor:colors.yellow,
        paddingVertical:7,
        marginBottom:spacing[7]
       
      },
      submitBtn:{
        backgroundColor:colors.yellow,
        color:colors.black,
        borderRadius:6,
        textAlign:'center',
        alignItems:'center',
        paddingVertical:spacing[2],
        marginTop:spacing[10],
        width:120,
      },
      inputWrapper:{
      
        padding:spacing[6],
        backgroundColor:colors.darkBlue,
        borderRadius:12,
        marginTop:spacing[14],
      },
  
})