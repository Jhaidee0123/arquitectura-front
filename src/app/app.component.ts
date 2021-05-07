import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateUserDto } from './models/create-user-dto';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  users: any[] = [];
  userForm!: FormGroup;
  deleteUserForm!: FormGroup;
  constructor(private usersService: UserService,
              private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.setUpForm();
    this.loadUsers();
  }

  private setUpForm(): void {
    this.userForm = this.formBuilder.group({
      firstname: [null, Validators.required],
      lastname: [null, Validators.required]
    });

    this.deleteUserForm = this.formBuilder.group({
      iduser: [null, Validators.required]
    });
  }

  private loadUsers(): void {
    this.usersService.getAllUsers().subscribe(res => this.users = res, err => console.log(err));
  }

  public createUser(form: any): void {
    if (form.valid) {
      const { firstname, lastname } = this.userForm.value;
      const userDto: CreateUserDto = {
        firstName: firstname,
        lastName: lastname
      }
      this.usersService.createUser(userDto).subscribe(() => {
        this.loadUsers();
      });
      
    }
  }

  public deleteUser(form: any): void {
    if (form.valid) {
      const { iduser } = this.deleteUserForm.value;
      this.usersService.removeUser(iduser).subscribe(() => {
        this.loadUsers();
      });
    }
  }
  
}
