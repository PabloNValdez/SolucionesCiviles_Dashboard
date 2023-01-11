import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../Models/user.model';
import { LoginService } from '../Services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loginForm: FormGroup;
  user: User;
  errorMessage: string = '';
  showError: boolean;

  constructor(public loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });

    this.loginService.isUserAuthenticated();
  }

  validateControl = (controlName: string) => {
    return !this.loginForm.get(controlName).valid && this.loginForm.get(controlName).touched
  }
  hasError = (controlName: string, errorName: string) => {
    return this.loginForm.get(controlName).hasError(errorName)
  }

  login(){
    const user: User = {
      Username: this.loginForm.get('username').value,
      Password: this.loginForm.value.password
    };

    this.loginService.login(user).subscribe((token : string) =>{
      localStorage.setItem('token', token);
      console.log("Ingreso exitoso");
      console.log(localStorage.getItem("token"));
      // this.router.navigate(['/list-trabajos']);
      this.router.navigate([''], { skipLocationChange: true }).then(()=>
      this.router.navigate(['']));
    }, error => {
      this.errorMessage = error;
      this.showError = true;
    });
  }
}
