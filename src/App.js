import React from 'react';
import connect from '@vkontakte/vkui-connect';
import { View } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import fetchJsonp from 'fetch-jsonp';
import Home from './panels/Home';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			activePanel: 'home',
			fetchedUser: null,
			authToken : null,
			items :
[
				{
                    "id": 2320917,
                    "owner_id": -59405462,
                    "title": "Антивирус G Data InternetSecurity (дополнительно к функциям G Data AntiVirus) 5key на 3 ПК",
                    "description": "A majestic furball who adores to sleep, to purr, and to play with a computer mouse.",
                    "price": {
                        "amount": "6600",
                        "currency": {
                            "id": 643,
                            "name": "RUB"
                        },
                        "text": "6 600 руб."
                    },
                    "category": {
                        "id": 306,
                        "name": "Фильмы, музыка, программы",
                        "section": {
                            "id": 3,
                            "name": "Компьютерная техника"
                        }
                    },
                    "date": 1546199922,
                    "thumb_photo": "https://pp.userapi.com/c847121/v847121800/164783/8WPw3iVwKOk.jpg",
                    "availability": 0
                },
                {
                    "id": 250407,
                    "owner_id": -124527492,
                    "title": "Spotty",
                    "description": "A tail wagging champion, true friend and never-failing warmer.",
                    "price": {
                        "amount": "100000",
                        "currency": {
                            "id": 643,
                            "name": "RUB"
                        },
                        "text": "1,000 rub."
                    },
                    "category": {
                        "id": 1000,
                        "name": "Dogs",
                        "section": {
                            "id": 10,
                            "name": "Pets"
                        }
                    },
                    "date": 1467722851,
                    "thumb_photo": "https://pp.vk.me/c631229/v631229852/3b6e5/1OWGz65-8vw.jpg",
                    "availability": 0
                },
                {
                    "id": 250396,
                    "owner_id": -124527492,
                    "title": "First market item",
                    "description": "Description text",
                    "price": {
                        "amount": "10000",
                        "currency": {
                            "id": 643,
                            "name": "RUB"
                        },
                        "text": "100 rub."
                    },
                    "category": {
                        "id": 1,
                        "name": "Women's Clothing",
                        "section": {
                            "id": 0,
                            "name": "Fashion"
                        }
                    },
                    "date": 1467721947,
                    "thumb_photo": "https://pp.vk.me/c633819/v633819852/37ae0/7lXUEbCwYYM.jpg",
                    "availability": 0
                }
]
		};

		this.getItems = this.getItems.bind(this)
	}

	componentDidMount() {
		connect.subscribe((e) => {
			switch (e.detail.type) {
				case 'VKWebAppGetUserInfoResult':
					this.setState({ fetchedUser: e.detail.data });
					break;
				case 'VKWebAppAccessTokenReceived':
					this.setState({ authToken : e.detail.data.access_token });
					this.getItems()
					break;
				default:
					console.log(e.detail.type);
			}
		});
		connect.send('VKWebAppGetUserInfo', {});
		connect.send("VKWebAppGetAuthToken", {"app_id": 2320917, "scope": "market"});
	}

	go = (e) => {
		this.setState({ activePanel: e.currentTarget.dataset.to })
	};

	getItems() {
		const ownerId = -59405462
		let api = `https://api.vk.com/method/market.get?v=5.52&access_token=${this.state.authToken}&owner_id=-${ownerId}`
		fetchJsonp(api)
		.then(res => res.json())
		.then(data => this.setState({ items : data.response.items}))
		.catch(e => [])
	}

	render() {
		return (
			<View activePanel={this.state.activePanel}>
				<Home id="home" items={this.state.items} fetchedUser={this.state.fetchedUser} go={this.go} />
			</View>
		);
	}
}

export default App;
