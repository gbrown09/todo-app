import { Component, HostBinding, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  toggle = new FormControl(false);
  loading: boolean;

  @HostBinding('class') className = '';

  constructor(private matIconRegistry: MatIconRegistry,private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon('github',this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/github.svg'));
    this.loading = false;
  }


  ngOnInit(): void {
    this.toggle.valueChanges.subscribe((val) => {
      this.className = val ? 'darkMode' : '';
    });
  }

  toggleLoading(toggle: boolean) {
    this.loading = toggle;
  }
}
