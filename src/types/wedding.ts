export interface RSVPData {
  id: string;
  name: string;
  phone: string;
  attending: 'yes' | 'no';
  guestCount: number;
  message?: string;
  timestamp: string;
}

export interface WishComment {
  id: string;
  author: string;
  relationship: string; // e.g. "صديق العريس", "عائلة العروس"
  message: string;
  emoji: string;
  likes: number;
  timestamp: string;
}

export interface VenueInfo {
  name: string;
  city: string;
  district: string;
  fullAddress: string;
  mapsUrl: string;
  wazeUrl: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}
