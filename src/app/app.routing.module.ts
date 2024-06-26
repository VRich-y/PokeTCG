import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuardService } from "./services/authentication/auth-guard.service";

const routes: Routes = [

    { path: 'login', loadChildren: () => import('./login/login.module').then(x => x.LoginModule) },
    { path: 'cards', loadChildren: () => import('./cards/cards.module').then(x => x.CardsModule), canActivate: [AuthGuardService] },
    { path: 'sets', loadChildren: () => import('./sets/sets.module').then(x => x.SetsModule), data: { titulo: 'Sets' }, canActivate: [AuthGuardService] },
    { path: 'cards/:id', loadChildren: () => import('./detail-page/detail.module').then(x => x.DetailModule), canActivate: [AuthGuardService] },
    { path: 'sets/:id', loadChildren: () => import('./detail-set-page/detail-set.module').then(x => x.DetailSetModule), canActivate: [AuthGuardService] },
    { path: 'profile', loadChildren: () => import('./profile/profile.module').then(x => x.ProfileModule), canActivate: [AuthGuardService] },

    { path: '**', redirectTo: '/login', pathMatch: "full" }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AuthGuardService]
})
export class AppRoutingModule { }
