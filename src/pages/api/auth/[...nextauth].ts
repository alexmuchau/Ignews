import { query as q } from 'faunadb'

import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

import { fauna } from '../../../services/fauna'
import faunadb from 'faunadb'

export default NextAuth({
  
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET_ID,
      // authorization: {
      //   params: { scope: "read:user" }
      // }
    }),
    
  ],
  
  callbacks: {
    async signIn({ user, account ,profile, credentials }) {     
      try {
        const { name } = user
        
        const client = new faunadb.Client({
          secret: process.env.FAUNA_DB_KEY,
          domain: "localhost",
          port: 3000,
          scheme: "http"
        })

        await fauna.query(
          q.Create(
            q.Collections('users'),
              {data: name}  
            )
        )
      
        // await fauna.query(
        //     q.Create(
        //       q.Collections('users'),
        //       {data: {email}}  
        //     )
        //   )
          return true
      } catch (error) {
        console.log(error)
      }
      
               
    },
  }
})