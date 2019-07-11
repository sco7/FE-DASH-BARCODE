import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AppConfigService } from './services/app-config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  configLoaded = false;

  constructor(private appConfigService: AppConfigService) {
  }

  async ngOnInit() {
    await this.loadRuntimeDependancies();
  }

  async loadRuntimeDependancies() {
    console.log('Here!');
    try {
      await this.appConfigService.loadAppConfig();
      this.configLoaded = true;
    } catch (error) {
      this.configLoaded = true;
      return;
    }
  }
}
