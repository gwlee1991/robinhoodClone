import React, { useState, useEffect } from 'react'
import NewsCard from './NewsCard';
import * as dataApi from '../../../../api/dataApi';
import "./News.css";

function News() {
	const [news, setNews] = useState([]);

	useEffect(() => {
		dataApi.getNewsData().then((res) => {
			setNews(res);
		})
	}, [])
	
	return (
		<div className="news-container">
			<div className="news-header">
				News
			</div>
			<div className="news-body">
				{news.slice(0,10).map((newsItem, index) => {
					return <div key={index} className="news-item-container">
						<NewsCard key={index} top={index === 0 ? true: false} news={newsItem} />
					</div>
				})}
			</div>
		</div>
	)
}

export default News
