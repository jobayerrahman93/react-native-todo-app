import React from 'react'
import { Image, Pressable, StyleSheet, View } from 'react-native'
import Text from '../components/text/text'
import { colors } from '../theme/colors'
import { spacing } from '../theme/spacing'


export default function Home({navigation,user}) {

  // const user = route.params.user;
  console.log(user.uid)
  return (
    <>
        {/* <SafeAreaView> */}
          <View style={styles.container}>
         <View style={{flex:1}} >
         <View style={styles.topUserBar}>
              <View>
                <Text preset='h4'>HI, Jobayer</Text>
              </View>

              <View style={styles.boxImg}>
                <Image style={styles.userImg} source={require('../../assets/image/user.png')}/>
              </View>
            </View>
         </View>


            {/* list of task start */}

          <View style={styles.manageTask}>
          

            <Image style={styles.todoImg} source={require('../../assets/image/todo.png')}/>
          </View>

          <View style={styles.createTodoWrapper}>

          <Pressable onPress={()=>navigation.navigate('create')}  style={styles.createTodoBtn} >
                  <Text style={{fontWeight:'bold'}}>Create Task</Text>
            </Pressable>
          </View>

          </View>
        {/* </SafeAreaView> */}
    </>
  )
}



const styles = StyleSheet.create({
  container: {
    paddingHorizontal:spacing[5],
    marginTop:spacing[6],
    flex:1,
    flexDirection:'column'
   },
  topUserBar:{
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  userImg:{
    height:30,
    width:30,
    margin:10,
    resizeMode:'cover'
  },
  boxImg:{
    height:50,
    width:50,
    borderRadius:50,
    backgroundColor:colors.yellow,
    justifyContent:'center',
    alignItems:'center',
  },
  manageTask:{
    flex:3,
  
  },
  todoImg:{
    resizeMode:'contain',
    flex:1,
     height: undefined, 
     width: undefined,
     marginTop:spacing[13]
  },
  createTodoWrapper:{
    flex:2,
    justifyContent:'center',
    alignItems:'center'
  },
  createTodoBtn:{
    backgroundColor:colors.yellow,
    color:colors.black,
    borderRadius:6,
    textAlign:'center',
    alignItems:'center',
    paddingVertical:spacing[2],
    marginTop:spacing[10],
    width:150
  }
})