import React,{ Component } from "react" ;
import { Input,Text,Container,Header,Left,List,ListItem,Content,Button,Right,Thumbnail,Icon,Body,Title,StyleProvider  } from "native-base" ;
import { inject,observer } from "mobx-react" ;
import JMessage from "jmessage-react-plugin";
@inject("store")
@observer
export default class  extends Component{
    goToChat =(item)=>{
        JMessage.createConversation({ type: 'single', username: item['username'] },(conversation) => {
            this.props.navigation.navigate("Chat",{ ...item });
            this.props.store.loadConversation();
        }, (error) => {}) ;
    };
    render(){
        let { conversations } = this.props.store ;
        return (
            <Container>
                <Header>
                    <Body>
                        <Title>最近会话</Title>
                    </Body>
                </Header>
                <Content>
                    <List>
                        {
                            conversations.map((item,index)=>(
                                <ListItem button={true} onPress={()=>this.goToChat(item.target)} key={index} avatar>
                                    <Left>
                                        <Thumbnail source={{uri:item.avatar}}/>
                                    </Left>
                                    <Body>
                                    <Text>{item.title}</Text>
                                    <Text note>{ item.text }</Text>
                                    </Body>
                                    <Right>
                                        <Text note>{ item.date }</Text>
                                    </Right>
                                </ListItem>
                            ))
                        }
                    </List>
                </Content>
            </Container>
        )
    }
}