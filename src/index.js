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
        screen:Friends,
        navigationOptions:{
            tabBarLabel:"好友",
        }
    },
    Session:{
        screen:Session,
        navigationOptions:{tabBarLabel:"会话"}
    },
    Mine:{
        screen:Mine,
        navigationOptions:{tabBarLabel:"我的"}
    },
},{
    tabBarPosition :"bottom",
    tabBarOptions:{
        style:{
            backgroundColor:"#45b3c4",
        },
        labelStyle:{
            color:"#fff"
        },
        indicatorStyle:{
            backgroundColor:"#fff"
        }
    }
});


const MainNavigator = createStackNavigator({
    Chat:{
        screen:Chat
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
