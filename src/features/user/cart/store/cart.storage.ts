import { createStorage } from "@/utils/storageHelper";
import type { ICartState } from "./cart.slice";

export const cartStorage = createStorage<ICartState>("cart", { items: [] });
