import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { TaskService } from '../task.service';

const URL = 'http://localhost:8000/api/upload';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  merch = {
    name: '',
    price: Number,
    img: '',
    num: '',
  }
  editm = {
    name: '', 
    price: Number
  }
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
  loc;
  merchdata;
  tourdata;
  musicdata;
  public uploader:FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});
  // tourSubmit(tourData){
  //   this.tour.location = this.tourloc.city + ',' + this.tourloc.state;
  //   console.log(this.tour)
  //   this._task.addTour(this.tour).subscribe(data =>{
  //     console.log(data)
  //   })
  // }
  // merchSubmit(formData){
  //     //override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
  //     this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };
  //     //overide the onCompleteItem property of the uploader so we are 
  //     //able to deal with the server response.
  //     this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
  //       console.log('done')
  //       let str = response.slice(1, -1);
  //       this.merch.img = str
  //       this.genString();
  //       this._task.addMerc(this.merch);
  //     };
  // }
  merchedit(data){
    console.log('editing merch')
    console.log(data.value)
  }
  genString(){
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    let str = '';
    for(let i = 0; i < 15; i ++){
      str += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    this.merch.num = str;
  }
  onClick(){
    alert('clicked')
  }
  constructor(private _task: TaskService) {}
  ngOnInit() {
    this._task.searchMusic().subscribe(data =>{
      console.log(data)
      this.musicdata = data
    })
    // this._task.getMerch().subscribe(data =>{
    //   this.merchdata = data;
    // })
    this._task.getItem('tour').subscribe(data =>{
      this.tourdata = data;
    })
  }

}
