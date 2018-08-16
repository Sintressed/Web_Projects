import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
//import { Observable } from 'rxjs/Observable';
//import { SpotifyService } from './spotify.service';
import { Observable, ObjectUnsubscribedError } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  merchData: BehaviorSubject<any[]> = new BehaviorSubject([])
  tourData: BehaviorSubject<any[]> = new BehaviorSubject([])
  cart = [];
  constructor(private _http: HttpClient) { }
  searchStr: String;
  searchMusic(){
    console.log('getting music task')
    return this._http.post('/getMusic', 'music');
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

   // *** Data functions *** //

   observeData(call){//chooses what observable to save/update
    console.log('task: setting observable ', call)
    let x;
    if(call === 'merch'){
      x = this.merchData;
    }
    else if(call === 'tour'){
      x = this.tourData
    }
    this._http.post('/getItem', {item: call}).subscribe(
      thing =>{
        const tempData = x.getValue();
        tempData.pop()
        tempData.push(thing)
        x.next(tempData)
      }
    )
  }
  addItem(item, data){
    console.log('task: adding ', item, 'data: ', data)
    this._http.post('/addItem', {item: item, data: data}).subscribe(data =>{
      console.log('add data: ',data)
    })
    this.observeData(item);
  }
  getItem(item){
    console.log('task: getting ', item)
    return this._http.post('/getItem', {item: item});
  }
  delItem(call,item){
    console.log('task: deleting ', call)
    let x; //determines what data subscription updates
    this._http.post('/delItem', {call,item}).subscribe(data =>{
      if(call === 'merch'){
        x = this.merchData
      }
      else if(call == 'tour'){
        x = this.tourData
      }
      this.observeData(call)
    })
  }


}
