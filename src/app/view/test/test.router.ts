import { Component } from "@angular/core";
import { Routes } from "@angular/router";
import { TestComponent } from "./test.component";
import { TestCourseComponent } from "./test-course/test-course.component";
import { TestListComponent } from "./test-course/test-curriculum/test-list/test-list.component";
import { QuestionListComponent } from "./test-course/test-curriculum/question-list/question-list.component";
import { TestSericeReportComponent } from "./test-course/test-serice-report/test-serice-report.component";

export const routes: Routes = [
    {path : '', component : TestComponent},
    {path : 'test-detail/:id', component : TestCourseComponent},
    {path : 'test-list/:id', component : TestListComponent},
    {path : 'sectionDetail/:id', component : QuestionListComponent},
    {path : 'test-report/:id', component : TestSericeReportComponent }
]