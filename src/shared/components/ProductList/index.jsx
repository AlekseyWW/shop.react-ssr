import React from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import ProductCard from 'components/ProductCard/';
import Filter from 'components/Filter/';

import style from './styles.styl';

const ProductList = ({ products, categoryId, allCount, countView }) => (
	<div className={style.ProductList}>
		<Filter categoryId={categoryId} allCount={allCount} />
		<div className={style.ProductList__container}>
			{ products.map(product => <ProductCard key={product.id} {...product} sm/>)}
		</div>
		{/* <div className={style.ProductList__nav}>
			<ReactPaginate
				previousLabel={'Пред.'}
				nextLabel={'След.'}
				breakLabel={<a href="">...</a>}
				breakClassName={'break-me'}
				pageCount={Math.floor(allCount / countView) + 1}
				marginPagesDisplayed={2}
				pageRangeDisplayed={3}
				onPageChange={e => getProducts({ offset: e.selected * countView, count: countView })}
				containerClassName={style.ProductList__nav__pages}
				pageClassName={style.ProductList__nav__pages__item}
				activeClassName={style.ProductList__nav__pages__item_active}
				previousClassName={style.ProductList__nav__pages__item}
				nextClassName={style.ProductList__nav__pages__item}
				subContainerClassName={'pages pagination'}
			/>
		</div> */}
	</div>
);

ProductList.defaultProps = {
	products: []
};

ProductList.propTypes = {
	products: PropTypes.array,
	categoryId: PropTypes.string.isRequired,
	allCount: PropTypes.number.isRequired,
	countView: PropTypes.number.isRequired
};

export default ProductList;
