import React from 'react';
import Backbone from 'backbone';
import stores from 'stores';
import ResourceGraphs from '../components/ResourceGraphs.react';
import SelectMenu from 'components/common/ui/SelectMenu.react';

export default React.createClass({
    propTypes: {
        provider: React.PropTypes.instanceOf(Backbone.Model),
        providerSizeList: React.PropTypes.instanceOf(Backbone.Collection),
        providerList: React.PropTypes.instanceOf(Backbone.Collection),
        providerSize: React.PropTypes.instanceOf(Backbone.Model),
        onSizeChange: React.PropTypes.func,
        onProviderChange: React.PropTypes.func
    },

    onAllocationSourceChange: function(val) {
        // This is boiler plate for later when allocationSource is a store
        // with the get() method that we would call 'val' on.
        let source = val;
        this.props.onAllocationSourceChange(source);
    },

    onProviderChange: function(val) {
        let provider = this.props.providerList.get(val);
        this.props.onProviderChange(provider);
    },

    onSizeChange: function(val) {
        let size = this.props.providerSizeList.get(val);
        this.props.onSizeChange(size);
    },

    render: function () {
        // These two Names are used by the Select component as callbacks in a map of the list provided by the list property
        let providerName = (item) => item.get('name');
        let sizeName = (item) => `${item.get('name')} (CPU: ${item.get('cpu')}, Mem: ${Math.round(item.get('mem') * 100) / 100}GB)`;
        // We are checking that we have a modal before applying the backbone methods
        // Rather than rendering a loader we will let the selects handle the null data
        let defaultProviderId;
        let sizeId;
         if (this.props.provider &&  this.props.providerSize) {
            defaultProviderId = this.props.provider.id;
            sizeId = this.props.providerSize.get('id');
         }

         const renderAllocationSource = true ? (
                <div className="form-group">
                    <label htmlFor="allocationSource">
                        Allocation Source
                    </label>
                    <SelectMenu
                        defaultId={ this.props.allocationSource.id }
                        list={ this.props.allocationSourceList }
                        optionName={ name => name.name }
                        onSelectChange={ this.onAllocationSourceChange }
                    />
                </div>
            ) : null;

        return (
            <form>
                { renderAllocationSource }
                <div className="form-group">
                    <label htmlFor="instanceName">
                        Provider
                    </label>
                    <SelectMenu
                        defaultId={defaultProviderId}
                        list={this.props.providerList}
                        optionName={providerName}
                        onSelectChange={this.onProviderChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="instanceSize">
                        Instance Size
                    </label>
                    <SelectMenu
                        defaultId={sizeId}
                        list={this.props.providerSizeList}
                        optionName={sizeName}
                        onSelectChange={this.props.onSizeChange}
                    />
                </div>
                <div className="form-group">
                    <ResourceGraphs { ...this.props }/>
                </div>
            </form>
        );
    },
});
