import React,{ Component } from "react" ;
import { Input,Text,Row,Container,Form,Item,Label,Button } from "native-base" ;
import { View,AsyncStorage } from "react-native" ;
import _ from "lodash" ;
import JMessage from "jmessage-react-plugin" ;
export default class  extends Component{
    state ={
        username:"",
        password:"",
    };

    register = ()=>{
        this.props.navigation.navigate("Register") ;
    };
    login =()=>{
        let { username,password } = this.state ;
        JMessage.login({
            username,
            password,
        },() => {
            (async()=>{
                await AsyncStorage.setItem('user',JSON.stringify({
                    username,
                    password
                }));
                this.props.navigation.navigate("MainNavigator");
            })();
        }, (error) => {})
    };
    render(){
        return (
            <View style={styles.container}>
                <Form style={styles.form}>
                    <Item  floatingLabel last>
                        <Label>请输入账号</Label>
                        <Input value={this.state.username} onChangeText={(username)=>this.setState({ username })}/>
                    </Item>
                    <Item floatingLabel last>
                        <Label>请输入密码</Label>
                        <Input secureTextEntry={true} value={this.state.password} onChangeText={(password)=>this.setState({ password })}/>
                    </Item>
                    <Button  block style={styles.btn} onPress={ _.debounce(this.login,500) }>
                        <Text>登录</Text>
                    </Button>
                    <Button onPress={ _.debounce(this.register,500) } block style={styles.btn}>
                        <Text>注册</Text>
                    </Button>

                </Form>
            </View>
        );
    }
}
const styles = {
  container:{
    flex:1,
      flexDirection:"row",
      alignItems:"center",
      paddingHorizontal:15
  },
    form:{width:"100%"},
    btn:{marginTop:15}
};