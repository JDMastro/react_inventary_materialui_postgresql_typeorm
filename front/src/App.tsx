/*import { DrawerUi } from "./components/drawer";
import { AppbarUi } from "./components/appbar";
import { Main } from "./templates/main";*/
//import { SideBarList } from "./templates/sidebarList";

import { LogIn } from "./templates/login";



function App() {
  //const [mobileOpen, setMobileOpen] = React.useState(false);
  
 
  /*const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  }*/


  
  return (
    <div className="App">
      {/*<DrawerUi
          handleDrawerToggle={handleDrawerToggle}
          mobileOpen={mobileOpen}
          main={<Main />}
          appBar={<AppbarUi handleDrawerToggle={handleDrawerToggle} />}
          listItems={<SideBarList />}
      />*/}

      <LogIn />
    </div>
  );
}

export default App;
