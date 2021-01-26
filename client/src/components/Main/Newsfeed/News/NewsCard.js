import React from 'react';
import showElapsedTime from '../../../../lib/showElapsedTime';

function NewsCard(props) {
	const { source, image, datetime, summary, headline, id, url } = props.news;
	const thumbnailClassname = props.top ? "news-item-thumbnail big" : "news-item-thumbnail small";
	const renderSummary = () => {
		if (props.top) {
			return <div className="news-item-content-summary">
				{summary}
			</div>
		}
	}

	const handleClick = (e) => {
		e.preventDefault();
		window.open(url);
	}
	
	return (
		<div className="news-item" onClick={handleClick}>
			<div className="news-item-header">
				<span className="news-item-header-source">{source}</span>
				<span className="news-item-header-time">{showElapsedTime(datetime)}</span>
			</div>
			<div className="news-item-body">
				<div className="news-item-content">
					<div className="news-item-content-title">
						{headline}
					</div>
					{renderSummary()}
				</div>
				<div className={thumbnailClassname}>
					<img src={image} alt={id} />
				</div>
			</div>
		</div>
	)
}

export default NewsCard
