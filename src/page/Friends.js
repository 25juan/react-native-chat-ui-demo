import React,{ Component } from "react" ;
import { Input,Text,Container,Header,Left,List,ListItem,Content,Button,Right,Thumbnail,Icon,Body,Title,StyleProvider  } from "native-base" ;
import { FlatList,AsyncStorage } from "react-native" ;
import JMessage from "jmessage-react-plugin" ;
const gender = {
    female:"female",
    male:"male",
    unknown:"person"
};
export default class  extends Component{
    state = {
      data :[],
    };
    componentDidMount(){
        (async()=>{
            await this.fetchFriendList();
        })();
    }
    async fetchFriendList(){
        let username = await AsyncStorage.getItem("username");
        if(!username){
            return ;
        }
        JMessage.getFriends(data=>{
            this.setState({ data });
        },()=>{})

    }
    renderItem = ({ item })=>{
        return (
            <ListItem avatar>
                <Left>
                    <Thumbnail source={{uri:item.avatarThumbPath}}/>
                </Left>
                <Body>
                <Text>{ item.nickname|| item.username}</Text>
                <Text note>{ item.signature || "暂无个性签名" }</Text>
                </Body>
                <Right>
                    <Icon name={gender[item.gender]}/>
                </Right>
            </ListItem>)
    };
    render(){
        return (
            <Container>
                <Header>
                    <Body>
                        <Title>我的好友</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Icon name={"add"}/>
                        </Button>
                    </Right>
                </Header>
                <Content>
                    <FlatList
                        data={this.state.data}
                        keyExtractor={(item)=>item["username"]}
                        renderItem={this.renderItem}/>
                </Content>
            </Container>
        )
    }
}