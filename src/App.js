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
                    "description": "Являемся официальными поставщиками, группа компаний Бегущая Помощь, свой интернет магазин, цены ниже, ключи получаете лицензионные, работаем с юридическими лицами по всей России. Ответить можем прямо на странице поиска в Яндексе. 5 ключей, каждый на 3 компьютера для ОС Windows. Являемся официальными поставщиками, группа компаний Бегущая Помощь, свой интернет магазин, цены ниже, ключи получаете лицензионные, работаем с юридическими лицами по всей России. Ответить можем прямо на странице поиска в Яндексе",
                    "price": {
                        "amount": "660000",
                        "currency": {
                            "id": 643,
                            "name": "руб."
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
                    "availability": 0,
                },
                {
                    "id": 2320916,
                    "owner_id": -59405462,
                    "title": "Антивирус G Data InternetSecurity (дополнительно к функциям G Data AntiVirus) 2key на 3 ПК",
                    "description": "Являемся официальными поставщиками, группа компаний Бегущая Помощь, свой интернет магазин, цены ниже, ключи получаете лицензионные, работаем с юридическими лицами по всей России. Ответить можем прямо на странице поиска в Яндексе. 2 ключа, каждый на 3 компьютера для ОС Windows. Являемся официальными поставщиками, группа компаний Бегущая Помощь, свой интернет магазин, цены ниже, ключи получаете лицензионные, работаем с юридическими лицами по всей России. Ответить можем прямо на странице поиска в Яндексе.",
                    "price": {
                        "amount": "272000",
                        "currency": {
                            "id": 643,
                            "name": "руб."
                        },
                        "text": "2 720 руб."
                    },
                    "category": {
                        "id": 306,
                        "name": "Фильмы, музыка, программы",
                        "section": {
                            "id": 10,
                            "name": "Компьютерная техника"
                        }
                    },
                    "date": 1546199829,
                    "thumb_photo": "https://pp.userapi.com/c848628/v848628800/f181e/owNCp2w9VWc.jpg",
                    "availability": 0
                },
                {
                    "id": 2320915,
                    "owner_id": -59405462,
                    "title": "Антивирус G Data InternetSecurity (дополнительно к функциям G Data AntiVirus) 1key на 3 ПК",
                    "description": "1 ключ на 3 компьютера для ОС Windows",
                    "price": {
                        "amount": "140000",
                        "currency": {
                            "id": 643,
                            "name": "руб."
                        },
                        "text": "1 400 руб."
                    },
                    "category": {
                        "id": 306,
                        "name": "Фильмы, музыка, программы",
                        "section": {
                            "id": 3,
                            "name": "Компьютерная техника"
                        }
                    },
                    "date": 1546199757,
                    "thumb_photo": "https://pp.userapi.com/c849128/v849128800/fd1f2/S3miXmNM7To.jpg",
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
		connect.send("VKWebAppGetAuthToken", {"app_id": 59405462, "scope": "market"});
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
		.catch(e => [10])
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
