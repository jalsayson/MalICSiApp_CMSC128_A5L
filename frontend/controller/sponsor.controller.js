'use strict';

(() => {
    angular
        .module('app')
        .controller('sponsor-controller', sponsor_controller);

    function sponsor_controller($scope, $location, $routeParams, SponsorService, GameEventService) {


    	$scope.sponsors = [];
        $scope.game_id = $routeParams.game_id;

        $scope.sponsor = {
            sponsor_id: 0,
            sponsor_name: "",
            sponsor_logo: "/",
            sponsor_type: "",
            sponsor_desc: "",
            web_address: "",
            game_id: 0
        }
        $scope.sponsorEdit = {
            sponsor_id: 0,
            sponsor_name: "",
            sponsor_logo: "/",
            sponsor_type: "",
            sponsor_desc: "",
            web_address: "",
            game_id: 0
        }

        $scope.view_profile = () => {
            window.location.href="#!/profile";
        }

        $scope.view_user = () => {
            window.location.href="#!/user";
        }

        $scope.logout = () => {
            window.location.href="#!/";
        }

        $scope.back_to_home = () => {
            window.location.href="#!/game-event";
        }

        $scope.games = [];

        $scope.reset_add_modal = () => {
            $scope.sponsor = {
                sponsor_name: "",
                sponsor_logo: "/",
                sponsor_type: "",
                sponsor_desc: "",
                web_address: "",
                game_id: 0
            }
        }


        $scope.init_sponsor = () => {
            SponsorService
            .init_sponsors($scope.game_id)
            .then(function(res) {
                $scope.sponsors = res[0];
            }, function(err) {
                console.log(err.data)   ;
            })
  
        }

        $scope.init_edit_modal = (sponsor_id) => {
            for(var i = 0; i < $scope.sponsors.length; i++) {
                if($scope.sponsors[i].sponsor_id === sponsor_id) {
                    $scope.sponsorEdit.sponsor_name = $scope.sponsors[i].sponsor_name;
                    $scope.sponsorEdit.sponsor_type = $scope.sponsors[i].sponsor_type;
                    $scope.sponsorEdit.sponsor_desc = $scope.sponsors[i].sponsor_desc;
                    $scope.sponsorEdit.web_address = $scope.sponsors[i].web_address;
                    $scope.sponsorEdit.game_id = $scope.sponsors[i].game_id;
                    $scope.sponsorEdit.sponsor_logo = $scope.sponsors[i].sponsor_logo;
                }
            }
        }

        $scope.update_sponsor = () => {
            if ($scope.sponsor.sponsor_name == "" ||
                $scope.sponsor.sponsor_type == "" ||
                $scope.sponsor.sponsor_desc == "" ||
                $scope.sponsor.web_address == "") {
                swal("Please fill up all fields");
            } else { 
                SponsorService
                    .update_sponsors($scope.sponsorEdit)
                    .then(function(res) {
                        swal("Success!", "Sponsor has been successfully edited.", "success");
                        for(var i = 0; i < $scope.sponsors.length; i++) {
                            if($scope.sponsors[i].sponsor_id === $scope.sponsorEdit.sponsor_id) {
                                $scope.sponsors[i] = JSON.parse(JSON.stringify($scope.sponsorEdit));
                            }
                        }
                    }, function(err) {
                       swal(err.message);
                    })
            }
        }

        $scope.delete_sponsor = (sponsorid) => {
        	swal({
              title: "Are you sure?",
              type: "warning",
              showCancelButton: true,
              confirmButtonColor: "#DD6B55",
              confirmButtonText: "Yes, delete it!",
              closeOnConfirm: false
            },
            function(){
	            SponsorService
	                .delete_sponsors({sponsor_id: sponsorid})
	                .then(function(res) {
	                    swal(res.message)
	                    for(var i = 0; i < $scope.sponsors.length; i++) {
	                        if($scope.sponsors[i].sponsor_id == sponsorid) {
	                            $scope.sponsors.splice(i, 1);
	                        }
	                    }
	                }, function(err) {
	                    swal(err.message)
	                });
            });
        }

        $scope.add_sponsor = () => {
            let e = document.getElementById("sponsor_type");
            let strUser = e.options[e.selectedIndex].value;
            $scope.sponsor.sponsor_type = strUser;
            if ($scope.sponsor.sponsor_name == "" ||
                $scope.sponsor.sponsor_type == "" ||
                $scope.sponsor.sponsor_desc == "" ||
                $scope.sponsor.web_address == "") {
                swal("Please fill up all fields");
                
            }
            else {
                $scope.sponsor.game_id = $routeParams.game_id;
                SponsorService
                    .add_sponsors($scope.sponsor)
                    .then(function(res) {
                        swal(res.message);
                        $scope.sponsors.push($scope.sponsor);
                    }, function(err) {  
                        swal(err.message);
                    })
            }

            $scope.sponsor = {
                sponsor_name: "",
                sponsor_logo: "/",
                sponsor_type: "",
                sponsor_desc: "",
                web_address: "",
                game_id: 0
            }
            $scope.init_sponsor();

        }
    }
})();
