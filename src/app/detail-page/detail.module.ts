import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DetailPageComponent } from "./components/detail-page/detail-page.component";
import { DetailRoutes } from "./detail.routes";

@NgModule({
    declarations: [
        DetailPageComponent
    ],
    imports: [
        DetailRoutes,
        CommonModule
    ]
})

export class DetailModule { }