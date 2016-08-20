angular.module('MainCtrl', []).controller('MainController', function($scope,$http) {

	var url=window.location.href;
	var match=url.match(/ankit31894/);
	if (match===null)
		var socket = io.connect('http://127.0.0.1:8080');
	else
		var socket = io.connect('https://ankit31894-stockapp.herokuapp.com:8080');
	socket.on('add', function(data){
		$scope.error='';
		$scope.$apply();
		$scope.data.datasets.push({
			data:data.data[1],
			label:data.id
		})
		if($scope.data.labels==null)
			$scope.data.labels=data.data[0]
		$scope.myLineChart.update();
	});
	socket.on('remove', function(data){
		$scope.error='';
		$scope.$apply();
		var index=-1;
		$scope.data.datasets.forEach(function(e,i){
			if(e.label===data)
				index=i;
		})
		if(index===-1){
			$scope.error='Stock does not exist on the Graph';
			$scope.$apply()
			return;
		}
		$scope.data.datasets.splice(index,1);
		$scope.myLineChart.update();
	});
	socket.on('exception', function(data){
		$scope.error=data;
		$scope.$apply()
	});
	$scope.data={
		datasets:[]
	}
    $http({
      url: "/getall",
      method: "GET"
    }).success(function(data,status){
    	if(data.length===0){
    		$scope.plot();
			return;
    	}
    	datasets=[];   	
    	data.forEach(function(el){
    		datasets.push({
    			data:el.data[1],
    			label:el.id
    		})
    	})
    	$scope.data={
    		labels:data[0].data[0],
    		datasets:datasets
    	}
    	$scope.plot();

    });
    $scope.plot=function(){
    	var ctx = document.getElementById("myChart").getContext("2d");
    	console.log($scope.data);
		$scope.myLineChart = new Chart(ctx, {
		    type: 'line',
		    data: $scope.data,
		    options:{
			    responsive: true,
			    maintainAspectRatio: false
			}
		});

    }

	$scope.add=function($event){
		$scope.error='...Working...';
		$event.preventDefault();
		socket.emit('stockIdAdd', $scope.stockcodeadd);
		return false;
	}
	$scope.remove=function($event){
		$scope.error='...Working...';
		$event.preventDefault();
		socket.emit('stockIdRem', $scope.stockcoderem);
		return false;
	}
});
