import React,{ Component } from "react" ;
import { Input,Text,Container,Header,Left,List,ListItem,Form,Item,Button,Right,Thumbnail,Icon,Body,Title,Content,Toast  } from "native-base" ;
import { FlatList,AsyncStorage,Modal,View } from "react-native" ;
import JMessage from "jmessage-react-plugin" ;
import { observer,inject } from "mobx-react" ;
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
        data :[],
        refreshing:false,
        visible:false,
        username:"",
        info:null,
    };
    componentDidMount(){
        this.fetchFriendList();
    }
    username = "" ;
    fetchFriendList = ()=>{
        (async()=>{
            let user = await AsyncStorage.getItem("user");
            this.username = JSON.parse(user).username;
            if(!this.username){
                return ;
            }
            this.setState({ refreshing:true });
            JMessage.getFriends(data=>{
                this.setState({ data, refreshing:false });
            },(error)=>{
                console.log(error)
            });
        })();
    };
    addFriend = ()=>{
        JMessage.sendInvitationRequest({ username: this.state.info.username, reason: '请求添加好友'},
            () => {
                this.closeModal();
                Toast.show({
                    text:"请求发送成功"
                });
            }, (error) => {});
    };
    closeModal = () => this.setState({ visible:false,info:null,username:"" }) ;
    searchFriend = ()=>{
        let {  username } = this.state ;
        if(username){
           JMessage.getUserInfo({username},(info)=>{
                this.setState({
                    info
                });
           },()=>{});
        }
    };
    goToChat =(item)=>{
        JMessage.createConversation({ type: 'single', username: item['username'] },(conversation) => {
                this.props.navigation.navigate("Chat",{ ...item });
                this.props.store.loadConversation();
            }, (error) => {}) ;
    };
    renderItem = ({ item })=>{
        return (
            <ListItem
                onPress={()=>this.goToChat(item)}
                avatar>
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
                    <Body>
                        <Title>我的好友</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={()=>this.setState({ visible:true })}>
                            <Icon name={"add"}/>
                        </Button>
                    </Right>
                </Header>
                <FlatList
                    onRefresh={this.fetchFriendList}
                    refreshing={this.state.refreshing}
                    data={this.state.data}
                    keyExtractor={(item)=>item["username"]}
                    renderItem={this.renderItem}/>

                <Modal
                    animationType="fade"
                    transparent={false}
                    onRequestClose={this.closeModal}
                    visible={this.state.visible}>
                    <Content>
                        <Header searchBar rounded>
                            <Item>
                                <Input value={this.state.username}
                                       onSubmitEditing={this.searchFriend}
                                       onChangeText={(text)=>this.setState({ username:text })}
                                       placeholder={"输入用户名进行检索添加好友"}/>
                                <Icon name={"search"}/>
                            </Item>
                        </Header>
                        <List>
                            {
                                this.state.info?(
                                    <ListItem avatar>
                                        <Left>
                                            <Thumbnail source={{uri:this.state.info.avatarThumbPath || defaultAvatar}}/>
                                        </Left>
                                        <Body>
                                        <Text>{ this.state.info.nickname|| this.state.info.username}</Text>
                                        <Text note>{ this.state.info.signature || "暂无个性签名" }</Text>
                                        </Body>
                                        <Right>
                                            {
                                                this.username === this.state.username ?null:<Button onPress={this.addFriend} transparent={true}>
                                                    <Icon name={"add"}/>
                                                </Button>
                                            }
                                        </Right>
                                    </ListItem>
                                ):null
                            }
                        </List>
                    </Content>
                </Modal>


            </Container>
        )
    }
}