import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DetailSetRoutes } from "./detail-set.routes";
import { DetailSetPageComponent } from "./components/detail-page/detail-set-page.component";
import { FormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        DetailSetPageComponent
    ],
    imports: [
        DetailSetRoutes,
        FormsModule,
        CommonModule
    ]
})

export class DetailSetModule { }