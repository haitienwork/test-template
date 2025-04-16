/**
 * This a minimal tRPC server
 */
import { db } from "../db.js";
import { publicProcedure, router } from "./trpc.js";
import {
	UserByIdInputSchema,
	UserByIdOrNameInputSchema,
	UserCreateInputSchema,
} from "../schemas/user/user.schema.js";

export const appRouter = router({
	userList: publicProcedure.query(async () => {
		// Retrieve users from a datasource, this is an imaginary database
		const users = await db.user.findMany();
		//    ^?
		await new Promise((resolve) => setTimeout(resolve, 1000));
		return users;
	}),
	userByIdOrName: publicProcedure
		.input(UserByIdOrNameInputSchema)
		.query(async (opts) => {
			const { input } = opts;
			//      ^?
			// Retrieve the user with the given name or ID
			const users = await db.user.findByIdOrName(input.id, input.name);
			await new Promise((resolve) => setTimeout(resolve, 1000));
			return users;
		}),
	userById: publicProcedure.input(UserByIdInputSchema).query(async (opts) => {
		const { input } = opts;
		//      ^?
		// Retrieve the user with the given ID
		const user = await db.user.findById(input);
		await new Promise((resolve) => setTimeout(resolve, 1000));
		return user;
	}),
	userCreate: publicProcedure
		.input(UserCreateInputSchema)
		.mutation(async (opts) => {
			const { input } = opts;
			//      ^?
			// Create a new user in the database
			const user = await db.user.create(input);
			//    ^?
			return user;
		}),
});

// Export type router type signature, this is used by the client.
export type AppRouter = typeof appRouter;
