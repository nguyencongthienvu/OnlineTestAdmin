import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
//service
import { AuthService } from './services/auth.service';
import { PnotifyService } from './services/pnotify.service';
import { UrlServiceService } from './services/url-service.service';
import {AccountServiceService} from './services/account-service.service';
import{ DepartmentServiceService} from './services/department-service.service';
import {StudentServiceService} from './services/student-service.service';
import {InstructorServiceService} from './services/instructor-service.service';
//component
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { MenuComponent } from './shared/menu/menu.component';
import { LoginComponent } from './shared/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { StudentComponent } from './components/student/student.component';
import { InstructorComponent } from './components/instructor/instructor.component';
import { DepartmentComponent } from './components/department/department.component';
import { CourseComponent } from './components/course/course.component';
import { SearchComponent } from './components/search/search.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    LoginComponent,
    HomeComponent,
    StudentComponent,
    InstructorComponent,
    DepartmentComponent,
    CourseComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent },
      {path: 'home',component:HomeComponent,children:[
        {path:'student',component:StudentComponent},
        {path:'instructor',component:InstructorComponent},
        {path:'department',component:DepartmentComponent},
        {path:'course',component:CourseComponent},
        {path:'search',component:SearchComponent}
      ]}
    ])
  ],
  providers: [AuthService,PnotifyService,UrlServiceService,AccountServiceService,DepartmentServiceService,StudentServiceService,InstructorServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
