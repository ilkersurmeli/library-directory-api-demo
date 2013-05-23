<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>Library Directory API Demo</title>
    <meta charset="UTF-8"/>

    <style type="text/css">
        @import url("lib/bootstrap/2.3/css/bootstrap.css");
        @import url("lib/bootstrap/2.3/css/bootstrap-responsive.css");
    </style>

    <style type="text/less">
        @import url('layout.less');
        @import url('widgets.less');
    </style>

    <script src="lib/jquery/2.0/jquery-2.0.0.min.js"></script>
    <script src="lib/bootstrap/2.3/js/bootstrap.min.js"></script>
    <script src="lib/less/1.3/less-1.3.3.min.js"></script>
    <script src="lib/require/2.1/require.js"></script>

    <script>
        requirejs.config({
            shim: {
                backbone: {
                    deps: ['underscore', 'jquery'],
                    exports: 'Backbone'
                },
                underscore: {
                    exports: '_'
                },
                layoutmanager: {
                    deps: ['backbone'],
                    exports: 'Backbone.Layout'
                }
            },
            paths: {
                'backbone': 'lib/backbone/1.0/backbone-min',
                'jquery': 'lib/jquery/2.0/jquery-2.0.0.min',
                'layoutmanager': 'lib/backbone.layoutmanager/0.8/backbone.layoutmanager',
                'underscore': 'lib/underscore/1.4/underscore-min',
            },

            // Debug: prevent caching
            urlArgs: (new Date()).getTime()
        });

        requirejs(['libdir/widget', 'libdir/model'],
        function(BaseWidget, BaseModel) {
            BaseWidget.configure({
                prefix: 'libdir/templates/'
            });

            BaseModel.setDefaultLanguage('fi');
            BaseModel.setDefaultUrlRoot('proxy.php?');
        });

        requirejs(['libdir/libraries/search', 'libdir/libraries/gallery', 'libdir/schedules/weekly'],
        function(Search, Gallery, Schedules) {
            var searchWidget = new Search();
            searchWidget.install('#library-search');

            var galleryWidget = new Gallery({
                libraryId: 'goQMRZg5TEOmxx1cibj--A'
            });
            galleryWidget.install('#library-gallery');

            var schedulesWidget = new Schedules({
                libraryId: 'goQMRZg5TEOmxx1cibj--A',
                week: 20
            });
            schedulesWidget.install('#library-schedules');

            searchWidget.on('librarySelected', galleryWidget.showLibrary.bind(galleryWidget));
            searchWidget.on('libraryIdSelected', schedulesWidget.showLibrary.bind(schedulesWidget));
        });
    </script>
</head>
<body>
    <header id="l-header">
        <h1>Widget Demos</h1>
    </header>
    <div id="l-main">
        <div class="grid">
            <div class="row-fluid">
                <div id="library-search" class="span12"></div>
            </div>
            <div class="row-fluid">
                <div id="library-gallery" class="span6"></div>
                <div id="library-schedules" class="span6"></div>
            </div>
        </div>
    </div>
    <footer id="l-footer">
        <a href="http://api.kirjastot.fi/">http://api.kirjastot.fi</a>
    </footer>
</body>
</html>
