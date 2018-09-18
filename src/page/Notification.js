import React,{ Component } from "react" ;
import { Input,Text,Container,Header,Left,List,ListItem,Form,Item,Button,Right,Thumbnail,Icon,Body,Title,Content,Toast  } from "native-base" ;
import { FlatList,AsyncStorage,Modal,View } from "react-native" ;
import { observer,inject } from "mobx-react" ;
import JMessage from "jmessage-react-plugin" ;
const defaultAvatar = "https://raw.githubusercontent.com/25juan/react-native-chat-ui/master/example/image/right.png";
const gender = {
    female:"female",
    male:"male",
    unknown:"person"
};
@inject("store")
@observer
export default class  extends Component{
    state = {
        refreshing:false,
    };
    componentDidMount(){
        console.log(this.props) ;
    }
    renderItem = ({ item })=>{
        return (
            <ListItem avatar>
                <Left>
                    <Thumbnail source={{uri:item.avatarThumbPath || defaultAvatar }}/>
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
                    <Left>
                        <Button transparent onPress={()=>this.setState({ visible:true })}>
                            <Icon name={"arrow-back"}/>
                        </Button>
                    </Left>
                    <Body>
                        <Title>添加好友通知</Title>
                    </Body>
                </Header>
                {/*<FlatList*/}
                    {/*onRefresh={this.fetchFriendList}*/}
                    {/*refreshing={this.state.refreshing}*/}
                    {/*data={this.state.data}*/}
                    {/*keyExtractor={(item)=>item["username"]}*/}
                    {/*renderItem={this.renderItem}/>*/}




            </Container>
        )
    }
}