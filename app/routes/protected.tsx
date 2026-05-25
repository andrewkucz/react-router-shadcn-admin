import type { LoaderFunctionArgs } from "react-router";
import { requireAuth } from "@/lib/auth/server-utils";

export const loader = async (args: LoaderFunctionArgs) => {
	await requireAuth(args.request);
};

export default function Protected() {
	return <div>Protected</div>;
}
