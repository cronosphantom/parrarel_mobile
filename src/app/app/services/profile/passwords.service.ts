import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class PasswordsService {

  constructor(private apollo: Apollo) { }

  getPasswords(profileId: string) {
    let variables = {
      profileId: profileId
    };
    return this.apollo.watchQuery({
      query: gql`
        query($profileId: String!){
          passwords(profileId: $profileId){
            id
            url
            name
          }
        }`,
      variables,
    }).valueChanges
  }

  getPassword(id: string) {
    let variables = {
      id: id
    };
    return this.apollo.watchQuery({
      query: gql`
        query($id: String!){
          password(id: $id){
            id
            name
            accessLevel
            url
            description
          }
        }`,
      variables,
    }).valueChanges
  }

  createPassword(data: any) {
    console.log(data)
    return this.apollo.mutate({
      mutation: gql`
        mutation ($data: PasswordInput!) {
          createPassword(data: $data) {
            id
          }
        }
      `,
      variables: { data },
    });
  }

  updatePassword(data: any, id: string) {
    return this.apollo.mutate({
      mutation: gql`
        mutation ($data: PasswordInput!, $id: String!) {
          updatePassword(data: $data, id: $id) {
            id
          }
        }
      `,
      variables: { data, id },
    });
  }
}
