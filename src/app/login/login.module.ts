import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";
import { LoginComponent } from "./componentes/login/login.component";
import { LoginRoutes } from "./login.routes";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        LoginRoutes,
        CommonModule,
        SharedModule
    ]
})

export class LoginModule { }