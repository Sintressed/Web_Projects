import { Component, OnInit,Renderer } from '@angular/core';
import { TaskService } from '../task.service';
import {  FileUploader } from 'ng2-file-upload/ng2-file-upload';
const URL = 'http://localhost:8000/api/upload';

@Component({
  selector: 'app-merch',
  templateUrl: './merch.component.html',
  styleUrls: ['./merch.component.css']
})
export class MerchComponent implements OnInit {
  merchdata;
  globalListener: any;
  show = 1;
  merch = {
    name: '',
    price: Number,
    img: '',
    num: '',
  }
  constructor(private _task: TaskService,private renderer: Renderer) { }
  public uploader:FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});
  buyMerch(id){
    console.log('buying merch')
    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_UDcqn2KWjGC1TwbZMV5dJ1e6',
      locale: 'auto',
      token: (token =>{
        this._task.sendToken(token.id).subscribe(data =>{
          console.log(data)
        })
      })
    })
    handler.open({
      name: id,
      description: 'item is not real price is to show it works',
      amount: 50
    });
    this.globalListener = this.renderer.listenGlobal('window', 'popstate', () => {
      handler.close();
    });
  }
  merchSubmit(formData){
    //override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
    this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };
    //overide the onCompleteItem property of the uploader so we are 
    //able to deal with the server response.
    this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
      console.log('done')
      let str = response.slice(1, -1);
      this.merch.img = str;
      console.log('merch is:', this.merch)
      this._task.addMerc(this.merch);
    };
  }
  delMerch(id){
    this._task.delItem('merch',id)
  }
  ngOnInit() {
    this._task.checkSession().subscribe(data =>{
      if(data === 'yes'){
        this.show = 2
      }
      this.show = 2
    })
    this._task.getMerch().subscribe(data =>{
      
      this.merchdata = [data];
      console.log(this.merchdata)
    })
    this._task.data.subscribe(
      data =>{
        this.merchdata = data;
      }
    )


  }

}
