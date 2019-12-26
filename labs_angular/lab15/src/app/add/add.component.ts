import {Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  workerForm: FormGroup;
  workers: Worker[] = [];
  public pattern = ['+', '7', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];
  constructor(private workersService: WorkersService) {
    this.workerForm = new FormGroup({
      id: new FormControl(null),
      name: new FormControl(null, [Validators.required]),
      surname: new FormControl(null, [Validators.required]),
      number: new FormControl(null, [Validators.required, Validators.pattern(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/)]),
      status: new FormControl(null)
    });
  }

  async ngOnInit() {
    try {
      const workers = this.workersService.getWorkers();
      this.workers = (isNullOrUndefined(await workers)) ? [] : await workers;
    } catch (err) {
      console.log(err);
    }
  }
  async submit() {
    try {
      const worker = this.workerForm.value;
      await this.workersService.postWorker(worker);
      this.workerForm.reset();
    } catch (err) {
      console.log(err);
    }
  }
}
