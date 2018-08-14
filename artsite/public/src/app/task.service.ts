import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
//import { Observable } from 'rxjs/Observable';
//import { SpotifyService } from './spotify.service';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  data: BehaviorSubject<any[]> = new BehaviorSubject([])
  cart = [];
  constructor(private _http: HttpClient) { }
  searchStr: String;
  searchMusic(){
    console.log('getting music task')
    return this._http.post('/getMusic', 'music');
  }
  addMerc(item){
    this._http.post('/addMerch', item).subscribe(data =>{
      console.log(data)
    })
    this._http.post('/getMerch', 'hello').subscribe(
      thing =>{
        const tempData = this.data.getValue();
        tempData.pop()
        tempData.push(thing)
        console.log(tempData)
        this.data.next(tempData)
      }
    )
  }
  getMerch(){
    return this._http.post('/getMerch', 'Merch');
  }
  addTour(item){
    return this._http.post('/addTour', item);
  }
  getTour(){
    return this._http.post('/getTour','Tour');
  }
  pass(pass){
    return this._http.post('/pass', pass);
  }
  sendToken(token){
    return this._http.post('/stripeSet', {token: token});
  }
  checkSession(){
    return this._http.post('/checkSession','sess' );
  }
  delItem(call,item){
    this._http.post('/delItem', {call,item}).subscribe(data =>{
      console.log(data)
    })
    // this._http.post('/getMerch', 'hello').subscribe(
    //   thing =>{
    //     const tempData = this.data.getValue();
    //     tempData.pop()
    //     tempData.push(thing)
    //     console.log(tempData)
    //     this.data.next(tempData)
    //   }
    // )
  }


}
