
define(['jquery', 'backbone', 'underscore', 'libdir/widget', 'libdir/libraries/model'],
function($, Backbone, _, LibdirWidget, LibraryModel) {
    return LibdirWidget.extend({
        template: 'libraries.teaser.html',
        init: function() {
            this.library = new LibraryModel();
            this.library.on('change', this.render.bind(this));
            this.library.on('change', function() {
                console.log(this.attributes);
            });

            if (this.options.libraryId) {
                this.showLibrary(this.options.libraryId);
            }
        },
        serialize: function() {
            return {
                library: this.library
            };
        },
        showLibrary: function(id) {
            this.library.loadLibrary(id);
        }
    });
});
