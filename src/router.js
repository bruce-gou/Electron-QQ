import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import dynamic from "dva/dynamic";
import App from '@/routes/app/page/index';

const rootRoute = ({ history }) => {
	return (
		<Router history={history}>
			<Switch>
				<Route exact path="/" component={require('@/routes/app/page/index').default} />
				<App>
					<Switch>
						{
//							<Route exact path="/Message" component={require('@/routes/index/Message/index.js').default} />
//						<Route exact path="/MailList" component={require('@/routes/index/MailList/index.js').default} />
//						<Route exact path="/More" component={require('@/routes/index/More/index.js').default} />
						}
					</Switch>
				</App>
			</Switch>
		</Router>
	);
}

export default rootRoute;


