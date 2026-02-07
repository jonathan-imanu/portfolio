export interface Experience {
  id: string;
  company: string;
  role: string;
  description: string;
  icon: string | { src: string; alt: string };
  status: "active" | "inactive" | "incoming";
  dates: string;
}
