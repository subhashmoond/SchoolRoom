import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataMethodService } from '../../shared/services/data-method.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DigitalProductService {

      constructor(private http : HttpClient, private _dataService : DataMethodService) { }

      getDigitalProduct(){
        const url = `${environment.basePath}digital-product/get/AllProduct`
        return this._dataService.get(url)
      }

      getProductType(){
        const url = `${environment.basePath}digital-product/categorys/`;
        return this._dataService.get(url)
      }

      addDigitalProdcut(payload : any){
        const url = `${environment.basePath}digital-product/create/`;
        return this._dataService.post(url, payload);
      }

      updateDigitalProduct(id : any, payload : any){
        const url = `${environment.basePath}digital-product/${id}`;
        return this._dataService.post(url, payload);
      }

      deleteDigitalProduct(id : any){
        const url = `${environment.basePath}digital-product/${id}`;
        return this._dataService.post(url, '');
      }

      getDigitalProductDetailById(id : any){
        const url = `${environment.basePath}digital-product/${id}`;
        return this._dataService.get(url)
      }


      updateThumbnailandTitle(payload : any){
        const url = `${environment.basePath}digital-product/thumbnail/update/`;
        return this._dataService.post(url, payload)
      }


      deleteThumbnail(thumbnailId : any){
        const url = `${environment.basePath}digital-product/${thumbnailId}/thumbnail/`;
        return this._dataService.delete(url);
      }



}
