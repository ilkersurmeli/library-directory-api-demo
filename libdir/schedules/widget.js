
define(['jquery', 'backbone', 'underscore', 'libdir/widget', 'libdir/schedules/collection'],
function($, Backbone, _, LibdirWidget, SchedulesCollection) {
    return LibdirWidget.extend({
        template: 'schedules.html',
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
        showWeek: function(nr) {
            this.schedules.options.week = nr;
            this.schedules.fetch({
                reset: true,
                success: function() {
//                     console.log('OK');
                },
                error: function() {
                    console.log('ERROR');
                }
            });
        },
        week: function() {
            return parseInt(this.schedules.options.week);
        },
        init: function() {
            var library_id = this.options.libraryId;

            this.schedules = new SchedulesCollection([], {
                libraryId: this.options.libraryId,
                week: 20
            });

            this.schedules.on('reset', this.render.bind(this));
            this.showWeek(20);
        },
        serialize: function() {
            return {
                'week': this.schedules.options.week,
                'days': _.chain(this.schedules.models)
            }
        }
    });
});
