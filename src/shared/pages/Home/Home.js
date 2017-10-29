import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { Heading } from 'chramework';
import { object, func } from 'prop-types';
import { fetchPosts, fetchPostsIfNeeded } from '../../state/modules/posts';
import Post from 'components/Post';
import BrandNote from 'components/BrandNote';
import LabBlock from 'components/LabBlock';
import ScrollIcon from 'components/ScrollIcon';
import Screen from 'components/Screen';
import styles from './style.styl';
import sections from './data.json';

export class Home extends Component {
	static displayName = 'Home';
	static propTypes = {
		posts: object,
		dispatch: func,
	};

	static fetchData({ store }) {
		return store.dispatch(fetchPosts());
	}

	componentDidMount() {
		this.props.dispatch(fetchPostsIfNeeded());
	}

	refresh = () => {
		this.props.dispatch(fetchPosts());
	};

	render() {
		return [
				<Helmet key={1} title="Главная" />,
				<Screen key={2} fullScreen={true} >
					<BrandNote />
					<div className={styles.Home__title}>
						<h1>{sections[0].title}</h1>
					</div>
					<div className={styles.Home__lab}>
						<LabBlock />
					</div>
					<div className={styles.Home__scroll}>
						<ScrollIcon />
					</div>
				</Screen>,
				<Screen key={4}>
					<BrandNote />
					<div className={styles.Home__title}>
						<h1>{sections[1].title}</h1>
					</div>
					<div className={styles.Home__lab}>
						<LabBlock />
					</div>
					<div className={styles.Home__scroll}>
						<ScrollIcon />
					</div>
				</Screen>,
				<div key={3} className="posts-list">
					{this.props.posts.list.map(p => (
						<div className="column column-30" key={p.id}>
							<Post title={p.title} body={p.body} />
						</div>
					))}
				</div>
		];
	}
}

const mapStateToProps = state => {
	return {
		posts: state.posts,
	};
};
export default connect(mapStateToProps)(Home);
