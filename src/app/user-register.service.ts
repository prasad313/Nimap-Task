import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { register } from './interfaceData';

@Injectable({
  providedIn: 'root'
})
export class UserRegisterService {
  file:any
  constructor(private httpObj : HttpClient) { }



  getInfo(id:any)
  {
   return this.httpObj.get<register>('http://localhost:3000/users/'+id,{observe:'response'});
  }


  updateUser(id:string,Obj:register)
{ // use put and patch method 
  return this.httpObj.put('http://localhost:3000/users/'+id,Obj,{observe:'response'});
}
 

 


  addInfo(data: register)
  {
    

  //    const formData = new FormData();
  // formData.append('image', this.file);
  // formData.append('firstname', data.firstname);
  // formData.append('lastname', data.lastname);
  // formData.append('email', data.email);
  // formData.append('contact',data.contact);
  // formData.append('age', data.age);
  // formData.append('state', data.state);
  // formData.append('country', data.country);
  // formData.append('officeaddress1', data.officeaddress1);
  // formData.append('officeaddress2', data.officeaddress2);
  // formData.append('homeaddress1', data.homeaddress1);
  // formData.append('homeaddress2', data.homeaddress2);
  // data.tag.forEach(tag => {
  //   formData.append('tag', tag);
  // });



  //let new_obj = Object.assign({}, obj1, obj2, obj3);


    // data.image=this.file;
    // console.log(typeof this.file);
    
    return  this.httpObj.post('http://localhost:3000/users',data,{observe:'response'});
  }



  


}
function saveAs(blob: Blob, fileName: string) {
  throw new Error('Function not implemented.');
}

