import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { DetailSetPageComponent } from "./components/detail-page/detail-set-page.component";

const routes: Routes = [
    { path: '', component: DetailSetPageComponent }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DetailSetRoutes { }