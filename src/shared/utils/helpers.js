import _ from 'lodash';

export const pluralize = (n, forms) => {
	return forms[
		n % 10 === 1 && n % 100 !== 11
			? 0
			: n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2
	];
};
export const getExtendedList = (currentList, id, data, replace = false, remove=false) => {
	// copy list
	const list = currentList.slice();
	// find current item
	const index = _.findIndex(list, { id });
	const currentItem = index >= 0 ? list[index] : {};
	// create item with new data
	const item = _.extend({}, (replace ? {} : currentItem), data, { id });
	// insert to list
	if (remove) {
		_.remove(list, { id })
	} else {
		if (index >= 0) {
				list[index] = item;
		} else {
			list.push(item);
		}
	}
	// return updated items
	return list;
};
export const getCartList = (currentList, data, replace = false) => {
	// copy list
	const list = currentList.slice();
	// find current item
	const index = _.findIndex(list, { product: data.product });
	const currentItem = index >= 0 ? list[index] : {};
	// create item with new data
	const item = _.extend({}, (replace ? {} : currentItem), data);
	// insert to list
	if (index >= 0) {
		list[index] = item;
	} else {
		list.push(item);
	}
	// return updated items
	return list;
};

export const getExtendedCartList = (currentList, product, remove = false, del = false) => {
	// copy list
	const { id, size } = product;
	const list = currentList.slice();
	// find current item
	const index = _.findIndex(list, { id, size });
	const currentItem = index >= 0 ? list[index] : {};
	// create item with new data
	// insert to list
	
	if (index >= 0) {
		let currentCount = remove ? currentItem.count - 1 : currentItem.count + 1;
		if (currentCount < 0 || del) currentCount = 0;
		const item = _.extend({}, {
			count: currentCount,
			...product});
		list[index] = item;
	} else {
		const item = _.extend({}, { count: 1, ...product });
		list.push(item);
	}
	_.remove(list, {count: 0})
	// return updated items
	return list;
};
