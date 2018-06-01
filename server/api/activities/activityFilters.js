/*eslint-disable*/

module.exports = {
    
    AtoBdistance: function(location1, location2, maxRange){
        
          function toRad(x) {
              return x * Math.PI / 180;
            }
        
          var lat1 = location1.position.lat; 
          var lon1 = location1.position.lng;
        
          var lat2 = location2.position.lat; 
          var lon2 = location2.position.lng;
        
          var R = 6371000; // m 
        
          var x1 = lat2-lat1;
          var dLat = toRad(x1);  
          var x2 = lon2-lon1;
          var dLon = toRad(x2);  
          var a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
                          Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * 
                          Math.sin(dLon/2) * Math.sin(dLon/2);  
          var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
          var d = R * c;
          
          var isInMaxRange;
          var distance;
          
          if(d > maxRange){
              isInMaxRange = false;
          }
          else{
              isInMaxRange = true;
          }
          
          var result = {
            distance: d,
            isInMaxRange: isInMaxRange
          };
          
          return result;
    },

    timeBox: function(timeBoxArray, selectedTime){
        function ISOtoDaySeconds(date){
            var d = new Date(date);
            var datetext = d.toTimeString();
            
            datetext = datetext.split(' ')[0]; // Take the first value from array

            var a = datetext.split(':'); // split it at the colons
            // minutes are worth 60 seconds. Hours are worth 60 minutes.
            var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]); 
        
            return seconds;
        }

        function HHandMMtoSec(timeString){
            var hms = timeString;   // input string
            var a = hms.split(':'); // split it at the colons

            // minutes are worth 60 seconds. Hours are worth 60 minutes.
            var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60;
            
            return seconds;
        }

        var time = ISOtoDaySeconds(selectedTime);
        
        var isInAny = false;
        var passedTimeframesIndex = [];
        
        timeBoxArray.forEach(function(timeframe, index) {
            var timeframeStart = HHandMMtoSec(timeframe.start);
            var timeframeEnd = HHandMMtoSec(timeframe.end);

            if(timeframeStart <= time && time <= timeframeEnd){
                isInAny = true;
                passedTimeframesIndex.push(index);
            }
            
        })
        
        var timeframes = {
        isInAny: isInAny,
        passedTimeframeIndexes: passedTimeframesIndex
        };
        
        return timeframes;

    }
}