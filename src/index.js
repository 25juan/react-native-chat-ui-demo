import React,{ Component } from "react" ;
import { createStackNavigator,createTabNavigator,createSwitchNavigator } from "react-navigation" ;
import Login from "./page/Login" ;
import Register from "./page/Register" ;
import Friends from "./page/Friends" ;
import Chat from "./page/Chat" ;
import Session from "./page/Session" ;
import Mine from "./page/Mine";
import Loding from "./page/Loding";
const MainTab = createTabNavigator({
    Friends:{
        screen:Friends
    },
    Session:{
        screen:Session
    },
    Mine:{
        screen:Mine
    },
},{
    tabBarPosition :"bottom",
});


const MainNavigator = createStackNavigator({
    Chat:{
        screen:Chat
    },
    Main:{
        screen:MainTab
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
