
import {Feature, LineString, Point, FeatureCollection} from '@turf/helpers'

function convertTimeSrtToMinOfDay(timeStr:string):number {
    var timeParts = timeStr.split(":");
    return (parseInt(timeParts[0]) * 60) + parseInt(timeParts[1]);
}

export function filterTimeAndDay(feature:CurbFeature, dayOfWeek:string, timeStr:string):boolean {
    for(var regulation of feature.properties.regulations) {
        if(regulation.timeSpans && regulation.timeSpans.length) {
            for(var timeSpan of regulation.timeSpans) {
                for(var day of timeSpan.daysOfWeek.days) {
                    if(day == dayOfWeek)
                        return true;
                }
            }
        }
    }
}

export class Location {
    shstRefId:string;
    shstLocationStart:number;
    shstLocationEnd:number;
    sideOfStreet:"left"|"right"|"unknown";
    objectId?:string;
    derivedFrom?:string;
    assetType?:string;
    assetSubtype?:string;
    baysAngle?: "parallel" | "perpendicular" | "diagonal";
    baysCount?:number;
    streetName?:string;
}

export class Authority {
    name?:string;
    url?:string;
    phone?:string;
}

export class Manifest {
    createdDate?:string;
    lastUpdatedDate?:string;
    priorityHierarchy:Array<string>;
    timeZone?:string;
    currency?:string;
    authority?:Authority;
}

export class Rule  {
    activity:"parking" | "no parking" | "standing" | "no standing" | "loading" | "no loading";
    priorityCategory:string;
    maxStay?:number;
    noReturn?:number;
    payment?:boolean;
    authority?:Authority;
}

export class DaysOfWeek {
    days:Array<"mo"|"tu"|"we"|"th"|"fr"|"sa"|"su">;
    occurrencesInMonth?:Array<"1st"|"2nd"|"3rd"|"4th"|"5th"|"last">
}

export class TimesOfDay {
    from:string;
    to:string;
}

export interface DesignatedPeriods {
    name:string;
    apply:"only during"|"except during";
}

export class TimeSpan {
    effectiveDates?:[{to:string, from:string}];
    daysOfWeek:DaysOfWeek;
    daysOfMonth?:Array<string|"even"|"odd"|"last">;
    timesOfDay?:Array<TimesOfDay>;
    designatedPeriods?:Array<DesignatedPeriods>
}

export class UserClass {
    class:string;
    subclasses?:string[];
    maxHeight?:number;
    maxLength?:number;
    maxWeight?:number;
    minHeight?:number;
    minLength?:number;
    minWeight?:number;
}

export class Rates {
    fees?:number[] = [];
    durations?:number[] = [];
    timeSpans?:TimeSpan[] = [];
}

export class Payment {
    rates?:Rates;
    methods?:string[] = [];
    forms?:string[] = [];
    operator?:string;
    phone?:string;
    deviceID?:string;
}

export class Regulation {
    rule:Rule;
    timeSpans?:TimeSpan[] = [];
    userClasses?:UserClass[] = [];
    payment?:Payment;
}

export class CurbProperties {
    location:Location;
    regulations:Regulation[] = [];
}

export class CurbFeature implements Feature<LineString, CurbProperties> {
    type:"Feature";
    geometry:LineString;
    properties:CurbProperties;

    constructor() {
        this.properties = new CurbProperties();
    }
}

export class CurbFeatureCollection implements FeatureCollection<LineString, CurbProperties> {
    type:"FeatureCollection";
    manifest?:Manifest;
    features:CurbFeature[] = [];
}
