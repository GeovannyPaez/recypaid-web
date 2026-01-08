// Métodos adicionales para CicloPickerService

import { PaginationResponse, PaginationSearchParamsPage } from "@/types/pagination";
import { PickerEntity } from "./entity/list-all-picker-entity";
import { RejectPickerModel, BlockPickerModel } from "./model/picker.model";
import { ApiService } from "../../server/ApiService";
import { ErrorResponse, ServiceResponse, SuccessResponse } from "@/core/service/service-response";

export class CicloPickerService extends ApiService {
  constructor(token?: string) {
    super('admin/picker', token)
  }

  public async listAllPicker(params: PaginationSearchParamsPage): Promise<ServiceResponse<PaginationResponse<PickerEntity[]>>> {
    try {
      const data = await this.makeRequest<PaginationResponse<PickerEntity[]>>({
        searchParams: {
          ...params
        },
      })
      return new SuccessResponse(data)
    } catch (error) {
      return ErrorResponse.fromUnknownError(error)
    }
  }

  public getPickerInfo = async (pickerId: string): Promise<ServiceResponse<PickerEntity>> => {
    try {
      const data = await this.makeRequest<PickerEntity>({
        endpoint: '/' + pickerId
      })
      return new SuccessResponse(data)
    } catch (error) {
      console.log(error)
      return ErrorResponse.fromUnknownError(error)
    }
  }

  public acceptPicker = async (pickerId: string): Promise<ServiceResponse<{ message: string }>> => {
    try {
      const data = await this.makeRequest<{ message: string }>({
        endpoint: `/${pickerId}/accept`,
        method: 'put',
      })
      return new SuccessResponse(data)
    } catch (error) {
      console.error('Error accepting picker:', error)
      return ErrorResponse.fromUnknownError(error)
    }
  }

  public rejectPicker = async (rejectData: RejectPickerModel): Promise<ServiceResponse<{ message: string }>> => {
    try {
      const { pickerId, ...body } = rejectData;
      const data = await this.makeRequest<{ message: string }>({
        endpoint: `/${pickerId}/reject`,
        method: "put",
        data: body,
      })
      return new SuccessResponse(data)
    } catch (error) {
      console.error('Error rejecting picker:', error)
      return ErrorResponse.fromUnknownError(error)
    }
  }

  public blockPicker = async (blockData: BlockPickerModel): Promise<ServiceResponse<{ message: string }>> => {
    try {
      const { pickerId, ...body } = blockData;
      const data = await this.makeRequest<{ message: string }>({
        endpoint: `/${pickerId}/block`,
        method: "put",
        data: body,
      })
      return new SuccessResponse(data)
    } catch (error) {
      console.error('Error blocking picker:', error)
      return ErrorResponse.fromUnknownError(error)
    }
  }
}