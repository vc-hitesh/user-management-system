import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { UserProfile } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/shared/services/user/user.service';

/**
 * Component for user list page
 */
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  /**
   * User table column list.
   */
  displayedColumns: string[] = [
    'id',
    'username',
    'name',
    'phone',
    'actions',
  ];

  /**
   * User data list for mat table.
   */
  dataSource: UserProfile[];
  constructor(
    private userService: UserService,
  ) { }

  /**
   * Ng life cycle hook
   */
  public ngOnInit(): void {
    this.getUsers();
  }

  /**
   * Get user list api call initiate.
   * @return api call will return user list and stored in mat table data.
   */
  public getUsers(): void {
    this.userService.getUsersList().pipe(
      take(1)
    ).subscribe((res: UserProfile[]) => {
      this.dataSource = res;
    });
  }

}
