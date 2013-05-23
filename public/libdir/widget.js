
define(['jquery', 'backbone', 'underscore', 'layoutmanager'], function($, Backbone, _) {
    return Backbone.Layout.extend({
        root: 'foobar',
        fetch: function(url) {
            var async = this.async();
            $.get(url, function(data) {
                async(_.template(data));
            }, 'text');
        },
        initialize: function(options) {
            if (this.init) {
                this.init();
            }
        },
        install: function(selector) {
            this.render();
            this.$el.appendTo(selector);
            return this;
        }
    });
});
