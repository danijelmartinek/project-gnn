/*eslint-disable*/

module.exports = {

    positionPointsFromPolyline: function(polyline, precision) {
        var polylineDecode = function(str, precision) {
            var index = 0,
                lat = 0,
                lng = 0,
                coordinates = [],
                shift = 0,
                result = 0,
                byte = null,
                latitude_change,
                longitude_change,
                factor = Math.pow(10, precision || 5);
        
            // Coordinates have variable length when encoded, so just keep
            // track of whether we've hit the end of the string. In each
            // loop iteration, a single coordinate is decoded.
            while (index < str.length) {
        
                // Reset shift, result, and byte
                byte = null;
                shift = 0;
                result = 0;
        
                do {
                    byte = str.charCodeAt(index++) - 63;
                    result |= (byte & 0x1f) << shift;
                    shift += 5;
                } while (byte >= 0x20);
        
                latitude_change = ((result & 1) ? ~(result >> 1) : (result >> 1));
        
                shift = result = 0;
        
                do {
                    byte = str.charCodeAt(index++) - 63;
                    result |= (byte & 0x1f) << shift;
                    shift += 5;
                } while (byte >= 0x20);
        
                longitude_change = ((result & 1) ? ~(result >> 1) : (result >> 1));
        
                lat += latitude_change;
                lng += longitude_change;
        
                coordinates.push([lat / factor, lng / factor]);
            }
        
            return coordinates;
        };

        var path = polylineDecode(polyline, precision);
    
        var start = path[0];     
        var end = path[path.length - 1];
        
        var edgePoints = {
            startPoint: {
                    position: {
                lat: start[0],
                lng: start[1]
            }
            },
            
            endPoint: {
                    position: {
                lat: end[0],
                lng: end[1]
            }
            }
        }
        
        return edgePoints
        }

}