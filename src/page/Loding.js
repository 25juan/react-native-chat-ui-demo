import React,{ Component } from "react" ;
import { View,ActivityIndicator,AsyncStorage } from "react-native" ;
import JMessage from "jmessage-react-plugin" ;
export default class extends Component{
    componentDidMount(){
        (async()=>{
            let user = await AsyncStorage.getItem('user');
            if(user){
                JMessage.login(JSON.parse(user),()=>{
                    this.props.navigation.navigate("MainNavigator");
                },()=>{});
            }else {
                this.props.navigation.navigate("AuthNavigator");
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