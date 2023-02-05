import { AntDesign, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { signOut } from 'firebase/auth';
import { collection, deleteDoc, doc, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Pressable, TouchableOpacity, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { Menu, MenuItem } from 'react-native-material-menu';
import Text from '../components/text/text';
import { homeScreenStyle } from '../stylesheet/homeStyle';
import { colors } from '../theme/colors';
import { auth, db } from '../utils/config';

export default function Home({navigation,user}) {

  const [task,setTask]= useState([]);
  const [isLoading,setIsLoading]= useState(true);

  const [visible, setVisible] = useState(false);

  const hideMenu = () =>{
    signOut(auth);
     setVisible(false);
    };

  const showMenu = () => setVisible(true);



  useEffect(()=>{

    setIsLoading(true)
    
    const q = query(collection(db, "task"), where("uid", "==", user.uid));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {

        // console.log(doc,'docs')
          list.push({...doc.data(),id:doc.id});
      });
      // console.log(list)
      setTask(list);  
    });
    setIsLoading(false)
    return unsubscribe;
  },[])


  const handleDelete=async(id)=>{

    try {
      await deleteDoc(doc(db, "task", id));
      showMessage({
        message: "Successfully task created",
        type: "success",
      });
      
    } catch (err) {

      console.log(err);
      setIsLoading(false);
      showMessage({
       message: `${err.message}`,
       type: "info",
     });
      
    }
  }


  const renderItem=({item})=>{

    return(

      <TouchableOpacity style={styles.taskList}>
        
        <View style={{flex:8}}>
        <Text preset="h4" style={{marginBottom:5}}>{item.title}</Text>
          <Text preset="small">{item.description.slice(0,100)}</Text>
        </View>
        <View style={{flex:1,position:'relative'}}>
       <View style={{}}>
       <FontAwesome onPress={()=>navigation.navigate('edit',{item})} style={{marginBottom:9}} name="edit" size={20} color="white" />
        <MaterialIcons onPress={()=>handleDelete(item.id)}  name="delete" size={20} color="white" />
       </View>
        </View>
      </TouchableOpacity>
    )

  }


  console.log(task)
  console.log(isLoading)


  if(isLoading){
    return <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <ActivityIndicator color={colors.yellow} size={'large'}/>
    </View>
  }


  console.log(visible,'vis')



  return (
    <>
        {/* <SafeAreaView style={{flex:1}}> */}

        <View>
         <View style={styles.topUserBar}>
              <View>
                <Text preset='small'>HI, Welcome</Text>
              </View>



              <View  style={styles.boxImg}>
                
                  <Menu  
                  style={styles.userMenu}
                          visible={visible}
                          anchor={
                            <Text style={{margin:0,padding:0}} onPress={showMenu}>
                  <View>
                  <Image  style={styles.userImg} source={require('../../assets/image/user.png')}/>
                  </View>
                            </Text>
                           
                          }
                          onRequestClose={hideMenu}
                        >
                          <MenuItem style={{justifyContent:'center',alignItems:'center'}} onPress={hideMenu}>
                            <Text style={{color:colors.blue}} preset='h4'>Sign Out</Text>
                          </MenuItem>
                        
                        </Menu>
                
              </View>


            
            </View>

      
         </View>
          <View style={styles.container}>
        
          

         {/* content section start */}

{
 task.length ? <>
        
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

        <View style={{marginTop:50,marginBottom:100}}>

          
              <FlatList

              data={task}
              renderItem={renderItem}
              keyExtractor={(item)=>item.id}          

              />
        </View>

        </View>


        {/* create btn */}

        <View  style={styles.createTaskBtnWrapper}>

          <Pressable onPress={()=>navigation.navigate('dummy')}  style={styles.createTaskBtn}>

          <AntDesign name="plus" size={40} color={colors.darkBlue} />
          </Pressable>

        </View>
        
        </>:  
        <>
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

      


          </View>
        {/* </SafeAreaView> */}
    </>
  )
}



const styles =homeScreenStyle;