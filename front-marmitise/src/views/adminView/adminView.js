import React,{useEffect} from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import Card_Alcool from '../../components/card/management/card_Alcool';
import Card_Soft from '../../components/card/management/card_Soft';
import Card_Ingredient from '../../components/card/management/card_Ingredient';
import Card_User from '../../components/card/management/card_User';

import './adminView.css';

export default function AdminView(props){
    useEffect(() => {
        props.changeUrl(window.location.href);
    },[]);

    return (
        <div className='adminView'>
            <p className='title_p'>Management</p>
            <Tabs className='custom-tabs'>
                <TabList className='custom-tab-list'>
                    <Tab className='custom-tab'>Alcohol(s)</Tab>
                    <Tab className='custom-tab'>Soft(s)</Tab>
                    <Tab className='custom-tab'>Ingredient(s)</Tab>
                    <Tab className='custom-tab'>Cocktail(s)</Tab>
                    <Tab className='custom-tab'>Bar(s)</Tab>
                    <Tab className='custom-tab'>User(s)</Tab>
                </TabList>

                <TabPanel>
                    <Card_Alcool/>
                </TabPanel>

                <TabPanel>
                    <Card_Soft/>
                </TabPanel>

                <TabPanel>
                    <Card_Ingredient/>
                </TabPanel>

                <TabPanel>
                    <Card_Ingredient/>
                </TabPanel>

                <TabPanel>
                    <Card_Ingredient/>
                </TabPanel>

                <TabPanel>
                    <Card_User/>
                </TabPanel>
            </Tabs>
        </div>
    )
}
