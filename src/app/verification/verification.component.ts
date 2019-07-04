import { Component, OnInit, ViewChild } from '@angular/core';
import { Verification } from './verification';
import { VerificationService } from '../services/verification.service/verification.service';
import { AuthService } from '../services/auth.service/auth.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import  { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss']
})
export class VerificationComponent implements OnInit {

  data: Verification[] = [];
  displayedColumns: string[] = ['chassisNo', 'salesOrder', 'v1UserName', 'v1DateTime', 'v1Passed', 'v2UserName', 'v2DateTime', 'v2Passed'];
  isLoadingResults = true;
  dataSource: MatTableDataSource<Verification>;
  
  constructor(private verificationService: VerificationService, private authService: AuthService, private router: Router) {
  }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  
  ngOnInit() {
    this.getVerification();
  }
  
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getVerification(): void {
    this.verificationService.getVerification()
      .subscribe(verifications => {
        this.data = verifications;
        this.dataSource = new MatTableDataSource(this.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(this.data);
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }

  register() {
    this.router.navigate(['register']);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
}
