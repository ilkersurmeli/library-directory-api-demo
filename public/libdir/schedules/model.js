
define(['backbone', 'libdir/model'],
function(Backbone, LibdirModel) {
  return LibdirModel.extend({
    defaults: {
      date: null,
      day: 0,
      week: 0,
      opens: null,
      closes: null
    },
    shortDate: function() {
      var date = this.date();
      var day = date.getDate();
      var month = date.getMonth();
      return this.util().string.format('{0}/{1}', day, month);
    },
    date: function() {
      return new Date(this.get('date'));
    },
    isCurrent: function() {
      var now = new Date();
      var date = this.date();

      return
        now.getDate() == date.getDate() &&
        now.getMonth() == date.getMonth() &&
        now.getYear() == date.getYear();
    },
    isClosed: function() {
      var o = this.get('opens');
      return !o || !o.length;
    },
    name: function() {
      var day = this.date().getDay();
      var names = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ];
      return names[day];
    },
    shortName: function() {
      return this.name().toLowerCase().substr(0, 3);
    }
  });
});
