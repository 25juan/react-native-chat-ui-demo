import React,{ Component } from "react" ;
import { createStackNavigator,createTabNavigator } from "react-navigation" ;
import Login from "./page/Login" ;
import Register from "./page/Register" ;
import Friends from "./page/Friends" ;
import Chat from "./page/Chat" ;
import Session from "./page/Session" ;
import Mine from "./page/Mine";
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
    style :{
        backgroundColor:"#000"
    },
    tabStyle:{
        backgroundColor:"#000"
    }
});
export default createStackNavigator({
    Login:{
        screen:Login,
        navigationOptions:{
            header:null
        }
    },
    Chat:{
        screen:Chat
    },
    Register:{
        screen:Register,
        navigationOptions:{
            header:null
        }
    },
    Main:{
        screen:MainTab,
    }
});
