import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(private apollo: Apollo) { }
  getCalendars(profileId: string) {
    const variables = {
      profileId
    };
    return this.apollo.watchQuery({
      query: gql`
        query($profileId: String!){
          calendarItems(profileId: $profileId){
            id name status
            description
            rideInformation
            onDate
          }
        }`,
      variables,
      fetchPolicy:'network-only',
    }).valueChanges;
  }
  getCalendar(id: string) {
    const variables = {
      id
    };
    return this.apollo.watchQuery({
      query: gql`
        query($id: String!){
          calendarItem(id: $id){
            id
            description
            rideInformation
            onDate
            isRecurring
            location
          }
        }`,
      variables,
      fetchPolicy:'network-only',
    }).valueChanges;
  }
  createCalendar(data: any, profileId: any, userId: any, children: any) {
    return this.apollo.mutate({
      mutation: gql`
        mutation ($data: CalendarItemInput!, $profileId: String!, $userId: String!, $children: [String!]!) {
          createCalendarItem(data: $data, profileId: $profileId, userId: $userId, children: $children) {
            id
          }
        }
      `,
      variables: {
        data, profileId, userId, children
      },
    });
  }
  updateCalendar(data: any, id: string) {
    return this.apollo.mutate({
      mutation: gql`
        mutation ($data: CalendarItemInput!, $id: String!) {
          updateCalendarItem(data: $data, id: $id) {
            id
          }
        }
      `,
      variables: { data, id },
    });
  }
}
