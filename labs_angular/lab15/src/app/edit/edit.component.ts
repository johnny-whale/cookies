import { Component, OnInit } from '@angular/core';
import {isNullOrUndefined} from 'util';
import {WorkersService} from '../services/workers.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  public id;
  public worker;
  workerForm: FormGroup;
  public pattern = ['+', '7', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];
  constructor(private workersService: WorkersService, private activatedRouter: ActivatedRoute, private router: Router) {
    this.workerForm = new FormGroup({
      id: new FormControl(null),
      name: new FormControl(null, [Validators.required]),
      surname: new FormControl(null, [Validators.required]),
      number: new FormControl(null, [Validators.required, Validators.pattern(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/)]),
      status: new FormControl(null)
    });
  }

  async ngOnInit() {
    this.activatedRouter.params.subscribe(param => {
      this.id = param.id;
    });
    const worker = this.workersService.getWorkerById(this.id);
    this.worker = (isNullOrUndefined(await worker)) ? [] : await worker;
    this.id = this.worker.id;
  }
  async editWorker() {
    try {
      await this.workersService.putWorkerById(this.workerForm.value.id, this.workerForm.value);
      this.workerForm.reset();
    } catch (err) {
      console.log(err);
    }
  }
}
