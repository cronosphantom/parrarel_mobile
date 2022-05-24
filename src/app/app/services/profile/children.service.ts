import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
@Injectable({
  providedIn: 'root',
})
export class ChildrenService {
  constructor(private apollo: Apollo) { }

  children(profileId: string) {
    return this.apollo.watchQuery({
      query: gql`
        query ($profileId: String!) {
          children(profileId: $profileId) {
            id
            name
            dob
            school
            teacher
          }
        }
      `,
      variables: { profileId },
    }).valueChanges;
  }

  child(id: string) {
    return this.apollo.watchQuery({
      query: gql`
        query ($id: String!) {
          child(id: $id) {
            id
            name
            dob
            email
            school
            teacher
            description
            photo
          }
        }
      `,
      variables: { id },
    }).valueChanges;
  }
  createChild(data: any) {
    return this.apollo.mutate({
      mutation: gql`
        mutation ($data: ChildInput!) {
          createChild(data: $data) {
            id
          }
        }
      `,
      variables: { data },
    });
  }
  updateChild(id: string, data: any) {
    return this.apollo.mutate({
      mutation: gql`
        mutation ($id: String!, $data: ChildInput!) {
          updateChild(id: $id, data: $data) {
            id
          }
        }
      `,
      variables: { id, data },
    });
  }
}
