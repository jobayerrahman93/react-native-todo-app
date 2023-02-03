import { ActivityIndicator, Pressable, StyleSheet, View } from "react-native"
import Text from "../components/text/text"
import { colors } from "../theme/colors"
import { spacing } from "../theme/spacing"

export const LoadingBtn =({title='button', animating=true,color=colors.white,size='small'})=>{
    return(
        <View>
         <Pressable disabled style={styles.submitBtn} >
              <Text style={{fontWeight:'bold'}}>{title}</Text>
             <View>
             <ActivityIndicator style={styles.btnIndicator} size={size} color={color} />
             </View>
        </Pressable>
       
     </View>
    )
}

const styles = StyleSheet.create({
    submitBtn:{
        backgroundColor:colors.blue,
        color:colors.black,
        borderRadius:6,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        paddingVertical:spacing[2],
        marginTop:spacing[6],
      },
      btnIndicator:{
       marginLeft:6
        
      }
})