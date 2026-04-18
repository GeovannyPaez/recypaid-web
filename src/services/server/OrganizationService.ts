import {
  AssignOrganizationPickerDto,
  CreateRouteStopDto,
  OrganizationAvailablePicker,
  CreateOrganizationDto,
  CreateOrganizationCoverageDto,
  CreateOrganizationRouteDto,
  Organization,
  OrganizationCoverage,
  OrganizationPickerMember,
  OrganizationRoute,
  OrganizationStatus,
  OrganizationRouteStop,
  UpdateOrganizationCoverageDto,
  UpdateOrganizationRouteDto,
  UpdateRouteStopDto,
  UpdateOrganizationStatusDto,
} from "@/types/organization";
import { ApiService } from "./ApiService";

class OrganizationService extends ApiService {
  private constructor(readonly pathName: string) {
    super(pathName);
  }

  private static privateInstance: OrganizationService;

  static getInstance(): OrganizationService {
    if (!OrganizationService.privateInstance) {
      OrganizationService.privateInstance = new OrganizationService("/organizations");
    }
    return OrganizationService.privateInstance;
  }

  async getMyOrganizations(): Promise<Organization[]> {
    return this.makeRequest({
      method: "get",
      endpoint: "/me",
      defaultErrorResponse: [],
    });
  }

  async createOrganization(payload: CreateOrganizationDto): Promise<Organization> {
    return this.makeRequest({
      method: "post",
      endpoint: "",
      data: payload,
    });
  }

  async getOrganizations(query?: {
    city?: string;
    status?: OrganizationStatus;
    canManageRoutes?: boolean;
  }): Promise<Organization[]> {
    return this.makeRequest({
      method: "get",
      endpoint: "",
      searchParams: query || {},
      defaultErrorResponse: [],
    });
  }

  async getCoverage(organizationId: string): Promise<OrganizationCoverage[]> {
    return this.makeRequest({
      method: "get",
      endpoint: `/${organizationId}/coverage`,
      defaultErrorResponse: [],
    });
  }

  async createCoverage(
    organizationId: string,
    payload: CreateOrganizationCoverageDto,
  ): Promise<OrganizationCoverage> {
    return this.makeRequest({
      method: "post",
      endpoint: `/${organizationId}/coverage`,
      data: payload,
    });
  }

  async updateCoverage(
    organizationId: string,
    coverageId: string,
    payload: UpdateOrganizationCoverageDto,
  ): Promise<OrganizationCoverage> {
    return this.makeRequest({
      method: "patch",
      endpoint: `/${organizationId}/coverage/${coverageId}`,
      data: payload,
    });
  }

  async deleteCoverage(
    organizationId: string,
    coverageId: string,
  ): Promise<{ success: boolean }> {
    return this.makeRequest({
      method: "delete",
      endpoint: `/${organizationId}/coverage/${coverageId}`,
    });
  }

  async getRoutes(
    organizationId: string,
    query?: { from?: string; to?: string },
  ): Promise<OrganizationRoute[]> {
    return this.makeRequest({
      method: "get",
      endpoint: `/${organizationId}/routes`,
      searchParams: query || {},
      defaultErrorResponse: [],
    });
  }

  async createRoute(
    organizationId: string,
    payload: CreateOrganizationRouteDto,
  ): Promise<OrganizationRoute> {
    return this.makeRequest({
      method: "post",
      endpoint: `/${organizationId}/routes`,
      data: payload,
    });
  }

  async updateRoute(
    organizationId: string,
    routeId: string,
    payload: UpdateOrganizationRouteDto,
  ): Promise<OrganizationRoute> {
    return this.makeRequest({
      method: "patch",
      endpoint: `/${organizationId}/routes/${routeId}`,
      data: payload,
    });
  }

  async deleteRoute(organizationId: string, routeId: string): Promise<{ success: boolean }> {
    return this.makeRequest({
      method: "delete",
      endpoint: `/${organizationId}/routes/${routeId}`,
    });
  }

  async getRouteStops(
    organizationId: string,
    routeId: string,
  ): Promise<OrganizationRouteStop[]> {
    return this.makeRequest({
      method: "get",
      endpoint: `/${organizationId}/routes/${routeId}/stops`,
      defaultErrorResponse: [],
    });
  }

  async addRouteStop(
    organizationId: string,
    routeId: string,
    payload: CreateRouteStopDto,
  ): Promise<OrganizationRouteStop> {
    return this.makeRequest({
      method: "post",
      endpoint: `/${organizationId}/routes/${routeId}/stops`,
      data: payload,
    });
  }

  async updateRouteStop(
    organizationId: string,
    routeId: string,
    stopId: string,
    payload: UpdateRouteStopDto,
  ): Promise<OrganizationRouteStop> {
    return this.makeRequest({
      method: "patch",
      endpoint: `/${organizationId}/routes/${routeId}/stops/${stopId}`,
      data: payload,
    });
  }

  async removeRouteStop(
    organizationId: string,
    routeId: string,
    stopId: string,
  ): Promise<{ success: boolean }> {
    return this.makeRequest({
      method: "delete",
      endpoint: `/${organizationId}/routes/${routeId}/stops/${stopId}`,
    });
  }

  async updateStatus(
    organizationId: string,
    payload: UpdateOrganizationStatusDto,
  ): Promise<Organization> {
    return this.makeRequest({
      method: "patch",
      endpoint: `/${organizationId}/status`,
      data: payload,
    });
  }

  async getOrganizationPickers(
    organizationId: string,
  ): Promise<OrganizationPickerMember[]> {
    return this.makeRequest({
      method: "get",
      endpoint: `/${organizationId}/pickers`,
      defaultErrorResponse: [],
    });
  }

  async getAvailablePickers(
    organizationId: string,
    query?: { search?: string },
  ): Promise<OrganizationAvailablePicker[]> {
    return this.makeRequest({
      method: "get",
      endpoint: `/${organizationId}/pickers/available`,
      searchParams: query || {},
      defaultErrorResponse: [],
    });
  }

  async assignPicker(
    organizationId: string,
    payload: AssignOrganizationPickerDto,
  ): Promise<OrganizationPickerMember> {
    return this.makeRequest({
      method: "post",
      endpoint: `/${organizationId}/pickers`,
      data: payload,
    });
  }

  async removePicker(
    organizationId: string,
    organizationPickerId: string,
  ): Promise<{ success: boolean }> {
    return this.makeRequest({
      method: "delete",
      endpoint: `/${organizationId}/pickers/${organizationPickerId}`,
    });
  }
}

export default OrganizationService.getInstance();
