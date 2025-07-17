// Database Types
export interface User {
  UserID: number;
  FirstName: string;
  LastName: string;
  Email: string;
  Password: string;
  PhoneNumber: string;
  Role: 'O' | 'S' | 'C'; // Owner, Staff, Customer
  UserStatus: 'A' | 'I'; // Active, Inactive
  Balance: number;
}

export interface Facility {
  FacilityID: number;
  FacilityName: string;
  Description: string;
  ContactPhone: string;
  ContactEmail: string;
  OpeningTime: string;
  ClosingTime: string;
  Address: string;
  Ward: string;
  District: string;
  City: string;
  Latitude: number;
  Longtitude: number;
  FacilityStatus: 'A' | 'I' | 'P'; // Active, Inactive, Pending
  OwnerID: number;
  StaffID?: number;
}

export interface Court {
  CourtID: number;
  CourtName: string;
  CourtStatus: 'A' | 'I' | 'M'; // Active, Inactive, Maintenance
  FacilityID: number;
}

export interface CourtPrice {
  CourtPriceID: number;
  DayType: 'W' | 'E'; // Weekday, Weekend
  StartTime: string;
  EndTime: string;
  CourtPriceStatus: 'A' | 'I';
  Price: number;
  CourtID: number;
}

export interface Image {
  ImageID: number;
  ImageUrl: string;
  FacilityID?: number;
  CourtID?: number;
  CourtReportID?: number;
}

// Form Types
export interface FacilityFormData {
  facilityName: string;
  description: string;
  contactPhone: string;
  contactEmail: string;
  openingTime: string;
  closingTime: string;
  address: string;
  ward: string;
  district: string;
  city: string;
  latitude?: number;
  longitude?: number;
}

export interface StaffFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  facilityID: number;
}

// Dashboard Stats
export interface DashboardStats {
  totalFacilities: number;
  totalCourts: number;
  totalStaff: number;
  activeCourts: number;
  inactiveCourts: number;
  monthlyRevenue: number;
  totalBookings: number;
}