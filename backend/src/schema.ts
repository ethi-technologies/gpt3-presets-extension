import * as admin from 'firebase-admin';
import { gql, ApolloError, ValidationError } from 'apollo-server-express';


const serviceAccount = require('../service-account.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

enum Engine {
  Ada = "Ada",
  Babbage = "Babbage",
  Curie =  "Curie",
  Davinci = "Davinci"
}

interface Config {
  temperature: number;
  responseLength: number;
  stopCriteria: string;
  bestOf: number;
  topP: number;
  frequencyPenalty: number;
  presencePenalty: number;
  engine: Engine;
}

interface Preset {
  id: string;
  title: string;
  config: Config;
  tags: [string]; 
  author: string;
  likes: number;
}
interface Prompt {
  id: string;
  title: string;
  text: string;
  tags: [string]; 
  author: string;
  likes: number;
}

export const typeDefs = gql`
  type Prompt {
    id: ID!,
    name: String!,
    text: String!,
    tags: [String]!,
    description: String!,
    author: String,
    likes: Int!
  },

  type Query {
    prompts: [Prompt!]!,
    prompt(
      id: ID,
      name: String,
      tags: [String],
      author: String,
      likes: Int
    ): Prompt
  },

  type Mutation {
    createPrompt(
      name: String!,
      text: String!,
      tags: [String!]!,
      description: String!,
      author: String
    ) : ID,
    updatePrompt(
      id: ID!,
      name: String,
      text: String,
      tags: [String!],
      description: String,
      author: String,
      likes: Int
    ) : ID,
    likePrompt(
      id: ID!
    ) : Prompt
  }
`;

export const resolvers = {
  Query: {
    async prompts() {
      const prompts = await admin
        .firestore()
        .collection('prompts')
        .get();
      let result = [];
      prompts.docs.forEach(async (item, index) => {
        let res = await item.data();
        res = {
          id: item.id,
          ...res
        }
        result.push(res);
      });
      return result;
    },
    async prompt(_: null, args) {
      try {
        const promptDoc = await admin
          .firestore()
          .doc(`prompts/${args.id}`)
          .get();
        const prompt = promptDoc.data() as Prompt | undefined;
        return prompt || new ValidationError('Prompt ID not found');
      } catch (error) {
        throw new ApolloError(error);
      }
    }
  },
  Mutation: {
    createPrompt: async (_: null, args) => {
      let inPrompt:Prompt = args;
      console.log(`Adding: ${inPrompt}`);
      inPrompt['likes'] = 0;
      try {
        const newPrompt = await admin
          .firestore()
          .collection(`prompts`)
          .add(inPrompt);
        return newPrompt.id;
      } catch (error) {
        throw new ApolloError(error);
      }
    },
    updatePrompt: async (_: null, args) => {
      const newPrompt:Prompt = args;
      console.log(`Updating to: ${newPrompt}`);
      try {
        await admin
          .firestore()
          .doc(`prompts/${args.id}`)
          .update(newPrompt)
        return args.id;
      } catch (error) {
          throw new ApolloError(error);
      }
    },
    likePrompt: async (_: null, args: {id: string}) => {
      try {
        const docRef = await admin
          .firestore()
          .doc(`prompts/${args.id}`)
        const promptRef = await docRef.get()
        const currentPrompt = promptRef.data() as Prompt | undefined;
        currentPrompt['likes'] += 1;
        docRef.update(currentPrompt)
        return currentPrompt || new ValidationError('Prompt ID not found');
      } catch (error) {
          throw new ApolloError(error);
      }
    }
  }
};

