import { NgModule } from "@angular/core";
import { CardsRoutes } from "./cards.routes";
import { CardsComponent } from "./components/cards.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    declarations: [
        CardsComponent
    ],
    imports: [
        CardsRoutes,
        CommonModule,
        FormsModule,
        SharedModule
    ]
})

export class CardsModule { }