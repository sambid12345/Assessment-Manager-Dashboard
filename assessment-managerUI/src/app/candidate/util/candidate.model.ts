export interface Candidate {
    _id?: string;  // Optional, only present for existing candidates in the database
    name: string;
    email: string;
    phone: string;
  }
  