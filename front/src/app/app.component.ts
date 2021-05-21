import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  token: string = sessionStorage.getItem('token');

  constructor(private http: HttpClient, private auth: AuthService) {}

  ngOnInit() {
    this.auth.isLoggin();
  }
}
