import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Categoria } from '../models/categoria.model';
import { Observable } from 'rxjs';
import { ResponseApi } from '../models/responseApi.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private http = inject(HttpClient);
  private baseURL = environment.apiURL + '/api/v1/categorias'

  public obtenerTodos(): Observable<ResponseApi<Categoria[]>> {
    return this.http.get<ResponseApi<Categoria[]>>(this.baseURL)
  }

  public obtenerPorId(id: number): Observable<ResponseApi<Categoria>> {
    return this.http.get<ResponseApi<Categoria>>(this.baseURL + `/${id}`)
  }

  public obtenerPorNombre(nombre: string, id: string): Observable<ResponseApi<Categoria>> {
    let params = new HttpParams();
    params = params.append('id', id);
    return this.http.get<ResponseApi<Categoria>>(this.baseURL + `/${nombre}/existe`, { params })
  }

  public crear(categoria: Omit<Categoria, "id">): Observable<ResponseApi<Categoria>> {
    return this.http.post<ResponseApi<Categoria>>(this.baseURL, categoria)
  }

  public actualizar(id: number, categoria: Omit<Categoria, "id">): Observable<ResponseApi<Categoria>> {
    return this.http.put<ResponseApi<Categoria>>(this.baseURL + `/${id}`, categoria)
  }

  public eliminar(id: number): Observable<ResponseApi<null>> {
    return this.http.delete<ResponseApi<null>>(this.baseURL + `/${id}`)
  }
}
