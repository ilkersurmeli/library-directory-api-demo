
define(['backbone', 'libdir/util'], function(Backbone, LibdirUtil) {
    var m = Backbone.Model.extend({
        initialize: function() {
            this.urlRoot += 'lang=' + this.lang + '&';
            if (this.init) {
                this.init();
            }
        },
        util: function() {
            return LibdirUtil;
        }
    });

    m.setDefaultLanguage = function(lang) {
        m.prototype.lang = lang;
    };

    m.setDefaultUrlRoot = function(url) {
        m.prototype.urlRoot = url;
    };

    return m;
});
