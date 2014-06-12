
define(['backbone', 'libdir/model'],
function(Backbone, LibdirModel) {
  return LibdirModel.extend({
    defaults: {
      pictures: []
    },
    init: function(data, options) {
      this.options = options;
    },
    loadLibrary: function(library_id) {
      this.id = library_id;
      this.fetch({ reset: true });
    },
    url: function() {
      return this.urlRoot + 'q=/libraries/' + this.id;
    },
    picture: function(i) {
      var i = typeof i == 'undefined' ? this.get('default_picture') : i;
      var pics = this.get('pictures');
      return pics[i] ? pics[i] : null;
    },
    address: function() {
      var address = this.attributes.street_address;
      if (!address) {
        return '';
      }
      return this.util().string.format('{0}, {1}, {2}', address.street, address.zipcode, address.city);
    }
  });
});
