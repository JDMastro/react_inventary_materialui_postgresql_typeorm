import { DrawerUi } from "./components/drawer";
import { AppbarUi } from "./components/appbar";
import { Main } from "./templates/main";
import React from "react";
import { SideBarList } from "./templates/sidebarList";



function App() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  
 
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  }


  
  return (
    <div className="App">
      <DrawerUi
          handleDrawerToggle={handleDrawerToggle}
          mobileOpen={mobileOpen}
          main={<Main />}
          appBar={<AppbarUi handleDrawerToggle={handleDrawerToggle} />}
          listItems={<SideBarList />}
       />
    </div>
  );
}

export default App;
