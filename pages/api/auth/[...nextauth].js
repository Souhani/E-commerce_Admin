import clientPromise from '@/lib/mongodb'
import { mongooseConnect } from '@/lib/mongoose'
import { Admin } from '@/models/Admin'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import NextAuth, { getServerSession } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

async function isAdminEmail(email) {
  // await mongooseConnect();
  //  return !!(await Admin.findOne({email}))
  return true
}
export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: "212790375376-bh5352doktfi24erg6mjoj6qrtnaonqj.apps.googleusercontent.com",
      clientSecret: "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"
    }),
  ],
  callbacks: {
    session: async ({session, token, user}) => {
      if(await isAdminEmail(session?.user?.email)){
        return session;
      }else{
        return false
      }
    }
  },
  secret: process.env.SECRET,
}

export default NextAuth(authOptions);

export async function isAdminRequest(req, res) {
   const session = await getServerSession(req,res,authOptions);
    if(! await isAdminEmail(session?.user?.email)){
          res.status(401);
          res.end();
          throw "Not an admin"
    }
}