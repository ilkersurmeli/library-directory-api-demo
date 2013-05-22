
define(['jquery', 'backbone', 'underscore', 'libdir/widget', 'libdir/libraries/collection'],
function($, Backbone, _, LibdirWidget, LibraryCollection) {
    return LibdirWidget.extend({
        template: 'libraries.search.html',
        events: {
            'submit': function(e) {
                e.preventDefault();
                var phrase = $(e.currentTarget).find('[name="search"]').val();
                this.search(phrase);
            },
            'click .result a': function(e) {
                var id = $(e.currentTarget).closest('.result').data('id');
                this.trigger('librarySelected', this.libraries.get(id));
            },
        },
        init: function() {
            this.libraries = new LibraryCollection();
            this.libraries.on('reset', this.render.bind(this));
        },
        serialize: function() {
            return {
                phrase: this.libraries.options.phrase,
                libraries: _.chain(this.libraries.models)
            };
        },
        search: function(phrase) {
            this.libraries.search(phrase, []);
        },
        showLibrary: function(id) {
            this.library.loadLibrary(id);
        }
    });
});
