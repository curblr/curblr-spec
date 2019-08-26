
import {Feature, LineString, Point} from '@turf/helpers'


export class Location {
    shstRefId:string;
    shstLocationStart:number;
    shstLocationEnd:number;
    sideOfStreet:"left"|"right";
    objectId:string;
    derivedFrom:string;
    marker:string;
    baysAngle: "parallel" | "perpendicular" | "diagonal";
    baysCount:number;
    streetName:string;
}

export class Authority {
    name:string;
    url:string;
    phone:string;
}

export class Manifest {
    createdDate:string; // should this be a full timestamp? ISO format
    lastUpdatedDate:string; // should this be a full timestamp? ISO format
    timeZone:string;
    currency:string;
    authority:Authority;
}

export class Rule  {
    activity:"parking" | "no parking" | "standing" | "no standing" | "loading" | "no loading";
    reason:string;
    maxStay:number
    noReturn:number
    payment:boolean;
    authority:Authority; // changed v1 draft spec to object to simplify inclusion in rule
}

export class DaysOfWeek {
    days:Array<"mo"|"tu"|"we"|"th"|"fr"|"sa"|"su">;
    occurrencesInMonth:Array<"1st"|"2nd"|"3rd"|"4th"|"5th"|"last">
}

export class TimesOfDay {
    from:string;
    to:string;
}

export class DesignatedPeriods {
    name:string;
    apply:"only during"|"except during";
}

export class TimeSpan {
    effectiveDates:[{to:string, from:string}];
    daysOfWeek:Array<DaysOfWeek>;
    daysOfMonth:Array<string|"even"|"odd"|"last">;
    timesOfDay:Array<TimesOfDay>;
    designatedPeriods:Array<DesignatedPeriods>
}

export class UserClass {
    class:string;
    subclasses:string[];
    maxHeight:number;
    maxLength:number;
    maxWeight:number;
    minHeight:number;
    minLength:number;
    minWeight:number;
}

export class Rates {
    fees:number[] = [];
    durations:number[] = [];
    timeSpans:TimeSpan[] = [];
}

export class Payment {
    rates:Rates;
    methods:string[] = [];
    forms:string[] = [];
    operator:string;
    phone:string;
    deviceIds:string[] = [];
}

export class Regulation {
    priority:number;
    rule:Rule;
    timeSpans:TimeSpan[] = [];
    userClasses:UserClass[] = [];
    payment:Payment;
}

export class CurbProperties {
    location:Location;
    regulations:Regulation[] = [];
}

export class CurbFeature implements Feature<LineString> {
    type:"Feature";
    geometry:LineString;
    properties:CurbProperties;
}
