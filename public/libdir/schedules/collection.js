
define(['backbone', 'libdir/collection', 'libdir/schedules/model'],
function(Backbone, LibdirCollection, ScheduleModel) {
  return LibdirCollection.extend({
    model: ScheduleModel,
    url: function() {
      var library_id = this.options.libraryId;
      var week = this.options.week;
      var qs = this.util().string.format('q=/libraries/schedules/{0}&week={1}', library_id, week);
      return this.urlRoot + qs;
    },
    queryString: function() {
      var params = { format: 'json' };

      if (this.options.week) {
        params.week = this.options.week;
      }

      return params;
    }
  });
});
