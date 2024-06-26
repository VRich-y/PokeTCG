import { RouterModule, Routes } from "@angular/router";
import { CardsComponent } from "./components/cards.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
    { path: '', component: CardsComponent }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CardsRoutes { }