import { useParams } from "react-router";
import { ForbiddenError } from "@/features/errors/forbidden";
import { GeneralError } from "@/features/errors/general-error";
import { MaintenanceError } from "@/features/errors/maintenance-error";
import { NotFoundError } from "@/features/errors/not-found-error";
import { UnauthorisedError } from "@/features/errors/unauthorized-error";
import { breadcrumb } from "@/lib/breadcrumbs";

const errorMap: Record<string, React.ComponentType> = {
	unauthorized: UnauthorisedError,
	forbidden: ForbiddenError,
	"not-found": NotFoundError,
	"internal-server-error": GeneralError,
	"maintenance-error": MaintenanceError,
};

const errorBreadcrumbText: Record<string, string> = {
	unauthorized: "Unauthorized",
	forbidden: "Forbidden",
	"not-found": "Not Found",
	"internal-server-error": "Internal Server Error",
	"maintenance-error": "Maintenance Error",
};

export const handle = breadcrumb(
	(match) => errorBreadcrumbText[String(match.params.error)] ?? "Error",
);

export default function AuthenticatedErrorPage() {
	const { error } = useParams();
	const ErrorComponent = error ? errorMap[error] : undefined;

	return (
		<div className="flex-1 [&>div]:h-full">
			{ErrorComponent ? <ErrorComponent /> : <NotFoundError />}
		</div>
	);
}
