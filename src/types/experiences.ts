export interface Experience {
  id: string;
  company: string;
  role: string;
  description: string;
  icon: string | { src: string; alt: string };
  status: ExperienceStatus;
  dates: string;
}

export enum ExperienceStatus {
  Active = "active",
  Inactive = "inactive",
  Incoming = "incoming",
  Paused = "paused",
}
