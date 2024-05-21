import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {FormGroup,FormControl,FormBuilder,Validator, Validators } from '@angular/forms';
import { register } from '../interfaceData';
import { UserRegisterService } from '../user-register.service';
import { ImgUploadService } from '../img-upload.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  //rgForm : FormGroup;


  countries: string[] = ['India']; 
  states: string[] = ['Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu and Kashmir', 'Goa', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttarakhand', 'Uttar Pradesh', 'West Bengal', 'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli', 'Daman and Diu', 'Delhi', 'Lakshadweep', 'Puducherry']; 



   rgForm = new FormGroup({
     firstname: new FormControl(),
    lastname:new FormControl(),
    email:new FormControl(),
    contact:new FormControl(),
    age: new FormControl(),
    state:new FormControl(),
    country:new FormControl(),
    officeaddress1:new FormControl(),
    officeaddress2:new FormControl(),
    homeaddress1:new FormControl(),
    homeaddress2:new FormControl(),
    tag:new FormControl(),
    newsletter:new FormControl(),
    image:new FormControl()

  })

  title:String="DEMO APP";
  sliderValue:number|undefined=20;
  tags:string[]=[];

  imageUrl:string |null ='';

  constructor(private imgeservieObj: ImgUploadService ,private routerObj:Router, private imgObj:ImgUploadService ,private modalService: NgbModal, private formBuilderObj:FormBuilder, private userServiceObj: UserRegisterService) {

    this.rgForm=this.formBuilderObj.group({
      firstname:['',[Validators.required, Validators.pattern('^[a-zA-Z]+'), Validators.maxLength(20)] ],
      lastname:['',Validators.required],
      email:['',[Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]],
      contact:['',[Validators.required, Validators.pattern('^[6-9]\\d{9}$'),Validators.maxLength(10)]],
      age:['',Validators.required],
      state:['',Validators.required],
      country:['',Validators.required],
     
      officeaddress1:['',Validators.required],
    officeaddress2:['',Validators.required],
    homeaddress1:['',Validators.required],
    homeaddress2:['',Validators.required],
      tag:['',[Validators.required, Validators.pattern('^[a-zA-Z]+')]],
      newsletter:[''],
      image:['',Validators.required]
    });


    // ///////////////////////////////////////////////////

    // this.imgeservieObj.getImage('625d').subscribe((result)=>{
    //   const jsonData:any=result.body;
    //   this.imageUrl=jsonData.image;

    // })

/////////////////////////////////////////////////////////
  }

profileImg:any;
imgId:string |any ='';
//////////////////////////////
  saveImage(event: any) {
  
  this.imgObj.saveImage(event);
  console.log("return img");
  console.log(this.imgId);
  this.imgId=localStorage.getItem('imageUrl');
  // console.log("return img");
  // console.log(this.imageUrl);

   this.imgeservieObj.getImage(this.imgId).subscribe((result)=>{
      const jsonData:any=result.body;
      this.imageUrl=jsonData.image;

    })

    this.ngOnInit();

  }


  
///////////////////////////////
  ngOnInit(): void {
   
    

  }

  
submitted:boolean=false;
  regiserUser()
  {

    this.submitted=true;

    if(this.rgForm.invalid)
      { 
        alert("Enter Valid User Information...");
        return  this.rgForm.markAllAsTouched();
      }

    console.log("okk");

    let registerObj:register={
      firstname:this.rgForm.value.firstname,
      lastname:this.rgForm.value.lastname,
      email:this.rgForm.value.email,
      contact:this.rgForm.value.contact,
      age:this.rgForm.value.age,
      state:this.rgForm.value.state,
      country:this.rgForm.value.country,
      officeaddress1:this.rgForm.value.officeaddress1,
      officeaddress2:this.rgForm.value.officeaddress2,
      homeaddress1:this.rgForm.value.homeaddress1,
      homeaddress2:this.rgForm.value.homeaddress2,
      tag:this.tags,
      newsletter:this.rgForm.value.newsletter,
      // image:this.rgForm.value.image
       image:this.imgId

    }

    this.userServiceObj.addInfo(registerObj).subscribe((result)=>{
      console.log("Add data successfullay...");
      
     
          const data:any=result.body;
         console.log(data.id);
          let userId=data.id;


        // console.log(data['id']);

        
      

      this.routerObj.navigate(['/user-profile/'+userId]);

      // this.routerObj.navigate(['/product-details/'+id])


    })
     

  }
  



  openLg(content:any) {
		this.modalService.open(content, { size: 'lg' });
	}


 


  valueChanged($event:any) {
    this.sliderValue = $event.target.value; }


    

    handleInput(event: KeyboardEvent): void {
      if (event.key === 'Enter' || event.key === ',') {
        event.preventDefault();
        const input = (event.target as HTMLInputElement).value.trim();
        if (input.length > 0) {
          this.tags.push(input);
          (event.target as HTMLInputElement).value = '';
        }
      }
    }
  
    
    
    AddressType: string = '';

  toggleAddressFields(event:any): void {

    const eventValue=event.target.value;

    this.AddressType=eventValue;

  }

    
}
