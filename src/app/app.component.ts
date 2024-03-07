import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from './model/user';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'mfa';
  public loginForm!: FormGroup;
  public validateCodeForm!: FormGroup;
  user!:User;
  msg!:any;
  validateCodeRes!:any;
  qrImageData: any;

  constructor(public toastr: ToastrService,
    private formBuilder: FormBuilder,
    private loginService: LoginService
    ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: [''],
      password: ['']
      
    });
    this.validateCodeForm = this.formBuilder.group({
      code: [''], 
    });
    this.user = new User();
  }

  login() {
        this.loginService.login(this.loginForm.value).subscribe(
            (response) => {
                this.msg = "Login Success!"
                this.generateQR();
            },
            (error) => {
                console.error(error);
                if (error.status === 401) {
                    this.msg = "Invalid username and password!"
                } 
                else {
                  this.msg = "Error Occurred!"
                }
            }
        );
  }

  generateQR() {
    this.loginService.generateQR().subscribe(
      (data) => {
        // Assign QR image data to qrImageData
        this.qrImageData = 'data:image/png;base64,' + data.qrImageBase64; // Assuming data is in base64 format
      },
      (error) => {
        console.error(error);
        this.toastr.error("Error occurred while generating QR code.");
      }
    );
  }

  ValidateCode(){
    this.loginService.validateCode(this.validateCodeForm.value).subscribe(
      (response) => {
          this.validateCodeRes = response.access_token
      },
      (error) => {
          console.error(error);
          if (error.status === 401) {
              this.validateCodeRes = "Invalid code!"
          } 
          else {
            this.validateCodeRes = "Error Occurred!"
          }
      }
  );
  }

}
