import React,{ Component } from "react" ;
import { Input,Text,Card,ListItem,List,Container,CardItem,Left,Thumbnail,Body,Right,Icon,Button } from "native-base" ;
import JMessage from "jmessage-react-plugin" ;

const defaultAvatar = "https://raw.githubusercontent.com/25juan/react-native-chat-ui/master/example/image/right.png";
export default class  extends Component{
    state = {
        info:{}
    };
    componentDidMount(){
        this.fetchUser() ;
    }
    fetchUser(){
        JMessage.getMyInfo((info)=>{
            if(info){
                this.setState({ info });
            }
        })
    }
    render(){
        let { info } = this.state ;
        return (
            <Container>
                <Card>
                    <CardItem>
                        <Left>
                            <Thumbnail source={{uri: info.avatarThumbPath || defaultAvatar}} />
                            <Body>
                            <Text>{info.nickname || info.username}</Text>
                            <Text note>{info.signature || "暂无签名"}</Text>
                            </Body>
                        </Left>
                    </CardItem>
                </Card>
                <List>
                    <ListItem onPress={()=>this.props.navigation.navigate("Notification")} button icon>
                        <Left>
                            <Button style={{ backgroundColor: "#FF9501" }}>
                                <Icon active name="notifications" />
                            </Button>
                        </Left>
                        <Body>
                            <Text>通知</Text>
                        </Body>
                        <Right>
                            <Icon name="arrow-forward" />
                        </Right>
                    </ListItem>
                    <ListItem onPress={()=>{}}  button icon>
                        <Left>
                            <Button style={{ backgroundColor: "#007AFF" }}>
                                <Icon active name="settings" />
                            </Button>
                        </Left>
                        <Body>
                            <Text>设置</Text>
                        </Body>
                        <Right>
                            <Icon name="arrow-forward" />
                        </Right>
                    </ListItem>
                </List>
            </Container>
        )
    }
}