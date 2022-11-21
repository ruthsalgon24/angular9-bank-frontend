import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardGuard } from './services/guards/auth-guard.guard';
import { UserResolverService } from './services/user-resolver/user-resolver.service';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { TransactionsComponent } from './transactions/transactions.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent ,
  canActivate: [AuthGuardGuard],
    resolve: { user: UserResolverService }
}, //added
  
  { path: 'contact-us', component: ContactUsComponent }, //added
  { path: 'home', component: HomeComponent }, //added
  { path: 'transactions', component: TransactionsComponent }, //added
  { path: 'header', component: HeaderComponent }, //added
  {
    path: '',
    component: HomeComponent,
  
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

//check
