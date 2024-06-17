export interface TenetInterface {
  id: string;
  company_name: string;
  website: string;
  client_secret?: string | null;
  contact_person_name: string;
  contact_no: string;
  subscription_detail: string;
  contact_person_no: string;
  contact_email: string;
  email: string;
  password: string;
  created_by?: string | null;
  updated_by?: string | null;
  created_at: Date;
  updated_at?: Date | null;
  is_deleted?: boolean | null;
}
