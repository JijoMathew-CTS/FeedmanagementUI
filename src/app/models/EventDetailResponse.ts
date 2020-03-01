export interface EventDetailResponse{
    eventId:String;
    baseLocation:String;
    beneficiaryName:String;
    eventName:String;
    councilName:String;
    eventMonth:String;
    eventDate:Date;
    status:String;
    totalVolNo:Int16Array;
    totalVolHrs:Int16Array;
    totalTravelHrs:Int16Array;

}