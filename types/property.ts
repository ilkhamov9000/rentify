export type PropertyType = 
  | "apartment" 
  | "house" 
  | "villa" 
  | "office" 
  | "land" 
  | "commercial";

export type DealType = "rent" | "sale";

export type ModerationStatus = 
  | "pending" 
  | "approved" 
  | "rejected";

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  location: {
    city: string;
    district: string;
    address: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  specifications: {
    area: number;
    bedrooms: number;
    bathrooms: number;
    parking: number;
  };
  amenities: string[];
  images: string[];
  type: PropertyType;
  dealType: DealType;
  featured?: boolean;
  verified?: boolean;
  moderationStatus?: ModerationStatus;
  moderationNotes?: string;
  owner: {
    id: string;
    name: string;
    avatar?: string;
    phone?: string;
  };
  createdAt: string;
  updatedAt: string;
}