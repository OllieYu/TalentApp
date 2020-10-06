import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie';
import LoggedInBanner from '../../Layout/Banner/LoggedInBanner.jsx';
import { LoggedInNavigation } from '../../Layout/LoggedInNavigation.jsx';
import { JobSummaryCard } from './JobSummaryCard.jsx';
import { BodyWrapper, loaderData } from '../../Layout/BodyWrapper.jsx';
import { Header, Pagination, Icon, Dropdown, Checkbox, Accordion, Form, Segment, CardGroup } from 'semantic-ui-react';
import _ from 'lodash'

export default class ManageJob extends React.Component {
    constructor(props) {
        super(props);
        let loader = loaderData
        loader.allowedUsers.push("Employer");
        loader.allowedUsers.push("Recruiter");
        //console.log(loader)
        this.state = {
            loadJobs: [],
            loaderData: loader,
            activePage: 1,
            sortBy: {
                date: "desc"
            },
            filter: {
                showActive: true,
                showClosed: false,
                showDraft: true,
                showExpired: true,
                showUnexpired: true
            },
            totalPages: 1,
            activeIndex: ""
        }
        this.loadData = this.loadData.bind(this);
        this.init = this.init.bind(this);
        this.loadNewData = this.loadNewData.bind(this);
        //your functions go here
        this.loadData()
    };

    init() {
        let loaderData = TalentUtil.deepCopy(this.state.loaderData)
        loaderData.isLoading = false;
        this.setState({ loaderData });//comment this

        //set loaderData.isLoading to false after getting data
        //this.loadData(() =>
        //    this.setState({ loaderData })
        //)
        
        //console.log(this.state.loaderData)
    }

    componentDidMount() {
        this.init();
    };

    loadData(callback) {
        var link = 'http://localhost:51689/listing/listing/getEmployerJobs';
        var cookies = Cookies.get('talentAuthToken');
       // your ajax call and other logic goes here
       $.ajax({
        url: link,
        headers: {
            'Authorization': 'Bearer ' + cookies,
            'Content-Type': 'application/json'
        },
        type: "GET",
        dataType: "json",
        success: function (res) {
            this.setState({ 
                loadJobs : res
            })
        }.bind(this),
        error: function (res) {
            console.log(res.status)
        }
    }) 
    }

    loadNewData(data) {
        var loader = this.state.loaderData;
        loader.isLoading = true;
        data[loaderData] = loader;
        this.setState(data, () => {
            this.loadData(() => {
                loader.isLoading = false;
                this.setState({
                    loadData: loader
                })
            })
        });
    }
    
    render() {
        // console.log(this.state.loadJobs.myJobs)
        return (
            <BodyWrapper reload={this.init} loaderData={this.state.loaderData}>
               <div className ="ui container">
               <Segment vertical>
                    <Header as='h1'>List of Jobs</Header>   
                    <Icon name = "filter"/>Filter:&nbsp;
                    <Dropdown text='Choose filter' inline>
                        <Dropdown.Menu>
                        <Dropdown.Item text='condition1' />
                        <Dropdown.Item text='condition2' />
                        <Dropdown.Item text='condition3' />
                        </Dropdown.Menu>
                    </Dropdown>
                    <Icon name = "calendar alternate outline"/>Sort by date:&nbsp;
                    <Dropdown text='Newest first' inline>
                        <Dropdown.Menu>
                        <Dropdown.Item text='condition1' />
                        <Dropdown.Item text='condition2' />
                        <Dropdown.Item text='condition3' />
                        </Dropdown.Menu>
                    </Dropdown>
                </Segment>
                <CardGroup itemsPerRow={3}>
                {_.map(this.state.loadJobs.myJobs, ({ id, title, location, summary }) => (
                    <JobSummaryCard 
                        key={id}
                        id={id}
                        title={title}
                        location={location}
                        summary={summary}
                    />
                ))}    
                </CardGroup>
                <Segment basic textAlign="center">
                <Pagination
                    defaultActivePage={1}
                    firstItem={{ content: <Icon name='angle double left' />, icon: true }}
                    lastItem={{ content: <Icon name='angle double right' />, icon: true }}
                    prevItem={{ content: <Icon name='angle left' />, icon: true }}
                    nextItem={{ content: <Icon name='angle right' />, icon: true }}
                    totalPages={3}
                />
                </Segment>
               </div>
            </BodyWrapper>
        )
    }
}