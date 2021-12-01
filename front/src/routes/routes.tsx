import { Route, Switch } from 'react-router-dom';
//import { Home } from "../templates/home";
import { Products } from "../templates/products";
import { KindIdentity } from "../templates/kindidentity";
import { Person } from "../templates/person";
import { Units } from "../templates/units";
import { KindMovements } from "../templates/KindMovements";
import { Movements } from "../templates/movements";

import { Main } from "../templates/main";

import App from "../App";


export const Routes = () => {
    return (
        <Switch>
            
            <Route exact path="/" component={App} />
            <Route path="/dashboard" component={Main} />
            
            <Route path="*" component={()=>{ return(<div>Page 404</div>) }}/>
        </Switch>
    )
}


export const DashboardRoute = () => {
    return (
        <Switch>
            <Route exact path="/dashboard/" component={()=> <div>Dashboard</div> } />
            <Route exact path="/dashboard/maestro/kindmovements" component={KindMovements} />
            <Route exact path="/dashboard/maestro/movements" component={Movements} />
            <Route exact path="/dashboard/maestro/kindid" component={KindIdentity} />
            <Route exact path="/dashboard/maestro/person" component={Person} />
            <Route exact path="/dashboard/maestro/product" component={Products} />
            <Route exact path="/dashboard/maestro/units" component={Units} />
            <Route exact path="*" component={()=>{ return(<div>Page 404</div>) }}/>
        </Switch>
    )
}