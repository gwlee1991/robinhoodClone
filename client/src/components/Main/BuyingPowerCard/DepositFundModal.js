import React, { useState } from 'react';
import "./DepositFundModal.css";

const DepositFundModal = (props) => {
	const [buyingPower, setBuyingPower] = useState(0);
	const handleChange = e => {
		// check if they entered number or '.' else no input. then call setBuyingPower
	}
	const handleSubmit = e => {
		e.preventDefault();
	}
	return (
		<div className="modal-container">
			<div onClick={props.handleClick} className="x">X</div>
			<div className="form-container">
				<div className="form-header">
					<span>Deposit Funds</span>
				</div>
				<form onSubmit={handleSubmit}>
					<div>
						<div>
							<span>Amount</span>
						</div>
						<div>
							<input type="price" step="1" placeholder="$0.00" value={buyingPower} onChange={handleChange} />
						</div>
					</div>
					<div onClick={props.addBuyingPower}>
						<span>Review</span>
					</div>
				</form>
			</div>
			</div>
	)
}

export default DepositFundModal;