import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';


@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.css']
})

export class TourComponent implements OnInit {
  tourdata;
  show = 1;
  tour = {
    date: Date,
    location: '',
    theatre: '',
    tickets: Number,
  }
  tourloc = {
    city: '',
    state: '',
    blah: '',
  }
  constructor(private _task: TaskService) { }
  tourSubmit(tourData){
    this.tour.location = this.tourloc.city + ',' + this.tourloc.state;
    console.log(this.tour)
    this._task.addTour(this.tour).subscribe(data =>{
      console.log(data)
    })
  }
  touredit(id){
    this._task.delItem('tour',id).subscribe(data =>{
      console.log(data)
    })
  }
  ngOnInit() {
    this._task.checkSession().subscribe(data =>{
      if(data === 'yes'){
        this.show = 2
      }
    })
    this._task.getTour().subscribe(data =>{
      this.tourdata = data;
    })

  }

}
