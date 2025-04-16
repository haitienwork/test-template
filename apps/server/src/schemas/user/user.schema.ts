import { z } from "zod";

export const UserSchema = z.object({
	id: z.string(),
	name: z.string(),
});

export const UserCreateInputSchema = UserSchema.omit({ id: true });
export const UserByIdInputSchema = z.string();
export const UserByIdOrNameInputSchema = UserSchema.pick({ id: true, name: true });