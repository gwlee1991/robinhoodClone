import React from 'react';
import NewsCard from './NewsCard';
import { Link } from 'react-router-dom';

const News = ({ name, news }) => {
	return (
		<section className="section-container">
			<header className="section-header-container">
				<div className="section-header row space-between">
					<div>
						<h2><span>News</span></h2>
					</div>
					<div className="hover">
						<Link to={`/news/${name}`}>
							<span className="small-text" style={{fontWeight: "500", color: 'var(--splash-signup-bg-color)'}}>Show More</span>
						</Link>
					</div>
				</div>
			</header>
			<div>
				{news.slice(0, 3).map((newsItem) => {
					return <NewsCard key={newsItem.id} news={newsItem} />
				})}
			</div>
		</section>
	)
}

export default News;