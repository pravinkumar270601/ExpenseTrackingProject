/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */

import React, { useState } from 'react';
import './toaster.css';
/**
 *
 * @param {*} param0
 * @returns
 */
function Notification({ dispatch, id, type, message }) {
	const [exit, setExit] = useState(false);
	const [width, setWidth] = useState(0);
	const [intervalID, setIntervalID] = useState(null);
	/**
	 *
	 */
	const handleStartTimer = () => {
		const id = setInterval(() => {
			setWidth((prev) => {
				if (prev < 100) {
					return prev + 0.5;
				}

				// clearInterval(id);
				return prev;
			});
		}, 20);

		setIntervalID(id);
	};
	/**
	 *
	 */
	const handlePauseTimer = () => {
		clearInterval(intervalID);
	};
	/**
	 *
	 */
	const handleCloseNotification = () => {
		handlePauseTimer();
		setExit(true);
		setTimeout(() => {
			dispatch({
				type: 'REMOVE_NOTIFICATION',
				id,
			});
		}, 400);
	};

	React.useEffect(() => {
		if (width === 100) {
			// Close notification
			handleCloseNotification();
		}
	}, [width]);

	React.useEffect(() => {
		handleStartTimer();
	}, []);

	return (
		<div
			onMouseEnter={handlePauseTimer}
			onMouseLeave={handleStartTimer}
			className={`notification-item ${
				type === 'SUCCESS' ? 'success' : type === 'ERROR' ? 'error' : 'warning'
			} ${exit ? 'exit' : ''}`}
		>
			<p>{message}</p>
			{/* <div className={"bar"} style={{ width: `${width}%` }} /> */}
		</div>
	);
}

export default Notification;
