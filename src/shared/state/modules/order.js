import React from 'react';
import axios from 'axios';
import { post } from 'utils/api';
import { actions } from './modal';
import { push } from 'react-router-redux';
import ModalExample from '../../components/ModalExample';

export const FETCH_ORDER_REQUEST = '@ORDER/FETCH_ORDER_REQUEST';
export const FETCH_ORDER_SUCCESS = '@ORDER/FETCH_ORDER_SUCCESS';
export const FETCH_ORDER_FAILURE = '@ORDER/FETCH_ORDER_FAILURE';

export function requestOrderStart() {
	return { type: FETCH_ORDER_REQUEST };
}

export function requestOrderDone(data, redirect) {
	return dispatch => {
		// dispatch(actions.openModal({
		// 	modalType: ModalExample,
		// 	modalProps: {
		// 		title: `Заказ ${data.id}`,
		// 		status: 'order',
		// 		text: (
		// 			<ul>
		// 				<li>
		// 					<span>E-mail: {data.email}</span>
		// 					<span>Телефон: {data.phone}</span>
		// 				</li>
		// 				<li>
		// 					<span>Имя: {data.firstName}</span>
		// 					<span>Фамилия: {data.firstName}</span>
		// 				</li>
		// 				<li>
		// 					<span>Адрес: {data.city.name}, {data.address}, {data.aprtaments}, {data.postIndex}</span>
		// 				</li>
		// 				<li>
		// 					<span> Коментарий: {data.comment}</span>
		// 				</li>
		// 				<li>
		// 					<span>Сумма заказа: {data.sum} Р</span>
		// 				</li>
		// 			</ul>
		// 		),
		// 		subTitle: '',
		// 		hasClose: true,
		// 		// confirm: true,
		// 		buttons: [
		// 			{
		// 				text: 'Перейти к оплате',
		// 				intent: 'success',
		// 				onClick: () => {
		// 					const url = `http://test-api-shop.abo-soft.com/payment-url/order/${data.id}`
		// 					axios({
		// 						method: 'get',
		// 						url,
		// 					})
		// 						.then(res => {
		// 							const { data } = res;
		// 							if (typeof data === 'string') {
		// 								window.location = data
		// 							}
		// 						})
		// 						.catch(err => {
		// 							console.log(err.message);
		// 						});
		// 				}
		// 			}
		// 		]
		// 	}
		// }));
		
		if (redirect) {
			dispatch(push('/checkout'));
		}
		
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

export const fetchOrder = (data, redirect=true) => {
	return dispatch => {
		dispatch(requestOrderStart());
		return post(
			'/order',
			{...data},
			response => dispatch(requestOrderDone(response, redirect)),
			error => dispatch(requestOrderFail(error.message))
		);
	};
};



const initialState = {
	order: undefined,
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
			localStorage.setItem("order", JSON.stringify(action.payload));
			
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
