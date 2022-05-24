import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
@Injectable({
  providedIn: 'root'
})
export class ProfileUserService {

  constructor(private apollo: Apollo) { }
  getProfileUsers(profileId: string) {
    let variables = {
      profileId: profileId
    };
    return this.apollo.watchQuery({
      query: gql`
        query($profileId: String!){
          profileUsers(profileId: $profileId){
            id
            user{
              id
              firstName
              lastName
            }
          }
        }`,
      variables,
    }).valueChanges
  }
}
