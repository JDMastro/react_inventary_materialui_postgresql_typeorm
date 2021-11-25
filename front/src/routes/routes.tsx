import { Route, Switch } from 'react-router-dom';
//import { Home } from "../templates/home";
import { Products } from "../templates/products";
import { KindIdentity } from "../templates/kindidentity";
import { Person } from "../templates/person";
import { Units } from "../templates/units";
import { KindMovements } from "../templates/KindMovements";
import { Movements } from "../templates/movements";


export const DashboardRoute = () => {
    return (
        <Switch>
            <Route exact path="/" component={()=> <div>Dashboard</div>} />
            <Route exact path="/maestro/kindmovements" component={KindMovements} />
            <Route exact path="/maestro/movements" component={Movements} />
            <Route exact path="/maestro/kindid" component={KindIdentity} />
            <Route exact path="/maestro/person" component={Person} />
            <Route exact path="/maestro/product" component={Products} />
            <Route exact path="/maestro/units" component={Units} />
            <Route path="*" component={()=>{ return(<div>Page 404</div>) }}/>
        </Switch>
    )
}