import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { UserProfile } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'username',
    'name',
    'phone',
    'actions',
  ];
  dataSource: UserProfile[];
  constructor(
    private userService: UserService,
  ) { }

  public ngOnInit(): void {
    this.getUsers();
  }

  public getUsers(): void {
    this.userService.getUsersList().pipe(
      take(1)
    ).subscribe((res: UserProfile[]) => {
      this.dataSource = res;
    });
  }

}
