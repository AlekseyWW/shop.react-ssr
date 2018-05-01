import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import ProductCard from 'components/ProductCard/';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import find from 'lodash/find';
import * as favoritesAction from 'actions/favorites/';
import * as productsAction from 'actions/products';
import * as paginationAction from '../../state/modules/pagination';
import Filter from 'components/Filter/';
import Preloader from 'components/Preloader/';
import qs from 'query-string';

import style from './styles.styl';

class ProductList extends Component {
	constructor(props) {
		super(props)
		this.handleClick = this.handleClick.bind(this);
	}
	handleClick(data) {
		const slug = this.props.subCategoryId ? `${this.props.categoryId}/${this.props.subCategoryId}` : `${this.props.categoryId}`;
		let pathname = ''
		if (slug) {
			if (this.props.stockId) {
				pathname = `/${this.props.stockId}/catalog/${slug}`
			} else {
				`/catalog/${slug}`
			}
		} else {
			if (this.props.stockId) {
				pathname = `/${this.props.stockId}/catalog`
			} else {
				`/catalog`
			}
		}
		const queryData = this.props.query ? { ...this.props.query, ...data } : data;
		const requestData = this.props.stockId ? { ...queryData, 'custom-category': this.props.stockId } : queryData
		
		this.props.getProducts(requestData, this.props.subCategoryId || this.props.categoryId);
		this.props.history.push({
			pathname,
			search: `${qs.stringify(queryData)}`
		})
	}
	toogleFavotite = (product) => {
		if (find(this.props.favorites, { id: product.id })) {
			this.props.removeFromFavorites(product.id)
		} else {
			this.props.addToFavorites(product)
		}
	}
	render() {
		const { sex, categoryId, allCount, products, isLoaded, isLoading, addToFavorites} = this.props;
		const count = this.props.query.count || 12;
		const offset = this.props.query.offset || 0;
		const countPage = Math.ceil(allCount / (count||12));
		const pageNum = ((parseInt(count) + parseInt(offset)) / parseInt(count)) - 1;
		
		return (
			<div className={style.ProductList}>
				<Filter categoryId={categoryId} allCount={allCount} handleChange={this.handleClick}/>
				{isLoading ?
						<div className={style.ProductList__preloader}>
							<Preloader />
						</div>:
						<div className={style.ProductList__container}>
							{products.length > 0 && isLoaded && !isLoading && products.map(product => <ProductCard sex={sex} key={product.id} {...product} toogleFavotite={() => this.toogleFavotite(product)} isFavorite={typeof find(this.props.favorites, { id: product.id }) !== 'undefined'}	 />)}
							{products.length === 0 && isLoaded && !isLoading && <p>По заданным параметрам товаров не найдено</p>}
						</div>
				}
				<div className={style.ProductList__nav}>
					<ReactPaginate
						previousLabel={'Пред.'}
						nextLabel={'След.'}
						breakLabel={<a href="">...</a>}
						breakClassName={'break-me'}
						forcePage={pageNum}
						pageCount={countPage}
						marginPagesDisplayed={2}
						pageRangeDisplayed={3}
						onPageChange={e => this.handleClick({ offset: e.selected * count, count: count })}
						containerClassName={style.ProductList__nav__pages}
						pageClassName={style.ProductList__nav__pages__item}
						activeClassName={style.ProductList__nav__pages__item_active}
						previousClassName={style.ProductList__nav__pages__item}
						nextClassName={style.ProductList__nav__pages__item}
						subContainerClassName={'pages pagination'}
					/>
				</div>
			</div>
		)
	}
};

ProductList.defaultProps = {
	products: [],
	categoryId: '',
	subCategoryId: '',
	stockId: '',
};

ProductList.propTypes = {
	products: PropTypes.array,
	categoryId: PropTypes.string,
	subCategoryId: PropTypes.string,
	stockId: PropTypes.string,
	allCount: PropTypes.number.isRequired,
	countView: PropTypes.number.isRequired
};


const mapStateToProps = (state, ownProps) => {
	let { sex } = qs.parse(ownProps.location.search);
	const { categoryId, subCategoryId, stockId } = ownProps.match.params;
	const { products, isLoaded, isLoading } = state.products;
	const { added: favorites } = state.favorites;
	const query = qs.parse(ownProps.location.search);
	return { sex, categoryId, subCategoryId, stockId, query, products, isLoaded, isLoading, favorites };
};

const mapDispatchToProps = (dispatch, ownProps) => {
	const { categoryId } = ownProps;
	return ({
		getProducts: data => dispatch(productsAction.getProducts(data, categoryId)),
		setPagination: (offset, countView) => dispatch(paginationAction.setPagination(offset, countView)),
		addToFavorites: (product) => dispatch(favoritesAction.addToFavorites(product)),
		removeFromFavorites: (productId) => dispatch(favoritesAction.addToFavorites(productId, true))
	});
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductList));
