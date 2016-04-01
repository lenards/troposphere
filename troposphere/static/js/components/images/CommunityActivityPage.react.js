import React from 'react';
import stores from 'stores';
import MaintenanceMessageList from 'components/dashboard/MaintenanceMessageList.react';

export default React.createClass({
    displayName: "CommunityActivityPage",

    renderBody: function () {
        var images = stores.ImageStore.getAll(),
            maintenanceMessages = stores.MaintenanceMessageStore.getAll();

        if (!images || !maintenanceMessages) {
            return <div className='loading'></div>;
        }

        return (
            <div className="col-md-12 community-activity">
                <MaintenanceMessageList
                    messages={maintenanceMessages}
                    images={images}/>
            </div>
        );
    },

    render: function () {
        return (
            <div className="container">
                {this.renderBody()}
            </div>
        );
    }

});
