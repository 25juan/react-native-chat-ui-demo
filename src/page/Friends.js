import React,{ Component } from "react" ;
import { Input,Text,Container,Header,Left,Button,Icon,Body,Title,Right } from "native-base" ;

export default class  extends Component{
    render(){
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                    <Title>Header</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Icon name='menu' />
                        </Button>
                    </Right>
                </Header>
                <Text>Friends</Text>
            </Container>
        )
    }
}