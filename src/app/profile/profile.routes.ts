import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { ProfileComponent } from "./components/profile/profile.component";

const routes: Routes = [
    { path: '', component: ProfileComponent }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProfileRoutes { }