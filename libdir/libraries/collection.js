
define(['backbone', 'libdir/collection', 'libdir/libraries/model'],
function(Backbone, LibdirCollection, LibraryModel) {
    return LibdirCollection.extend({
        model: LibraryModel,
        init: function() {
            if (!this.options.phrase) {
                this.options.phrase = '';
            }
        },
        url: function() {
            var library_id = this.options.libraryId;
            var qs = 'q=/search/libraries&';
            qs += this.compilePhrase();
            return this.urlRoot + qs;
        },
        search: function(phrase, sections) {
            this.options.phrase = phrase;
            this.options.sections = sections;
            this.fetch({ reset: true });
        },
        compilePhrase: function() {
            var phrase = this.options.phrase;
            var qs = this.util().string.format('city*={0}*&name*={0}*', phrase);

            if (this.options.sections) {
                qs += '&with=' + this.options.sections.join(',');
            }

            return qs;
        }
    });
});
