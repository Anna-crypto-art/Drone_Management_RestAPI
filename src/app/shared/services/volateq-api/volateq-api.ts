import store from "@/app/app-state";
import { InviteUser, RegisterUser } from "@/app/shared/services/volateq-api/api-requests/user-requests";
import { ConfirmLoginResult, TokenResult } from "@/app/shared/services/volateq-api/api-schemas/auth-schema";
import { CustomerNameSchema, CustomerSchema } from "@/app/shared/services/volateq-api/api-schemas/customer-schemas";
import { SimpleUserSchema, UserAuthMethod, UserSchema } from "@/app/shared/services/volateq-api/api-schemas/user-schemas";
import { HttpClientBase } from "@/app/shared/services/volateq-api/http-client-base";
import { apiBaseUrl, baseUrl } from "@/environment/environment";
import { AddReferenceMeasurmentValue, CreateReferenceMeasurement, NewAnalysis, NewEmptyAnalysis, UpdateAnalysisState } from "./api-requests/analysis-requests";
import { CreatePlantRequest, UpdatePlantRequest } from "./api-requests/plant-requests";
import { AnalysisFileInfoSchema, AnalysisForViewSchema, AnalysisSchema, SimpleAnalysisSchema } from "./api-schemas/analysis-schema";
import { PlantSchema } from "./api-schemas/plant-schema";
import { AnalysisResultDetailedSchema } from "./api-schemas/analysis-result-schema";
import { TableFilterRequest, TableRequest } from "./api-requests/common/table-requests";
import { AnalysisResultFileSchema } from "./api-schemas/analysis-result-file-schema";
import { ApiComponent } from "./api-components/api-components";
import { ApiKeyFigure } from "./api-key-figures";
import { GeoVisualQuery } from "./api-requests/geo-visual-query-requests";
import { RouteSchema } from "./api-schemas/route-schema";
import { TableResultSchema } from "./api-schemas/table-result-schema";
import { TaskSchema } from "./api-schemas/task-schema";
import { ApiStates } from "./api-states";
import { CustomerRequest } from "./api-requests/customer-requests";
import { TechnologySchema } from "./api-schemas/technology-schema";
import { AnalysisMonitoring } from "./api-schemas/analysis-monitoring";
import { QFlyServerSchema } from "./api-schemas/server-schemas";
import { QFlyServerActionRequest } from "./api-requests/server-requests";
import { ReferenceMeasurementSchema, ReferenceMeasurementValueSchema } from "./api-schemas/reference-measurement-schema";
import { DocFile } from "./api-schemas/doc-file-schema";
import { ProductPackageSchema, ProductPackageWithKeyFiguresSchema } from "./api-schemas/product-package";
import { CreateOrderRequest, UpdateOrderRequest } from "./api-requests/order-requests";
import { OrderPPKeyFiguresDisabledSchema, OrderProductPackageSchema, OrderSchema } from "./api-schemas/order-schema";
import { MultiselectOption } from "../../components/app-multiselect/types";
import { MyUploadingUpload, SecuredFilename, Upload, UploadChunkResult } from "./api-schemas/upload-schemas";
import { CreateAnalysisUploadRequest } from "./api-requests/upload-requests";
import { ja, th } from "date-fns/locale";

export class VolateqAPI extends HttpClientBase {
  /**
   * @returns confirmation_key if user logs in with an unkown host, else undefined.
   */
  public async login(email: string, password: string): Promise<{ confirmation_key: string, auth_method: UserAuthMethod }> {
    return await this.post(
      "/auth/login",
      {},
      {
        auth: {
          username: email,
          password: password,
        },
      }
    );
  }

  public async isLoggedIn(): Promise<boolean> {
    if (store.getters.auth.isAuthenticated) {
      try {
        const pong: { pong: true } = await this.get("/auth/ping");

        if (pong.pong) {
          return true;
        }
      } catch {
        return false;
      }
    }

    return false;
  }

  public async confirmMailLogin(confirmationKey: string, securityCode: string): Promise<void> {
    const tokenResult: TokenResult = await this.post(`/confirm-email-login/${confirmationKey}`, {
      security_code: securityCode,
    });

    await store.dispatch.auth.updateToken({
      token: tokenResult.token,
      role: tokenResult.role,
      customer: tokenResult.customer,
    });
  }

  public async confirmTotpLogin(confirmationKey: string, securityCode: string): Promise<void> {
    const tokenResult: TokenResult = await this.post(`/confirm-totp-login/${confirmationKey}`, {
      security_code: securityCode,
    });

    await store.dispatch.auth.updateToken({
      token: tokenResult.token,
      role: tokenResult.role,
      customer: tokenResult.customer,
    });
  }

  public async logout(): Promise<void> {
    await this.post("/auth/logout");

    await store.dispatch.auth.updateToken({ token: "", role: undefined, customer: undefined });
  }

  public async getMe(): Promise<UserSchema> {
    return await this.get("/auth/user/me");
  }

  public async getUsers(customerId?: string): Promise<UserSchema[]> {
    return this.get("/auth/users", customerId ? { customer_id: customerId } : undefined);
  }

  public async inviteUser(user: InviteUser): Promise<string> {
    const confirmKey = (await this.post("/auth/user", user)).confirmation_key;

    return `${baseUrl}/register/${confirmKey}`;
  }

  public async assignPlantsToUser(userId: string, plantIds: string[]): Promise<void> {
    await this.post(`/auth/user/${userId}/assign-plants`, { plant_ids: plantIds });
  }

  public async changeUserRole(userId: string, roleId: number): Promise<void> {
    await this.post(`/auth/user/${userId}/change-role`, { role_id: roleId });
  }

  public async getInvitedUser(confirmKey: string): Promise<UserSchema> {
    return this.get(`/register/${confirmKey}`);
  }

  public async registerUser(confirmKey: string, user: RegisterUser): Promise<{ confirmation_key?: string }> {
    return await this.post(`/register/${confirmKey}`, user);
  }

  public async deleteUser(userId): Promise<void> {
    await this.delete(`/auth/user/${userId}/delete`);
  }

  public async getRoutes(
    params: { customer_id?: string; plant_id?: string } | undefined = undefined
  ): Promise<RouteSchema[]> {
    return this.get(`/auth/routes`, params);
  }

  public async createEmptyAnalysis(newEmptyAnalyis: NewEmptyAnalysis): Promise<{ id: string }> {
    return this.post(`/auth/analysis/create-empty`, newEmptyAnalyis);
  }

  public async getAllAnalysis(queryParams?: { plant_id?: string; customer_id?: string }): Promise<AnalysisSchema[]> {
    return this.get(`/auth/analysis`, queryParams);
  }

  public getAnalysis(analysisId?: string): Promise<AnalysisSchema> {
    return this.get(`/auth/analysis/${analysisId}`);
  }

  public async getAnalysesForView(plantId: string): Promise<AnalysisForViewSchema[]> {
    const analyses: AnalysisForViewSchema[] = await this.get(`/auth/analyses-for-view/${plantId}`);

    for (const analysis of analyses) {
      if (analysis.analysis_result) {
        this.filterKeyFigure(analysis.analysis_result);
      }
    }

    return analyses;
  }

  public async updateAnalysisState(analysisId: string, analysisState: UpdateAnalysisState): Promise<void> {
    await this.post(`/auth/analysis/${analysisId}/state`, analysisState);
  }

  public async deleteAnalysis(analysisId: string): Promise<void> {
    await this.delete(`/auth/analysis/${analysisId}`);
  }

  public getAnalysisFileDownloadUrl(analysisId: string, fileName: string): Promise<{ url: string }> {
    return this.get(`/auth/analysis/${analysisId}/file/${fileName}`);
  }

  public forgotPassword(email: string): Promise<void> {
    return this.post(`/forgot-password`, { email });
  }

  public confirmPasswordReset(confirmationKey: string): Promise<void> {
    return this.get(`/reset-password/${confirmationKey}`);
  }

  public resetPassword(confirmationKey: string, new_password: string, new_password_repeat: string): Promise<void> {
    return this.post(`/reset-password/${confirmationKey}`, { new_password, new_password_repeat });
  }

  public async importAnalysisResult(
    jsonFile: File,
    analysisId: string,
    imageFilesZipName?: string,
  ): Promise<TaskSchema> {
    const formData = { json_file: jsonFile };
    if (imageFilesZipName) {
      formData["images_zip_filename"] = imageFilesZipName;
    }

    return await this.postForm(`/auth/import-analysis-result/${analysisId}`, formData);
  }

  public async uploadImportAnalysisResultImageFiles(
    analysisId: string,
    imageFilesZip: File,
    onUploadProgress?: (progressEvent: ProgressEvent) => void,
  ): Promise<void> {
    await this.postForm(
      `/auth/import-analysis-result/${analysisId}/upload-images`, 
      { image_files_zip: imageFilesZip },
      onUploadProgress
    );
  }

  public async updateAnalysis(
    analysisId: string,
    updateData: { data_complete?: boolean; flown_at?: string, order_product_package_ids?: string[] },
  ): Promise<void> {
    await this.post(`/auth/analysis/${analysisId}`, updateData);
  }

  public async getAnalysisResult(analysisResultId: string): Promise<AnalysisResultDetailedSchema> {
    const analysisResults = [await this.get(`/auth/analysis-result/${analysisResultId}`)];

    this.filterKeyFigures(analysisResults);

    return analysisResults[0];
  }

  public getAllSpecificAnalysisResult<T>(analysisResultId: string, componentId: ApiComponent): Promise<T[]> {
    return this.get(`/auth/analysis-result/${analysisResultId}/${componentId}`);
  }

  private getEncodedAnalysisResultFilterParams(filterParams?: TableFilterRequest) {
    let encodedFilterParams = "";
    if (filterParams) {
      if (filterParams.filters) {
        encodedFilterParams += `&filters=${encodeURIComponent(JSON.stringify(filterParams.filters))}`;
      }
      if (filterParams.component_filter) {
        encodedFilterParams += `&component_filter=${encodeURIComponent(JSON.stringify(filterParams.component_filter))}`;
      }
      if (filterParams.columns_selection) {
        encodedFilterParams += `&columns_selection=${encodeURIComponent(
          JSON.stringify(filterParams.columns_selection)
        )}`;
      }
    }

    return encodedFilterParams;
  }

  public getSpecificAnalysisResult<T>(
    analysisResultId: string,
    componentId: number,
    params: TableRequest,
    filterParams?: TableFilterRequest
  ): Promise<TableResultSchema<T>> {
    return this.get(
      `/auth/analysis-result/${analysisResultId}/${componentId}${this.getQueryParams(
        params
      )}${this.getEncodedAnalysisResultFilterParams(filterParams)}`
    );
  }

  public getSpecificAnalysisResultCsvUrl(
    analysisResultId: string,
    componentId: number,
    params: TableRequest,
    filterParams?: TableFilterRequest,
    csvMappings?: { [key: string]: string }
  ): string {
    const encodedCsvMappings =
      (csvMappings && `&csv_mappings=${encodeURIComponent(this.getQueryParams(csvMappings).substring(1))}`) || "";

    return `${apiBaseUrl}/auth/analysis-result/${analysisResultId}/${componentId}${this.getQueryParams(
      params
    )}&csv=1${encodedCsvMappings}${this.getEncodedAnalysisResultFilterParams(filterParams)}`;
  }

  public getSpecificAnalysisResultCompared<T>(
    analysisResultId: string,
    componentId: number,
    compareAnalysisResultId: string,
    params: TableRequest,
    filterParams?: TableFilterRequest
  ): Promise<TableResultSchema<T>> {
    return this.get(
      `/auth/analysis-result/compare/${analysisResultId}/${componentId}/${compareAnalysisResultId}${this.getQueryParams(
        params
      )}${this.getEncodedAnalysisResultFilterParams(filterParams)}`
    );
  }

  public getAnalysisResultHistory<T>(
    plantId: string,
    componentId: number,
    params: TableRequest,
    filterParams?: TableFilterRequest
  ): Promise<TableResultSchema<T>> {
    return this.get(`/auth/analysis-results/history/${plantId}/${componentId}${this.getQueryParams(params)}
      ${this.getEncodedAnalysisResultFilterParams(filterParams)}`);
  }

  public async generateDownloadUrl(downloadUrl: string): Promise<string> {
    const encodedUrl = encodeURIComponent(encodeURIComponent(downloadUrl));

    const urlTokenResponse: { url_token: string } = await this.get(`/auth/user/generate-url-token/${encodedUrl}`);

    return `${downloadUrl}&url_token=${encodeURIComponent(urlTokenResponse.url_token)}`;
  }

  public getTask(taskId: string): Promise<TaskSchema> {
    return this.get(`/auth/task/${taskId}`);
  }

  public getAnalysisResultFiles(analysisResultId: string): Promise<AnalysisResultFileSchema[]> {
    return this.get(`/auth/analysis-result/${analysisResultId}/files`);
  }

  public deleteAnalysisResult(analysisResultId: string): Promise<{ results_deleted: number }> {
    return this.delete(`/auth/analysis-result/${analysisResultId}`);
  }

  public async resendSecurityCode(confirmationKey: string): Promise<void> {
    await this.post(`/confirm-email-login-resend/${confirmationKey}`, {});
  }

  public getPlant(plantId: string): Promise<PlantSchema> {
    return this.get(`/auth/plant/${plantId}`);
  }

  public getComponentsGeoVisual(plantId: string, componentIds: ApiComponent[]): Promise<any> {
    return this.get(`/auth/geo-visual/${plantId}/components`, { ids: componentIds });
  }

  public getKeyFiguresGeoVisual(
    plantId: string,
    analysisResultId: string,
    keyFiguresId: ApiKeyFigure,
    query_params?: GeoVisualQuery
  ): Promise<any> {
    return this.get(`/auth/geo-visual/${plantId}/${analysisResultId}/key-figure/${keyFiguresId}`, query_params);
  }

  public getKeyFiguresGeoVisualCompare(
    plantId: string,
    analysisResultId: string,
    compareAnalysisResultId: string,
    keyFiguresId: ApiKeyFigure,
    query_params?: GeoVisualQuery
  ): Promise<any> {
    return this.get(
      `/auth/geo-visual/compare/${plantId}/${analysisResultId}/${compareAnalysisResultId}/key-figure/${keyFiguresId}`,
      query_params
    );
  }

  public async getAnalysisResults(plantId: string, allKeyFigures = false): Promise<AnalysisResultDetailedSchema[]> {
    const analysisResults = await this.get(
      `/auth/plant/${plantId}/analysis-results`, 
      allKeyFigures ? { all_key_figures: 1 } : undefined
    );

    this.filterKeyFigures(analysisResults);

    return analysisResults;
  }

  public importFieldgeometry(file: File, plantId: string, clearBefore: boolean): Promise<TaskSchema> {
    return this.postForm(`/auth/fieldgeometry/${plantId}?clear_before=${clearBefore}`, { file });
  }

  public waitForTask(
    taskId: string,
    onFinished: (task: TaskSchema, failed: boolean) => void,
    onProgress?: (task: TaskSchema) => void,
  ): void {
    const interval = setInterval(async () => {
      const task = await this.getTask(taskId);
      if (task.state === "SUCCESSFUL" || task.state === "FAILED") {
        clearInterval(interval);

        const failed = task.state !== "SUCCESSFUL";
        if (failed) {
          if (!task.output) {
            task.output = {};
          }
          if (!task.output.error) {
            task.output.error = "No error message provided. Check server logs for details";
          }
        }

        onFinished(task, failed);
      } else if (onProgress) {
        onProgress(task);
      }
    }, 3000);
  }

  public getTaskOutputAsMessage(task: TaskSchema, defaultMsg = "") {
    if (task.output?.infos && task.output.infos.length > 0) {
      return "> " +
        task.output.infos.join("<br>> ") +
        ((task.output.max_steps && `... (${task.output.step}/${task.output.max_steps})`) || "...");
    }

    return defaultMsg;
  }

  public resendUserInvitation(userId: string): Promise<void> {
    return this.post(`/auth/user/${userId}/resend-invitation`);
  }

  public unLockUser(userId: string, lock: boolean): Promise<void> {
    return this.post(`/auth/user/${userId}/un-lock`, { lock });
  }

  public updateAnalysisResult(analysisResultId: string, updates: { release: boolean }): Promise<void> {
    return this.post(`/auth/analysis-result/${analysisResultId}`, updates);
  }

  public getPlants(withAnalysisResultsCount = false, withOrders = false): Promise<PlantSchema[]> {
    return this.get(`/auth/plants`, {
      with_analysis_results_count: withAnalysisResultsCount ? 1 : 0,
      with_orders: withOrders ? 1 : 0,
    });
  }

  public getAllPlants(): Promise<PlantSchema[]> {
    return this.get(`/auth/plants/all`);
  }

  public getAnalysisResultFileUrl(analysisResultFileId: string): Promise<{ url: string }> {
    return this.get(`/auth/analysis-result/result-file/${analysisResultFileId}`);
  }

  public getFieldgeometryFileUrl(fieldgeometryId: string): Promise<{ url: string }> {
    return this.get(`/auth/fieldgeometry/${fieldgeometryId}/file-url`);
  }

  public downloadMultipleAnalysisFilesUrl(analysisId: string, filenames: string[] | "all") {
    return this.getUrl(`${apiBaseUrl}/auth/analysis/${analysisId}/files/download`, { filenames: filenames });
  }

  public getAnalysisFiles(analysisId: string, filenames: string[]): Promise<AnalysisFileInfoSchema> {
    return this.post(`/auth/analysis/${analysisId}/files`, { file_names: filenames });
  }

  public async deleteAnalysisFiles(analysisId: string, filenames: string[]): Promise<void> {
    await this.post(`/auth/analysis/${analysisId}/files/delete`, { file_names: filenames });
  }

  public async moveAnalysisFiles(analysisId: string, targetAnalysisId: string, filenames: string[]): Promise<void> {
    await this.post(`/auth/analysis/${analysisId}/files/move`, {
      file_names: filenames,
      target_analysis_id: targetAnalysisId,
    });
  }

  public getStates(): Promise<Record<ApiStates, ApiStates[]>> {
    return this.get(`/auth/states`);
  }

  public updatePlant(plantId: string, updatePlantRequest: UpdatePlantRequest): Promise<void> {
    return this.post(`/auth/plant/${plantId}`, updatePlantRequest);
  }

  public getAnalysisMonitoring(): Promise<AnalysisMonitoring> {
    return this.get(`/auth/analysis-monitoring`).then(
      response =>
        typeof response == "string"
          ? {}
          : response /* The 204 (NO CONTENT) response from the backend causes response to be a string */
    );
  }

  public getFieldgeometryComponentCodes(fieldgeometryId: string, componentId: ApiComponent): Promise<string[]> {
    return this.get(`/auth/fieldgeometry/${fieldgeometryId}/${componentId}/component-codes`);
  }

  public getCustomers(): Promise<CustomerSchema[]> {
    return this.get(`/auth/customers`);
  }

  public async createCustomer(customerRequest: CustomerRequest): Promise<void> {
    await this.post(`/auth/customer`, customerRequest);
  }

  public async updateCustomer(customerId: string, customerRequest: CustomerRequest): Promise<void> {
    await this.post(`/auth/customer/${customerId}`, customerRequest);
  }

  public async deleteCustomer(customerId: string): Promise<void> {
    await this.delete(`/auth/customer/${customerId}`);
  }

  public async getTechnologies(): Promise<TechnologySchema[]> {
    return await this.get(`/auth/technologies`);
  }

  public async createPlant(createPlantRequest: CreatePlantRequest): Promise<void> {
    await this.post(`/auth/plant`, createPlantRequest);
  }

  public async deletePlant(plantId: string): Promise<void> {
    await this.delete(`/auth/plant/${plantId}`);
  }

  public async getQFlyServer(analysisId: string): Promise<QFlyServerSchema> {
    return this.get(`/auth/analysis/${analysisId}/qfly-server`);
  }

  public async runQFlyServerAction(analysisId: string, qFlyServerAction: QFlyServerActionRequest): Promise<void> {
    await this.post(`/auth/analysis/${analysisId}/qfly-server`, qFlyServerAction);
  }

  public async finishRunningTask(analysisId: string): Promise<void> {
    await this.post(`/auth/analysis/${analysisId}/finish-running-task`);
  }

  public async getUploadingUsers(analysisId: string): Promise<SimpleUserSchema[]> {
    return this.get(`/auth/analysis/${analysisId}/uploading-users`);
  }

  public async findAnalysisForNewReferenceMeasurement(plantId: string): Promise <undefined | SimpleAnalysisSchema> {
    return this.get(`/auth/reference-measurement/find-analysis/${plantId}`);
  }

  public async createReferenceMeasurement(analysisId: string, createReferenceMeasurement: CreateReferenceMeasurement): Promise<{ id: string }> {
    return this.post(`/auth/analysis/${analysisId}/reference-measurement`, createReferenceMeasurement);
  }

  public async getReferenceMeasurements(analysisId: string): Promise<ReferenceMeasurementSchema[]> {
    return await this.get(`/auth/analysis/${analysisId}/reference-measurements`);
  }

  public async addReferencMeasurementValue(referenceMeasurementId: string, addReferenceMeasurmentValue: AddReferenceMeasurmentValue): Promise<void> {
    await this.post(`/auth/reference-measurement/${referenceMeasurementId}/value`, addReferenceMeasurmentValue);
  }

  public async getReferencMeasurementValue(
    referenceMeasurementId: string,
    pcs: string
  ): Promise<ReferenceMeasurementValueSchema | undefined> {
    const refMeasureValues: ReferenceMeasurementValueSchema[] = await this.get(`/auth/reference-measurement/${referenceMeasurementId}/values`, { pcs });
    if (refMeasureValues.length > 0) {
      return refMeasureValues[0];
    }

    return undefined;
  }

  public async getReferencMeasurementValues(
    referenceMeasurementId: string
  ): Promise<ReferenceMeasurementValueSchema[]> {
    return await this.get(`/auth/reference-measurement/${referenceMeasurementId}/values`);
  }

  public async moveReferenceMeasurement(referenceMeasurementId: string, targetAnalysisId: string): Promise<void> {
    await this.post(`/auth/reference-measurement/${referenceMeasurementId}/move`, 
      { target_analysis_id: targetAnalysisId });
  }

  public async deleteReferenceMeasurement(referenceMeasurementId: string): Promise<void> {
    await this.delete(`/auth/reference-measurement/${referenceMeasurementId}`);
  }

  public async ignoreReferenceMeasurementValue(referenceMeasurementValueId: string, ignore: boolean): Promise<void> {
    await this.post(`/auth/reference-measurement/value/${referenceMeasurementValueId}/ignore`, { ignore });
  }

  public async deleteReferenceMeasurementValue(referenceMeasurementValueId: string): Promise<void> {
    await this.delete(`/auth/reference-measurement/value/${referenceMeasurementValueId}/delete`);
  }

  public async getReferenceMeasurementValuesGeoVisual(referenceMeasurementId: string): Promise<any> {
    return this.get(`/auth/geo-visual/${referenceMeasurementId}/reference-measuurement-values`);
  }

  public async getDocFiles(): Promise<DocFile[]> {
    return this.get(`/auth/doc/files`);
  }

  public async getDocFileUrl(fileId: string): Promise<{ url: string }> {
    return this.get(`/auth/doc/file/${fileId}`);
  }

  public async createDocFile(
    docFile: File,
    title?: string,
    description?: string,
    onUploadProgress?: (progressEvent: ProgressEvent) => void
  ): Promise<void> {
    const docFilePost = { doc_file: docFile };
    if (title) {
      docFilePost["title"] = title;
    }
    if (description) {
      docFilePost["description"] = description;
    }

    return this.postForm(`/auth/doc/file`, docFilePost, onUploadProgress);
  }

  public async editDocFile(
    fileId: string,
    docFile?: File,
    title?: string,
    description?: string,
    onUploadProgress?: (progressEvent: ProgressEvent) => void,
  ): Promise<void> {
    const docFilePost = {};
    if (docFile) {
      docFilePost["doc_file"] = docFile;
    }
    if (title) {
      docFilePost["title"] = title;
    }
    if (description) {
      docFilePost["description"] = description;
    }

    if (Object.keys(docFilePost).length === 0) {
      return;
    }

    return this.postForm(`/auth/doc/file/${fileId}`, docFilePost, onUploadProgress);
  }

  public async deleteDocFile(fileId: string): Promise<void> {
    return this.delete(`/auth/doc/file/${fileId}`);
  }

  public async switchCustomer(toCustomerId: string | undefined, showAllKeyFigures: boolean): Promise<CustomerNameSchema> {
    return this.post(`/auth/user/switch-customer`, { customer_id: toCustomerId, show_all_key_figures: showAllKeyFigures });
  }

  public async getProductPackages(): Promise<ProductPackageSchema[]> {
    return this.get(`/auth/product-packages`);
  }

  public async getProductPackagesWithKeyFigures(): Promise<ProductPackageWithKeyFiguresSchema[]> {
    return this.get(`/auth/product-packages-with-key-figures`);
  }

  public async createOrder(
    createOrderRequest: CreateOrderRequest,
  ): Promise<void> {
    return this.post(`/auth/order`, createOrderRequest);
  }

  public async updateOrder(
    orderId: string,
    updateOrderRequest: UpdateOrderRequest,
  ): Promise<void> {
    return this.post(`/auth/order/${orderId}`, updateOrderRequest);
  }

  public async getOrders(plantId?: string | null, customerId?: string | null): Promise<OrderSchema[]> {
    const plantCustomerFilter = {};
    if (plantId) {
      plantCustomerFilter['plant_id'] = plantId;
    }
    if (customerId) {
      plantCustomerFilter['customer_id'] = customerId;
    }

    return this.get(`/auth/orders`, plantCustomerFilter);
  }

  public async deleteOrder(orderId: string): Promise<void> {
    return this.delete(`/auth/order/${orderId}`);
  }

  public async getOrderProductPackages(plantId: string, curDate?: string, customerId?: string): Promise<OrderProductPackageSchema[]> {
    const queryParams = {};
    if (curDate) {
      queryParams["cur_date"] = curDate;
    }
    if (customerId) {
      queryParams["customer_id"] = customerId;
    }

    return this.get(`/auth/order-product-packages/${plantId}`, queryParams);
  }

  public async getOrderPPsMulitselectOptions(plantId: string, curDate?: string, customerId?: string): Promise<MultiselectOption[]> {
    const orderPPs = await volateqApi.getOrderProductPackages(plantId, curDate, customerId);

    return orderPPs
      .filter(orderPP => orderPP.product_package.id !== 1) // Filter CSP_PTC Basic
      .map(orderPP => ({
        id: orderPP.id,
        label: orderPP.quantity ? 
          orderPP.product_package.name + " - Yearly " + orderPP.quantity : 
          orderPP.product_package.name
      }));
  }

  public async getNewAnalysisProductPackagesProposal(plantId: string, curDate?: string): Promise<OrderProductPackageSchema[]> {
    return this.get(`/auth/new-analysis-product-packages-proposal/${plantId}`, curDate ? { cur_date: curDate } : undefined)
  }

  public async getOrderPPDisabledKeyFigures(orderId: string): Promise<OrderPPKeyFiguresDisabledSchema[]> {
    return this.get(`/auth/order-product-packages/${orderId}/disabled-key-figures`);
  }

  public async getSecuredFilenames(filenames: string[]): Promise<SecuredFilename[]> {
    return this.post(`/auth/upload/secure-filenames`, { file_names: filenames });
  }

  public async createAnalysisUpload(createUploadRequest: CreateAnalysisUploadRequest): Promise<Upload> {
    return this.post(`/auth/upload/analysis`, createUploadRequest);
  }

  public async getUpload(uploadId: string): Promise<Upload> {
    return this.get(`/auth/upload/${uploadId}`);
  }

  public async uploadFileChunk(
    uploadId: string, 
    fileChunk: Blob,
    fileId: string,
    chunkNumber: number,
    onUploadProgressEvent?: (progressEvent: ProgressEvent) => void,
  ): Promise<UploadChunkResult> {
    return this.postForm(`/auth/upload/${uploadId}`, { 
      file: fileChunk,
      file_id: fileId,
      chunk_number: (chunkNumber as unknown) as string
    }, onUploadProgressEvent)
  }

  public async resumeUpload(uploadId: string): Promise<void> {
    await this.post(`/auth/upload/${uploadId}/resume`);
  }

  public async cancelUpload(uploadId: string): Promise<void> {
    await this.post(`/auth/upload/${uploadId}/resume`);
  }

  public async getTotpSecrets(confirmationKey: string): Promise<{ url: string, secret: string }> {
    return await this.get(`/totp-secrets/${confirmationKey}`);
  }

  public async verifyTotpCode(confirmationKey: string, securityCode: string): Promise<void> {
    await this.post(`/totp-secrets/${confirmationKey}`, { security_code: securityCode });
  }

  public async cancelSetupTotpMfa(confirmationKey: string): Promise<void> {
    await this.delete(`/totp-secrets/${confirmationKey}`);
  }

  public async prepareUserChangeAuthMethod(authMethod: UserAuthMethod, password: string): Promise<{confirmation_key: string}> {
    return await this.post(`/auth/user/prepare-change-auth-method`, { auth_method: authMethod, password });
  }

  public async changeUserAuthMethod(authMethod: UserAuthMethod, confirmationKey: string, securityCode: string, newSecurityCode: string): Promise<void> {
    await this.post(`/auth/user/change-auth-method/${confirmationKey}`, { 
      auth_method: authMethod,
      security_code: securityCode,
      new_security_code: newSecurityCode,
    });
  }

  private filterKeyFigures(analysisResults: AnalysisResultDetailedSchema[]): void {
    // Temporary special case for IR_INTENSITY: Replaced by GLASS_TUBE_TEMPERATURE
    for (const analysisResult of analysisResults) {
      this.filterKeyFigure(analysisResult);
    }
  }

  private filterKeyFigure(analysisResult: AnalysisResultDetailedSchema): void {
    const ir_intensity_index = analysisResult.key_figures.findIndex(
      keyFigure => keyFigure.id === ApiKeyFigure.IR_INTENSITY_ID
    );
    if (
      ir_intensity_index != -1 &&
      analysisResult.key_figures.find(keyFigure => keyFigure.id === ApiKeyFigure.GLASS_TUBE_TEMPERATURE_ID)
    ) {
      analysisResult.key_figures.splice(ir_intensity_index, 1);
    }
  }
}

const volateqApi = new VolateqAPI();

export default volateqApi;
