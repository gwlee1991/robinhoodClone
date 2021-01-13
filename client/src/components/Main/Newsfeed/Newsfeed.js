import React from 'react'
import './Newsfeed.css';

import Graph from './Graph/Graph';
import BuyingPowerCard from '../BuyingPowerCard/BuyingPowerCard';
import PopularLists from './PopularLists/PopularLists';
import News from './News/News';


function Newsfeed() {
    return (
        <div className="newsfeed">
            <div className="newsfeed-container">
                <div className='newsfeed-chart-section'>
                    <section className="newsfeed-portfolio">
                        <h1>$114,656.84</h1>
                        <div className="newsfeed-portfolio-status">
                            <span className="dollar-gain">+$44.63</span>
                            <span className="percentage-gain">(+0.4%)</span>
                            <span className="text light normal">Past Year</span>
                        </div>
                    </section>
                    <Graph />
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
