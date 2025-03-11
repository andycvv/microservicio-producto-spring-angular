import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseApi } from '../models/responseApi.model';
import { environment } from '../../../environments/environment';
import { Producto } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private http = inject(HttpClient);
  private baseURL = environment.apiURL + '/api/v1/productos'

  public obtenerTodos(): Observable<ResponseApi<Producto[]>> {
    return this.http.get<ResponseApi<Producto[]>>(this.baseURL)
  }

  public obtenerPorId(id: number): Observable<ResponseApi<Producto>> {
    return this.http.get<ResponseApi<Producto>>(this.baseURL + `/${id}`)
  }

  public obtenerPorNombre(nombre: string, id: string): Observable<ResponseApi<Producto>> {
    let params = new HttpParams();
    params = params.append('id', id);
    return this.http.get<ResponseApi<Producto>>(this.baseURL + `/${nombre}/existe`, { params })
  }

  public crear(producto: Omit<Producto, "id">): Observable<ResponseApi<Producto>> {
    return this.http.post<ResponseApi<Producto>>(this.baseURL, producto)
  }

  public actualizar(id: number, producto: Omit<Producto, "id">): Observable<ResponseApi<Producto>> {
    return this.http.put<ResponseApi<Producto>>(this.baseURL + `/${id}`, producto)
  }

  public eliminar(id: number): Observable<ResponseApi<null>> {
    return this.http.delete<ResponseApi<null>>(this.baseURL + `/${id}`)
  }
}
