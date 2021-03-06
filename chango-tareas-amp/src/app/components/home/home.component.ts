import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title = 'Pagina principal ';

  users = [];

  user = {
    nivel: '',
    rol: ''
  }

  contacts = [];

  imageAlumno: string = 'https://image.flaticon.com/icons/png/512/2886/2886008.png';
  imageMaestro: string = 'https://image.flaticon.com/icons/png/512/46/46139.png';

  constructor(public authservice: AuthService, public userService: UserService,
    public chatService: ChatService, private router: Router,
    private titleService: Title, private metaService: Meta) { }

  ngOnInit(): void {
    this.userService.getId().subscribe(
      res => {
        //console.log(res.data);
        this.users = res.data;
        for (let val = 0; val < this.users.length; val++) {
          this.user.nivel = this.users[val].nivel;
          this.titleService.setTitle(this.title + this.users[val].nombre);

          this.metaService.addTags([
            { meta: 'keywords', content: this.users[val].rol + ', ' + this.users[val].nombre + ', ' + this.users[val].nivel + ', changotareas' },
            { meta: 'description', content: this.users[val].rol + ' ' +this.users[val].nombre + ' ' +this.users[val].nivel+' ' + ' changotareas' },
            { meta: 'content', content: this.users[val].rol + ', ' + this.users[val].nivel }
          ]);

          if (this.users[val].rol == 'Estudiante') {
            this.user.rol = 'Maestro';
          } else {
            this.user.rol = 'Estudiante';
          }
          this.showUsers(this.user);
        }
      },
      err => {
        //console.log(err);
      }
    );

  }

  showUsers(user) {
    this.userService.getUsers(user).subscribe(
      res => {
        //console.log(res.data);
        this.contacts = res.data;
      },
      err => {
        //console.log(err);
      }
    );
  }

  irAlChat(contacto, usuario) {
    this.router.navigate(['/chat', contacto + "-" + usuario]);
  }
}
