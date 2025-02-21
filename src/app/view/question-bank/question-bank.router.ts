import { Component } from "@angular/core";
import { Routes } from "@angular/router";
import { QuestionBankComponent } from "./question-bank.component";
import { QuestionBankDetailComponent } from "./question-bank-detail/question-bank-detail.component";

export const routes: Routes = [
    {path : '', component : QuestionBankComponent},
    {path : 'question-bank-detail/:id', component : QuestionBankDetailComponent }
]