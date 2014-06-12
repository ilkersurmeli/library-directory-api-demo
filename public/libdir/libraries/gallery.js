
define(['jquery', 'backbone', 'underscore', 'libdir/widget', 'libdir/libraries/model'],
function($, Backbone, _, LibdirWidget, LibraryModel) {
  return LibdirWidget.extend({
    template: 'libraries.gallery.html',
    events: {
      'click .thumbnail': function(e) {
        var i = $(e.currentTarget).data('nr');
        this.trigger('thumbSelected', parseInt(i));
      }
    },
    init: function() {
      this.on('thumbSelected', this.showPicture.bind(this));
      this.setModel(new LibraryModel());

      if (this.options.libraryId) {
        this.showLibrary(this.options.libraryId);
      }
    },
    serialize: function() {
      return {
        library: this.library,
        current_picture: this.options.currentPicture
      };
    },
    showLibrary: function(id) {
      if (typeof id == 'object') {
        this.setModel(id);
        this.library.trigger('change');
      } else {
        this.library.loadLibrary(id);
      }
    },
    showPicture: function(i) {
      this.options.currentPicture = i;
      this.render();
    },
    setModel: function(model) {
      if (this.library) {
        this.library.off('change', this.render.bind(this));
      }

      this.library = model;
      this.library.on('change', this.render.bind(this));
    }
  });
});
