import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Users } from './services/users';
import { user } from './interfaces/user';
import { FormsModule } from '@angular/forms';




@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {

  users: user[] = [];
  selectedUser: user | undefined;

  constructor(private userService: Users) { }

  ngOnInit() {
    this.getUser()
  }

  getUser() {
    this.userService.getUsers().subscribe((data: user[]) => {
      this.users = data;
      console.log(this.users);
    });
  }

  addUser(formData: user) {
    if (!this.selectedUser) {
      this.userService.saveUsers(formData).subscribe((data: user) => {
        this.users.push(data);
        if (data) {
          this.getUser()
        }
      });
    } else {
      const userData = { ...formData, id: this.selectedUser.id }
      this.userService.updateUser(userData).subscribe((data) => {
        console.log(data);
        if (data) {
          this.getUser()
        }
      })
    }

  }

  deleteUser(id: string) {
    this.userService.deleteUsers(id).subscribe((data: user) => {
      console.log(data);
      if (data) {
        this.getUser()
      }
    })
  }

  selectUser(id: string) {
    this.userService.getSelectedUser(id).subscribe((data: user) => {
      console.log(data);
      this.selectedUser = data;
    })
  }
}
