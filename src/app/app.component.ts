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
  user!: User;
  msg!: any;
  validateCodeRes!: any;
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
    this.msg = ''
    this.qrImageData = ''
    this.loginService.login(this.loginForm.value).subscribe(
      (response) => {
        this.generateQR(this.user.username);
      },
      (error) => {
        if (error.status === 401) {
          this.msg = "Invalid username and password!"
        }
        else {
          this.msg = "Error Occurred!"
        }
      }
    );
  }

  generateQR(username: any) {
    this.loginService.generateQR(username).subscribe(
      (data) => {
        // Assign QR image data to qrImageData
        this.msg = data.message
        this.qrImageData = 'data:image/png;base64,' + data.data; // Assuming data is in base64 format
      },
      (error) => {
        this.toastr.error("Error occurred while generating QR code.");
      }
    );
  }

  ValidateCode() {
    localStorage.clear()
    this.loginService.validateCode(this.user.username, this.validateCodeForm.value.code).subscribe(
      (response) => {
        this.validateCodeRes = response.message
        localStorage.setItem("access_token", response.data.access_token)
      },
      (error) => {
        this.validateCodeRes = error.error.message
      }
    );
  }

}
