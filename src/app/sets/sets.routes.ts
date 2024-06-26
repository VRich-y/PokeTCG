import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { SetsComponent } from "./components/sets/sets.component";

const routes: Routes = [
    { path: '', component: SetsComponent }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SetsRoutes { }