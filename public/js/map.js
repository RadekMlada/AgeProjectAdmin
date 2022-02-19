var age = age || {};

$(function () {
    // Google Maps Scripts
    var map = null;

    function run(propertyName, fce) {
        var instance = null;
        try {
            instance = eval(propertyName);
        }
        catch (e) {
            // ignored
        }

        if (!instance)
            setTimeout(function () { run(propertyName, fce); }, 100);
        else
            fce.call(instance);
    };
    
    function initMap() {
        run('google', function () {
            if (map) return;
            var center = new google.maps.LatLng(50.060942085585545, 14.305754638839378);
            google.maps.event.addDomListener(window, 'resize', function () {
                google.maps.event.trigger(map, "resize");
                map.setCenter(center);
            });

            var mapOptions = {
                zoom: 15,
                center: center,
                scrollwheel: false,
                styles: [{ "stylers": [{ "visibility": "on" }, { "saturation": -100 }, { "gamma": 0.54 }] }, { "featureType": "road", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "water", "stylers": [{ "color": "#4d4946" }] }, { "featureType": "poi", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi", "elementType": "labels.text", "stylers": [{ "visibility": "simplified" }] }, { "featureType": "road", "elementType": "geometry.fill", "stylers": [{ "color": "#ffffff" }] }, { "featureType": "road.local", "elementType": "labels.text", "stylers": [{ "visibility": "simplified" }] }, { "featureType": "water", "elementType": "labels.text.fill", "stylers": [{ "color": "#ffffff" }] }, { "featureType": "transit.line", "elementType": "geometry", "stylers": [{ "gamma": 0.48 }] }, { "featureType": "transit.station", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "road", "elementType": "geometry.stroke", "stylers": [{ "gamma": 7.18 }] }]
            };


            // Get the HTML DOM element that will contain your map 
            // We are using a div with id="map" seen below in the <body>
            var mapElement = document.getElementById('map');

            // Create the Google Map using out element and options defined above
            map = new google.maps.Map(mapElement, mapOptions);

            // Custom Map Marker Icon - Customize the map-marker.png file to customize your icon
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(50.060942085585545, 14.305754638839378),
                map: map,
                icon: '/images/map_marker.png'
            });

            var info = new google.maps.InfoWindow({
                content: '<div class="mapWindow">' + $('#map-text').html() + '</div>'
            });

            marker.addListener('click', function () {
                info.open(map, marker);
            });
        });
    }

    age.initMap = initMap;
});