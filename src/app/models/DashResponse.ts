export interface DashResponse {
    noOfEvents      : string;
    noOfVolunteers  : string;
    //positiveFeedback: string;
    //negativeFeedback: string;
    positiveFeedback: number;
    negativeFeedback: number;

    excellentPer :number;
    goodPer      :number;
    averagePer   :number;
    fairPer      :number;
    poorPer      :number;

}