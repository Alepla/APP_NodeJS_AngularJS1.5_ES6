class DetailsProjectCtrl {
    constructor(project) {
        'ngInject';
        this.infoProj = project;
        this.rewardProj = project.rewards;
    }
}
export default DetailsProjectCtrl;