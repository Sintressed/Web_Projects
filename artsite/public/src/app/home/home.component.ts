import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TaskService } from '../task.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  form = false;
  user = {
    username: '',
    password: '',
  }
  signshow(){
    console.log('sign')
    this.form = true;
  }
  onSubmit(form){
    console.log(this.user)
    this._task.pass(this.user).subscribe(data =>{
      console.log(data)
    })
  }
  constructor(private _task: TaskService) { }

  ngOnInit() {
  }

}
