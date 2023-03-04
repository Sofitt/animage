import React from "react";
import ProjectSetup from "./components/project-setup/project-setup";
import ClosureSetup from "./components/closure-setup";
import ExportAnim from "./components/exportAnim"
import '../..//styles/components/menu.css'

function menu () {
    return (
        <div className='menu'>
            <ProjectSetup />
            <ClosureSetup />
            <ExportAnim />
        </div>
    )
}
export default menu
