import { StyleSheet } from "react-native";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";

export const homeScreenStyle =StyleSheet.create({
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
      alignItems:'center',
      height:100,
      overflow:'hidden'
    },
    iconBox:{
      position:'absolute',
      right:12,
      top:0,  
      zIndex:999,
      padding:0,
      margin:0,
     
    },
    createTaskBtnWrapper:{
        position:"absolute",
        bottom:spacing[8],
        right:10
    },
    createTaskBtn:{
     backgroundColor:colors.yellow,
     height:60,
     width:60,
     borderTopEndRadius:15,
     borderBottomLeftRadius:15,
     borderTopLeftRadius:15,
     alignItems:'center',
     justifyContent:'center'
    },
    userMenu:{
      marginTop:50,
      backgroundColor:colors.yellow,
      textAlign:"center",
      fontWeight:"700"
      
    }
  })