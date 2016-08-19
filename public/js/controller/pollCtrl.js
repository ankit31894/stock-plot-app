angular.module('PollCtrl', []).controller('PollController',['$scope','$http','$routeParams', function($scope,$http,$routeParams) {
    var pollId = $routeParams.string;
    $scope.formData={
      pollId:pollId,
      optionText:''
    }
    $scope.votes=[];
    $scope.optionText=[];
    $scope.counter=0;

    $http.get("/pollDetail/"+pollId).success(function(data,status){
      console.log(data);
      $scope.options=data;
      $scope.options.forEach(function(el){
        $http({
          url: "/getvotes/"+el._id,
          method: "GET",
         }).success(function(data,status){
           $scope.counter++;
           if($scope.counter===$scope.options.length)
           c();
           el.votes=data;
        })
      })
    });
    $scope.submit=function($event){
      $event.preventDefault();
      $http({
        url: "/insertoption",
        method: "POST",
        data: $scope.formData
       }).success(function(data,status){
         console.log(data);
         data.votes=0;
        $scope.options.push(data);
        c();
      })
      return false;
    }
    $scope.clicked=function($id,obj){
      $http({
        url: "/insertvote",
        method: "POST",
        data: {optionId:$id}
       }).success(function(data,status){
         console.log(data);
         if(data.errmsg==undefined){
            obj.votes++;
            c();
          }
      })
    }

    function c(){
      $scope.optionText=$scope.options.map(function(e){
        return e.optionText;
      })
      $scope.votes=$scope.options.map(function(e){
        return e.votes;
      })
    var ctx = document.getElementById("myChart");
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: $scope.optionText,
            datasets: [{
                label: '# of Votes',
                data: $scope.votes,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });
  }

}]);
