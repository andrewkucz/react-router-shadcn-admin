import { postsRouter } from "@/features/posts/router";
import { router } from "@/lib/trpc/server";

const appRouter = router({
  posts: postsRouter,
});

export { appRouter };

export type AppRouter = typeof appRouter;
