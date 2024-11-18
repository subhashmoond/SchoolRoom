import { Component } from "@angular/core";
import { Routes } from "@angular/router";
import { TestComponent } from "./test.component";
import { TestDetailsComponent } from "./test-details/test-details.component";

export const routes: Routes = [
    {path : '', component : TestComponent},
    {path : 'testdetail', component : TestDetailsComponent}
]