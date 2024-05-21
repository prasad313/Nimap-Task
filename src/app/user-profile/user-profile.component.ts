import { Component, OnInit } from '@angular/core';
import { UserRegisterService } from '../user-register.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {FormGroup,FormControl,FormBuilder,Validator, Validators } from '@angular/forms';
import { register } from '../interfaceData';
import { ImgUploadService } from '../img-upload.service';




@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  tags:string[]=[];
  sliderValue:number|undefined=20;
  countries: string[] = ['India']; 
  states: string[] = ['Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu and Kashmir', 'Goa', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttarakhand', 'Uttar Pradesh', 'West Bengal', 'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli', 'Daman and Diu', 'Delhi', 'Lakshadweep', 'Puducherry']; 





  firstname:string='';
    lastname:string='';
    email:string='';
    contact:string='';
    age:string='';
    state:string='';
    country:string='';
    officeaddress1:string='';
    officeaddress2:string='';
    homeaddress1:string='';
    homeaddress2:string='';
    tag:string[]=[];
    newsletter:boolean=false;
    image:string='';



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

   

constructor( private imgServiceObj:ImgUploadService, private formBuilderObj:FormBuilder,private modalService: NgbModal,private routerObj:Router, private activeRouteObj: ActivatedRoute, private userServiceObj : UserRegisterService){

  this.rgForm=this.formBuilderObj.group({
    firstname:['',[Validators.required, Validators.pattern('^[a-zA-Z]+'), Validators.maxLength(20)] ],
    lastname:['',Validators.required],
    email:['',[Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]],
    contact:['',[Validators.required, Validators.pattern('^[6-9]\\d{9}$')]],
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

}
 id:string='';
 imageUrl:string |null ='';
 imageId:string |null ='';

  ngOnInit(): void {
    let userId= this.activeRouteObj.snapshot.paramMap.get('userId');
    
    this.userServiceObj.getInfo(userId).subscribe((result)=>{
      // console.log("reuslt in profile");
      // console.log(result);
      const data:any=result.body;
      
      this.id=data.id;
      this.firstname=data.firstname;
      this.lastname=data.lastname;
      this.age=data.age;
      this.sliderValue=data.age;
      this.email=data.email;
      this.state=data.state;
      this.contact=data.contact;
      this.tag=data.tag;
     
      this.newsletter=data.newsletter;
      this.homeaddress1=data.homeaddress1;
      this.homeaddress2=data.homeaddress2;
      this.officeaddress1=data.officeaddress1;
      this.officeaddress2=data.officeaddress2;
      this.country=data.country;
      this.image=data.image;


      this.imgServiceObj.getImage(this.image).subscribe((result)=>{
        const jsonData:any=result.body;
        this.imageUrl=jsonData.image;
        this.imageId=jsonData.id;
  
      })

      console.log(this.tag);
      
      console.log();
   
    })


    
    
  }

  updateImage(event: any,id:any) {

    console.log("update Image function");
    console.log(id);
  
    this.imgServiceObj.updateImage(event,id);

  //this.getRefersh();

    this.ngOnInit();
   

    }
  

    
 
  goHome()
  {
    this.routerObj.navigate(['home-page']);
  }

  openLg(content:any) {
		this.modalService.open(content, { size: 'lg' });
	}


  updateUser()
  {
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
      image:this.rgForm.value.image
       // image:this.profileImg
    }

    this.userServiceObj.updateUser(this.id,registerObj).subscribe((result)=>{
      console.log("Add data successfullay...");
      
     
          const data:any=result.body;
         console.log(data.id);
          let userId=data.id;


        // console.log(data['id']);

        
      

      this.routerObj.navigate(['/user-profile/'+userId]);

      


    })
     

  }

  removeTag(index: number): void {
    this.tags.splice(index, 1);
  }

  
  AddressType: string = '';

toggleAddressFields(event:any): void {

  const eventValue=event.target.value;

  this.AddressType=eventValue;

}

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


valueChanged($event:any) {
  this.sliderValue = $event.target.value; }


}
