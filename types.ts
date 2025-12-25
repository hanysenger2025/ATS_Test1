
export interface School {
  id: number;
  name: string;
  governorate: string;
  city: string;
  specialty: string;
  address: string;
  gender: 'بنين' | 'بنات' | 'مشترك';
  acceptanceRegions: string;
  lat: number;
  lng: number;
  industrialPartner: string;
  academicPartner?: string;
  startDate: string;
  establishedYears: number | string;
  status: string;
  insideFactory: boolean;
  mapUrl?: string;
  notes?: string;
}

export type FilterState = {
  governorate: string;
  gender: string;
  search: string;
};