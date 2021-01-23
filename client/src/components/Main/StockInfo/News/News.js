import React from 'react';
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
		</section>
	)
}

export default News;