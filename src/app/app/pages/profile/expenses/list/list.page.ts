import { Component, OnInit } from '@angular/core';
import { ExpensesService } from "src/app/app/services/profile/expenses.service";
import { AuthService } from "src/app/app/services/auth.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  expenses: any = [];
  upcoming_expenses: any = [];
  past_expenses: any = [];
  tabActive = "upcoming"
  constructor(
    private expensesService: ExpensesService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.getExpenses();
  }
  segmentChanged(e) {
    console.log(e)
    this.tabActive = e['detail']['value']
  }
  getExpenses() {
    console.log(this.authService.currentProfileUser);
    this.expensesService.getExpenses(this.authService.currentProfileUser['profile']['id']).subscribe(
      async (res: any) => {
        console.log(res)
        this.expenses = res.data['expenseItems'];
        this.upcoming_expenses = this.expenses.filter(expense => new Date(expense.onDate) > new Date());
        this.past_expenses = this.expenses.filter(expense => new Date(expense.onDate) < new Date());
      }
    );
  }
  getDate(datetime) {
    return new Date(datetime).getDate();
  }
  getMonth(datetime) {
    const monthArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return monthArr[new Date(datetime).getMonth()];
  }
}
