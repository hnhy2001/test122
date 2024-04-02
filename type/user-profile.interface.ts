import { ICompany } from "./company.interface";
import { ICountry } from "./country.interface";
import { IJobExpertise } from "./job_expertise.interface";
import { ILevel } from "./level.interface";
import { IReason } from "./reason.interface";
import { IRepresentative } from "./representative.interface";

export interface IUserProfile {
  id: string;
  first_name: string;
  last_name: string;
  country: ICountry;
  level: ILevel;
  job_expertise: IJobExpertise;
  reason: IReason;
  email: string;
  company: ICompany;
  updated_at: string;
  created_at: string;
  code: string;
  representative: IRepresentative;
  avatar: string;
  role: string;
}