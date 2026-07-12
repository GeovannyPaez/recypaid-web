export type OrganizationStatus = "PENDING" | "ACTIVE" | "SUSPENDED" | "INACTIVE";
export type OrganizationType = "ECA" | "COOPERATIVE" | "ENTERPRISE" | "NGO";
export type EmploymentType = "EMPLOYEE" | "CONTRACT" | "COOPERATIVE" | "VOLUNTEER";
export type OrganizationMaterialPriceBy = "UNIT" | "KILO";
export type OrganizationOrderStatus =
  | "PENDING"
  | "CANCELED"
  | "ACCEPTED"
  | "REJECTED"
  | "COMPLETED"
  | "PICKER_ARRIVED"
  | "USER_ON_WAY";
export type OrganizationOrderType = "SALE" | "DONATION";

export type Organization = {
  id: string;
  profileId: string;
  locationId: string;
  location: {
    latitude: number;
    longitude: number;
  };
  businessName: string;
  taxId?: string | null;
  status: OrganizationStatus;
  organizationType: OrganizationType;
  canBuyMaterials: boolean;
  canManageRoutes: boolean;
  createdAt: string;
  updatedAt: string;
};

export type OrganizationCoverage = {
  id: string;
  organizationId: string;
  name: string;
  contactName?: string | null;
  contactEmail: string;
  contactPhone?: string | null;
  address: string;
  city?: string | null;
  latitude: number;
  longitude: number;
  clientType: string;
  scheduleFrequency: string;
  preferredDays: string[];
  preferredTimeSlot?: string | null;
  isActive: boolean;
  createdAt: string;
};

export type OrganizationPickerBaseProfile = {
  name: string;
  lastname: string;
  city?: string | null;
  phone: string;
  pictureUrl?: string | null;
  user: {
    email: string;
  };
};

export type OrganizationPickerMember = {
  id: string;
  organizationId: string;
  pickerId: string;
  employmentType: EmploymentType;
  isActive: boolean;
  canDoPublicOrders: boolean;
  canDoPrivateRoutes: boolean;
  joinedAt: string;
  leftAt?: string | null;
  createdAt: string;
  updatedAt: string;
  picker: {
    userId: string;
    status: string;
    isBusy: boolean;
    profile?: OrganizationPickerBaseProfile | null;
  };
};

export type OrganizationAvailablePicker = {
  userId: string;
  status: string;
  isBusy: boolean;
  createdAt: string;
  updatedAt: string;
  profile?: OrganizationPickerBaseProfile | null;
};

export type OrganizationMaterialPriceMaterial = {
  id: string;
  name: string;
  description?: string | null;
  priceBy: OrganizationMaterialPriceBy;
  isAvailable: boolean;
  icon?: string | null;
  type?: string;
  code?: string | null;
};

export type OrganizationMaterialPrice = {
  id: string;
  organizationId: string;
  materialId: string;
  technicalMaterialId?: string;
  buyPrice: number;
  sellPrice?: number | null;
  priceBy: OrganizationMaterialPriceBy;
  isActive: boolean;
  validFrom: string;
  validUntil?: string | null;
  createdAt: string;
  updatedAt: string;
  material: OrganizationMaterialPriceMaterial;
};

export type OrganizationMaterialPriceCatalog = {
  prices: OrganizationMaterialPrice[];
  materialsWithoutActivePrice: OrganizationMaterialPriceMaterial[];
};

export type OrganizationOrderListItem = {
  id: string;
  address?: string | null;
  total: number;
  status: OrganizationOrderStatus;
  orderType: OrganizationOrderType;
  createdAt: string;
  updatedAt: string;
  user: {
    name: string;
    phone?: string | null;
  };
  route?: {
    id: string;
    name: string;
    status: string;
  } | null;
  picker?: {
    id?: string;
    name: string;
    phone?: string | null;
  } | null;
  completedBy?: {
    id?: string;
    name: string;
    phone?: string | null;
  } | null;
  materials: Array<{
    name: string;
    quantity: number;
  }>;
};

export type OrganizationRoute = {
  id: string;
  organizationId: string;
  clientId?: string | null;
  name?: string | null;
  assignedPickerId?: string | null;
  scheduledDate: string;
  scheduledTime?: string | null;
  startTime?: string | null;
  endTime?: string | null;
  daysOfWeek: string[];
  isActive: boolean;
  status: string;
  notes?: string | null;
  stops?: OrganizationRouteStop[];
  createdAt: string;
};

export type OrganizationRouteStop = {
  id: string;
  routeId: string;
  coveragePointId: string;
  sequence: number;
  radiusMeters: number;
  isActive: boolean;
  coveragePoint?: {
    id: string;
    name: string;
    address: string;
    city?: string | null;
    latitude: number;
    longitude: number;
  };
};

export type CreateOrganizationCoverageDto = {
  name: string;
  contactEmail: string;
  address: string;
  city?: string;
  latitude: number;
  longitude: number;
  preferredDays?: string[];
  preferredTimeSlot?: string;
  scheduleFrequency?: string;
  clientType?: string;
};

export type UpdateOrganizationCoverageDto = {
  name?: string;
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
  contactPosition?: string;
  department?: string;
  address?: string;
  city?: string;
  latitude?: number;
  longitude?: number;
  scheduleFrequency?: string;
  clientType?: string;
  preferredTimeSlot?: string;
};

export type CreateOrganizationRouteDto = {
  clientId?: string;
  scheduledDate?: string;
  scheduledTime?: string;
  startTime?: string;
  endTime?: string;
  daysOfWeek?: string[];
  name?: string;
  coveragePointIds?: string[];
  defaultStopRadiusMeters?: number;
  assignedPickerId?: string;
  notes?: string;
};

export type AssignOrganizationPickerDto = {
  pickerId: string;
  employmentType?: EmploymentType;
  canDoPublicOrders?: boolean;
  canDoPrivateRoutes?: boolean;
};

export type CreateOrganizationMaterialPriceDto = {
  materialId: string;
  priceBy: OrganizationMaterialPriceBy;
  buyPrice: number;
  isActive?: boolean;
};

export type UpdateOrganizationMaterialPriceDto = Partial<CreateOrganizationMaterialPriceDto>;

export type UpdateOrganizationRouteDto = {
  name?: string;
  startTime?: string;
  endTime?: string;
  daysOfWeek?: string[];
  notes?: string;
  isActive?: boolean;
  status?: string;
};

export type CreateRouteStopDto = {
  coveragePointId: string;
  sequence?: number;
  radiusMeters?: number;
};

export type UpdateRouteStopDto = {
  sequence?: number;
  radiusMeters?: number;
  isActive?: boolean;
};

export type UpdateOrganizationStatusDto = {
  status: OrganizationStatus;
};

export type CreateOrganizationDto = {
  profileId: string;
  businessName: string;
  taxId?: string;
  status?: OrganizationStatus;
  organizationType?: OrganizationType;
  canBuyMaterials?: boolean;
  canManageRoutes?: boolean;
  latitude: number;
  longitude: number;
};

export type UpdateOrganizationDto = {
  businessName?: string;
  taxId?: string | null;
  status?: OrganizationStatus;
  organizationType?: OrganizationType;
  canBuyMaterials?: boolean;
  canManageRoutes?: boolean;
  latitude?: number;
  longitude?: number;
};
