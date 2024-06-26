import { NgModule } from "@angular/core";
import { SetsRoutes } from "./sets.routes";
import { CommonModule } from "@angular/common";
import { SetsComponent } from "./components/sets/sets.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    declarations: [
        SetsComponent
    ],
    imports: [
        SetsRoutes,
        CommonModule,
        SharedModule
    ]
})

export class SetsModule { }