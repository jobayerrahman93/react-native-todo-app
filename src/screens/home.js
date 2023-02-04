import { FontAwesome, MaterialIcons } from '@expo/vector-icons'
import { collection, onSnapshot, query, where } from "firebase/firestore"
import React, { useEffect, useState } from 'react'
import { FlatList, Image, Pressable, StyleSheet, TouchableOpacity, View } from 'react-native'
import Text from '../components/text/text'
import { colors } from '../theme/colors'
import { spacing } from '../theme/spacing'
import { db } from '../utils/config'

export default function Home({navigation,user}) {

  const [task,setTask]= useState([]);

  useEffect(()=>{
    const q = query(collection(db, "task"), where("uid", "==", user.uid));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {

        console.log(doc,'docs')
          list.push({...doc.data(),id:doc.id});
      });
      // console.log(list)
      setTask(list)
  
    });
    return unsubscribe;
  },[])


  console.log(user.uid);
  console.log(task)

  const renderItem=({item})=>{

    return(

      <TouchableOpacity style={styles.taskList}>
        
        <View style={{flex:8,}}>
        <Text preset="h4" style={{marginBottom:5}}>{item.title}</Text>
          <Text preset="small">{item.description}</Text>
        </View>
        <View style={styles.iconBox}>
        <FontAwesome onPress={()=>navigation.navigate('edit')} style={{marginBottom:9}} name="edit" size={20} color="white" />
        <MaterialIcons  name="delete" size={20} color="white" />
        </View>
      </TouchableOpacity>
    )

  }

  return (
    <>
        {/* <SafeAreaView> */}

        <View>
         <View style={styles.topUserBar}>
              <View>
                <Text preset='small'>HI, Welcome</Text>
              </View>

              <View style={styles.boxImg}>
                <Image style={styles.userImg} source={require('../../assets/image/user.png')}/>
              </View>
            </View>
         </View>
          <View style={styles.container}>
        


         {/* content section start */}

{
 !task.length &&<>
          <View style={styles.manageTask}>
                    

                    <Image style={styles.todoImg} source={require('../../assets/image/todo.png')}/>
                  </View>

                  <View style={styles.createTodoWrapper}>

                  <Pressable onPress={()=>navigation.navigate('create')}  style={styles.createTodoBtn} >
                          <Text style={{fontWeight:'bold'}}>Create Task</Text>
                    </Pressable>
                  </View>
        </>
          
          }

          {/* task list */}

          <View>

           <View style={styles.ongoingTask}>
           <Text preset="h4">
              Ongoing Task
            </Text>
           <Pressable >
              <Text style={styles.seeAll} preset="small">
                  See all
              </Text>
            </Pressable>
           </View>




           {/* list box */}

            <View style={{marginTop:50}}>

              
                  <FlatList

                  data={task}
                  renderItem={renderItem}
                  keyExtractor={(item)=>item.id}          

                  />
            </View>

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
    alignItems:'center',
    padding: spacing[4],
    borderBottomWidth: 0.8,
    borderBottomColor: colors.darkBlue,
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.6,
    
    elevation: 1,  
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
  },
  ongoingTask:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginTop:spacing[6]
  },
  seeAll:{
    textDecorationStyle:"double",
    textDecorationLine:'underline'

  },
  taskList:{
    backgroundColor:colors.darkBlue,
    marginBottom:15,
    padding:10,
    borderRadius:7,
    flex:1,
    flexDirection:'row',
    alignItems:'center'
    // maxHeight:100,
    // overflow:'hidden'
  },
  iconBox:{
    flex:1,
    position:'absolute',
    right:12,
    zIndex:999
  }
})