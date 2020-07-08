import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Type} from '../model/Type';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TypeService {
  machineBaseUrl = environment.baseApiUrl;

  constructor(private http: HttpClient) {
  }

  getTypes() {
    return this.http
      .get<Type[]>(this.machineBaseUrl + '8082/types')
      .pipe(
        map(types => {
          const typesArr: Type[] = [];
          for (const key in types) {
            if (types.hasOwnProperty(key)) {
              typesArr.push({
                typeId: types[key].typeId,
                upper: types[key].upper,
                medium: types[key].medium,
                lower: types[key].lower,
                showName: types[key].showName
              });
            }
          }
          return typesArr;
        })
      );
  }
}
