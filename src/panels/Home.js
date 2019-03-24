import React from 'react';
import PropTypes from 'prop-types';
import { Panel, Cell, List, PanelHeader, Group, Div } from '@vkontakte/vkui';

class Home extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {

		let {
			id, items
		} = this.props

		return (
			<Panel id={id}>
				<PanelHeader>Товары</PanelHeader>
				<Group>
					<List>
						{
							items.length > 0 && items.map((item, index) => (
								<Cell
									key={index}
									before={
										<img
											style={{
												width: 150,
												height : 150,
												margin : 10
											}}
											src={item.thumb_photo}
										/>
									}
									multiline
									description={item.description}
								>
								{item.title}, {item.price.amount} {item.price.currency.name}
								</Cell>
							))
						}
						{
							items.length == 0 &&
							<Div>
								Хм, но мы не нашли товаров.
							</Div>
						}
					</List>
				</Group>
			</Panel>
		);
	}
}

Home.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
	fetchedUser: PropTypes.shape({
		photo_200: PropTypes.string,
		first_name: PropTypes.string,
		last_name: PropTypes.string,
		city: PropTypes.shape({
			title: PropTypes.string,
		}),
	}),
};

export default Home;
