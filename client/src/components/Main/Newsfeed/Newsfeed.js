import React from 'react'
import './Newsfeed.css';

import Graph from './Graph/Graph';
import BuyingPowerCard from '../BuyingPowerCard/BuyingPowerCard';
import PopularLists from './PopularLists/PopularLists';
import News from './News/News';


function Newsfeed() {
    return (
        <div className="main-left">
            <div className="newsfeed-container">
                <div className='newsfeed-chart-section'>
                    <section>
                        <Graph />
                    </section>
                    <section className="newsfeed-buying-power">
                        <BuyingPowerCard />
                    </section>
                    <section className="newsfeed-popular-list">
                        <PopularLists />
                    </section>
                    <section className="newsfeed-news">
                        <News />
                    </section>
                </div>
            </div>
        </div>
    )
}

export default Newsfeed
