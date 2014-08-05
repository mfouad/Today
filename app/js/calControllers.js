'use strict';

/* Controllers */


function agCalendar($scope)
{
	$scope.onTask = function()
	{
		
        calendar.data().push({"name":$scope.task, "start": 8, "end": 9});
        
        fixTime(calendar.data());
        calendar.data(data);
        console.log(calendar.data());
        calendar(svg);
	};
    
   
}

calApp.controller('agCalendar', ['$scope', agCalendar]);



