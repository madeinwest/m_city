import React from 'react';
import Layout from './Hoc/Layout'
import PrivateRoute from './Components/authRoutes/privateRoutes'
import PublicRoute from './Components/authRoutes/publicRoutes'
import {Switch, Route} from 'react-router-dom'
import NotFound from './Components/ui/not_found'
import Home from './Components/Home'
import SignIn from './Components/signin'
import Dashboard from './Components/admin/Dashboard'
import AdminMatches from './Components/admin/matches'
import AddEditMatch from './Components/admin/matches/addEditMatch'
import AdminPlayers from './Components/admin/players'
import addEditPlayers from './Components/admin/players/addEditPlayers'
import TheTeam from './Components/theTeam'
import TheMatches from './Components/theMatches'
const Routes = (props) => {
	return (
		<Layout>
			<Switch>
				<PrivateRoute {...props} path='/admin_players/add_players' exact component={addEditPlayers}/>
				<PrivateRoute {...props} path='/admin_players/add_players/:id' exact component={addEditPlayers}/>
				<PrivateRoute {...props} path='/admin_players' exact component={AdminPlayers}/>
				<PrivateRoute {...props} path='/admin_matches/edit_match' exact component={AddEditMatch}/>
				<PrivateRoute {...props} path='/admin_matches/edit_match/:id' exact component={AddEditMatch}/>
				<PrivateRoute {...props} path='/admin_matches' exact component={AdminMatches}/>
				<PrivateRoute {...props} path='/dashboard' exact component={Dashboard}/>
				<PublicRoute {...props} restricted={true} path="/sign_in" exact component={SignIn} />
				<PublicRoute {...props} restricted={false} path="/the_team" exact component={TheTeam} />
				<PublicRoute {...props} restricted={false} path="/the_matches" exact component={TheMatches} />
				<PublicRoute {...props} restricted={false} component={NotFound} />
			</Switch>
		</Layout>
	)
}
export default Routes
