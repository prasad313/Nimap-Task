import { Injectable } from '@angular/core';
import { Observable,Observer } from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImgUploadService {

  file:any;

  constructor(private httpImgObj:HttpClient) { }



  saveImage(event: any) {
  const file: File = event.target.files[0];
  if (file) {
    this.convertFileToBase64(file);
  }
}

convertFileToBase64(file: File) {
  const reader = new FileReader();
  reader.readAsDataURL(file);
}

saveImageToJSON(base64String: string) {

  const imageObject = { image: base64String };

  console.log(imageObject);
  

  

}


id:any;
updateImage(event: any,id:any) {
  const file: File = event.target.files[0];
 
}

convertFileToBase64Update(file: File) {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  
}

saveImageToJSONUpdate(base64String: string) {

  const imageObject = { image: base64String };

  console.log("in update service");
  console.log(this.id);
  console.log(imageObject);
  this.httpImgObj.put('http://localhost:3000/images/'+this.id,imageObject,{observe:'response'}).subscribe((imgresult)=>{
  console.log(imgresult);

//localStorage.removeItem('imageUrl');

  });

  

}

getImage(id:string)
{
 return this.httpImgObj.get('http://localhost:3000/images/'+id,{observe:'response'});
}


}



function saveAs(blob: Blob, fileName: string) {
  throw new Error('Function not implemented.');
}

