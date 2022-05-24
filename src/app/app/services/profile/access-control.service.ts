import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
@Injectable({
  providedIn: 'root'
})
export class AccessControlService {

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
              email
            }
            role
          }
        }`,
      variables,
    }).valueChanges
  }
  getProfileUser(id: string) {
    let variables = {
      id: id
    };
    return this.apollo.watchQuery({
      query: gql`
        query($id: String!){
          profileUser(id: $id){
            id
            user{
              id
              firstName
              lastName
              email
            }
            role
          }
        }`,
      variables,
    }).valueChanges
  }
  createProfileUser(data: any) {
    console.log(data)
    return this.apollo.mutate({
      mutation: gql`
        mutation ($data: ProfileUserInput!) {
          createProfileUser(data: $data) {
            id
          }
        }
      `,
      variables: { data },
    });
  }
  updateProfileUser(data: any, id: string) {
    return this.apollo.mutate({
      mutation: gql`
        mutation ($data: ProfileUserInput!, $id: String!) {
          updateProfileUser(data: $data, id: $id) {
            id
          }
        }
      `,
      variables: { data, id },
    });
  }
}
