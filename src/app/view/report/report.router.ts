import { Component } from "@angular/core";
import { Routes } from "@angular/router";
import { OverviewReportComponent } from "./overview-report/overview-report.component";
import { TransactionsComponent } from "./transactions/transactions.component";

export const routes: Routes = [
    {path : '', component : OverviewReportComponent},
    {path : 'transactions', component : TransactionsComponent }
]