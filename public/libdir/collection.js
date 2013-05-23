
define(['backbone', 'libdir/util'], function(Backbone, LibdirUtil) {
    return Backbone.Collection.extend({
        initialize: function(items, options) {
            if (!options) {
                options = {};
            }

            this.options = options;
            this.urlRoot = this.model.prototype.urlRoot + 'lang=' + this.model.prototype.lang + '&';

            if (this.init) {
                this.init();
            }
        },
        util: function() {
            return LibdirUtil;
        }
    });
});
