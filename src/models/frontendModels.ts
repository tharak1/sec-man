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

export type {siteData, shifts, guards}