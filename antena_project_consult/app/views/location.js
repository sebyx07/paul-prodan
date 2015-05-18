import Ember from 'ember';

export default Ember.View.extend({
  templateName: 'views/location',
  didInsertElement: function(){
    var google = window.google;
    var geocoder = new google.maps.Geocoder();
    var address = "Str. Vasile Loichita nr.1-3, Timisoara Romania";
    var latitude;
    var longitude;
    var color = "#9bc8ce"; //Set your tint color. Needs to be a hex value.

    function getGeocode() {
      geocoder.geocode( { 'address': address}, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          latitude = results[0].geometry.location.lat();
          longitude = results[0].geometry.location.lng();
          initGoogleMap();
        }
      });
    }

    function initGoogleMap() {
      var styles = [
        {
          stylers: [
            { saturation: -100 }
          ]
        }
      ];

      var options = {
        mapTypeControlOptions: {
          mapTypeIds: ['Styled']
        },
        center: new google.maps.LatLng(latitude, longitude),
        zoom: 15,
        scrollwheel: false,
        navigationControl: false,
        mapTypeControl: false,




        zoomControl: true,
        disableDefaultUI: true,
        mapTypeId: 'Styled'
      };
      var div = document.getElementById('googleMap');
      var map = new google.maps.Map(div, options);
      var marker = new google.maps.Marker({
        map:map,
        draggable:false,
        animation: google.maps.Animation.DROP,
        position: new google.maps.LatLng(latitude,longitude)
      });
      var styledMapType = new google.maps.StyledMapType(styles, { name: 'Styled' });
      map.mapTypes.set('Styled', styledMapType);

      var infowindow = new google.maps.InfoWindow({
        content: "<div class='iwContent'>"+address+"</div>"
      });
      google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map,marker);
      });


      var bounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(-45.75674478, -21.22987747),
        new google.maps.LatLng(45.75674478, 21.22987747));

      new google.maps.Rectangle({
        bounds: bounds,
        fillColor: color,
        fillOpacity: 0.2,
        strokeWeight: 0,
        map: map
      });
    }
    getGeocode();
  }
});
