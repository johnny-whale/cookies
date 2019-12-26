import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

interface Worker {
  id: string;
  name: string;
  surname: string;
  number: string;
  status: boolean;
}

@Component({
  selector: 'app-worker',
  templateUrl: './worker.component.html',
  styleUrls: ['./worker.component.css']
})
export class WorkerComponent {
  @Input() worker: {id: string, name: string, surname: string, number: string, status: boolean};
  @Output() deletedWorker = new EventEmitter<{id: string}>();
  @Output() editedWorker = new EventEmitter<{newWorker: Worker, id: string}>();
  public edit = false;
  workerForm: FormGroup;
  public mask = ['+', '7', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];
  constructor() {
    this.workerForm = new FormGroup({
      id: new FormControl(),
      name: new FormControl( '', [Validators.required]),
      surname: new FormControl(null, [Validators.required]),
      number: new FormControl(null, [Validators.required, Validators.pattern(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/)]),
      status: new FormControl(false)
    });
  }

  removeWorker(id) {
    this.deletedWorker.emit(id);
  }
  editWorker(idForFind) {
    this.editedWorker.emit({
      newWorker: this.workerForm.value,
      id: idForFind
    });
    this.edit = !this.edit;
  }
}
