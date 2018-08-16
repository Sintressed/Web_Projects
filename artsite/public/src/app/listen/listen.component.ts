import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-listen',
  templateUrl: './listen.component.html',
  styleUrls: ['./listen.component.css']
})
export class ListenComponent implements OnInit {
  musicdata;
  constructor(private _task: TaskService) { }

  ngOnInit() {
    this._task.getItem('music').subscribe(data =>{
      console.log(data)
      this.musicdata = data
    })
  }

}
