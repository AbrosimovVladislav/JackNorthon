import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Type} from '../model/Type';

@Injectable({
  providedIn: 'root'
})
export class TypeService {
  machineBaseUrl = 'http://161.35.70.99:';
  // machineBaseUrl = 'http://localhost:';

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
