import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import React, { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import PageHeader from '../components/page-header/page-header';
import Text from '../components/text/text';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { db } from '../utils/config';
import { LoadingBtn } from '../utils/loadingBtn';

const Create = () => {

    const [title,setTitle]= useState('');
    const [description,setDescription]= useState('');
    const [isLoading,setIsLoading] = useState(false);

    const handleSubmit =async()=>{

    setIsLoading(true);
    
    try {

        const docRef = await addDoc(collection(db, "task"), {
            title,
            description,
            timestamp: serverTimestamp()
          });
          console.log("Document written with ID: ", docRef.id);

          showMessage({
            message: "Successfully task created",
            type: "success",
          });

          setTitle('');
          setDescription('');

          setIsLoading(false)
        
    } catch (err) {

        console.log(err);
        setIsLoading(false);
        showMessage({
         message: `${err.message}`,
         type: "info",
       });
       setTitle('');
          setDescription('');
        
    }

          

       

    }

    return (
        // <SafeAreaView>
        <>
          <PageHeader backBtn={true}  title=' Create Task'/>
         
        <View style={styles.container}>
        <View style={styles.inputWrapper}>
            
            <View >

             <TextInput value={title} onChangeText={(text)=>setTitle(text)} placeholderTextColor={colors.gray} style={styles.input} placeholder='Enter title'/>

             <TextInput value={description} onChangeText={(text)=>setDescription(text)} placeholderTextColor={colors.gray} multiline={true} style={styles.input} placeholder='Enter Description'/>
            </View>

            <View style={{alignItems:'center'}}>


            {  !isLoading ? <Pressable onPress={handleSubmit} style={styles.submitBtn} >
                  <Text style={{fontWeight:'bold'}}>Create</Text>
            </Pressable>
            :
            <LoadingBtn btnColor={colors.blue} title='Create'/>
            }

            </View>

            </View>
            {/* <View style={{flex:1}}>

            </View> */}
        </View>

        
        {/* </SafeAreaView> */}
            </>
    );
};

export default Create;


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