import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container:{
    justifyContent:'center',
    flex:1,
    // alignItems:'center'
  },
  videoItem:{
    margin:10
  },
  playIcon:{
    position:'absolute',
    left:'40%',
    top:'35%',
  },
  pagination:{
    flexDirection:'row',
    justifyContent:'flex-end',
    backgroundColor:'#e2e3e5',
    alignItems:'center',
     padding:5

  },closeBtn:{
    margin:10
}
})

export {styles};