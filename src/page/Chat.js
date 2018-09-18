import React,{ Component } from "react" ;
import { Input,Text,Container,Header,Left,List,ListItem,Form,Item,Button,Right,Thumbnail,Icon,Body,Title,Content,Toast  } from "native-base" ;
import JMessage from "jmessage-react-plugin" ;
import { BackHandler } from "react-native" ;
import Chat from "react-native-chat-ui" ;
import { observer,inject  } from "mobx-react" ;
@inject("store")
@observer
export default class  extends Component{
    constructor(props){
        super();
        this.state = {
            info:props.navigation.state.params
        }
    }
    get targetUsername (){
        return this.state.info.username
    }
    get currUser(){
        return this.props.store.user ;
    }
    componentWillMount(){
        JMessage.enterConversation({type:"single", username: this.targetUsername},()=>{},()=>{});
    }
    componentWillUnmount(){
        JMessage.exitConversation();
    }
    componentDidMount(){
        JMessage.addReceiveMessageListener(this.receiveMessage);
        BackHandler.addEventListener("hardwareBackPress",this.goBack);
        this.getHistoryMessage(false,true);
    }
    form = 0 ;
    getHistoryMessage = (callback,isScrollBottom)=>{
        return new Promise((resolve)=>{
            JMessage.getHistoryMessages({ type: 'single', username: this.targetUsername, from: this.form, limit: 10 },
                (msgArr) => {
                    this.form = this.form+10 ;
                    let arr = msgArr.map(msg=>this.covertJMsg(msg,"send_success")) ;
                    this.messageList.appendToTop(arr);
                    if(isScrollBottom){
                        this.messageList.scrollToBottom();
                    }
                    typeof callback === "function" && callback()
                }, (error) => {});
            resolve();
        });
    };
    removeListener = ()=>{
        JMessage.removeReceiveMessageListener(this.receiveMessage) ;
    };
    receiveMessage = (message)=>{
        if(message.from.username === this.targetUsername){
            let sendMsg = this.covertJMsg(message,"send_success") ;
            this.messageList.appendToBottom([sendMsg]);
        }
    };
    goBack = ()=>{
        this.removeListener() ;
        this.props.navigation.goBack();
        return true ;
    };
    covertJMsg(message,status="send_going"){
        let fromUser = {
            _id: message.from.username, // 用户的id
            name: message.from.nickname || message.from.username,
            avatar: message.from.avatarThumbPath
        };
        let msg = {
            msgId: "", // 消息 id
            status, // 消息状态：send_failed(发送失败)、send_success(发送成功)、send_going(发送中)
            msgType: "text", // 消息类型
            isOutgoing: this.currUser.username === message.from.username,//true 表示当前消息在右边渲染，false 表示当前消息渲染在左边
            fromUser
        } ;
        if(message.type ===  "text"){
            msg.text = message.text ;
            msg.msgId = message.id ;
        }
        return msg ;
    }
    onSend = (text)=>{
        JMessage.createSendMessage({
            type: 'single',
            username: this.targetUsername,
            messageType: 'text',
            text:text}, (message) => {
            console.log(message)
                let sendMsg = this.covertJMsg(message);
                sendMsg.status = "send_going" ;
                this.messageList.appendToBottom([sendMsg]);
                JMessage.sendMessage({
                    id: message.id,
                    type: 'single',
                    username: this.targetUsername
                },()=>{
                    let msg = { ...sendMsg,status:"send_success" } ;
                    this.messageList.updateMsg(msg);
                },()=>{ });
        },(error)=>{
            console.log(error)
        });

    };
    render(){
        let { info } = this.state ;
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={()=>this.goBack()}>
                            <Icon name={"arrow-back"}/>
                        </Button>
                    </Left>
                    <Body>
                        <Title>{ info.nickname || info.username }</Title>
                    </Body>
                </Header>
                <Chat onLoad={(messageList,input)=>{
                    this.messageList = messageList ;
                    this.input = input ;}}
                      onSend={this.onSend}
                      onLoadMoreAsync={this.getHistoryMessage}
                      canLoadMore={false}/>
            </Container>
        )
    }
}