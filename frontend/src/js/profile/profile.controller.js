class ProfileCtrl {
  constructor(profile, User, projects, invested,aidspart, $scope, $state,subscribe,Profile,Toastr,$timeout) {
    'ngInject';
    
    this._$scope = $scope;
    this.profile = profile;
    this.proofAids = [];
    this.acceptAids = [];
    this.waitAids = [];
    this.aidsParticiped = [];

    projects.forEach((element,index) => {
      if(element.media[0]){
          if(element.media[0].split('-')[0] === 'image')
              projects[index].image = element.media[0].split('-')[1];
          else
              projects[index].video = element.media[0].split('-')[1];
      }
      projects[index].resdesc = projects[index].desc.substr(0,201) + "...";
      element.aids.map((aid) => {
        if(aid.state === 2){
          aid.project = projects[index]._id;
          aid.nameproject = projects[index].name;
          this.proofAids.push(aid)
        }else if(aid.state === 1){
          aid.nameproject = projects[index].name;
          this.acceptAids.push(aid)
        }else{
          aid.nameproject = projects[index].name;
          this.waitAids.push(aid)
        }
      })
    });
    
    invested.forEach((element,index) => {
      if(element.media[0]){
          if(element.media[0].split('-')[0] === 'image')
            invested[index].image = element.media[0].split('-')[1];
          else
            invested[index].video = element.media[0].split('-')[1];
      }
      invested[index].resdesc = invested[index].desc.substr(0,201) + "...";
    });

    subscribe.forEach((element,index) => {
      if(element.media[0]){
          if(element.media[0].split('-')[0] === 'image')
          subscribe[index].image = element.media[0].split('-')[1];
          else
          subscribe[index].video = element.media[0].split('-')[1];
      }
      subscribe[index].resdesc = subscribe[index].desc.substr(0,201) + "...";
    });

    aidspart.map((element,index)=>{
      element.aids.map((aid)=>{
        if(aid.state === 1 && aid.user === User.current.id){
          aid.nameproject = aidspart[index].name;
          this.aidsParticiped.push(aid)
        }
      })
    })

    this.myProjects = projects;
    this.investedProj = invested;
    this.subscribeProj = subscribe;

    this.personalProjects = true;
    this.invertedProjects = false;
    this.subscribeProjects = false;
    this.myAids = false; 
    this.participedAids = false;

    if (User.current) {
      this.isUser = (User.current.username === this.profile.username);
    } else {
      this.isUser = false;
    }

    this.seePersonalProjects = function() {
      this.invertedProjects = false;
      this.subscribeProjects = false;
      this.personalProjects = true;
    }
 
    this.seeInvertedProjects = function() {
      this.invertedProjects = true;
      this.personalProjects = false;
      this.subscribeProjects = false;
    }

    this.logOut = User.logout.bind(User);

    this._$scope.seeProj = function() {
      if(this.project){
        $state.go('app.detailsproject', {slug: this.project['slug'] });
      }else if(this.invest){
          $state.go('app.detailsproject', {slug: this.invest['slug'] });
      }else{
        $state.go('app.detailsproject', {slug: this.subscribe['slug'] });
      }
    }

    this._$scope.updateProj = function() {
      $state.go('app.updateproj', { slug: this.project['slug'] });
    }

    this._$scope.unsuscribeProj = function(){
      let info = {project:this.subscribe['slug'],user:User.current.id};
      Profile.unsubscribe(info).then((response) => {
        if(response.data.res){
          Toastr.showToastr(
            'success',
            'Correctly unsuscribe'
          );
          $timeout( function(){
            $state.go('app.home');
          }, 1000 );
        }else{
          Toastr.showToastr(
            'error',
            'Error'
          );
        }
      });
    }

    this.acceptAid = (info) => {
      Profile.acceptAid(info).then((response) => {
        console.log(response.data);
        if (!response.data.error){
          Toastr.showToastr(
              'success',
              'You are accept the aid'
          );
          $timeout( function(){
              $state.go('app.home');
          }, 2000 );
        }else{
            console.log(response.data.error)
            Toastr.showToastr(
                'error',
                'Error to accept the aid'
            );
        }
      });
    };
    this.cancelAid = (info) => {
      Profile.cancelAid(info).then((response) => {
        console.log(response.data);
        if (!response.data.error){
          Toastr.showToastr(
              'success',
              'You are cancel the aid'
          );
          $timeout( function(){
              $state.go('app.home');
          }, 2000 );
        }else{
            console.log(response.data.error)
            Toastr.showToastr(
                'error',
                'Error to cancel the aid'
            );
        }
      });
    }
  }
}


export default ProfileCtrl;


/*
class ProfileCtrl {
 constructor(profile, User, projects) {
   'ngInject';

   this.profile = profile;
   this.myProjects = projects;

   this.personalProjects = true;
   this.invertedProjects = false;

   this.seePersonalProjects = function() {
     this.invertedProjects = false;
     this.personalProjects = true;
   }

   this.seeInvertedProjects = function() {
     this.invertedProjects = true;
     this.personalProjects = false;
   }

   if (User.current) {
     this.isUser = (User.current.username === this.profile.username);
   } else {
     this.isUser = false;
   }

 }
}


export default ProfileCtrl;


*/
