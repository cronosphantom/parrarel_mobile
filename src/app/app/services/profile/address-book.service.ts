import { Injectable } from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
@Injectable({
  providedIn: 'root'
})
export class AddressBookService {

  constructor(private apollo: Apollo) { }
  addressBook(profile: string){
    return  this.apollo
     .watchQuery({
       query: gql`
         query($profile: String!) {
           addressBook(profile: $profile) {
           id title  name    mobile      email   photo   createdAt updatedAt
           }
         }
       `,
       variables: { profile}
     }).valueChanges;
   }

   addressBookEntry(id: string){
    return  this.apollo
     .watchQuery({
       query: gql`
         query($id: String!) {
           addressBookEntry(id: $id) {
           id title  name    mobile      email  description     photo   createdAt updatedAt
           }
         }
       `,
       variables: { id}
     }).valueChanges;
   }
   createAddressBookEntry(payload){
    const data = {...payload}
    return this.apollo.mutate({
      mutation:gql`
      mutation($data:AddressBookEntryInput!){
        createAddressBookEntry(data:$data){
          id
         
       
        }
      }`,variables: {data}
    })
   }
   updateAddressBook(id,payload){
    const data = {...payload}
    console.log(data)
    console.log(id+"id")
    return this.apollo.mutate({
      mutation:gql`
      mutation($id:String,$data:AddressBookEntryInput!){
        updateAddressBookEntry(id:$id,data:$data){
          id
         
       
        }
      }`,variables: {id,data}
    })
   }
}
