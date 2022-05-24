import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
@Injectable({
  providedIn: 'root'
})
export class ExpensesService {

  constructor(private apollo: Apollo) { }
  getExpenses(profileId: string) {
    let variables = {
      profileId: profileId
    };
    return this.apollo.watchQuery({
      query: gql`
        query($profileId: String!){
          expenseItems(profileId: $profileId){
            id
            onDate
            description
            split1UserAmount
            split1User
            {
              id
              email
              firstName
              lastName
            }
            split2UserAmount
            split2User{
              id
              email
              firstName
              lastName
            }
          }
        }`,
      variables,
    }).valueChanges
  }
  getExpense(id: string) {
    let variables = {
      id: id
    };
    return this.apollo.watchQuery({
      query: gql`
        query($id: String!){
          expenseItem(id: $id){
            id
            onDate
            description
            split1UserAmount
            split1User
            {
              id
              email
              firstName
              lastName
            }
            split2UserAmount
            split2User{
              id
              email
              firstName
              lastName
            }
          }
        }`,
      variables,
    }).valueChanges
  }
  createExpense(data: any, profileId: any, userId: any, split2UserId: any) {
    return this.apollo.mutate({
      mutation: gql`
        mutation ($data: ExpenseItemInput!, $profileId: String!, $userId: String!, $split2UserId: String!) {
          createExpenseItem(data: $data, profileId: $profileId, userId: $userId, split2UserId: $split2UserId) {
            id
          }
        }
      `,
      variables: {
        data, profileId, userId, split2UserId
      },
    });
  }
  updateExpense(data: any, id: string) {
    return this.apollo.mutate({
      mutation: gql`
        mutation ($data: ExpenseItemInput!, $id: String!) {
          updateExpenseItem(data: $data, id: $id) {
            id
          }
        }
      `,
      variables: { data, id },
    });
  }
}
