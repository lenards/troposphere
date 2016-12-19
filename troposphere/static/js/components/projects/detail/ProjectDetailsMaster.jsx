import React from "react";

import SecondaryProjectNavigation from "../common/SecondaryProjectNavigation";
import stores from "stores";


export default React.createClass({
    displayName: "ProjectDetailsMaster",

    render: function() {
        var project = stores.ProjectStore.get(Number(this.props.params.projectId));

        if (!project) {
            return (
            <div className="loading"></div>
            )
        }

        return (
        <div className="project-details">
            <SecondaryProjectNavigation project={project} currentRoute="todo-remove-this" />
            {this.props.children}
        </div>
        );
    }
});
