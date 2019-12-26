import {Pipe, PipeTransform} from '@angular/core';
import {isNullOrUndefined} from 'util';

interface Worker {
  id: string;
  name: string;
  surname: string;
  number: string;
  status: boolean;
}
@Pipe({
  name: 'name'
})
export class NamePipe implements PipeTransform {
  transform(workers: Worker[], searchName: string, searchSurname: string): any {
    if (!isNullOrUndefined(workers) && (searchName.trim().length > 0 || searchSurname.trim().length > 0)) {
      return workers.filter(worker => worker.name.toLocaleLowerCase().indexOf(searchName.toLocaleLowerCase()) === 0 && worker.surname.toLocaleLowerCase().indexOf(searchSurname.toLocaleLowerCase()) === 0);
    } else {
      return workers;
    }
  }
}
