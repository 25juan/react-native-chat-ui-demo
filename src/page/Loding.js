import React,{ Component } from "react" ;
import { View,ActivityIndicator,AsyncStorage } from "react-native" ;
export default class extends Component{
    componentDidMount(){
        (async()=>{
            let username = await AsyncStorage.getItem('username');
            if(username){
                this.props.navigation.navigate("MainNavigator");
            }
        })();
    }
    render(){
        return (
            <View style={styles.container}>
                <ActivityIndicator/>
            </View>
        )
    }
}
const styles = {
    container:{
        flex:1 ,
        alignItems:"center",
        justifyContent:"center"
    }
};