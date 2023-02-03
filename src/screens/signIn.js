import Checkbox from 'expo-checkbox';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { SafeAreaView } from 'react-native-safe-area-context';
import Text from '../components/text/text';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { auth } from '../utils/config';
import { LoadingBtn } from '../utils/loadingBtn';

const SignIn = ({navigation}) => {

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [isLoading,setIsLoading]= useState(false);
  const [isChecked, setChecked] = useState(false);


  const handleSubmit=async()=>{
    setIsLoading(true);
    try {

     const res = await signInWithEmailAndPassword(auth,email,password);

     setIsLoading(false)
     
    showMessage({
      message: "Successfully Logged in",
      type: "success",
    });
      
    } catch (err) {
     
     setIsLoading(false);
     showMessage({
      message: `${err.message}`,
      type: "info",
    });

    }
    
  }


    return (
        <SafeAreaView>
            <View style={styles.container}>
            <View >
                    <Text style={styles.welcome} preset='h1'>Welcome</Text>
                    <Text style={styles.welcome} preset='h1'>Back</Text>
                    <Text preset='default'  style={{color:colors.gray,marginTop:20}}>Sign in to continue</Text>
            </View>

                {/* input wrapper */}

            <View style={styles.inputWrapper}>

            <TextInput onChangeText={(text)=>setEmail(text)} placeholderTextColor={colors.gray} style={styles.input1} placeholder='Enter Your Email'/>

            <TextInput onChangeText={(text)=>setPassword(text)} secureTextEntry={isChecked ? false :true}  placeholderTextColor={colors.gray} style={styles.input2} placeholder='Enter password'/>

        <View style={styles.checkboxContainer}>
    
        <Checkbox
          style={styles.checkbox}
          value={isChecked}
          onValueChange={setChecked}
          color={isChecked ? colors.yellow : undefined}

        />
        <Text preset='small' style={styles.label}>Show Password</Text>
      </View>


        {  !isLoading ? <Pressable onPress={handleSubmit} style={styles.submitBtn} >
                  <Text style={{fontWeight:'bold'}}>SIGN IN</Text>
            </Pressable>
            :
            <LoadingBtn title='SIGN IN'/>
            }


            <Pressable onPress={()=>navigation.navigate('signUp')}  style={styles.isSignUp}>
                <Text preset='small'  style={styles.dontHaveAccount}>Don't have an account ?</Text>
                <Text style={styles.signUpLink} preset='bold' >SIGN UP</Text>
            </Pressable>

            </View>

            </View>
        </SafeAreaView>
    );
};

export default SignIn;


const styles= StyleSheet.create({
    container: {
       paddingHorizontal:spacing[5],
       marginTop:spacing[6]
      },
      welcome:{
        fontWeight:'900',
        color:colors.yellow,
        letterSpacing: 4
      },
      inputWrapper:{
        padding:spacing[4],
        boxSizing:'border-box',
        backgroundColor:colors.darkBlue,
        borderRadius:12,
        marginTop:spacing[14],
      },
      input1:{
        color:colors.white,
        borderBottomWidth:1,
        borderBottomColor:colors.gray,
        paddingVertical:3,
        marginBottom:20
      },
      input2:{
        color:colors.white,
        borderBottomWidth:1,
        borderBottomColor:colors.gray,
        paddingVertical:3,
       
      },
      submitBtn:{
        backgroundColor:colors.yellow,
        color:colors.black,
        borderRadius:6,
        textAlign:'center',
        alignItems:'center',
        paddingVertical:spacing[2],
        marginTop:spacing[10],
      },
      isSignUp:{
        flexDirection:'row',
        marginTop:spacing[5],
        alignItems:'center'
      },
      dontHaveAccount:{
        color:colors.gray,
        marginRight:spacing[2]
      },
      signUpLink:{
        fontWeight:'bold',
        color:colors.gray,
        fontSize:13,
        borderBottomColor: colors.gray,
        borderBottomWidth:1,
        fontSize:10
      },
      checkboxContainer: {
        flexDirection: 'row',
        marginTop: 20,
      },
      checkbox: {
        alignSelf: 'center',
      },
      label: {
        margin: 4,
        color:colors.gray
      },


})