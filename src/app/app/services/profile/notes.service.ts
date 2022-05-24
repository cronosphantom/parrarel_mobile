import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private apollo: Apollo) { }

  getNotes(profileId: string) {
    let variables = {
      profileId: profileId
    };
    return this.apollo.watchQuery({
      query: gql`
        query($profileId: String!){
          notes(profileId: $profileId){
            id
            description
            createdAt
          }
        }`,
      variables,
    }).valueChanges
  }

  getNote(id: string) {
    let variables = {
      id: id
    };
    return this.apollo.watchQuery({
      query: gql`
        query($id: String!){
          note(id: $id){
            id
            description
            createdAt
            attachment
            child{
              id
            }
            accessLevel
          }
        }`,
      variables,
    }).valueChanges
  }

  createNote(data: any) {
    console.log(data)
    return this.apollo.mutate({
      mutation: gql`
        mutation ($data: NoteInput!) {
          createNote(data: $data) {
            id
          }
        }
      `,
      variables: { data },
    });
  }

  updateNote(data: any, id: string) {
    return this.apollo.mutate({
      mutation: gql`
        mutation ($data: NoteInput!, $id: String!) {
          updateNote(data: $data, id: $id) {
            id
          }
        }
      `,
      variables: { data, id },
    });
  }
}
