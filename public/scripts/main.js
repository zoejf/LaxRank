$(function() {//ending Syntax has been deleted
// var $menuNational = $('#menu-national');//search button
// var $nationalList = $('#national-list');
// template: _.template($('#team-template').html());

$(document).ajaxStart(function () {
   // show loading indicator
   $.mobile.loading( 'show', {
       text: 'Loading...',
       textVisible: false,
       theme: 'b',
       html: ""
   });
});

$(document).ajaxStop(function() 
{
   // hide loading indicator
   $.mobile.loading( 'hide' );
});

  console.log('loaded');
  var teamController= { 
 
    teamTemplate: _.template($('#team-template').html()),
    

    render: function (data) {
      var $teamHtml = $(teamController.teamTemplate(data));
      $('#national-list').append($teamHtml);
    },

//setup view on home page
    all: function () {
      $.ajax ({
        type: 'GET',
        url: '/api/datapop',
        success: function (data) {
          var allTeams = data;
          // console.log(allTeams);
          _.each(allTeams, function(teamObj) {
            if(teamObj.natRank){//Smooth "IF" statement right here
            teamController.render(teamObj);
          }
          });
          // teamController.addEventHandlers();
        }
      })
      console.log("refreshed")
    },

      setupView: function() {
        teamController.all();
      }
    


  }; //end gameController
  teamController.setupView();
});
