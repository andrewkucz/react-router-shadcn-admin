import { publicProcedure, router } from "@/lib/trpc/server";

const postsRouter = router({
  list: publicProcedure.query(async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return [
      { id: 1, title: "Hello" },
      { id: 2, title: "World" },
    ];
  }),
});

export { postsRouter };
