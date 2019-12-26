import { Component, NgModule } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

interface Worker {
    id: string;
    name: string;
    surname: string;
    number: string;
    status: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  workerForm: FormGroup;
  workers: Worker[] = [];
  public id = 0;
  searchName = '';
  searchSurname = '';
  public pattern = ['+', '7', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];
  constructor() {
    this.workerForm = new FormGroup({
      id: new FormControl(this.workers.length),
      name: new FormControl('', [Validators.required]),
      surname: new FormControl('', [Validators.required]),
      number: new FormControl('', [Validators.required, Validators.pattern(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/)]),
      status: new FormControl(false)
    });
  }
  submit() {
    this.workers.push(this.workerForm.value);
    this.workerForm.setValue({id: this.workers.length, name: null, surname: null, number: null, status: false});
  }
  deleteWorker(id) {
    for (const worker of this.workers) {
      if (worker.id === id) {
        const index = this.workers.indexOf(worker);
        this.workers.splice(index, 1);
      }
    }
  }
  editWorker(workers) {
    let index;
    for (const worker of this.workers) {
      if (worker.id === workers.id) {
        index = this.workers.indexOf(worker);
      }
    }
    this.workers[index].id = workers.newWorker.id;
    this.workers[index].name = workers.newWorker.name;
    this.workers[index].surname = workers.newWorker.surname;
    this.workers[index].number = workers.newWorker.number;
    this.workers[index].status = workers.newWorker.head;
  }
}
