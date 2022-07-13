import { Component, OnInit } from '@angular/core';

import { LoaderService } from './loader.service';
/**
 * Loader component to manage blocking loader.
 */
@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {

  constructor(
    public loaderService: LoaderService,
  ) { }

}
