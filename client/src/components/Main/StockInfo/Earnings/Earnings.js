import React from 'react';
import { Bubble } from 'react-chartjs-2';

/*
actual: 1.82
estimate: 1.5744618000000001
period: "2020-09-30"
1:
actual: 1.46
estimate: 1.369758
period: "2020-06-30"
2:
actual: 1.4
estimate: 1.289943
period: "2020-03-31"
3:
actual: 1.51
estimate: 1.3452372
period: "2019-12-31"
*/

const Earnings = ({ earning }) => {
	const data = []
	earning.forEach((report, i) => {
		data.push({x: i, y: report.actual, r: 8});
		data.push({x: i, y: report.estimate, r: 8});
	});
	
	return (
		<section className="section-container">
			<header className="section-header-container"> 
				<div className="section-header">
					<h2><span>Earnings</span></h2>
				</div>
			</header>
			<div>
				<Bubble 
					data={{
						datasets: [
							{
								type: 'bubble',
								data: data,
								backgroundColor: '#5ac53b',
								borderColor: '#5AC53B',
								borderWidth: 2,
								pointBorderColor: '#5ac53b',
								pointBackgroundColor: '#5ac53b',
								pointHoverBackgroundColor: '#5ac53b',
							}
						]
					}}

					options={{
						scales: {
							xAxes: [
								{
									type: "time",
									time: {
										format: "MM/DD/YY"
									},
									ticks: {
										display: false
									}
								},
							]
						}
					}}
				/>
			</div>
		</section>
	)
}

export default Earnings;