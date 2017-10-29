import React from 'react';
import PropTypes from 'prop-types';
import SideBar from 'components/SideBar/';
import ProductList from 'components/ProductList/';

import style from './styles.styl';

const MainBlock = ({
	products,
	categoryId,
	allCount,
	countView,
	categories,
	brands,
	getProducts,
	title,
	subCategoryId
}) => (
	<div className={style.MainBlock}>
		<div className={style.MainBlock__container}>
			<SideBar
				title={title}
				categories={categories}
				brands={brands}
				getProducts={getProducts}
				categoryId={categoryId}
				subCategoryId={subCategoryId}
			/>
			<div className={style.MainBlock__content}>
				<ProductList products={products} categoryId={categoryId} allCount={allCount} countView={countView}/>
			</div>
		</div>
	</div>
);

MainBlock.defaultProps = {
	products: [],
	subCategoryId: ''
};

MainBlock.propTypes = {
	products: PropTypes.array,
	categoryId: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	subCategoryId: PropTypes.string,
	allCount: PropTypes.number.isRequired,
	countView: PropTypes.number.isRequired,
	categories: PropTypes.array.isRequired,
	getProducts: PropTypes.func.isRequired,
	brands: PropTypes.array.isRequired
};

export default MainBlock;
