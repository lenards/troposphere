import React from 'react';
import Backbone from 'backbone';
import stores from 'stores';
import actions from 'actions';
import TagMultiSelect from 'components/common/tags/TagMultiSelect.react';


export default React.createClass({
    displayName: "Tags",

    propTypes: {
        onTagAdded: React.PropTypes.func.isRequired,
        onTagRemoved: React.PropTypes.func.isRequired,
        onTagCreated: React.PropTypes.func.isRequired,
        imageTags: React.PropTypes.instanceOf(Backbone.Collection)
    },

    getInitialState: function () {
      return {
        tags: null,
        query: "",
                newTagName: "",
                newTagDescription: "",
                showTagCreateForm: false
      }
    },

    componentDidMount: function() {
        stores.TagStore.addChangeListener(this.updateState);
        this.updateState();
    },

    componentWillUnmount: function() {
        stores.TagStore.removeChangeListener(this.updateState);
    },

    updateState: function() {
        this.setState({
            tags: stores.TagStore.getAll(),
        });
    },


    createTagAndAddToImage: function() {
        var newTag = actions.TagActions.create({
            name: this.state.newTagName,
            description: this.state.newTagDescription
        });
        this.props.onTagAdded(newTag);
        this.setState({newTagName: "", newTagDescription: "", showTagCreateForm: false});
    },

    onQueryChange: function (query) {
      this.setState({query: query.toLowerCase()});
    },

    onNewTagNameChange: function(name){
        this.setState({newTagName: name.target.value});
    },

    onNewTagDescriptionChange: function(description){
        this.setState({newTagDescription: description.target.value});
    },

    isSubmittable: function(){
        return this.state.newTagName && this.state.newTagDescription;
    },

    onCreateNewTag: function(tagName) {
        this.setState({
            newTagName: tagName,
            showTagCreateForm: true
        });
    },

    filterTags: function (image_tags) {
        image_tags = image_tags.filter(function (tag) {
              return tag.get('allow_access') === true;
        });
        image_tags = new Backbone.Collection(image_tags);
        return image_tags;
    },
    render: function () {
      var imageTags = this.props.imageTags,
        tags = this.state.tags,
        query = this.state.query,
                tagCreateForm = null;

            if(this.state.showTagCreateForm){
                tagCreateForm = (
                    <div className="form-group">
                        <label htmlFor="tag-create" className="control-label">Create new tag</label>
                        <form>
                            {"Name:"}<br />
                            <input className="form-control" type="text" onChange={this.onNewTagNameChange} value={this.state.newTagName} /><br />
                            {"Description:"}<br />
                            <textarea className="form-control" type="text" onChange={this.onNewTagDescriptionChange} value={this.state.newTagDescription} /><br />
                        </form>
                        <button disabled={!this.isSubmittable()} onClick={this.createTagAndAddToImage}
                            className="btn btn-primary btn-sm pull-right">
                            {"Create and add"}
                        </button>
                    </div>
                );
            }

      if (!imageTags) return <div className="loading"/>;

      if (!tags) return <div className="loading"/>;
      let filteredImageTags = this.filterTags(imageTags);
      let filteredTags = this.filterTags(tags);
      if (query) {
        filteredTags = filteredTags.filter(function (tag) {
          return tag.get('name').toLowerCase().indexOf(query) >= 0;
        });
        filteredTags = new Backbone.Collection(filteredTags);
      }

      return (
        <div className="form-group" style={{marginBottom:"30px"}}>
          <label htmlFor="tags" className="control-label">Image Tags</label>

          <div className="tagger_container">
            <div className="help-block">
              {"Please include tags that will help users decide whether this image will suit their"}
              {"needs. You can include the operating system, installed software, or configuration information. E.g."}
              {"Ubuntu, NGS Viewers, MAKER, QIIME, etc."}
            </div>
            <div className="help-block">
              {"For your convenience, we've automatically added the tags that were already on the instance."}
            </div>
            <TagMultiSelect
              models={filteredTags}
              activeModels={filteredImageTags}
              onCreateNewTag={this.onCreateNewTag}
              onModelAdded={this.props.onTagAdded}
              onModelRemoved={this.props.onTagRemoved}
              onModelCreated={this.props.onTagCreated}
              onQueryChange={this.onQueryChange}
              width={"100%"}
              placeholderText="Search by tag name..."
              />
            {tagCreateForm}
          </div>
        </div>
      );
    }
});
