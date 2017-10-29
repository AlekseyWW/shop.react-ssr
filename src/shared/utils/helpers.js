import _ from 'lodash';

export const getExtendedList = (currentList, id, data, replace = false) => {
	// copy list
	const list = currentList.slice();
	// find current item
	const index = _.findIndex(list, { id });
	const currentItem = index >= 0 ? list[index] : {};
	// create item with new data
	const item = _.extend({}, (replace ? {} : currentItem), data, { id });
	// insert to list
	if (index >= 0) {
		list[index] = item;
	} else {
		list.push(item);
	}
	// return updated items
	return list;
};

export const getExtendedCartList = (currentList, product, remove = false) => {
	// copy list
	const { id, price } = product;
	const list = currentList.slice();
	// find current item
	const index = _.findIndex(list, { id });
	const currentItem = index >= 0 ? list[index] : {};
	// create item with new data
	// insert to list
	if (index >= 0) {
		const item = _.extend({}, {
			count: remove ? currentItem.count - 1 : currentItem.count + 1,
			price }, { id });
		list[index] = item;
	} else {
		const item = _.extend({}, { count: 1, price }, { id });
		list.push(item);
	}
	// return updated items
	return list;
};
