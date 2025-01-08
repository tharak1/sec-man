interface siteData{
  _id?: string;
  name: string;
  address:string,
  location: string;
  ownedBy: string;
  ownerContactNumber: string;
  shifts: Array<shifts>;
  guards?: Array<guards>;
}

interface shifts{
  shift: string;
  shiftTimings: string;
}

interface guards{
  _id?: string;
  name: string;
  phno: string;
  site: string;
  shift: string;
  shiftTimings: string;
}

interface AcceptedGuard {
  _id?:string;
  name: string;
  phno: string;
}

interface Surge {
  _id?:string,
  siteId?: string;
  name: string;
  Address: string;
  location: string;
  date:string;
  shift: string;
  shiftTimings: string; 
  reason: string;
  requiredGuards: number;
  acceptedGuards?: AcceptedGuard[];
}

interface surge {
  _id?:string,
  siteId?: string;
  name: string;
  Address: string;
  location: string;
  date:string;
  shift: string;
  shiftTimings: string; 
  reason: string;
  requiredGuards: number;
  acceptedGuards?: AcceptedGuard[];
}

interface users{
  _id?: string;
  name: string;
  phno: string;
  isAdmin:boolean;
  site: string;
  shift: string;
  shiftTimings: string;
  acceptedSurgeRequests?: AcceptedSurgeRequests[];
}

interface AcceptedSurgeRequests{
  _id?:string;
  surgeId:string;
  name:string;
  address:string;
  date:string;
  location:string;
  shift:string;
  shiftTimings:string;
}


export type { siteData, shifts, guards, AcceptedGuard, Surge, users, surge, AcceptedSurgeRequests }