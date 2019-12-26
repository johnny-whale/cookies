import { Component, OnInit } from '@angular/core';
import { WorkersService } from '../services/workers.service';
import { isNullOrUndefined } from 'util';
interface Worker {
  id: string;
  name: string;
  surname: string;
  number: string;
  status: boolean;
}
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public workers: Worker[] = [];
  searchName = '';
  searchSurname = '';
  constructor(private workersService: WorkersService) { }
  async ngOnInit() {
    try {
      const workers = this.workersService.getWorkers();
      this.workers = (isNullOrUndefined(await workers)) ? [] : await workers;
    } catch (err) {
      console.log(err);
    }
  }
  async removeWorker(id) {
    try {
      await this.workersService.deleteWorkerById(id);
      this.ngOnInit();
    } catch (err) {
      console.log(err);
    }
  }
}
