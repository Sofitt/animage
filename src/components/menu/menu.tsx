import React from "react";
import ProjectSetup from "./components/project-setup/project-setup";
import ClosureSetup from "./components/closure-setup";
import '../../assets/styles/menu.css'

function menu () {
    return (
        <div className='menu'>
            <ProjectSetup />
            <ClosureSetup />
        </div>
    )
}
export default menu
