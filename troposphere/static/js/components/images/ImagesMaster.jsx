import React from "react";
import Router from "react-router";
import DocumentMeta from 'react-document-meta';

import SecondaryImageNavigation from "./common/SecondaryImageNavigation";

import globals from "globals";


let RouteHandler = Router.RouteHandler;


const includeDocumentMeta = () => {
    let logoImage = `${window.location.origin}${globals.THEME_URL}/images/large_logo.png`,
        meta = {
            meta: {
                title: `${globals.SITE_FOOTER} - ${globals.SITE_TITLE}`,
                description: 'A cloud for data-driven scientific discovery...',
                name: {
                    keywords: ''
                },
                property: {
                    'og:title': `${globals.SITE_FOOTER} - ${globals.SITE_TITLE}`,
                    'og:image': logoImage,
                    'og:url': window.location.href,
                    'og:description': 'A cloud for data-driven scientific discovery...',
                    'og:site_name': globals.SITE_TITLE,
                }
            }
        };

    return (
        <DocumentMeta {...meta} />
    );
}


export default React.createClass({
    displayName: "ImagesMaster",

    render: function() {
        return (
        <div>
            { includeDocumentMeta() }
            <SecondaryImageNavigation currentRoute="todo-remove-this" />
            <RouteHandler/>
        </div>
        );
    }
});
