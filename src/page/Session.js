import React,{ Component } from "react" ;
import { Input,Text,Container,Header,Left,List,ListItem,Content,Button,Right,Thumbnail,Icon,Body,Title,StyleProvider  } from "native-base" ;

export default class  extends Component{
    render(){
        return (
            <Container>
                <Header>
                    <Body>
                        <Title>最近会话</Title>
                    </Body>
                </Header>
                <Content>
                    <List>
                        <ListItem avatar>
                            <Left>
                                <Thumbnail source={{uri:"https://raw.githubusercontent.com/25juan/react-native-chat-ui/master/example/image/right.png"}}/>
                            </Left>
                            <Body>
                            <Text>Kumar Pratik</Text>
                            <Text note>Doing what you like will always keep you happy . .</Text>
                            </Body>
                            <Right>
                                <Text note>3:43 pm</Text>
                            </Right>
                        </ListItem>
                        <ListItem avatar>
                            <Left>
                                <Thumbnail source={{uri:"https://raw.githubusercontent.com/25juan/react-native-chat-ui/master/example/image/right.png"}}/>
                            </Left>
                            <Body>
                            <Text>Kumar Pratik</Text>
                            <Text note>Doing what you like will always keep you happy . .</Text>
                            </Body>
                            <Right>
                                <Text note>3:43 pm</Text>
                            </Right>
                        </ListItem>


                    </List>
                </Content>
            </Container>
        )
    }
}