"use server";

import { errorAction, successAction } from "@/errors/ResponseError";
import getPathNameFromHeaders from "@/lib/get-pathname-from-headers";
import OrganizationService from "@/services/server/OrganizationService";
import RolesService from "@/services/server/RolesService";
import {
  CreateOrganizationDto,
  AssignOrganizationPickerDto,
  CreateOrganizationCoverageDto,
  CreateOrganizationRouteDto,
  OrganizationAvailablePicker,
  Organization,
  OrganizationCoverage,
  CreateOrganizationMaterialPriceDto,
  OrganizationMaterialPrice,
  OrganizationPickerMember,
  OrganizationRoute,
  OrganizationStatus,
  UpdateOrganizationCoverageDto,
  UpdateOrganizationRouteDto,
  UpdateOrganizationDto,
  UpdateOrganizationMaterialPriceDto,
} from "@/types/organization";
import { revalidatePath } from "next/cache";

type RouteCrudActionResponse = ActionResponse & {
  route?: OrganizationRoute;
};

type CoverageCrudActionResponse = ActionResponse & {
  coverage?: OrganizationCoverage;
};

type OrganizationCrudActionResponse = ActionResponse & {
  organization?: Organization;
};

type OrganizationPickerCrudActionResponse = ActionResponse & {
  picker?: OrganizationPickerMember;
};

type OrganizationMaterialPriceCrudActionResponse = ActionResponse & {
  price?: OrganizationMaterialPrice;
};

type OrganizationAvailablePickerActionResponse = ActionResponse & {
  availablePickers?: OrganizationAvailablePicker[];
};

export const CreateCoverageAction = async (
  organizationId: string,
  payload: CreateOrganizationCoverageDto,
): Promise<CoverageCrudActionResponse> => {
  let coverage: OrganizationCoverage;
  try {
    coverage = await OrganizationService.createCoverage(organizationId, payload);
  } catch (error) {
    const err = error as Error;
    return errorAction(err.message);
  }

  revalidatePath("/dashboard/organization/coverage");
  revalidatePath("/dashboard/organization");
  revalidatePath(getPathNameFromHeaders());
  return { ...successAction("Cobertura creada correctamente"), coverage };
};

export const UpdateCoverageAction = async (
  organizationId: string,
  coverageId: string,
  payload: UpdateOrganizationCoverageDto,
): Promise<CoverageCrudActionResponse> => {
  let coverage: OrganizationCoverage;
  try {
    coverage = await OrganizationService.updateCoverage(
      organizationId,
      coverageId,
      payload,
    );
  } catch (error) {
    const err = error as Error;
    return errorAction(err.message);
  }

  revalidatePath("/dashboard/organization/coverage");
  revalidatePath("/dashboard/organization");
  revalidatePath(getPathNameFromHeaders());
  return { ...successAction("Cobertura actualizada"), coverage };
};

export const DeleteCoverageAction = async (
  organizationId: string,
  coverageId: string,
): Promise<ActionResponse> => {
  try {
    const response = await OrganizationService.deleteCoverage(
      organizationId,
      coverageId,
    );
    if (!response?.success) {
      return errorAction("No fue posible eliminar el punto de cobertura");
    }
  } catch (error) {
    const err = error as Error;
    return errorAction(err.message);
  }

  revalidatePath("/dashboard/organization/coverage");
  revalidatePath("/dashboard/organization");
  revalidatePath(getPathNameFromHeaders());
  return successAction("Punto de cobertura eliminado");
};

export const AssignOrganizationPickerAction = async (
  organizationId: string,
  payload: AssignOrganizationPickerDto,
): Promise<OrganizationPickerCrudActionResponse> => {
  let picker: OrganizationPickerMember;
  try {
    picker = await OrganizationService.assignPicker(organizationId, payload);
  } catch (error) {
    const err = error as Error;
    return errorAction(err.message);
  }

  revalidatePath("/dashboard/organization/pickers");
  revalidatePath("/dashboard/organization");
  revalidatePath(getPathNameFromHeaders());
  return { ...successAction("Reciclador vinculado a la organización"), picker };
};

export const RemoveOrganizationPickerAction = async (
  organizationId: string,
  organizationPickerId: string,
): Promise<ActionResponse> => {
  try {
    const response = await OrganizationService.removePicker(
      organizationId,
      organizationPickerId,
    );
    if (!response?.success) {
      return errorAction("No fue posible desvincular el reciclador");
    }
  } catch (error) {
    const err = error as Error;
    return errorAction(err.message);
  }

  revalidatePath("/dashboard/organization/pickers");
  revalidatePath("/dashboard/organization");
  revalidatePath(getPathNameFromHeaders());
  return successAction("Reciclador desvinculado");
};

export const FindAvailableOrganizationPickersAction = async (
  organizationId: string,
  search?: string,
): Promise<OrganizationAvailablePickerActionResponse> => {
  let availablePickers: OrganizationAvailablePicker[];
  try {
    availablePickers = await OrganizationService.getAvailablePickers(
      organizationId,
      search ? { search } : undefined,
    );
  } catch (error) {
    const err = error as Error;
    return errorAction(err.message);
  }

  return { ...successAction("Recicladores disponibles cargados"), availablePickers };
};

export const CreateOrganizationAsAdminAction = async (
  payload: CreateOrganizationDto,
): Promise<OrganizationCrudActionResponse> => {
  let organization: Organization;
  try {
    organization = await OrganizationService.createOrganization(payload);

    try {
      await RolesService.assignRole({
        userId: payload.profileId,
        roleName: "ORGANIZATION",
      });
    } catch (error) {
      const err = error as Error;
      const message = err.message.toLowerCase();
      const isAlreadyAssigned =
        message.includes("ya tiene") ||
        message.includes("already") ||
        message.includes("asignado");

      if (!isAlreadyAssigned) {
        return errorAction(
          `Organización creada (${organization.businessName}), pero no se pudo asignar rol ORGANIZATION: ${err.message}`,
        );
      }
    }
  } catch (error) {
    const err = error as Error;
    return errorAction(err.message);
  }

  revalidatePath(getPathNameFromHeaders());
  return {
    ...successAction("Organización creada y rol ORGANIZATION asignado"),
    organization,
  };
};

export const UpdateOrganizationAsAdminAction = async (
  organizationId: string,
  payload: UpdateOrganizationDto,
): Promise<OrganizationCrudActionResponse> => {
  let organization: Organization;
  try {
    organization = await OrganizationService.updateOrganization(organizationId, payload);
  } catch (error) {
    const err = error as Error;
    return errorAction(err.message);
  }

  revalidatePath("/dashboard/admin/organizations");
  revalidatePath(getPathNameFromHeaders());
  return {
    ...successAction("Organización actualizada"),
    organization,
  };
};

export const CreateOrganizationMaterialPriceAction = async (
  organizationId: string,
  payload: CreateOrganizationMaterialPriceDto,
): Promise<OrganizationMaterialPriceCrudActionResponse> => {
  let price: OrganizationMaterialPrice;
  try {
    price = await OrganizationService.createMaterialPrice(organizationId, payload);
  } catch (error) {
    const err = error as Error;
    return errorAction(err.message);
  }

  revalidatePath("/dashboard/organization/prices");
  revalidatePath("/dashboard/admin/organizations");
  revalidatePath(getPathNameFromHeaders());
  return { ...successAction("Precio configurado correctamente"), price };
};

export const UpdateOrganizationMaterialPriceAction = async (
  organizationId: string,
  priceId: string,
  payload: UpdateOrganizationMaterialPriceDto,
): Promise<OrganizationMaterialPriceCrudActionResponse> => {
  let price: OrganizationMaterialPrice;
  try {
    price = await OrganizationService.updateMaterialPrice(
      organizationId,
      priceId,
      payload,
    );
  } catch (error) {
    const err = error as Error;
    return errorAction(err.message);
  }

  revalidatePath("/dashboard/organization/prices");
  revalidatePath("/dashboard/admin/organizations");
  revalidatePath(getPathNameFromHeaders());
  return { ...successAction("Precio actualizado"), price };
};

export const CreateRouteAction = async (
  organizationId: string,
  payload: CreateOrganizationRouteDto,
): Promise<RouteCrudActionResponse> => {
  let route: OrganizationRoute;
  try {
    route = await OrganizationService.createRoute(organizationId, payload);
  } catch (error) {
    const err = error as Error;
    return errorAction(err.message);
  }

  revalidatePath("/dashboard/organization/routes");
  revalidatePath("/dashboard/organization");
  revalidatePath(getPathNameFromHeaders());
  return { ...successAction("Ruta creada correctamente"), route };
};

export const UpdateOrganizationStatusAction = async (
  organizationId: string,
  status: OrganizationStatus,
): Promise<ActionResponse> => {
  try {
    await OrganizationService.updateStatus(organizationId, { status });
  } catch (error) {
    const err = error as Error;
    return errorAction(err.message);
  }

  revalidatePath(getPathNameFromHeaders());
  return successAction("Estado de organización actualizado");
};

export const UpdateRouteAction = async (
  organizationId: string,
  routeId: string,
  payload: UpdateOrganizationRouteDto,
): Promise<RouteCrudActionResponse> => {
  let route: OrganizationRoute;
  try {
    route = await OrganizationService.updateRoute(organizationId, routeId, payload);
  } catch (error) {
    const err = error as Error;
    return errorAction(err.message);
  }

  revalidatePath("/dashboard/organization/routes");
  revalidatePath("/dashboard/organization");
  revalidatePath(getPathNameFromHeaders());
  return { ...successAction("Ruta actualizada"), route };
};

export const DeleteRouteAction = async (
  organizationId: string,
  routeId: string,
): Promise<ActionResponse> => {
  try {
    const response = await OrganizationService.deleteRoute(organizationId, routeId);
    if (!response?.success) {
      return errorAction("No fue posible eliminar la ruta");
    }
  } catch (error) {
    const err = error as Error;
    return errorAction(err.message);
  }

  revalidatePath("/dashboard/organization/routes");
  revalidatePath("/dashboard/organization");
  revalidatePath(getPathNameFromHeaders());
  return successAction("Ruta eliminada");
};

export const SyncRouteStopsAction = async (
  organizationId: string,
  routeId: string,
  selectedCoveragePointIds: string[],
): Promise<ActionResponse> => {
  try {
    const routeStops = await OrganizationService.getRouteStops(organizationId, routeId);
    const selectedIds = Array.from(
      new Set(selectedCoveragePointIds.map((value) => value.trim()).filter(Boolean)),
    );

    const currentByCoverageId = new Map(
      routeStops.map((stop) => [stop.coveragePointId, stop]),
    );
    const selectedSet = new Set(selectedIds);

    const removals = routeStops.filter(
      (stop) => !selectedSet.has(stop.coveragePointId),
    );
    for (const stop of removals) {
      await OrganizationService.removeRouteStop(organizationId, routeId, stop.id);
    }

    for (let index = 0; index < selectedIds.length; index += 1) {
      const coveragePointId = selectedIds[index];
      const existingStop = currentByCoverageId.get(coveragePointId);

      if (!existingStop) {
        await OrganizationService.addRouteStop(organizationId, routeId, {
          coveragePointId,
          sequence: index,
        });
        continue;
      }

      await OrganizationService.updateRouteStop(
        organizationId,
        routeId,
        existingStop.id,
        {
          sequence: index,
          isActive: true,
        },
      );
    }
  } catch (error) {
    const err = error as Error;
    return errorAction(err.message);
  }

  revalidatePath("/dashboard/organization/routes");
  revalidatePath("/dashboard/organization");
  revalidatePath(getPathNameFromHeaders());
  return successAction("Puntos de la ruta actualizados");
};
