/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React, { createContext, useContext, useReducer } from 'react';
import { v4 } from 'uuid';
import Notification from './Toaster';

const NotificationContext = createContext();
/**
 *
 * @param {*} props
 * @returns
 */
export default function NotificationProvider(props) {
	const { children } = props;
	const [state, dispatch] = useReducer((state, action) => {
		switch (action.type) {
			case 'ADD_NOTIFICATION':
				return [...state, { ...action.payload }];
			case 'REMOVE_NOTIFICATION':
				return state.filter((el) => el.id !== action.id);
			default:
				return state;
		}
	}, []);

	return (
		<NotificationContext.Provider value={dispatch}>
			<div className="notification-wrapper">
				{state.map((note) => (
					<Notification dispatch={dispatch} key={note.id} {...note} />
				))}
			</div>
			{children}
		</NotificationContext.Provider>
	);
}
/**
 *
 * @returns
 */
 export const UseNotification = () => {
	const dispatch = useContext(NotificationContext);

	return (props) => {
		dispatch({
			type: 'ADD_NOTIFICATION',
			payload: {
				id: v4(),
				...props,
			},
		});
	};
};

  
