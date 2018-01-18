import React from 'react';
import axios from 'axios';
import { post } from 'utils/api';
import { actions } from './modal';

import ModalExample from '../../components/ModalExample';

export const FETCH_ORDER_REQUEST = '@ORDER/FETCH_ORDER_REQUEST';
export const FETCH_ORDER_SUCCESS = '@ORDER/FETCH_ORDER_SUCCESS';
export const FETCH_ORDER_FAILURE = '@ORDER/FETCH_ORDER_FAILURE';

export function requestOrderStart() {
	return { type: FETCH_ORDER_REQUEST };
}

export function requestOrderDone(data) {
	return dispatch => {
		dispatch(actions.openModal({
			modalType: ModalExample,
			modalProps: {
				title: `Заказ ${data.id}`,
				status: 'order',
				text: (
					<ul>
						<li>
							<span>E-mail: {data.email}</span>
							<span>Телефон: {data.phone}</span>
						</li>
						<li>
							<span>Имя: {data.firstName}</span>
							<span>Фамилия: {data.firstName}</span>
						</li>
						<li>
							<span>Адрес: {data.country}, {data.region}, {data.city}, {data.address}, {data.aprtaments}, {data.postIndex}</span>
						</li>
						<li>
							<span> Коментарий: {data.comment}</span>
						</li>
						<li>
							<span>Сумма заказа: {data.sum} Р</span>
						</li>
					</ul>
				),
				subTitle: '',
				hasClose: true,
				// confirm: true,
				buttons: [
					{
						text: 'Перейти к оплате',
						intent: 'success',
						onClick: () => {
							console.log('====================================');
							console.log('урра');
							console.log('====================================');
						}
					}
				]
			}
		}));
		dispatch({
			type: FETCH_ORDER_SUCCESS,
			payload: data,
		});
	};
}

export function requestOrderFail(err) {
	return {
		type: FETCH_ORDER_FAILURE,
		error: err,
	};
}

export const fetchOrder = (data) => {
	return dispatch => {
		dispatch(requestOrderStart());
		return post(
			'/order',
			{...data},
			response => dispatch(requestOrderDone(response)),
			error => dispatch(requestOrderFail(error.message))
		);
	};
};



const initialState = {
	order: {},
	isFetching: false,
	error: null,
};

export default function postsReducer(state = initialState, action) {
	switch (action.type) {
		case FETCH_ORDER_REQUEST:
			return {
				...state,
				isFetching: true,
			};
		case FETCH_ORDER_SUCCESS:
			return {
				...state,
				isFetching: false,
				order: action.payload,
			};
		case FETCH_ORDER_FAILURE:
			return {
				...state,
				isFetching: false,
				error: action.error,
			};
		default:
			return state;
	}
}
