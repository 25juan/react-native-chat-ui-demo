import { observable,computed,action,toJS } from "mobx" ;
import JMessage from "jmessage-react-plugin" ;
import { Toast } from "native-base" ;
import moment from "moment" ;
const defaultAvatar = "https://raw.githubusercontent.com/25juan/react-native-chat-ui/master/example/image/right.png";
 class Store {
    constructor(){
        this.initEventsListener() ;
        this.loadConversation();
    }
     @observable
     user = {  } ;
     @action.bound
     setUser(user){
         this.user = { ...user } ;
     }
    @observable
    notifications = [];
     @observable
     conversations = [];
    @action.bound
    initEventsListener(){
        JMessage.removeContactNotifyListener(this.addContactNotifyListener)
        JMessage.addContactNotifyListener(this.addContactNotifyListener) ;
        JMessage.addReceiveMessageListener(()=>{
            this.loadConversation();
        });
    }
     @action.bound
     loadConversation(){
         JMessage.getConversations(list=>{
             let conversations = list.map(item=>{
                return {
                    target:item.target,
                    title:item.title ,
                    avatar:item.target.avatarThumbPath || defaultAvatar,
                    text:item.latestMessage?(()=>{
                        if(item.latestMessage.type === "text"){
                            return  item.latestMessage.text;
                        }
                        return "[未知消息]" ;
                    })():"[暂无消息]",
                    date:item.latestMessage?(()=>{
                        return moment(item.latestMessage.createTime).format("YYYY-MM-DD");
                    })():moment().format("YYYY-MM-DD")
                }
             });
            this.conversations = [ ...conversations ];
         },()=>{});
     }
    @action.bound
    addContactNotifyListener({fromUsername, type }){
        JMessage.getUserInfo({username:fromUsername},(user)=>{
            if(type === "invite_received"){ // 收到对方好友请求
                Toast.show({ text:`${user.nickname || user.username}请求添加您为好友` });
                this.notifications = [ ...this.notifications,user ] ;
            }else if(type === "invite_accepted"){
                Toast.show({ text:`${user.nickname || user.username}接受您的好友好友请求` });
            }else if (type === "invite_declined"){
                Toast.show({ text:`${user.nickname || user.username}拒绝您的好友好友请求` });
            }else if(type === "contact_deleted"){
                Toast.show({ text:`${user.nickname || user.username}删除了您` });
            }

        },()=>{});
    }
     @action.bound
    deleteNotification(index){
        this.notifications = this.notifications.splice(index,1) ;
    }

};
 const store = new Store() ;
export default store ;