import React from 'react';
import Cookies from 'js-cookie';
import { Icon, Label, Button, Card, Popup } from 'semantic-ui-react';
import moment from 'moment';

export class JobSummaryCard extends React.Component {
    constructor(props) {
        super(props);
        this.selectJob = this.selectJob.bind(this)
    }

    selectJob(id) {
        console.log(id)
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://localhost:51689/listing/listing/closeJob',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "POST",
            dataType: "json",
            data: "5f79e5d39960b42b5ce5c1a5",
            success: function (res) {

            }.bind(this),
            error: function (res) {
                console.log(res.status)
            }
        }) 
    }

    render() {
        // console.log(this.props.id)
        return(    
        <Card style={{ minHeight: 350 }}>
            <Card.Content>
                <Card.Header>{this.props.title}</Card.Header>
                <Label color='black' ribbon='right'>
                    <Icon name = 'user' /> 0
                </Label>
                <Card.Meta>{this.props.location['city']},{this.props.location['country']}</Card.Meta>
                <Card.Description>
                {this.props.summar}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button size='mini' negative>Expired</Button>
                <Button.Group size='mini' floated='right'>
                    <Button
                        onClick={() => {this.selectJob(this.props.id)}}
                        basic color='blue'>
                    <Icon name = 'ban'/>Close
                    </Button>
                    <Button basic color='blue'>
                    <Icon name = 'edit outline'/>Edit
                    </Button>
                    <Button basic color='blue'>
                    <Icon name = 'copy outline'/>Copy
                    </Button>
                </Button.Group>
            </Card.Content>
        </Card>
        
        
        )
    }
}