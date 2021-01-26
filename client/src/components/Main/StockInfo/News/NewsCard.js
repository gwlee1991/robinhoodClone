import React from 'react';
import showElapsedTime from '../../../../lib/showElapsedTime';

const NewsCard = props => {
	const { source, image, summary, datetime, headline, id, url } = props.news;
	const handleClick = e => {
		e.preventDefault();
		window.open(url);
	}
	return (
		<div className="news-item-container">
			<div className="news-item" onClick={handleClick}>
				<div className="news-item-header">
					<span className="news-item-header-source">{source}</span>
					<span className="news-item-header-time">{showElapsedTime(datetime)}</span>
				</div>
				<div className="news-item-body">
					<div className="news-item-content">
						<div className="news-item-content-title">
							<span>{headline}</span>
						</div>
						<div className="news-item-content-summary">
							{summary}
						</div>
					</div>
					<div className="news-item-thumbnail small">
						<img src={image} alt={id} />
					</div>
				</div>
			</div>
		</div>
	)
}

export default NewsCard;