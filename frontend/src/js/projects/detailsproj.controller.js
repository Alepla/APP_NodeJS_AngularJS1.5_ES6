class DetailsProjectCtrl {
    constructor(project) {
        'ngInject';
        this.infoProj = project;
        this.rewardProj = project.rewards;
        console.log(project.rewards);
    }
}
export default DetailsProjectCtrl;