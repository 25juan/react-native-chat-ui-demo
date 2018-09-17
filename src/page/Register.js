import React,{ Component } from "react" ;
import { Input,Text,Row,Container,Form,Item,Label,Button,Toast } from "native-base" ;
import { View } from "react-native" ;
import _ from "lodash" ;
import JMessage from "jmessage-react-plugin" ;
export default class  extends Component{
    state = {
        username:"",
        password:"",
    };
    register = ()=>{
        let { username, password } = this.state ;
        if(!username ||  !password){
            Toast.show({
                text:"用户名或者密码不能为空"
            });
            return ;
        }
        JMessage.register({username, password}, (data) =>{
            Toast.show({
                text:"注册成功,请登录."
            });
            this.props.navigation.pop();
        },(data)=>{});
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