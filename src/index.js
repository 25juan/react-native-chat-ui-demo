import React,{ Component } from "react" ;
import { createStackNavigator,createTabNavigator,createSwitchNavigator } from "react-navigation" ;
import { Icon } from "native-base" ;
import Login from "./page/Login" ;
import Register from "./page/Register" ;
import Friends from "./page/Friends" ;
import Chat from "./page/Chat" ;
import Session from "./page/Session" ;
import Mine from "./page/Mine";
import Loding from "./page/Loding";
import Notification from "./page/Notification";
import AudioExample from "./page/Audio"
const MainTab = createTabNavigator({
    AudioExample:AudioExample,
    Friends:{
        screen:Friends,
        navigationOptions : {
            tabBarLabel:"好友",
            tabBarIcon:({ focused, tintColor })=>{
                return <Icon style={{color:tintColor}} name={"people"}/>
            }
        }
    },
    Session:{
        screen:Session,
        navigationOptions:{
            tabBarLabel:"会话",
            tabBarIcon:({ focused, tintColor })=>{
                return <Icon style={{color:tintColor}} name={"chatbubbles"}/>
            }
        }
    },
    Mine:{
        screen:Mine,
        navigationOptions:{
            tabBarLabel:"我的",
            tabBarIcon:({ focused, tintColor })=>{
                return <Icon style={{color:tintColor}} name={"person"}/>
            }
        }
    },
},{
    tabBarPosition :"bottom",
    tabBarOptions:{
        showIcon:true,
        style:{
            backgroundColor:"#45b3c4",
            height:55,
            paddingTop:0
        },
        labelStyle:{
            color:"#fff",
            marginTop:0
        },
        iconStyle:{
            marginTop:0
        },
        indicatorStyle:{
            backgroundColor:"#fff",
            height:0
        }
    }
});


const MainNavigator = createStackNavigator({
    Chat:{
        screen:Chat,
        navigationOptions:{
            header:null
        }
    },
    Notification:{
      screen:Notification,
        navigationOptions:{
            header:null
        }
    },
    Main:{
        screen:MainTab,
        navigationOptions:{
            header:null
        }
    }
},{
    initialRouteName:"Main"
});
const AuthNavigator = createStackNavigator({
    Login:{
        screen:Login,
        navigationOptions:{
            header:null
        }
    },
    Register:{
        screen:Register,
        navigationOptions:{
            header:null
        }
    },
});
export default createSwitchNavigator({
    MainNavigator:MainNavigator,
    AuthNavigator:AuthNavigator,
    Loading:Loding
},{
    initialRouteName:"Loading"
})
