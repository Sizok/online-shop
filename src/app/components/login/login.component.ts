import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup
  constructor(private authService: AuthService, private router: Router) { }


  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)])
    })

    if(this.authService.isLoggedIn()) {
      this.router.navigate(['admin']);
    }
  }

  submitLogin(){
    this.authService.login(this.loginForm.value).subscribe({
      next:()=>this.router.navigate(['admin']),
      error: (error)=> alert(error.message)
    })
  }

  realSubmitLogin(){
    this.authService.login(this.loginForm.value).subscribe({
      next:()=>this.router.navigate(['admin']),
      error: (error)=> alert(error.message)
    })
  }


}
