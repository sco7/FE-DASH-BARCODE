import { Component, OnInit } from '@angular/core';
import { Verification } from './verification';
import { VerificationService } from '../services/verification.service/verification.service';
import { AuthService } from '../services/auth.service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss']
})
export class VerificationComponent implements OnInit {

  data: Verification[] = [];
  displayedColumns: string[] = ['verificationId', 'chassisNo', 'v1UserName', 'v1DateTime', 'v1Passed', 'v2UserName', 'v2DateTime', 'v2Passed'];
  isLoadingResults = true;

  constructor(private verificationService: VerificationService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.getVerification();
  }

  getVerification(): void {
    this.verificationService.getVerification()
      .subscribe(verifications => {
        this.data = verifications;
        console.log(this.data);
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

}