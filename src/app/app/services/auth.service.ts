import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { finalize, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLoggedIn = false;
  public currentProfileUser = {
    id: '',
    profile: { id: 'ckpw8fd3g7tn86r9v0sqmlaxv', name: '' },
    status: 'active',
    role: 'parent',

  };
  //parent , relative , legal
  public currentUser: any = {
    userName: 'Levar Berry',
    email: 'levar.berry@edrivenent.com',
    userToken: 'DFGHJ09284093',
    userId: '1'
  };
  constructor(public apollo: Apollo) { }
  userLogin(payload: any) {
    const variables = {

      ...payload,

    };
    console.log(variables);
    return this.apollo.watchQuery({
      query: gql`
      query($email:String!,$password:String!) {
        userLogin(email:$email,password:$password) {
          status 
          token
          user{
              id
              firstName
              lastName
              email
              password
          }

      }
      }

      `,
      variables: payload,
    }).valueChanges;
  }
  validateToken() {
    return true;
  }
  logoutUser() {
    this.currentUser = {};
  }
  async initFromStorage() {
    const ret = await Storage.get({ key: 'currentUser' });
    try {

      const userStore = JSON.parse(ret.value);

      if (userStore) {
        this.isLoggedIn = true;
        this.currentUser = userStore;

      } else {
        this.isLoggedIn = false;
      }
      this.finalizeInit();

    } catch (e) {

      this.finalizeInit();
    }


    // });
  }
  finalizeInit() {
    const initComplete = new Event('initComplete');

    window.dispatchEvent(initComplete);
  }
  async userData() {
    const data = await Storage.get({ key: 'currentUser' });

    try {
      const userdata = JSON.parse(data.value);

      if (userdata) {
        this.isLoggedIn = true;
        this.currentUser = userdata;
      }
      else {
        this.isLoggedIn = false;
        this.finalizeInit();
      }
      finalize(() => this.finalizeInit());
    }
    catch (e) {
      this.finalizeInit();
    }
  }
  async currentProfileData(userID) {
    const data = await Storage.get({ key: 'currentProfileUser' });

    try {
      const currentProfileUserData = JSON.parse(data.value);
      console.log(currentProfileUserData);
      return currentProfileUserData;
    }
    catch (e) {
      this.finalizeInit();
    }
  }
  getProfileUser(userId: string) {

    const variables = { userId };
    return this.apollo.watchQuery({
      query: gql`
      query($userId:String!) {
        userProfileAccess(userId:$userId) {
          id
          status 
          role
          profile{
              id
              name
              description
          }
        }
      }

      `,
      variables,
    }).valueChanges;
  }
  profileUser(id: string) {

    const variables = { id };
    return this.apollo.watchQuery({
      query: gql`
      query($id:String!) {
        profileUser(id: $id){
          id
          status
          role
          profile{
            id
            name
          }
        }
      } `,
      variables,
    }).valueChanges;
  }
  connectProfile(code: any, id: any) {
    // console.log('code: ', code, ' id: ', id);
    return this.apollo.mutate({
      mutation: gql`
        mutation ($inviteCode: String!, $userId: String!) {
          connectProfileUser(inviteCode: $inviteCode, userId: $userId)
        }
      `,
      variables: {
        inviteCode: code,
        userId: id
      },
    });
  }
  createUser(data: any) {
    return this.apollo.mutate({
      mutation: gql`
        mutation ($data: UserInput!) {
          createUser(data: $data){
            id
          }
        }
      `,
      variables: {
        data
      },
    });
  }
  updateUser(data: any, id: any) {
    return this.apollo.mutate({
      mutation: gql`
        mutation ($data: UserInput!, $id: String!) {
          updateUser(data: $data, id: $id){
            id
            firstName
            lastName
            email
            password
          }
        }
      `,
      variables: {
        data,
        id
      },
    });
  }
  createProfile(data: any) {
    return this.apollo.mutate({
      mutation: gql`
        mutation ($data: ProfileInput!) {
          createProfile(data: $data){
            id
          }
        }
      `,
      variables: {
        data
      },
    });
  }
}
