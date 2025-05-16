import { ModerationStatus, Property } from "@/types/property";

export const properties: Property[] = [
  {
    id: "1",
    title: "Modern Apartment with City View",
    description: "Luxurious apartment with panoramic city views, modern amenities, and prime location. This spacious 2-bedroom apartment features high ceilings, floor-to-ceiling windows, and premium finishes throughout. The open-concept living area flows seamlessly into a gourmet kitchen with stainless steel appliances and quartz countertops. The primary bedroom includes an ensuite bathroom with a rainfall shower and soaking tub. Building amenities include 24/7 security, fitness center, rooftop pool, and resident lounge.",
    price: 1200,
    currency: "USD",
    location: {
      city: "New York",
      district: "Manhattan",
      address: "123 Broadway St",
      coordinates: {
        latitude: 40.7128,
        longitude: -74.006,
      },
    },
    specifications: {
      area: 85,
      bedrooms: 2,
      bathrooms: 2,
      parking: 1,
    },
    amenities: ["Air Conditioning", "Elevator", "Gym", "Swimming Pool", "Security"],
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    ],
    type: "apartment",
    dealType: "rent",
    featured: true,
    verified: true,
    moderationStatus: "approved",
    owner: {
      id: "101",
      name: "John Smith",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
      phone: "+1 (555) 123-4567",
    },
    createdAt: "2023-09-15T10:30:00Z",
    updatedAt: "2023-09-15T10:30:00Z",
  },
  {
    id: "2",
    title: "Spacious Family House with Garden",
    description: "Beautiful family house with a large garden, perfect for families. This charming 4-bedroom house offers a perfect blend of comfort and style. The main floor features a welcoming living room with a fireplace, a formal dining area, and a chef's kitchen with custom cabinetry and high-end appliances. Upstairs, you'll find four generously sized bedrooms, including a primary suite with a walk-in closet and luxury bathroom. The beautifully landscaped backyard includes a covered patio, perfect for outdoor entertaining.",
    price: 450000,
    currency: "USD",
    location: {
      city: "Los Angeles",
      district: "Beverly Hills",
      address: "456 Palm Avenue",
      coordinates: {
        latitude: 34.0522,
        longitude: -118.2437,
      },
    },
    specifications: {
      area: 220,
      bedrooms: 4,
      bathrooms: 3,
      parking: 2,
    },
    amenities: ["Garden", "Fireplace", "Garage", "Balcony", "BBQ Area"],
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    ],
    type: "house",
    dealType: "sale",
    featured: true,
    verified: true,
    moderationStatus: "approved",
    owner: {
      id: "102",
      name: "Emily Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
      phone: "+1 (555) 987-6543",
    },
    createdAt: "2023-09-10T14:45:00Z",
    updatedAt: "2023-09-14T09:20:00Z",
  },
  {
    id: "3",
    title: "Luxury Villa with Ocean View",
    description: "Stunning luxury villa with breathtaking ocean views and private pool. This exceptional property offers the ultimate in luxury living with over 5,000 square feet of meticulously designed living space. The grand entrance leads to an open-concept living area with soaring ceilings and walls of glass that showcase the spectacular ocean views. The gourmet kitchen features custom cabinetry, premium appliances, and a large center island. The primary suite is a true retreat with a private terrace, spa-like bathroom, and custom walk-in closet.",
    price: 2500000,
    currency: "USD",
    location: {
      city: "Miami",
      district: "Miami Beach",
      address: "789 Ocean Drive",
      coordinates: {
        latitude: 25.7617,
        longitude: -80.1918,
      },
    },
    specifications: {
      area: 450,
      bedrooms: 5,
      bathrooms: 6,
      parking: 3,
    },
    amenities: ["Swimming Pool", "Ocean View", "Home Theater", "Wine Cellar", "Smart Home", "Private Beach Access"],
    images: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1613977257592-4a9a32f9141b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1615529182904-14819c35db37?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    ],
    type: "villa",
    dealType: "sale",
    featured: true,
    verified: false,
    moderationStatus: "pending",
    owner: {
      id: "103",
      name: "Michael Brown",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
      phone: "+1 (555) 456-7890",
    },
    createdAt: "2023-09-05T08:15:00Z",
    updatedAt: "2023-09-12T16:30:00Z",
  },
  {
    id: "4",
    title: "Modern Office Space in Business District",
    description: "Prime office space in the heart of the business district with modern amenities. This premium office space offers a professional environment with high-speed internet, conference rooms, and a reception area. The space is fully furnished with ergonomic workstations and includes access to shared amenities such as a kitchen, lounge area, and printing facilities. The building features 24/7 security, underground parking, and is conveniently located near public transportation, restaurants, and cafes.",
    price: 3500,
    currency: "USD",
    location: {
      city: "Chicago",
      district: "Downtown",
      address: "101 Business Plaza",
      coordinates: {
        latitude: 41.8781,
        longitude: -87.6298,
      },
    },
    specifications: {
      area: 150,
      bedrooms: 0,
      bathrooms: 2,
      parking: 5,
    },
    amenities: ["High-Speed Internet", "Conference Rooms", "Reception Area", "Security", "Elevator"],
    images: [
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2301&q=80",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2301&q=80",
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    ],
    type: "office",
    dealType: "rent",
    featured: false,
    verified: false,
    moderationStatus: "approved",
    owner: {
      id: "104",
      name: "Sarah Wilson",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      phone: "+1 (555) 789-0123",
    },
    createdAt: "2023-09-08T11:20:00Z",
    updatedAt: "2023-09-08T11:20:00Z",
  },
  {
    id: "5",
    title: "Cozy Studio Apartment in Historic District",
    description: "Charming studio apartment in the historic district, perfect for singles or couples. This beautifully renovated studio combines historic charm with modern conveniences. The thoughtfully designed space includes a comfortable sleeping area, a fully equipped kitchenette, and a stylish bathroom with premium fixtures. Large windows provide abundant natural light and offer views of the historic neighborhood. The building has been meticulously maintained and includes secure entry, laundry facilities, and a shared courtyard.",
    price: 850,
    currency: "USD",
    location: {
      city: "Boston",
      district: "Beacon Hill",
      address: "222 Heritage Street",
      coordinates: {
        latitude: 42.3601,
        longitude: -71.0589,
      },
    },
    specifications: {
      area: 45,
      bedrooms: 0,
      bathrooms: 1,
      parking: 0,
    },
    amenities: ["Furnished", "Laundry", "Historic Building", "Public Transport Nearby"],
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1630699144867-37acec97df5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    ],
    type: "apartment",
    dealType: "rent",
    featured: false,
    verified: false,
    moderationStatus: "rejected",
    moderationNotes: "Images do not match the description. Please provide accurate photos of the property.",
    owner: {
      id: "105",
      name: "David Lee",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
      phone: "+1 (555) 234-5678",
    },
    createdAt: "2023-09-12T09:45:00Z",
    updatedAt: "2023-09-12T09:45:00Z",
  },
  {
    id: "6",
    title: "Commercial Space in Shopping Center",
    description: "Prime commercial space in a busy shopping center with high foot traffic. This versatile commercial space offers an excellent opportunity for retail, restaurant, or service businesses. Located in a popular shopping center with established anchor tenants, the space benefits from consistent foot traffic and visibility. The unit features a large storefront with display windows, open floor plan, storage area, and employee restroom. The shopping center provides ample parking, security, and is easily accessible from major roads.",
    price: 4200,
    currency: "USD",
    location: {
      city: "San Francisco",
      district: "Marina",
      address: "333 Retail Row",
      coordinates: {
        latitude: 37.7749,
        longitude: -122.4194,
      },
    },
    specifications: {
      area: 120,
      bedrooms: 0,
      bathrooms: 1,
      parking: 10,
    },
    amenities: ["High Foot Traffic", "Storage Space", "Security", "Parking"],
    images: [
      "https://images.unsplash.com/photo-1604328698692-f76ea9498e76?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2338&q=80",
      "https://images.unsplash.com/photo-1582037928769-181cf6ea7e9f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    ],
    type: "commercial",
    dealType: "rent",
    featured: false,
    verified: false,
    moderationStatus: "pending",
    owner: {
      id: "106",
      name: "Jennifer Martinez",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1061&q=80",
      phone: "+1 (555) 345-6789",
    },
    createdAt: "2023-09-07T13:10:00Z",
    updatedAt: "2023-09-11T10:25:00Z",
  },
];

export const getPropertyById = (id: string): Property | undefined => {
  return properties.find(property => property.id === id);
};

export const getFeaturedProperties = (): Property[] => {
  return properties.filter(property => property.featured);
};

export const getPropertiesByType = (type: string): Property[] => {
  return properties.filter(property => property.type === type);
};

export const getPropertiesByDealType = (dealType: string): Property[] => {
  return properties.filter(property => property.dealType === dealType);
};

export const getPropertiesByModerationStatus = (status: ModerationStatus): Property[] => {
  return properties.filter(property => property.moderationStatus === status);
};

export const getVerifiedProperties = (): Property[] => {
  return properties.filter(property => property.verified);
};

// Function to update property moderation status
export const updatePropertyModerationStatus = (
  id: string, 
  status: ModerationStatus, 
  notes?: string
): Property | undefined => {
  const propertyIndex = properties.findIndex(property => property.id === id);
  
  if (propertyIndex === -1) {
    return undefined;
  }
  
  properties[propertyIndex] = {
    ...properties[propertyIndex],
    moderationStatus: status,
    moderationNotes: notes,
    updatedAt: new Date().toISOString(),
  };
  
  return properties[propertyIndex];
};

// Function to toggle property verification
export const togglePropertyVerification = (id: string): Property | undefined => {
  const propertyIndex = properties.findIndex(property => property.id === id);
  
  if (propertyIndex === -1) {
    return undefined;
  }
  
  properties[propertyIndex] = {
    ...properties[propertyIndex],
    verified: !properties[propertyIndex].verified,
    updatedAt: new Date().toISOString(),
  };
  
  return properties[propertyIndex];
};