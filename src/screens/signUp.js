import Checkbox from 'expo-checkbox';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { SafeAreaView } from 'react-native-safe-area-context';
import Text from '../components/text/text';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { auth, db } from '../utils/config';
import { LoadingBtn } from '../utils/loadingBtn';



const SignUp = ({navigation}) => {

  const [isChecked, setChecked] = useState(false);
  const [isLoading,setIsLoading]=useState(false);

  const [authValue,setAuthValue] = useState({
    name:'',
    email:'',
    password:'',
    confirmPassword:''
  })


  const handleSubmit= async()=>{

    setIsLoading(true);
    try {

   const res = await createUserWithEmailAndPassword(auth, authValue.email,authValue.password);
   console.log(res);

   if(res.user.uid){

    showMessage({
      message: "Successfully user created",
      type: "success",
    });

    const docRef = await addDoc(collection(db, "users"), {
      name: authValue.name,
      email: authValue.email,
      password: authValue.password
    });
    

    setIsLoading(false);
   }
      
    } catch (err) {
      
      showMessage({
        message: `${err.message}`,
        type: "info",
      });

    setIsLoading(false);

    }

  
  }

    return (
        <SafeAreaView>
        <View style={styles.container}>
        <View >
                <Text style={styles.createAccount} preset='h1'>Create an</Text>
                <Text style={styles.createAccount} preset='h1'>Account</Text>
               
        </View>

            {/* input wrapper */}

        <View style={styles.inputWrapper}>

        <TextInput onChangeText={(text)=>setAuthValue({...authValue,name:text})} placeholderTextColor={colors.gray} style={styles.input} placeholder='Name'/>

        <TextInput onChangeText={(text)=>setAuthValue({...authValue,email:text})} placeholderTextColor={colors.gray} style={styles.input} placeholder='Enter Email'/>

        <TextInput onChangeText={(text)=>setAuthValue({...authValue,password:text})} secureTextEntry={isChecked ? false :true} placeholderTextColor={colors.gray} style={styles.input} placeholder='Password'/>

        <TextInput onChangeText={(text)=>setAuthValue({...authValue,confirmPassword:text})} secureTextEntry={isChecked ? false :true} placeholderTextColor={colors.gray} style={styles.input} placeholder='Confirm password'/>

        <View style={styles.checkboxContainer}>
    
        <Checkbox
          style={styles.checkbox}
          value={isChecked}
          onValueChange={setChecked}
          color={isChecked ? colors.yellow : undefined}

        />
        <Text preset='small' style={styles.label}>Show Password</Text>
      </View>
      
      
      {!isLoading ?   <Pressable onPress={handleSubmit} style={styles.submitBtn} >
              <Text style={{fontWeight:'bold'}}>SIGN UP</Text>
        </Pressable>:<LoadingBtn title='SIGN UP'/>
   

}

     <Pressable onPress={()=>navigation.navigate('signIn')}  style={styles.isSignUp}>
            <Text preset='small'  style={styles.dontHaveAccount}>Already have an account ?</Text>
            <Text style={styles.signUpLink} preset='bold' >SIGN IN</Text>
        </Pressable>
      
        </View>
        </View>
    </SafeAreaView>
    );
};

export default SignUp;

const styles= StyleSheet.create({
    container: {
       paddingHorizontal:spacing[5],
       marginTop:spacing[6]
      },
      createAccount:{
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
      input:{
        color:colors.white,
        borderBottomWidth:1,
        borderBottomColor:colors.gray,
        paddingVertical:3,
        marginBottom:20
      },
    
      submitBtn:{
        backgroundColor:colors.yellow,
        color:colors.black,
        borderRadius:6,
        textAlign:'center',
        alignItems:'center',
        paddingVertical:spacing[2],
        marginTop:spacing[6],
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
        marginBottom: 20,
      },
      checkbox: {
        alignSelf: 'center',
      },
      label: {
        margin: 4,
        color:colors.gray
      },


})