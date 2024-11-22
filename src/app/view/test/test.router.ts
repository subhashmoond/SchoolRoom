import { Component } from "@angular/core";
import { Routes } from "@angular/router";
import { TestComponent } from "./test.component";
import { TestCourseComponent } from "./test-course/test-course.component";
import { MainTestComponent } from "./main-test/main-test.component";

export const routes: Routes = [
    {path : '', component : TestComponent},
    {path : 'test-plan', component : TestCourseComponent},
    {path : 'test-details', component : MainTestComponent}
]