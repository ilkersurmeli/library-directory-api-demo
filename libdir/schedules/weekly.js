
define(['jquery', 'backbone', 'underscore', 'libdir/widget', 'libdir/schedules/collection'],
function($, Backbone, _, LibdirWidget, SchedulesCollection) {
    return LibdirWidget.extend({
        template: 'schedules.weekly.html',
        events: {
            'click .prev': function() {
                this.showWeek(this.week() - 1);
            },
            'click .next': function() {
                this.showWeek(this.week() + 1);
            },
            'change [name="week"]': function(event) {
                var val = $(event.currentTarget).val();
                console.log(val);
                if (this.week() != val) {
                    this.showWeek(val);
                }
            }
        },
        showLibrary: function(id, week) {
            if (week) {
                this.schedules.options.week = week;
            }

            this.schedules.options.libraryId = id;
            this.schedules.fetch({ reset: true });

        },
        showWeek: function(nr) {
            this.schedules.options.week = nr;
            this.schedules.fetch({ reset: true });
        },
        week: function() {
            return parseInt(this.schedules.options.week);
        },
        init: function() {
            this.schedules = new SchedulesCollection();
            this.schedules.on('reset', this.render.bind(this));

            var library_id = this.options.libraryId;
            var week = this.options.week;

            if (library_id) {
                this.showLibrary(library_id, week);
            }
        },
        serialize: function() {
            return {
                'week': this.schedules.options.week,
                'days': _.chain(this.schedules.models)
            }
        }
    });
});
