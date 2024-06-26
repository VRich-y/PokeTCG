import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ProfileComponent } from "./components/profile/profile.component";
import { ProfileRoutes } from "./profile.routes";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    declarations: [
        ProfileComponent
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        ProfileRoutes,
        CommonModule,
        SharedModule
    ]
})

export class ProfileModule { }