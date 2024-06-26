import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { DetailPageComponent } from "./components/detail-page/detail-page.component";

const routes: Routes = [
    { path: '', component: DetailPageComponent }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DetailRoutes { }